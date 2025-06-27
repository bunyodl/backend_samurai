import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello World! This is the home page");
});

app.get("/events", (req, res) => {
    res.send("Events page");
});

app.post("/events", (req, res) => {
    res.send("The event has been created");
});

app.listen(PORT, () => {
    console.log(`Example app listening on port hahaha ${PORT}`);
});
