const { Router } = require("express");
const { validateJWT, validateROLE } = require("../middlewares/authenticated");
const ctrl = require("../controllers/products");
const ctrl2 = require("../controllers/inventory");
const router = Router();
const multiparty = require("connect-multiparty");
const path = multiparty({ uploadDir: "./uploads/products" });

//--> http://localhost:3000/api/products <--//
router.post("/create", [validateJWT, validateROLE, path], ctrl.create_product);
router.get("/search/:filter?", ctrl.read_products);
router.get("/:id", ctrl.read_product_by_id);
router.put("/:id", [validateJWT, validateROLE, path], ctrl.update_product);
router.delete("/:id", [validateJWT, validateROLE, path], ctrl.delete_product);

// Inventory
router.get("/read_inventory/:id", [validateJWT], ctrl2.read_inventory);
router.post("/register_stock", [validateJWT], ctrl2.register_stock);
router.delete("/remove_stock/:id", [validateJWT], ctrl2.remove_stock);

// Variety & Galery
router.put("/status/:id", ctrl.change_status);
router.put("/variety/:id", [validateJWT], ctrl.change_variety);
router.put("/add_items_galery/:id", [validateJWT, path], ctrl.add_items_galery);
router.put("/del_items_galery/:id", [validateJWT], ctrl.del_items_galery);
router.get("/image/:img", ctrl.image);

module.exports = router;
