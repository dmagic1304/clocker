import React from 'react';
import { makeStyles } from '@mui/styles';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const useStyles = makeStyles({
  root: {
    padding: '20px',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  }
});

const Footer = () => {
  const classes = useStyles();

  return (
    <BottomNavigation className={classes.root} style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}>
      <BottomNavigationAction label="Facebook" icon={<Facebook />} href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer" />
      <BottomNavigationAction label="Twitter" icon={<Twitter />} href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer" />
      <BottomNavigationAction label="Instagram" icon={<Instagram />} href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer" />
    </BottomNavigation>
  );
};

export default Footer;
