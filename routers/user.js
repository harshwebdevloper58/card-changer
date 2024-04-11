const express = require("express")
const {handleUserSignUp} = require("../controllers/user")
router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.use(express.json());

router.post('/',handleUserSignUp)

module.exports = router;