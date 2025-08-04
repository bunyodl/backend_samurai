import express from "express";

export const eventsRouter = express.Router();

eventsRouter.get("/", (req, res) => {
    res.send("Events page");
});

eventsRouter.post("/", (req, res) => {
    res.send("The event has been created");
});
