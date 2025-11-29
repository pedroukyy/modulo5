import { useState } from 'react';
import axios from 'axios';
import './App.css';

const MODULE_1_API_URL = "https://wz1rxvbdh2.execute-api.us-east-1.amazonaws.com/shorten";
const MODULE_4_URL = "https://d3nskhypo9b48i.cloudfront.net";

function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [statsUrl, setStatsUrl] = useState('');
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
      const response = await axios.post(MODULE_1_API_URL, {
        url: originalUrl
      });

      const codigoRecibido = response.data.short_id;
      
      const linkFinal = `${window.location.origin}/short/${codigoRecibido}`;
      setShortUrl(linkFinal);

      const linkEstadisticas = `${MODULE_4_URL}/stats/${codigoRecibido}`;
      setStatsUrl(linkEstadisticas);

    } catch (err) {
      console.error(err);
      setError(true);
      setErrorMsg("Hubo un problema al crear el enlace. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="card">
        <h1>✂️ Acortador Cloud</h1>
        <p style={{marginBottom: '1.5rem', color: 'var(--text-light)'}}>
            Pega tu enlace largo y hazlo corto al instante.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="url"
              placeholder="Ej: https://www.mi-enlace-super-largo.com/..."
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              className="input-modern"
            />
          </div>
          
          <button type="submit" disabled={loading} className="btn-modern btn-primary">
            {loading ? '🔄 Procesando...' : 'Acortar URL'}
          </button>
        </form>

        {error && (
          <div className="error-msg">
              ❌ {errorMsg}
          </div>
        )}

        {shortUrl && (
          <div className="result-container">
            <p>✅ ¡Tu enlace está listo!</p>
            
            <a href={shortUrl} target="_blank" rel="noreferrer" className="short-link">
              {shortUrl}
            </a>

            <a href={statsUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <button className="btn-modern btn-success">
                📊 Ver Estadísticas del Enlace
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;