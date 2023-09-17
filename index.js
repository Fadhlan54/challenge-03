const express = require('express');
const fs = require('fs');
const port = 8000;

const app = express();
app.use(express.urlencoded({ extended: true }));

const carList = JSON.parse(fs.readFileSync(`${__dirname}/cars.json`));



app.get('/', (req, res) => {
    res.json({
        message: 'ping succesfully'
    })
});

app.get('/cars', (req, res) => {
    res.json(carList);
});

app.get('/cars/:id', (req, res) => {
    const findCarByID = carList.find(car => car.id == req.params.id);
    if (findCarByID) {
        res.json(findCarByID);
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
    const index = carsData.findIndex(car => car.id === carId);
    if (index !== -1) {
        carList[index] = updatedCar;
        res.json(updatedCar);
    } else {
        res.status(404).json({ message: "Mobil tidak ditemukan" });
    }
});

app.delete('/cars/:id', (req, res) => {
    const carId = req.params.id;
    const index = carList.findIndex(car => car.id === carId);
    if (index !== -1) {
        const deletedCar = carList.splice(index, 1)[0];
        res.json(deletedCar);
    } else {
        res.status(404).json({ message: "Mobil tidak ditemukan" });
    }
});

app.listen(port, () => {
    console.log(`server berjalan di port ${port}`);
})