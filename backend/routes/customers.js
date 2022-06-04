const { Router } = require("express");
const crtl = require("../controllers/customers");
const { validateJWT, validateROLE } = require("../middlewares/authenticated");
const { validateUser } = require("../middlewares/validate-fields");
const router = Router();

//--> http://localhost:3000/api/customers <--//
router.post("/create", [validateJWT, validateROLE], crtl.create_customer);
router.get("/search/:type/:filter?", [validateJWT, validateROLE], crtl.read_customers);
router.get("/:id", [validateJWT, validateROLE], crtl.read_customer_by_id);
router.put("/:id", [validateJWT, validateROLE], crtl.update_customer);
router.delete("/:id", [validateJWT, validateROLE], crtl.delete_customer);

module.exports = router;
