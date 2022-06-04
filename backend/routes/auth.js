const { Router } = require("express");
const crtl = require("../controllers/auth");
const { validateLogin } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/authenticated");
const router = Router();

//--> http://localhost:3000/api/login <--//
router.post("/", [validateLogin], crtl.login_admin);
router.post("/public", [validateLogin], crtl.login_public);
router.get("/renew", [validateJWT], crtl.renewToken);

module.exports = router;
