const controller = require("../../controllers/services/pdfController");
const {Router } = require('express');
const router = Router();



  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);



module.exports = router;