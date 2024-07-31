import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createEvent, getUserEvents, getEvent, updateEvent, deleteEvent } from "../controllers/events.js";

const router = express.Router();

/* CREATE */
router.post("/", verifyToken, createEvent);

/* READ */
router.get("/:userId/events", verifyToken, getUserEvents);
router.get("/:id", verifyToken, getEvent);

/* UPDATE */
router.patch("/:id", verifyToken, updateEvent);

/* DELETE */
router.delete("/:id", verifyToken, deleteEvent);

export default router;