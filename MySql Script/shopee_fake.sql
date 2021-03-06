#SCRIPT TAO DATABASE

#DROP DATABASE SHOPEE_FAKE;

CREATE DATABASE SHOPEE_FAKE;
USE SHOPEE_FAKE;

begin;

CREATE TABLE USER_(
USERNAME varchar(50) not null PRIMARY KEY,
PASSW    VARCHAR(20) NOT NULL,
RECOVERY_EMAIL varchar(50),
ACTIVE_DATE DATE
);

CREATE TABLE ADMIN_(
ID char(9) not null PRIMARY KEY,
NAME_AD nvarchar(50) not null,
PHONE_NUMBER_CUS varchar(10),
EMAIL varchar(50),
USERNAME varchar(16) not null,

FOREIGN KEY(USERNAME) REFERENCES USER_(USERNAME)
);

CREATE TABLE CUSTOMER_( 
ID_CUSTOMER char(9) not null PRIMARY KEY ,
NAME_CUS nvarchar(50) not null,
DATE_OF_BIRTH DATE NOT NULL ,
TYPE_CUS VARCHAR(10), 
USERNAME varchar(16) not null,

FOREIGN KEY(USERNAME) REFERENCES USER_(USERNAME)
);

-- key = id_cus + email
CREATE TABLE EMAIL_CUSTOMER_(
ID_CUS char(9) not null,
EMAIL_CUS varchar(50) ,
PRIMARY KEY(ID_CUS, EMAIL_CUS),

FOREIGN KEY (ID_CUS) REFERENCES CUSTOMER_(ID_CUSTOMER)
);

-- key = id_cus + address
CREATE TABLE ADDRESS_CUSTOMER_(
ID_CUS char(9) not null,
ADDRESS_CUS nvarchar(1000),
PRIMARY KEY(ID_CUS, ADDRESS_CUS),

FOREIGN KEY (ID_CUS) REFERENCES CUSTOMER_(ID_CUSTOMER)
);

-- key = id_cus + phone
CREATE TABLE PHONE_NUMBER_CUSTOMER_( 
ID_CUS char(9) not null,
PHONE_NUMBER_CUS varchar(10),
PRIMARY KEY(ID_CUS, PHONE_NUMBER_CUS),

FOREIGN KEY (ID_CUS) REFERENCES CUSTOMER_(ID_CUSTOMER)
);
CREATE TABLE SHOP_( 
ID_SHOP char(9) not null PRIMARY KEY ,
NAME_SHOP nvarchar(50) not null, 
DATE_START DATE ,
NUM_OF_PRODUCT INT, 
ADDRESS_SHOP nvarchar(1000),
USERNAME varchar(16) not null,

FOREIGN KEY(USERNAME) REFERENCES USER_(USERNAME)
);

CREATE TABLE PERSONAL_PARTNER_(
ID_SHOP char(9) not null PRIMARY KEY ,
NAME_OWNER nvarchar(50) not null, 
NATION_SHOP nvarchar(50) not null, 
PHONE_NUMBER varchar(10) ,

FOREIGN KEY (ID_SHOP) REFERENCES SHOP_(ID_SHOP)
); 

CREATE TABLE BRAND_PARTNER_(
ID_SHOP char(9) not null PRIMARY KEY , 
NATION_SHOP nvarchar(50) not null , 
COMPANY_SIZE VARCHAR(10) DEFAULT 'MEDIUM',
NAME_REPRESENT nvarchar(50) not null,
HOTLINE_BRAND varchar(10) ,
EMAIL_BRAND varchar(50) ,

FOREIGN KEY (ID_SHOP) REFERENCES SHOP_(ID_SHOP)
); 


CREATE TABLE SHIPPING_PARTNER_( 
NAME_SHIPPING_PARTNER nvarchar(50) not null PRIMARY KEY ,
DATE_START DATE ,
NUM_SUCESSFUL_ORDER INT CHECK (NUM_SUCESSFUL_ORDER >=0) DEFAULT 0
);

CREATE TABLE ORDER_( 
ID_CUS char(9) not null,
ID_ORDER char(9) not null PRIMARY KEY, 
STATUS_ORDER nVARCHAR(20) DEFAULT 'Ch??? x??c nh???n',
ADDRESS_ORDER nvarchar(1000), 
PAYMENT_METHOD CHAR(3) NOT NULL DEFAULT 'COD',   #COD or ONL
SHIPPING_FEE double(10,2) NOT NULL DEFAULT 0,
NAME_SHIPPING_PARTNER nvarchar(50) not null,
TOTAL_PRICE double(10,2) default 0,

FOREIGN KEY (ID_CUS) REFERENCES CUSTOMER_(ID_CUSTOMER),
FOREIGN KEY (NAME_SHIPPING_PARTNER) REFERENCES SHIPPING_PARTNER_(NAME_SHIPPING_PARTNER)
);

CREATE TABLE DISCOUNT_(
DISCOUNT_CODE CHAR(9) NOT NULL,
DISCOUNT_VALUE INT check (DISCOUNT_VALUE > 0) NOT NULL default 1,
DISCOUNT_TYPE CHAR(7) NOT NULL CHECK (DISCOUNT_TYPE IN ('Voucher', 'Coupon')) DEFAULT 'Voucher', #VOUCHER or COUPON
VALID_DATE DATE NOT NULL,
EXPIRE_DATE DATE NOT NULL,
DISCOUNT_DESCRIPTION nvarchar(250),

PRIMARY KEY (DISCOUNT_CODE)
);

CREATE TABLE SHOP_DIS_(
DISCOUNT_CODE CHAR(9) NOT NULL,
ID_SHOP CHAR(9) NOT NULL,
SHOP_DIS_TYPE VARCHAR(10) NOT NULL CHECK (SHOP_DIS_TYPE IN ('Normal', 'Subscribed')) DEFAULT 'Normal', #Normal or Subscribed


PRIMARY KEY (DISCOUNT_CODE),
FOREIGN KEY (DISCOUNT_CODE) REFERENCES DISCOUNT_(DISCOUNT_CODE),
FOREIGN KEY (ID_SHOP) REFERENCES SHOP_(ID_SHOP)
);

CREATE TABLE SYSTEM_DIS_(
DISCOUNT_CODE CHAR(9) NOT NULL,
CAMPAIGN NVARCHAR(100) ,
SYS_DIS_TYPE  CHAR(7) NOT NULL CHECK (SYS_DIS_TYPE IN ('Normal', 'Silver', 'Golden', 'Diamond')) DEFAULT 'Normal' , #Normal, Silver, Golden, Diamond

PRIMARY KEY (DISCOUNT_CODE),
FOREIGN KEY (DISCOUNT_CODE) REFERENCES DISCOUNT_(DISCOUNT_CODE)
);

CREATE TABLE _APPLY_( 
ID_ORDER char(9) not null ,
DISCOUNT_CODE char(9) not null,

PRIMARY KEY (ID_ORDER, DISCOUNT_CODE),
FOREIGN KEY (ID_ORDER) REFERENCES ORDER_(ID_ORDER),
FOREIGN KEY (DISCOUNT_CODE) REFERENCES DISCOUNT_(DISCOUNT_CODE) 
);

CREATE TABLE _CORPORATE_WITH_(
ID_SHOP char(9) not null ,
NAME_SHIPPING_PARTNER nvarchar(50) not null,

PRIMARY KEY(ID_SHOP, NAME_SHIPPING_PARTNER),
FOREIGN KEY (ID_SHOP) REFERENCES SHOP_(ID_SHOP),
FOREIGN KEY (NAME_SHIPPING_PARTNER) REFERENCES SHIPPING_PARTNER_(NAME_SHIPPING_PARTNER)
);


CREATE TABLE PRODUCT_(
ID_PRODUCT char(9) not null , 
ID_SHOP char(9) not null ,
NAME_PRODUCT nvarchar(50) not null,
IMAGE_PRODUCT blob,
DISCRIPTION nvarchar(1000) ,
PRICE_PRODUCT double(10,2) NOT NULL,
NUM_ADD INT NOT NULL DEFAULT 0,
NUM_SOLD INT NOT NULL DEFAULT 0,
NUM_CURR INT NOT NULL DEFAULT 0,

PRIMARY KEY (ID_PRODUCT, ID_SHOP),
FOREIGN KEY (ID_SHOP) REFERENCES SHOP_(ID_SHOP)
);


CREATE TABLE CATEGORY_( 
NAME_CATEGORY nvarchar(50) not null PRIMARY KEY ,
DISCRIPTION nvarchar(1000)
);

CREATE TABLE CART_(
ID_CUS char(9) not null,
NUM_KIND INT,

PRIMARY KEY(ID_CUS),
FOREIGN KEY (ID_CUS) REFERENCES CUSTOMER_(ID_CUSTOMER)
);

CREATE TABLE _INCLUDE_( 
ID_CUS_CART char(9) not null,
ID_PRODUCT char(9) not null , 
ID_SHOP char(9) not null,
NUM_PRODUCT INT NOT NULL DEFAULT 0,
DATE_ADD DATE,

PRIMARY KEY(ID_PRODUCT, ID_SHOP, ID_CUS_CART),
FOREIGN KEY (ID_CUS_CART) REFERENCES CART_(ID_CUS),
FOREIGN KEY (ID_PRODUCT) REFERENCES PRODUCT_(ID_PRODUCT),
FOREIGN KEY (ID_SHOP) REFERENCES PRODUCT_(ID_SHOP)
);

CREATE TABLE _BONUS_FOR_(
ID_MINOR_PRODUCT char(9) not null , 
ID_MINOR_SHOP char(9) not null,
ID_MAJOR_PRODUCT char(9) not null,
ID_MAJOR_SHOP char(9) not null,

PRIMARY KEY(ID_MINOR_PRODUCT, ID_MINOR_SHOP, ID_MAJOR_PRODUCT, ID_MAJOR_SHOP),
FOREIGN KEY(ID_MINOR_PRODUCT) REFERENCES PRODUCT_(ID_PRODUCT),
FOREIGN KEY(ID_MAJOR_PRODUCT) REFERENCES PRODUCT_(ID_PRODUCT),
FOREIGN KEY(ID_MINOR_SHOP) REFERENCES PRODUCT_(ID_SHOP),
FOREIGN KEY(ID_MINOR_SHOP) REFERENCES PRODUCT_(ID_SHOP)
);

CREATE TABLE _CONTAIN_( 
ID_ORDER char(9) not null, 
ID_PRODUCT char(9) not null,
ID_SHOP char(9) not null,
NUM_PRODUCT INT NOT NULL ,

PRIMARY KEY(ID_PRODUCT, ID_SHOP, ID_ORDER),
FOREIGN KEY(ID_PRODUCT) REFERENCES PRODUCT_(ID_PRODUCT),
FOREIGN KEY(ID_SHOP) REFERENCES PRODUCT_(ID_SHOP),
FOREIGN KEY(ID_ORDER) REFERENCES ORDER_(ID_ORDER)
);

CREATE TABLE _BELONG_TO_(
ID_PRODUCT char(9) not null,
ID_SHOP char(9) not null,
NAME_CATEGORY nvarchar(50) not null,

PRIMARY KEY(ID_PRODUCT, ID_SHOP, NAME_CATEGORY),
FOREIGN KEY(ID_PRODUCT) REFERENCES PRODUCT_(ID_PRODUCT),
FOREIGN KEY(ID_SHOP) REFERENCES PRODUCT_(ID_SHOP),
FOREIGN KEY (NAME_CATEGORY) REFERENCES CATEGORY_(NAME_CATEGORY)
);

CREATE TABLE IMPORT_INFO_(
ID_BILL char(9) not null,
ID_SHOP char(9) not null,
NUMKIND INT,
DATE_BILL DATE,

PRIMARY KEY (ID_BILL),
FOREIGN KEY (ID_SHOP) REFERENCES SHOP_(ID_SHOP)
);

CREATE TABLE PRODUCT_LIST_(
ID_BILL char(9) not null,
ID_PRODUCT char(9) not null,
NUM INT NOT NULL DEFAULT 0 CHECK(NUM>=0),

PRIMARY KEY (ID_BILL, ID_PRODUCT),
FOREIGN KEY (ID_BILL) REFERENCES IMPORT_INFO_(ID_BILL)
);


-- Create index
CREATE INDEX expire_date_index ON DISCOUNT_ (EXPIRE_DATE);
CREATE INDEX USERNAME_INDEX ON CUSTOMER_(USERNAME);





