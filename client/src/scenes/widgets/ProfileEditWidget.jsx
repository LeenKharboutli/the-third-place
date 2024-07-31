import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "state";

const ProfileEditWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const profile = useSelector((state) => state.user);

  const [editedProfile, setEditedProfile] = useState({
    interestsAndHobbies: { keywords: [], description: "" },
    personalityTraits: { keywords: [], description: "" },
    valuesAndMotivations: { keywords: [], description: "" },
    lifestyleAndBehaviors: { description: "" },
    leisureActivityPreferences: { keywords: [], description: "" },
    socialSettingPreferences: { keywords: [], description: "" },
    goalsAndProjects: { description: "" },
    culturalBackground: { keywords: [], description: "" },
    demographics: { age: "", gender: "", location: "" },
  });
  const [openBigFiveTest, setOpenBigFiveTest] = useState(false);

  useEffect(() => {
    if (profile) {
      setEditedProfile((prev) => ({
        ...prev,
        ...profile,
      }));
    }
  }, [profile]);

  const handleInputChange = (section, field, value) => {
    setEditedProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleKeywordAdd = (section, keyword) => {
    if (editedProfile[section] && !editedProfile[section].keywords.includes(keyword)) {
      setEditedProfile((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          keywords: [...(prev[section].keywords || []), keyword],
        },
      }));
    }
  };

  const handleKeywordRemove = (section, keyword) => {
    if (editedProfile[section] && editedProfile[section].keywords) {
      setEditedProfile((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          keywords: prev[section].keywords.filter((k) => k !== keyword),
        },
      }));
    }
  };

  const handleSave = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}/profile`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProfile),
    });

    if (response.ok) {
      const updatedProfile = await response.json();
      dispatch(setProfile({ profile: updatedProfile }));
    }
  };

  const renderSection = (title, section, hasKeywords = true, hasDescription = true) => (
    <Box mb={2}>
      <Typography variant="h6">{title}</Typography>
      {hasDescription && (
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={editedProfile[section]?.description || ""}
          onChange={(e) => handleInputChange(section, "description", e.target.value)}
          margin="normal"
        />
      )}
      {hasKeywords && (
        <>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add keyword"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleKeywordAdd(section, e.target.value);
                e.target.value = "";
              }
            }}
            margin="normal"
          />
          <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
            {editedProfile[section]?.keywords?.map((keyword) => (
              <Chip
                key={keyword}
                label={keyword}
                onDelete={() => handleKeywordRemove(section, keyword)}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        Edit Profile
      </Typography>

      {renderSection("Interests and Hobbies", "interestsAndHobbies")}
      {renderSection("Personality Traits", "personalityTraits")}
      
      <Box mb={2}>
        <Button variant="contained" onClick={() => setOpenBigFiveTest(true)}>
          Take the Big Five Personality Test
        </Button>
        <Dialog open={openBigFiveTest} onClose={() => setOpenBigFiveTest(false)}>
          <DialogTitle>Big Five Personality Test</DialogTitle>
          <DialogContent>
            {/* Implement the Big Five Personality Test here */}
            <Typography>Big Five Personality Test questions go here.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenBigFiveTest(false)}>Close</Button>
            <Button onClick={() => {
              // Implement test submission logic here
              setOpenBigFiveTest(false);
            }}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      {renderSection("Values and Motivations", "valuesAndMotivations")}
      {renderSection("Lifestyle and Behaviors", "lifestyleAndBehaviors", false)}
      {renderSection("Leisure Activity Preferences", "leisureActivityPreferences")}
      {renderSection("Social Setting Preferences", "socialSettingPreferences")}
      {renderSection("Goals and Personal Projects", "goalsAndProjects", false)}
      {renderSection("Cultural Background", "culturalBackground")}

      <Box mb={2}>
        <Typography variant="h6">Life Stage and Demographics</Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Age"
          type="number"
          value={editedProfile.demographics?.age || ""}
          onChange={(e) => handleInputChange("demographics", "age", e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Gender"
          value={editedProfile.demographics?.gender || ""}
          onChange={(e) => handleInputChange("demographics", "gender", e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Location"
          value={editedProfile.demographics?.location || ""}
          onChange={(e) => handleInputChange("demographics", "location", e.target.value)}
          margin="normal"
        />
      </Box>

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Profile
      </Button>
    </Box>
  );
};

export default ProfileEditWidget;