const { Router } = require("express");
const crtl = require("../controllers/cart");

const router = Router();

//--> http://localhost:3000/api/cart/ <--//
router.get("/get_cart_customer/:id", crtl.get_cart_customer);
router.post("/add_item_cart", crtl.add_item_cart);
router.delete("/delete_item_cart/:id", crtl.delete_item_cart);

module.exports = router;
