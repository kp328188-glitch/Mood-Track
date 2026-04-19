const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Store moods temporarily
let moods = [];

// API to save mood
app.post("/save-mood", (req, res) => {
    const moodData = req.body;
    moods.push(moodData);
    res.json({ message: "Mood saved successfully" });
});

// API to get moods
app.get("/get-moods", (req, res) => {
    res.json(moods);
});