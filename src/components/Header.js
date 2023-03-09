import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "./../theme";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import logo from '../assets/logo2.png'
import { NavLink, useNavigate } from "react-router-dom";
import { db, auth } from './../firebase.js'
import { signOut } from "firebase/auth";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  function doSignOut() {
    signOut(auth)
      .then(() => {
        navigate("/")
      })
  }

  if (auth.currentUser == null) {
    return (
      <Box display="flex" justifyContent="space-between" p={2} height={100} style={{ background: "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.2))" }} >
        <Box
          display="flex"
        >
          <img src={logo} alt="logo" />
        </Box>

        <Box display="flex">
          <IconButton>
            <NavLink to='/'>
              <HomeOutlinedIcon />
            </NavLink>
          </IconButton>
          <IconButton>
            <NavLink to='/SignIn'>
              <LoginOutlinedIcon />
            </NavLink>
          </IconButton>
        </Box>
      </Box>
    )
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2} style={{ background: "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.2))" }}>
      <Box
        display="flex"
      >
        <img src={logo} alt="logo" height={100} />
      </Box>

      <Box display="flex">
        <IconButton>
          <NavLink to='/Profile'>
            <PersonOutlineOutlinedIcon />
          </NavLink>
        </IconButton>
        <IconButton>
          <NavLink to='/Calendar'>
            <CalendarMonthOutlinedIcon />
          </NavLink>
        </IconButton>
        <IconButton onClick={doSignOut}>
          <LogoutOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;