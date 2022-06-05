const { Router } = require("express");
const { validateJWT } = require("../middlewares/authenticated");
const ctrl1 = require("../controllers/customers");
const ctrl2 = require("../controllers/products");
const ctrl3 = require("../controllers/address");
const ctrl4 = require("../controllers/sales");
const ctrl5 = require("../controllers/coupons");

//--> http://localhost:3000/api/public <--//
const router = Router();

// Customers
router.post("/create_customer", ctrl1.create_customer);
router.get("/read_customer_by_id/:id", ctrl1.read_customer_by_id);
router.put("/update_customer/:id", ctrl1.update_customer);

// Products
router.get("/list_product_by_slug/:slug", ctrl2.list_product_by_slug);
router.get("/list_product_recomended/:category", ctrl2.list_product_recomended);
router.get("/list_product_news", ctrl2.list_product_news);
router.get("/list_product_sales", ctrl2.list_product_sales);

// Address
router.post("/create_address", [validateJWT], ctrl3.create_address);
router.get("/read_address/:id", [validateJWT], ctrl3.read_address);
router.put("/update_address/:id/:customer", [validateJWT], ctrl3.update_address);
router.delete("/delete_address/:id", [validateJWT], ctrl3.delete_address);
router.get("/principal_address/:id", [validateJWT], ctrl3.principal_address);

// Sales
router.post("/register_sale", [validateJWT], ctrl4.register_sale);
router.get("/send_email_sale/:id", [validateJWT], ctrl4.send_email_sale);
router.get("/read_orders_customer/:id", [validateJWT], ctrl4.read_orders_customer);
router.get("/read_orders_by_id/:id", [validateJWT], ctrl4.read_orders_by_id);
router.put("/send_message_contact", ctrl4.send_message_contact);

router.get("/validate_coupon/:coupon", [validateJWT], ctrl5.validate_coupon);

module.exports = router;
