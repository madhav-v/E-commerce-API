const router = require("express").Router();
const HttpResponse = require("../config/http-response-codes");
const authCheck = require("../middleware/auth.middleware");
const { checkPermission } = require("../middleware/permission.middleware");
const { productCtrl } = require("../controllers");
const uploader = require("../middleware/uploader.middleware");

const uploadPath = (req, res, next) => {
  req.uploadPath = "./public/products/";
  next();
};

router
  .route("/")
  .get(authCheck, checkPermission("admin"), productCtrl.listAllProducts)
  .post(
    authCheck,
    checkPermission("admin"),
    uploadPath,
    uploader.single("image"),
    productCtrl.storeProduct
  );

router
  .route("/:id")
  .put(
    authCheck,
    checkPermission("admin"),
    uploadPath,
    uploader.single("image"),
    productCtrl.updateProduct
  )
  .delete(authCheck, checkPermission("admin"), productCtrl.deleteProduct);

router.get("/list/home", productCtrl.getProductForHomePage);

module.exports = router;
