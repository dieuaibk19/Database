const ShopDisModel = require('../model/ShopDisModel');

module.exports = {
    get: (req, res) => {

        ShopDisModel.getAllDiscount().then((result) => {
            console.log(result);
            console.log('Send data');
            res.status(200).send(result);
        });
        
    },

    // post: async (req, res) => {
    //     //validate dữ liệu
    //     ShopDisModel.addDiscount();
    //     res.send('Discount is added');
    // },
    
    // put: async (req, res) => {
    //     ShopDisModel.updateDiscount();
    //     res.send(result);
    // },

    // delete: async (req, res) => {
    //     ShopDisModel.delete();
    //     res.send(result);
    // }
}