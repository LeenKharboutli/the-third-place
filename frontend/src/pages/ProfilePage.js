import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Switch, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EventCard from '../components/EventCard';  // Assume this exists
import GroupCard from '../components/GroupCard';  // Assume this exists
// import Calendar from 'react-big-calendar';  // You'll need to install this package
import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import moment from 'moment'
// const localizer = momentLocalizer(moment)
import moment from 'moment';  // For date handling

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  calendarContainer: {
    height: 400,
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const [profile, setProfile] = useState(null);
  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);
  const [isCalendarView, setIsCalendarView] = useState(false);

  useEffect(() => {
    fetchProfileData();
    fetchEvents();
    fetchGroups();
    fetchFriends();
  }, []);

  const fetchProfileData = async () => {
    // Fetch profile data from API
    const dummyProfile = {
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'I love attending social events and meeting new people!',
      avatar: 'https://example.com/avatar.jpg',
    };
    setProfile(dummyProfile);
  };

  const fetchEvents = async () => {
    // Fetch events from API
    const dummyEvents = [
      { id: 1, title: 'Music Festival', start: new Date(2024, 7, 15), end: new Date(2024, 7, 17) },
      { id: 2, title: 'Tech Meetup', start: new Date(2024, 7, 20), end: new Date(2024, 7, 20) },
    ];
    setEvents(dummyEvents);
  };

  const fetchGroups = async () => {
    // Fetch groups from API
    const dummyGroups = [
      { id: 1, name: 'Hiking Enthusiasts', members: 120 },
      { id: 2, name: 'Book Club', members: 45 },
    ];
    setGroups(dummyGroups);
  };

  const fetchFriends = async () => {
    // Fetch friends from API
    const dummyFriends = [
      { id: 1, name: 'Jane Smith', avatar: 'https://example.com/jane.jpg' },
      { id: 2, name: 'Bob Johnson', avatar: 'https://example.com/bob.jpg' },
    ];
    setFriends(dummyFriends);
  };

  return (
    <Container className={classes.container} maxWidth="lg">
      {profile && (
        <Paper className={classes.paper}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar src={profile.avatar} className={classes.avatar} />
            </Grid>
            <Grid item xs>
              <Typography variant="h4">{profile.name}</Typography>
              <Typography variant="body1">{profile.email}</Typography>
              <Typography variant="body2">{profile.bio}</Typography>
            </Grid>
          </Grid>
        </Paper>
      )}

      <section className={classes.section}>
        <Typography variant="h5" gutterBottom>Events I'm Attending</Typography>
        <FormControlLabel
          control={<Switch checked={isCalendarView} onChange={() => setIsCalendarView(!isCalendarView)} />}
          label="Calendar View"
        />
        {isCalendarView ? (
          <div className={classes.calendarContainer}>
            <Calendar
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultDate={moment().toDate()}
            />
          </div>
        ) : (
          <Grid container spacing={2}>
            {events.map(event => (
              <Grid item key={event.id} xs={12} sm={6} md={4}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        )}
      </section>

      <section className={classes.section}>
        <Typography variant="h5" gutterBottom>My Groups</Typography>
        <Grid container spacing={2}>
          {groups.map(group => (
            <Grid item key={group.id} xs={12} sm={6} md={4}>
              <GroupCard group={group} />
            </Grid>
          ))}
        </Grid>
      </section>

      <section className={classes.section}>
        <Typography variant="h5" gutterBottom>My Friends</Typography>
        <List>
          {friends.map(friend => (
            <ListItem key={friend.id} button>
              <ListItemAvatar>
                <Avatar src={friend.avatar} />
              </ListItemAvatar>
              <ListItemText primary={friend.name} />
            </ListItem>
          ))}
        </List>
      </section>
    </Container>
  );
};

export default ProfilePage;