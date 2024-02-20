import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#006400'}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1,} }>
          Facilita Brasil
        </Typography>
        <Button color="inherit" component={Link} to="/"> Página Inicial</Button>
        <Button color="inherit" component={Link} to="/deputados"> Deputados </Button>
        <Button color="inherit" component={Link} to="/cidades"> Cidades</Button>
        <Button color="inherit" component={Link} to="/buscas"> Buscas </Button>
        <Button color="inherit" component={Link} to="/sobre"> Sobre </Button>
        <Button color="inherit">Contato</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

