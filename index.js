const express = require('express');
const fs = require('fs');
const port = 8000;

const app = express();
app.use(express.urlencoded({ extended: true }));

const carList = JSON.parse(fs.readFileSync(`${__dirname}/data/cars.json`));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'ping succesfully'
    })
});

app.get('/cars', (req, res) => {
    res.json(carList);
});

app.get('/cars/:id', (req, res) => {
    const findCarByID = carList.find(car => car.id == req.params.id);
    if (findCarByID) {
        res.status(200).json(findCarByID);
    } else {
        res.status(404).json({ message: "Tidak ada mobil yang sesuai dengan id diberikan" });
    }
});

app.post('/cars', (req, res) => {
    const newCar = req.body;
    carList.push(newCar);
    res.status(201).json(newCar);
});

app.put('/cars/:id', (req, res) => {
    const carId = req.params.id;
    const updatedCar = req.body;
    const index = carList.findIndex(car => car.id === carId);
    if (index !== -1) {
        carList[index] = updatedCar;
        res.status(200).json(updatedCar);
    } else {
        res.status(404).json({ message: "update data mobil gagal!" });
    }
});

app.delete('/cars/:id', (req, res) => {
    const carId = req.params.id;
    const index = carList.findIndex(car => car.id === carId);
    if (index !== -1) {
        const deletedCar = carList.splice(index, 1)[0];
        res.status(200).json(deletedCar);
    } else {
        res.status(404).json({ message: "Hapus data mobil gagal" });
    }
});

app.listen(port, () => {
    console.log(`server berjalan di port ${port}`);
})