const connection = require('../../db_config');

module.exports = class ShopDisModel {
    static getAllDiscount = async () => {
        const query = `CALL SHOW_SHOP_DISCOUNT`;

            return new Promise((resolve, reject) => {
                connection.db.query(query, (err, results) => {
                    if (err) {
                        reject('Error: ', err);
                    }
                    else {
                        resolve(results);
                };
            })
        })
    }
    static addDiscount = async (info) => {
        //validate dữ liệu 
        const query = `CALL SHOP_DIS_INSERT(?, ?, ?, ?, ?, 'none' ,?, ?)`;
        const {code, value, type, validDate, expireDate, shopID, shopDisType} = info;

        return new Promise((resolve, reject) => {
            connection.db.query(query, [code, value, type, validDate, expireDate, shopID, shopDisType], 
                (err, results) => {
                if (err) {
                    reject('Error: ', err);
                }
                else {
                    resolve('Value is Inserted!');
            }
        })
    })
}
    // static updateDiscount = (id) => {}
    // static deleteDiscount = () => {}
};