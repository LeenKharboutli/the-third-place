/*  
This is a Node.js controller file for handling CRUD (Create, Read, Update, Delete) operations for an Event model. 
*/

import Event from "../models/Event.js";
import User from "../models/User.js";

/* CREATE */
// NOTE: export keyword allows the function to be available to other modules
// NOTE: const declares a constant named createEvent  
// NOTE: async keyword allows use of await, declares asynchronous function
// NOTE: (req, res) => is meant to be more consice syntax ("arrow function syntax")
// NOTE: arrow functions kind of remind me of lambda functions in Python
// NOTE: When you need a function to have its own 'this' context, a regular function is necessary (not arrow function). Arrow function is good for functional programming
// NOTE: createEvent = implies that the function is being assigned to a const variable with that name
// NOTE: In JS, functions are first-class citizens and can be assigned to variables, passed as arguments, or returned from other functions
export const createEvent = async (req, res) => {
  try {
    // NOTE: const is best practice unless you know that the variable needs to be reassigned. const prevents reassignment to primitive types
    const { userId, title, description, time, location } = req.body; // NOTE: Object/"dict" destructuring, var names must match corresponding req.body names exactly
    const newEvent = new Event({
      userId,
      title,
      description,
      time,
      location,
      attendees: [],
    });

    // NOTE: newEvent is the Mongoose document instance we just made
    // NOTE: save() is a Mongoose method, returns a Promise. It functions to save the newly created document to the database.
    // NOTE: the Promise return type is why we use "await"
    // NOTE: await forces the code to wait for this to complete before moving on, prevents race conditions
    // NOTE: so await forces a bit of synchronicity in an async function?
    // NOTE: mongoose's save() performs validation against the schema, will not save if validation fails
    // NOTE: async programming useful if something takes an upredictable amount of time
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(409).json({ message: err.message }); //409 Indicates a request conflict with the current state of the target resource
  }
};

/* READ */
export const getUserEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    const events = await Event.find({ userId });
    res.status(200).json(events);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserJoinedEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    const query = {"attendees": userId}
    const events = await Event.find(query);
    res.status(200).json(events);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    res.status(200).json(event);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, time, location } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, time, location },
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const joinEvent = async (req, res) => {
  
  try {
    // params vs. user? What's in the req object?
    // how do we know that it's grabbing the correct id? (e.g. the Event id that we're joining?)
    const { id } = req.params;
    const { userId } = req.body;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const attendeeIndex = event.attendees.indexOf(userId);

    if (attendeeIndex > -1) {
      // this id is just a temp var in the arrow funct right??
      event.attendees.splice(attendeeIndex, 1);
    } else {
      event.attendees.push(userId);
    }

    // NOTE: not sure why we must save?
    await event.save();

    // NOTE: not sure what this does tbh
    const attendees = await Promise.all(
      event.attendees.map((id) => User.findById(id))
    );
    // NOTE: we're still using the User model, so this code should work. 
    const formattedAttendees = attendees.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    // We need to write a controller that allows the user to join the event
    res.status(200).json({ ...event.toObject(), attendees: formattedAttendees });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE */
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndRemove(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};