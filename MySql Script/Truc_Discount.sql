USE SHOPEE_FAKE;

-- Procedure để lấy thông tin discount shop
DROP PROCEDURE IF EXISTS SHOW_SHOP_DISCOUNT;
DELIMITER //
CREATE PROCEDURE SHOW_SHOP_DISCOUNT ()
BEGIN
	SELECT D.DISCOUNT_CODE, D.DISCOUNT_VALUE, D.DISCOUNT_TYPE, D.VALID_DATE, D.EXPIRE_DATE, S.ID_SHOP, S.SHOP_DIS_TYPE 
    FROM DISCOUNT_ AS D, SHOP_DIS_ AS S WHERE D.DISCOUNT_CODE = S.DISCOUNT_CODE;
END//
DELIMITER ;

CALL SHOW_SHOP_DISCOUNT;

/* ======================================= CAU 1 ========================================== */
USE SHOPEE_FAKE;

-- DISCOUNT
DROP PROCEDURE IF EXISTS DIS_INSERT;
DELIMITER //
CREATE PROCEDURE DIS_INSERT (
IN dis_code CHAR(9),
IN dis_value INT,
IN dis_type CHAR(7),
IN dis_valid DATE,
IN dis_expire DATE,
IN dis_description nvarchar(250))
BEGIN

	-- Handle duplicate primary key CODE 1062 (discount code)
    DECLARE EXIT HANDLER FOR 1062
	SELECT 'Error, discount code is duplicated !' As ERROR_MESSAGE;
    
    -- Handle violated constraint CODE 3819 (null value, check constraints)
	DECLARE EXIT HANDLER FOR 3819
	SELECT 'Error, constraints is violated !' As ERROR_MESSAGE;
    
    -- Handle wrong discount type
    IF (dis_type != 'Voucher' AND dis_type != 'Coupon') THEN 
		SELECT "Discount type can only be Voucher or Coupon !" As ERROR_MESSAGE;
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT  = "Discount type can only be Voucher or Coupon";
	END IF;
    
	-- Handle discount_value <= 0
	IF (dis_value <= 0) THEN 
		SELECT "Value of discount need to be greater than 0 !" As ERROR_MESSAGE;
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT  = "Value of discount need to be greater than 0";
	END IF;

    -- Handle discount_value > 100 if discount_type = coupon
	IF (dis_type = 'Coupon' AND dis_value > 100) THEN 
		SELECT "Value of Coupon can't be greater than 100 !" As ERROR_MESSAGE;
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT  = "value of Coupon can't be greater than 100";
	END IF;
    
    -- Handle valid date > expire date 
    	IF (dis_valid > dis_expire) THEN 
		SELECT "Valide date need to be earlier or the same date as the expire date !" As ERROR_MESSAGE;
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT  = "Valide date need to be earlier or the same date as the expire date";
	END IF;

	INSERT INTO discount_ (DISCOUNT_CODE, DISCOUNT_VALUE, DISCOUNT_TYPE, VALID_DATE, EXPIRE_DATE, DISCOUNT_DESCRIPTION)
    VALUES (dis_code, dis_value, dis_type, dis_valid, dis_expire, dis_description);

END //
DELIMITER ;


-- SHOP DISCOUNT
DROP PROCEDURE IF EXISTS SHOP_DIS_INSERT;
DELIMITER //
CREATE PROCEDURE SHOP_DIS_INSERT (
IN dis_code CHAR(9),
IN dis_value INT,
IN dis_type CHAR(7),
IN dis_valid DATE,
IN dis_expire DATE,
IN dis_description nvarchar(250),
IN shopID CHAR(9),
IN dis_shop_type CHAR(10))
BEGIN

	-- Handle duplicate primary key CODE 1062 (discount code)
	DECLARE EXIT HANDLER FOR 1062
	SELECT 'Error, discount code is duplicated !' As ERROR_MESSAGE;
    
	-- Insert into discount table
    CALL DIS_INSERT(dis_code, dis_value, dis_type, dis_valid, dis_expire, dis_description);
    
    -- Handle not found id shop
        IF (NOT EXISTS (SELECT * FROM Shop_ WHERE ID_SHOP = shopID)) THEN
		SELECT "The shop id doesn't exist in shop table!" As ERROR_MESSAGE;
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT  = "The shop id doesn't exist in shop table";
	END IF;
    
    -- Handle false discount type
		IF (dis_shop_type != 'Normal'AND dis_shop_type != 'Subscribed') THEN
			SELECT "Discount type can only be normal or subscribed !" As ERROR_MESSAGE;
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT  = "Discount type can only be normal or subscribed";
        END IF;
        
	-- Handle exist in system discount
     IF (EXISTS (SELECT * FROM SYSTEM_DIS_ WHERE DISCOUNT_CODE = dis_code)) THEN
		SELECT "The discount code has already been in system discount !" As ERROR_MESSAGE;
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT  = "The discount code has already been in system discount" ;
	END IF;
    
	INSERT INTO shop_dis_ (DISCOUNT_CODE, ID_SHOP, SHOP_DIS_TYPE)
    VALUES (dis_code, shopID, dis_shop_type);
    SELECT "Successful !" AS MESSAGE;
END //
DELIMITER ;

 -- CALL SHOP_DIS_INSERT ('DIS000035', '5', 'Voucher', '2021-2-2', '2021-12-30', 'Áp dụng cho đơn hàng 50K', 'SHP000002', 'Subscribed');
 -- DELETE FROM SHOP_DIS_ WHERE DISCOUNT_CODE IN ('DIS000031', 'DIS000032', 'DIS000033', 'DIS000034') ;
 -- SELECT * FROM SHOP_DIS_;
-- SELECT * FROM DISCOUNT_ AS D,SHOP_DIS_ AS S WHERE D.DISCOUNT_CODE = S.DISCOUNT_CODE;

/* ======================================= CAU 2 ========================================== */


-- Trigger update action on shop discount table => update on discount table
DROP TRIGGER IF EXISTS trigger_update_shopdis_discount;
DELIMITER //
CREATE TRIGGER trigger_update_shopdis_discount
BEFORE UPDATE
ON SHOP_DIS_ FOR EACH ROW
BEGIN
	SET FOREIGN_KEY_CHECKS = 0; -- disable foregin key contraints
	UPDATE DISCOUNT_
    SET DISCOUNT_CODE = NEW.DISCOUNT_CODE
    WHERE DISCOUNT_CODE = OLD.DISCOUNT_CODE;
    SET FOREIGN_KEY_CHECKS = 1;
END //
DELIMITER ;

/*

SELECT * FROM DISCOUNT_;
SELECT * FROM SHOP_DIS_;

UPDATE SHOP_DIS_ 
SET DISCOUNT_CODE = 'trucngo' 
WHERE DISCOUNT_CODE = 'DIS000002';

*/


-- Trigger delete action on shop discount table => delete on discount table
DROP TRIGGER IF EXISTS trigger_delete_shopdis_discount;
DELIMITER //
CREATE TRIGGER trigger_delete_shopdis_discount
AFTER DELETE
ON SHOP_DIS_ FOR EACH ROW
BEGIN
	SET FOREIGN_KEY_CHECKS = 0; -- disable foregin key contraints
	DELETE FROM DISCOUNT_
    WHERE DISCOUNT_CODE = OLD.DISCOUNT_CODE;
    SET FOREIGN_KEY_CHECKS = 1;
END //
DELIMITER ;

/* 
SELECT * FROM DISCOUNT_;
SELECT * FROM SHOP_DIS_;

DELETE FROM SHOP_DIS_ 
WHERE DISCOUNT_CODE = 'trucngo';
*/


/* ======================================= CAU 3 ========================================== */

-- 3a Show discount code có ngày hết hạn là tham số đầu vào exp_date, order by valid date
DROP PROCEDURE IF EXISTS DISCOUNT_EQUAL_EXPIRE_DATE;
DELIMITER //
CREATE PROCEDURE DISCOUNT_EQUAL_EXPIRE_DATE(IN exp_date DATE)
BEGIN
    SELECT D.DISCOUNT_CODE, D.DISCOUNT_VALUE, D.DISCOUNT_TYPE, D.VALID_DATE, D.EXPIRE_DATE, S.ID_SHOP, S.SHOP_DIS_TYPE 
    FROM DISCOUNT_ AS D, SHOP_DIS_ AS S
    WHERE D.EXPIRE_DATE = exp_date AND D.DISCOUNT_CODE = S.DISCOUNT_CODE 
    ORDER BY VALID_DATE;
END //
DELIMITER ;

-- CALL DISCOUNT_EQUAL_EXPIRE_DATE('2021-12-31');

-- 3b Show các shop (id) có số lượng discount còn hạn lớn hơn tham số đầu vào `num`, order by số lượng mã
DROP PROCEDURE IF EXISTS SHOP_HAS_VALID_DISCOUNT_GREATER_NUM;
DELIMITER //
CREATE PROCEDURE SHOP_HAS_VALID_DISCOUNT_GREATER_NUM(IN num INT)
BEGIN
	DECLARE cur_date DATE;
    SET cur_date = curdate();
    
    SELECT S.ID_SHOP, SHP.NAME_SHOP, COUNT(S.DISCOUNT_CODE) AS DISCOUNT_NUM
    FROM DISCOUNT_ AS D, SHOP_DIS_ AS S, SHOP_ AS SHP
    WHERE D.DISCOUNT_CODE = S.DISCOUNT_CODE AND VALID_DATE <= cur_date AND EXPIRE_DATE >= cur_date AND S.ID_SHOP = SHP.ID_SHOP
	GROUP BY S.ID_SHOP
    HAVING COUNT(S.DISCOUNT_CODE) > num
    ORDER BY DISCOUNT_NUM;
END //
DELIMITER ;

-- CALL SHOP_HAS_VALID_DISCOUNT_GREATER_NUM(1);


/* ======================================= CAU 4 ========================================== */

-- Nhập vào code discount, kiểm tra ngày hiện tại so với valide date và expire date
-- Ngày hiện tại < validate : 'Mã vẫn chưa có hiệu lực'
-- Ngày hiện tại > expire date : 'Mã không còn hiệu lực'
-- Ngày hiện tại - expire date : 'Mã còn hiệu lực x ngày'

DROP FUNCTION IF EXISTS DISCOUNT_STATE ;
DELIMITER //
CREATE FUNCTION DISCOUNT_STATE(
	dis_code CHAR(9)
) 
RETURNS NVARCHAR(50)
READS SQL DATA 
BEGIN
    DECLARE val_date, exp_date DATE;
    DECLARE cur_date DATE;
    DECLARE state NVARCHAR(50);
    

    SET val_date = (SELECT VALID_DATE FROM DISCOUNT_ WHERE DISCOUNT_CODE = dis_code);
	SET exp_date = (SELECT EXPIRE_DATE FROM DISCOUNT_ WHERE DISCOUNT_CODE = dis_code);
    SET cur_date = CURDATE();
    
    -- Check if code is valid
	IF (NOT EXISTS (SELECT * FROM DISCOUNT_ WHERE DISCOUNT_CODE = dis_code)) THEN
		SET state =  "Mã không tồn tại !";
        RETURN (state);
	END IF;
    
    
    IF cur_date < val_date THEN
		SET state = "Mã vẫn chưa có hiệu lực";
	ELSEIF cur_date > exp_date THEN
		SET state = "Mã không còn hiệu lực";
	ELSE
        SET state = concat("Mã còn hiệu lực ", exp_date - cur_date + 1 , " ngày");
    END IF;
    
	RETURN (state);
END//
DELIMITER ;

 SELECT DISCOUNT_STATE('D00001') AS DISCOUNT_STATE;

-- Nhập vào id của shop và số phân chia
-- Nếu số shop có số lượng mã giảm giá < pagnition thì trả về -1
-- Nếu số lượng mã = pagnition thì trả về 0 
-- Nếu số lượng mã > pagnition thì trả về 1
DROP FUNCTION IF EXISTS NUM_DISCOUNT_OF_SHOP;
DELIMITER //
CREATE FUNCTION NUM_DISCOUNT_OF_SHOP(
	idShop CHAR(9),
    pagnition INT
) 
RETURNS INT
READS SQL DATA 
BEGIN

	DECLARE num INT;
    
	IF (NOT EXISTS (SELECT * FROM SHOP_ WHERE ID_SHOP = idShop)) THEN
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT  = "The shop id doesn't exist";
    END IF;
    
    SET num = (SELECT COUNT(DISCOUNT_CODE) FROM SHOP_DIS_ WHERE ID_SHOP = idShop);
    
    IF num  <  pagnition THEN
		SET num = -1;
	ELSEIF num = pagnition THEN
		SET num = 0;
	ELSE 
		SET num = 1;
    END IF;
    
    RETURN num;
END//
DELIMITER ;

-- SELECT * FROM SHOP_DIS_ WHERE ID_SHOP = 'SHP000001';
-- SELECT NUM_DISCOUNT_OF_SHOP('SHP001', 1) AS DISCOUNT_STATE;



