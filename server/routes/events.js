import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createEvent, getUserEvents, getUserJoinedEvents, getEvent, updateEvent, joinEvent, deleteEvent } from "../controllers/events.js";

const router = express.Router();

/* CREATE */
router.post("/", verifyToken, createEvent);

/* READ */
router.get("/:userId/events", verifyToken, getUserEvents);
router.get("/:id", verifyToken, getEvent);
router.get("/:userId/joinedevents", getUserJoinedEvents)

/* UPDATE */
router.patch("/:id", verifyToken, updateEvent);
// NOTE: not sure what the route should even be?
router.patch("/:id/join", verifyToken, joinEvent);

/* DELETE */
router.delete("/:id", verifyToken, deleteEvent);

export default router;