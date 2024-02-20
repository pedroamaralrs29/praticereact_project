import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Citys from './pages/Citys';
import Querys from './pages/Querys';
import About from './pages/About';
import Deputados from './pages/Deputados';

function App() {
  return (
    <Container maxWidth="xg">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deputados" element={<Deputados />} />
        <Route path="/cidades" element={<Citys />} />
        <Route path="/buscas" element={<Querys />} />
        <Route path="/sobre" element={<About />} />
      </Routes>
    </Container>
  );
}

export default App;
