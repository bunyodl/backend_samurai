import express from "express";
import { eventsRouter } from "./routes/events.route";

export const app = express();

app.use("/events", eventsRouter);
