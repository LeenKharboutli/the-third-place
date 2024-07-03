import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core';
import { Edit as EditIcon, Add as AddIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: 'auto',
  },
  section: {
    marginTop: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const UserProfile = ({ user, onUpdateUser }) => {
  const classes = useStyles();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
    setEditedUser(user);
  };

  const handleSaveChanges = () => {
    onUpdateUser(editedUser);
    setEditDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Avatar alt={user.name} src={user.avatar} className={classes.avatar} />
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
          {user.bio}
        </Typography>

        <div className={classes.section}>
          <Typography variant="h6" gutterBottom>
            Interests
          </Typography>
          {user.interests.map((interest) => (
            <Chip key={interest} label={interest} className={classes.chip} />
          ))}
        </div>

        <div className={classes.section}>
          <Typography variant="h6" gutterBottom>
            Qualities
          </Typography>
          {user.qualities.map((quality) => (
            <Chip key={quality} label={quality} className={classes.chip} />
          ))}
        </div>

        <div className={classes.section}>
          <Typography variant="h6" gutterBottom>
            Location
          </Typography>
          <Typography>{user.location}</Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button startIcon={<EditIcon />} onClick={handleEditClick}>
          Edit Profile
        </Button>
        <Button startIcon={<AddIcon />}>
          Add Friend
        </Button>
      </CardActions>

      <Dialog open={editDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={editedUser.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="bio"
            label="Bio"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={editedUser.bio}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            value={editedUser.location}
            onChange={handleInputChange}
          />
          {/* Add more fields for interests and qualities if needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default UserProfile;