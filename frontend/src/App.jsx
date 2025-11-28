import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';      // Importamos el formulario que acabamos de mover
import Redirect from './Redirect'; // Importamos la pantalla de espera

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Si la ruta es la raiz (/), mostramos el Formulario */}
        <Route path="/" element={<Home />} />
        
        {/* Si la ruta tiene /short/codigo, mostramos la Redirección */}
        <Route path="/short/:codigo" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;