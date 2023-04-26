const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 5003;

const connectionString = "mongodb+srv://dbUser:dbUserPassword@cluster0.w7bvenf.mongodb.net/reservation_service";

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const reservationSchema = new mongoose.Schema({
    book_id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
});

const Reservation = mongoose.model("Reservation", reservationSchema);

app.use(cors());

app.use(express.json());

app.post("/reservations", async (req, res) => {
    const { book_id, user_id } = req.body;

    if (!book_id || !user_id) {
        res.status(400).json({ msg: "Missing book_id or user_id" });
    } else {
        const reservation = new Reservation({ book_id, user_id });
        await reservation.save();
        res.status(201).json(reservation);
    }
});

app.get("/reservations/:id", async (req, res) => {
    const reservation = await Reservation.findById(req.params.id);
    if (reservation) {
        res.json(reservation);
    } else {
        res.status(404).json({ msg: "Reservation not found" });
    }
});

app.put("/reservations/:id", async (req, res) => {
    const { book_id, user_id } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, { book_id, user_id }, { new: true });

    if (reservation) {
        res.json(reservation);
    } else {
        res.status(404).json({ msg: "Reservation not found" });
    }
});

app.listen(port, () => {
    console.log(`Reservation service listening at http://localhost:${port}`);
});
