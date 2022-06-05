const { Router } = require("express");
const crtl = require("../controllers/config");
const { validateJWT, validateROLE } = require("../middlewares/authenticated");
const router = Router();

//--> http://localhost:3000/api/config <--//
router.get("/get_messages_admin", [validateJWT, validateROLE], crtl.get_messages_admin);
router.put("/close_message_admin/:id", [validateJWT, validateROLE], crtl.close_message_admin);
router.get("/get_sales_admin/:from?/:to?", [validateJWT, validateROLE], crtl.get_sales_admin);
router.get("/kpi_mounth_earnings", crtl.kpi_mounth_earnings);

module.exports = router;
