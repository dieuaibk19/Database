const connection = require('../../db_config');

module.exports = class ShopDisModel {
    static getAllDiscount = async () => {
        const query = `CALL SHOW_SHOP_DISCOUNT`;

            return new Promise((resolve, reject) => {
                connection.db.query(query, (err, results) => {
                    if (err) {
                        console.log('Error');
                    }
                    else {
                        resolve(results);
                };
            })
        })
    }
    // static addDiscount = (dis_code, dis_value, dis_type, dis_valid, dis_expire, dis_description, shopID, dis_shop_type) => {
    //     //validate dữ liệu
        
    //     const query = `CALL SHOP_DIS_INSERT()`;
    // }
    // static updateDiscount = (id) => {}
    // static deleteDiscount = () => {}
};