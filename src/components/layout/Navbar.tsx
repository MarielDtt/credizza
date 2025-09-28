'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import DisabledByDefault from '@mui/icons-material/DisabledByDefault';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const navItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Quienes Somos', path: '/quienes-somos' },
  { label: 'Prestamos', path: '/prestamos' },
  { label: 'Colaboradores', path: '/colaboradores' },
  { label: 'Preguntas Frecuentes', path: '/preguntas-frecuentes' },
  { label: 'Tips y Consejos', path: '/tips-consejos' },
  { label: 'Contactos', path: '/contactos' },
];
export default function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  /*Mobile*/
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
        <Image
          src="/LogoOptimizado.webp"
          alt="logo navbar credizza"
          width={52}
          height={52}
        />

      </Box>

      <List><Divider sx={{ width: '90%', mx: 'auto', borderTop: '1px solid #6C6C6C' }} />
        {navItems.map((item, index) => (
          <React.Fragment key={item.label}>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={{ textAlign: 'center' }}
              >
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="h2">
                      {item.label}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            {index < navItems.length - 1 && (
            <Divider sx={{ width: '75%', mx: 'auto', borderTop: '1px solid #6C6C6C' }} />

            )}
          </React.Fragment>
        ))}
      </List>
    </Box >
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>

      <AppBar
        id="navbar"
        component="nav"
        elevation={0}
        sx={{ bgcolor: '#1B1B1B', color: '#FAFAFA' }}
      >
        <Toolbar className="font-sans">
          <Box
            sx={{ flexGrow: 1 }}
          >
            <IconButton component={Link} href="/" sx={{ p: 0 }}>
              <Image
                src="/Logo-Navbar.webp"
                alt="logo navbar credizza"
                width={36}
                height={36}
              />
            </IconButton>
          </Box>
          {/* MOBILE: botón hamburguesa*/}
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }, color: 'var(--color-background-seccion)', }}
          >
            <MenuIcon />
          </IconButton>

          {/* DESKTOP: navegación horizontal*/}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (

              <Button
                key={item.label}
                component={Link}
                href={item.path}
                sx={{
                  color: pathname === item.path ? '#57E94A' : '#FFF9F0',
                  textTransform: 'none',
                  fontWeight: pathname === item.path ? 600 : 400,
                  '&:hover': {
                    color: pathname === item.path ? '#57E94A' : '#F0E4CD',
                    backgroundColor: 'transparent',
                  },
                  '&:focus-visible': {
                    outline: '2px solid #57E94A',
                    outlineOffset: 2,
                  },
                }}
              >
                {item.label}
              </Button>

            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE: Drawer lateral*/}
      <nav id="navbar">
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: 280,                             // ajustá al ancho que te guste
              boxSizing: 'border-box',
              bgcolor: '#FFF9F0',
              color: 'var(--color-texto-principal)',
              borderRadius: 3,
              m: 1,
              height: 526,
              boxShadow: 'none',
              border: '1px solid #6C6C6C',
              opacity: 0.9,
            },


          }}
        >
          {/* MOBILE: botón cerrar del Drawer */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'var(--color-texto-principal)',
            }}
          >
            <DisabledByDefault />
          </IconButton>
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 1}}>
        <Toolbar />

      </Box>
    </Box>
  );
}
