import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Redirect from './Redirect';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/short/:codigo" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;