import { useState } from 'react';

// URL MOCK (Cuando tengas el backend real, la pondremos aquí)
const API_URL = "https://tu-api-gateway.com/shorten"; 

function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // SIMULACIÓN: Esperamos 1 seg y mostramos un link falso
    setTimeout(() => {
        setShortUrl(`http://localhost:5173/short/prueba1`);
        setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>✂️ Acortador de URLs (Módulo 5)</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="url" 
          placeholder="Pega la URL larga..." 
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
          style={{ padding: '10px', width: '300px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px', marginLeft: '10px' }}>
          {loading ? '...' : 'Acortar'}
        </button>
      </form>
      {shortUrl && (
        <div style={{ marginTop: '20px' }}>
          <p>Link generado:</p>
          <a href={shortUrl} target="_blank" rel="noreferrer" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default Home;