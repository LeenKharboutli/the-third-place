import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      interestsAndHobbies,
      personalityTraits,
      valuesAndMotivations,
      lifestyleAndBehaviors,
      leisureActivityPreferences,
      socialSettingPreferences,
      goalsAndProjects,
      culturalBackground,
      demographics,
    } = req.body;

    const user = await User.findById(id);

    if (user) {
      user.interestsAndHobbies = interestsAndHobbies || user.interestsAndHobbies;
      user.personalityTraits = personalityTraits || user.personalityTraits;
      user.valuesAndMotivations = valuesAndMotivations || user.valuesAndMotivations;
      user.lifestyleAndBehaviors = lifestyleAndBehaviors || user.lifestyleAndBehaviors;
      user.leisureActivityPreferences = leisureActivityPreferences || user.leisureActivityPreferences;
      user.socialSettingPreferences = socialSettingPreferences || user.socialSettingPreferences;
      user.goalsAndProjects = goalsAndProjects || user.goalsAndProjects;
      user.culturalBackground = culturalBackground || user.culturalBackground;
      user.demographics = demographics || user.demographics;

      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};