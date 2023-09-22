const fs = require("fs");

const dataPath = `${__dirname}/../data/cars.json`;
const carList = JSON.parse(fs.readFileSync(dataPath));

const checkId = (req, res, next, val) => {
  const findCarByID = carList.find((car) => car.id == val);
  if (!findCarByID) {
    res.status(404).json({
      status: "failed",
      message: `id mobil: (${val}) tidak ditemukan`,
    });
  }
  next();
};

const checkBody = (req, res, next) => {
  if (!req.body.plate || !req.body.manufacture || !req.body.model) {
    return res.status(400).json({
      staus: "failed",
      message: "harus ada data plate, manufacture, dan model",
    });
  }
  next();
};

const checkDuplicate = (req, res, next) => {
  let message;
  for (const car of carList) {
    if (car.plate === req.body.plate) {
      message = "plat nomor sudah terdaftar";
    }
    if (car.id === req.body.id) {
      message = "id sudah ada dalam daftar";
    }
  }
  if (message) {
    return res.status(409).json({
      status: "failed",
      message,
    });
  }
  next();
};

const writeFile = () => {
  fs.writeFile(dataPath, JSON.stringify(carList), (err) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        message: "gagal menulis data ke dalam file json",
      });
    }
  });
};

const getAllCarsData = (req, res) => {
  if (!carList) {
    return res.json({
      status: "failed",
      message: "data tidak ditemukan",
    });
  }
  res.json({
    status: "success",
    data: carList,
  });
};

const getCarDataByID = (req, res) => {
  const findCarByID = carList.find((car) => car.id == req.params.id);

  res.status(200).json({
    status: "success",
    data: findCarByID,
  });
};

const createCarData = (req, res) => {
  const newCar = req.body;

  carList.push(newCar);
  writeFile();
  res.status(200).json({
    status: "success",
    data: newCar,
  });
};

const editCarData = (req, res) => {
  const carId = req.params.id;
  const updatedCar = req.body;
  const index = carList.findIndex((car) => car.id === carId);

  carList[index] = updatedCar;

  writeFile();
  res.status(200).json({
    status: "success",
    data: updatedCar,
  });
};

const deleteCarData = (req, res) => {
  const carId = req.params.id;
  const index = carList.findIndex((car) => car.id === carId);

  const deletedCar = carList.splice(index, 1)[0];

  writeFile();
  res.status(200).json({
    status: "success",
    data: deletedCar,
  });
};

module.exports = {
  getAllCarsData,
  getCarDataByID,
  createCarData,
  editCarData,
  deleteCarData,
  checkId,
  checkBody,
  checkDuplicate,
};
