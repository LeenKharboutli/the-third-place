import React from 'react';
import { Container, Typography, Link, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Facebook, Twitter, Instagram } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  socialIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" component="footer" className={classes.footer}>
      <Grid container spacing={4} justifyContent="space-evenly">
        <Grid item xs={6} sm={3}>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            About Us
          </Typography>
          <ul>
            <li><Link href="/about" color="textSecondary">About</Link></li>
            <li><Link href="/team" color="textSecondary">Our Team</Link></li>
            <li><Link href="/contact" color="textSecondary">Contact Us</Link></li>
          </ul>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Legal
          </Typography>
          <ul>
            <li><Link href="/privacy" color="textSecondary">Privacy Policy</Link></li>
            <li><Link href="/terms" color="textSecondary">Terms of Use</Link></li>
          </ul>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Follow Us
          </Typography>
          <Link href="https://facebook.com" color="inherit" className={classes.socialIcon}>
            <Facebook />
          </Link>
          <Link href="https://twitter.com" color="inherit" className={classes.socialIcon}>
            <Twitter />
          </Link>
          <Link href="https://instagram.com" color="inherit" className={classes.socialIcon}>
            <Instagram />
          </Link>
        </Grid>
      </Grid>
      <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
        © {new Date().getFullYear()} TheThirdPlace. All rights reserved.
      </Typography>
    </Container>
  );
};

export default Footer;