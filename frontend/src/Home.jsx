import { useState } from 'react';
import axios from 'axios'; 
import './App.css'; 

// 👇 LA URL EXACTA DE TU PANA (Módulo 1)
const MODULE_1_API_URL = "https://wz1rxvbdh2.execute-api.us-east-1.amazonaws.com/shorten";

function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setShortUrl('');

    try {
      console.log("Enviando a Módulo 1:", originalUrl);

      // 1. Enviamos el dato como 'url'
      const response = await axios.post(MODULE_1_API_URL, {
        url: originalUrl 
      });

      console.log("Respuesta recibida:", response.data);

      // 2. Su código devuelve 'short_id'
      const codigoRecibido = response.data.short_id; 
      
      // 3. Armamos el link con TU dominio
      const linkFinal = `${window.location.origin}/short/${codigoRecibido}`;
      
      setShortUrl(linkFinal);

    } catch (err) {
      console.error("Error creando el link:", err);
      setError(true);
      if (err.message === "Network Error") {
          setErrorMsg("Error de red. Posible problema de CORS en el backend.");
      } else {
          setErrorMsg("No se pudo crear el link.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>✂️ Acortador Cloud (Integrado)</h1>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="url" 
            placeholder="Pega tu enlace largo aquí..." 
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="input-url"
          />
          
          <button type="submit" disabled={loading} className="btn-acortar">
            {loading ? 'Procesando...' : 'Acortar URL'}
          </button>
        </form>

        {error && <p className="error" style={{color:'red'}}>❌ {errorMsg}</p>}

        {shortUrl && (
          <div className="result">
            <p>¡Link Creado Exitosamente!</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="short-link">
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;