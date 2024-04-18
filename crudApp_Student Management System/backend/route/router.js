let express=require("express")
const router = express.Router();
let getuser=require("../controller/userController.js");
const postUser = require("../controller/postuserController.js");
const deleteUser = require("../controller/deleteuserController.js");
const UpdateUser = require("../controller/updateController.js");


router.get("/",getuser)
router.post("/post",postUser)
router.delete("/delete/:id",deleteUser)
router.patch("/update/:id",
UpdateUser)

module.exports=router;