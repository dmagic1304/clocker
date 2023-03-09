import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "./../theme";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import logo from '../assets/logo.png'
import { NavLink } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2} border={"solid"}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
      >
        <img src={logo} alt="logo" height={100} />
      </Box>

      {/* ICONS */}
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
  );
};

export default Header;