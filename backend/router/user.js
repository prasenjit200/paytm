const express = require("express");
const AuthController = require("../AuthController"); 
const { authMiddleware } = require("../middleware");
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/signin", AuthController.signin);
router.put("/update", authMiddleware, AuthController.update);
router.get("/bulk", AuthController.filter); 

module.exports = router;
