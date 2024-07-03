import React from 'react';
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
} from '@material-ui/core';
import { 
  Event as EventIcon, 
  Room as RoomIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Add as AddIcon,
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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  iconText: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const EventCard = ({ event }) => {
  const classes = useStyles();

  const handleAddToCalendar = () => {
    // Logic to add event to user's calendar
    console.log('Add to calendar clicked');
  };

  const handleShare = () => {
    // Logic to share the event
    console.log('Share clicked');
  };

  const handleLike = () => {
    // Logic to like/unlike the event
    console.log('Like clicked');
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="event" className={classes.avatar}>
            {event.title[0]}
          </Avatar>
        }
        title={event.title}
        subheader={`Created by ${event.creator}`}
      />
      <CardMedia
        className={classes.media}
        image={event.image}
        title={event.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {event.description}
        </Typography>
        <div className={classes.iconText}>
          <EventIcon className={classes.icon} />
          <Typography variant="body2">{event.date} at {event.time}</Typography>
        </div>
        <div className={classes.iconText}>
          <RoomIcon className={classes.icon} />
          <Typography variant="body2">{event.place}</Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddToCalendar}
          color="primary"
        >
          Add to Calendar
        </Button>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" onClick={handleShare}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EventCard;