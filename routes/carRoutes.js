const express = require("express");

const {
  getAllCarsData,
  getCarDataByID,
  createCarData,
  editCarData,
  deleteCarData,
  checkId,
  checkBody,
  checkDuplicate,
} = require(`./../controllers/carControllers`);

const router = express.Router();

router.param("id", checkId);

router
  .route("/")
  .get(getAllCarsData)
  .post(checkBody, checkDuplicate, createCarData);

router.route("/:id").get(getCarDataByID).put(editCarData).delete(deleteCarData);

module.exports = router;
