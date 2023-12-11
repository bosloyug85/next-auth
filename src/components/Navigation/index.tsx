"use client"

import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Button, 
  Box, 
  Tooltip, 
  Avatar, 
  Menu,
  Container,
  MenuItem,
  Skeleton
} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
import { useSession, getSession, SessionProvider, signOut } from 'next-auth/react';
import Modal from "../Modal";
import LoginForm from "../LoginForm";
import logoIcon from "/public/certificate-icon.svg";
import Dropdown from "@/components/Dropdown";

const Navigation = () => {
    const { data: session }: any = useSession<any>();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);
  
    const handleClickOpenModal = () => {
      setOpen(true);
    };
  
    const handleCloseModal = (value: string) => {
      setOpen(false);
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return <AppBar style={{ backgroundColor: 'rgb(33, 150, 243)' }} position="static">
      <Container maxWidth="xl">
    <Toolbar>
      <img style={{ width: 20, marginRight: 10 }} src={logoIcon.src} />
      <Typography variant="h6" fontWeight={500} fontSize={16} component="div" sx={{ flexGrow: 1 }}>
        CERTIFICATE DATABASE
      </Typography>
      <Box sx={{ flexGrow: 0 }}>
            {session && session.user ? 
            <>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={session.user.name || 'avatar'} src={session.user.avatar} />
                  </IconButton>
                </Tooltip>
                <Typography style={{ marginLeft: '15px', fontSize: 16 }}>{session.user.name}</Typography>
              </Box>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
            : null }
      </Box>
      {/*<Box minWidth={100}>*/}
      {/*    <Dropdown options={[]} />*/}
      {/*</Box>*/}
      <Box sx={{ flexGrow: 0, marginLeft: '10px' }}>
        {session ? <Button variant="" style={{ textTransform: 'none' }} onClick={signOut} startIcon={<LogoutIcon />}>
          Sign Out
        </Button> : <Button onClick={handleClickOpenModal} style={{ textTransform: 'none' }} color="inherit">Sign in</Button>}
      </Box>
    </Toolbar>

    {/* Sign in popup */}
    <Modal
      open={open}
      onClose={handleCloseModal}
    >
      <LoginForm />
    </Modal>
    </Container>
  </AppBar>
}

export default Navigation;