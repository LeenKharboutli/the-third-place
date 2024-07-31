import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
    interestsAndHobbies: {
      description: String,
      keywords: [String],
    },
    personalityTraits: {
      description: String,
      keywords: [String],
      bigFiveResults: {
        openness: Number,
        conscientiousness: Number,
        extraversion: Number,
        agreeableness: Number,
        neuroticism: Number,
      },
      displayBigFive: {
        openness: Boolean,
        conscientiousness: Boolean,
        extraversion: Boolean,
        agreeableness: Boolean,
        neuroticism: Boolean,
      },
    },
    valuesAndMotivations: {
      description: String,
      keywords: [String],
    },
    lifestyleAndBehaviors: {
      description: String,
    },
    leisureActivityPreferences: {
      keywords: [String],
    },
    socialSettingPreferences: {
      keywords: [String],
    },
    goalsAndProjects: {
      description: String,
    },
    culturalBackground: {
      description: String,
      keywords: [String],
    },
    demographics: {
      age: Number,
      gender: String,
      location: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;