const Router = require('express');
const router = Router();

const controller = require('../controller/ShopDisController');

router.get("/shop",controller.get);

router.post("/shop", controller.post);

// router.put("/shop", controller.put);

// router.delete("/shop", controller.delete);

module.exports = router;