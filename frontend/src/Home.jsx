import { useState } from 'react';
import axios from 'axios';

// URL DE TU BACKEND (Módulo 1)
const MODULE_1_API_URL = "https://wz1rxvbdh2.execute-api.us-east-1.amazonaws.com/shorten";

// 👇 URL DE TU DASHBOARD (Módulo 4) - La saqué de tus mensajes anteriores
const MODULE_4_URL = "https://d3nskhypo9b48i.cloudfront.net";

function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [statsUrl, setStatsUrl] = useState(''); // Nuevo estado para el link de stats
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setShortUrl('');
    setStatsUrl('');

    try {
      console.log("Enviando URL a Módulo 1:", originalUrl);
      
      const response = await axios.post(MODULE_1_API_URL, { 
        url: originalUrl 
      });

      // Obtenemos el ID
      const codigoRecibido = response.data.short_id; 
      
      // 1. Armamos el link corto (Para compartir)
      const linkFinal = `${window.location.origin}/short/${codigoRecibido}`;
      setShortUrl(linkFinal);

      // 2. Armamos el link de estadísticas (Para analizar)
      const linkEstadisticas = `${MODULE_4_URL}/stats/${codigoRecibido}`;
      setStatsUrl(linkEstadisticas);

    } catch (err) {
      console.error("Error conectando con la API:", err);
      setError(true);
      setErrorMsg("Error al crear el link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>✂️ Acortador Cloud (Integrado)</h1>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="url" 
          placeholder="Pega la URL larga aquí..." 
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
          style={{ padding: '10px', width: '300px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px', marginLeft: '10px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
          {loading ? 'Creando...' : 'Acortar'}
        </button>
      </form>

      {error && (
        <p style={{ color: 'red', marginTop: '20px' }}>❌ {errorMsg}</p>
      )}

      {shortUrl && (
        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', display: 'inline-block', backgroundColor: '#f9f9f9' }}>
          <p style={{marginBottom: '5px'}}>✅ ¡Link Creado Exitosamente!</p>
          
          {/* LINK CORTO */}
          <a href={shortUrl} target="_blank" rel="noreferrer" style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#007bff', display: 'block', marginBottom: '20px' }}>
            {shortUrl}
          </a>

          <hr style={{margin: '15px 0', border: '0', borderTop: '1px solid #eee'}}/>

          {/* BOTÓN DE ESTADÍSTICAS */}
          <a href={statsUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{ 
              padding: '10px 20px', 
              cursor: 'pointer', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              fontWeight: 'bold'
            }}>
              📊 Ver Estadísticas
            </button>
          </a>
        </div>
      )}
    </div>
  );
}

export default Home;