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
  ListItemAvatar,
} from '@material-ui/core';
import {
  Group as GroupIcon,
  Event as EventIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
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
    backgroundColor: theme.palette.primary.main,
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

const GroupCard = ({ group, onJoin, onLeave, onViewEvents, onManageGroup }) => {
  const classes = useStyles();
  const [isMember, setIsMember] = useState(group.isMember);
  const [eventsDialogOpen, setEventsDialogOpen] = useState(false);
  const [membersDialogOpen, setMembersDialogOpen] = useState(false);

  const handleMembershipToggle = () => {
    if (isMember) {
      onLeave(group.id);
    } else {
      onJoin(group.id);
    }
    setIsMember(!isMember);
  };

  const handleViewEvents = () => {
    setEventsDialogOpen(true);
    onViewEvents(group.id);
  };

  const handleViewMembers = () => {
    setMembersDialogOpen(true);
  };

  const handleCloseEventsDialog = () => {
    setEventsDialogOpen(false);
  };

  const handleCloseMembersDialog = () => {
    setMembersDialogOpen(false);
  };

  const handleManageGroup = () => {
    onManageGroup(group.id);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="group" className={classes.avatar}>
            <GroupIcon />
          </Avatar>
        }
        action={
          group.isAdmin && (
            <IconButton aria-label="settings" onClick={handleManageGroup}>
              <SettingsIcon />
            </IconButton>
          )
        }
        title={group.name}
        subheader={`${group.memberCount} members`}
      />
      <CardMedia
        className={classes.media}
        image={group.image}
        title={group.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {group.description}
        </Typography>
        <div className={classes.chipContainer}>
          {group.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <Button 
          variant="contained" 
          color={isMember ? "secondary" : "primary"} 
          onClick={handleMembershipToggle}
        >
          {isMember ? "Leave Group" : "Join Group"}
        </Button>
        <Button startIcon={<EventIcon />} onClick={handleViewEvents}>
          View Events
        </Button>
        <Button startIcon={<PeopleIcon />} onClick={handleViewMembers}>
          View Members
        </Button>
      </CardActions>

      <Dialog open={eventsDialogOpen} onClose={handleCloseEventsDialog}>
        <DialogTitle>{`Events in ${group.name}`}</DialogTitle>
        <DialogContent>
          <List>
            {group.events.map((event) => (
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

      <Dialog open={membersDialogOpen} onClose={handleCloseMembersDialog}>
        <DialogTitle>{`Members of ${group.name}`}</DialogTitle>
        <DialogContent>
          <List>
            {group.members.map((member) => (
              <ListItem key={member.id}>
                <ListItemAvatar>
                  <Avatar src={member.avatar} alt={member.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={member.name}
                  secondary={member.role}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMembersDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default GroupCard;