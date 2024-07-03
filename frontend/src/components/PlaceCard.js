import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import {
  Room as RoomIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Event as EventIcon,
  VerifiedUser as VerifiedIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const PlaceCard = ({ place, onFollow, onUnfollow, onViewEvents, onClaimPlace }) => {
  const classes = useStyles();
  const [isFollowing, setIsFollowing] = useState(place.isFollowing);
  const [eventsDialogOpen, setEventsDialogOpen] = useState(false);

  const handleFollowToggle = () => {
    if (isFollowing) {
      onUnfollow(place.id);
    } else {
      onFollow(place.id);
    }
    setIsFollowing(!isFollowing);
  };

  const handleViewEvents = () => {
    setEventsDialogOpen(true);
    onViewEvents(place.id);
  };

  const handleCloseEventsDialog = () => {
    setEventsDialogOpen(false);
  };

  const handleClaimPlace = () => {
    onClaimPlace(place.id);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="place" className={classes.avatar}>
            <RoomIcon />
          </Avatar>
        }
        action={
          place.isVerified && (
            <IconButton aria-label="verified">
              <VerifiedIcon color="primary" />
            </IconButton>
          )
        }
        title={place.name}
        subheader={place.address}
      />
      <CardMedia
        className={classes.media}
        image={place.image}
        title={place.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {place.description}
        </Typography>
        <div className={classes.chipContainer}>
          {place.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleFollowToggle}>
          {isFollowing ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
        </IconButton>
        <Button startIcon={<EventIcon />} onClick={handleViewEvents}>
          View Events
        </Button>
        {!place.isVerified && (
          <Button onClick={handleClaimPlace}>
            Claim Place
          </Button>
        )}
      </CardActions>

      <Dialog open={eventsDialogOpen} onClose={handleCloseEventsDialog}>
        <DialogTitle>{`Events at ${place.name}`}</DialogTitle>
        <DialogContent>
          <List>
            {place.events.map((event) => (
              <ListItem key={event.id}>
                <ListItemText
                  primary={event.title}
                  secondary={`${event.date} at ${event.time}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEventsDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PlaceCard;