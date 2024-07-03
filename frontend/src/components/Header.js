import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search as SearchIcon, AccountCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'white',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const Header = () => {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title} component={Link} to="/">
              The Third Place
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <nav>
              <ul className={classes.navList}>
                <li className={classes.navItem}><Button color="inherit" component={Link} to="/">Home</Button></li>
                <li className={classes.navItem}><Button color="inherit" component={Link} to="/events">Events</Button></li>
                <li className={classes.navItem}><Button color="inherit" component={Link} to="/places">Places</Button></li>
                <li className={classes.navItem}><Button color="inherit" component={Link} to="/groups">Groups</Button></li>
                <li className={classes.navItem}>
                  <IconButton color="inherit" component={Link} to="/profile">
                    <AccountCircle />
                  </IconButton>
                </li>
              </ul>
            </nav>
          </Toolbar>
        </AppBar>
      </div>
    );
  };
  

export default Header;