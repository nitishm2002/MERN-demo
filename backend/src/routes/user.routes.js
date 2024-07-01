const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();


router.post("/add-user", userController.addUser);
router.get("/get-user", userController.getUser);
router.delete("/delete-user/:userId", userController.deleteUser);


module.exports = router;
