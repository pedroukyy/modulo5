import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Redirect() {
  const { codigo } = useParams(); 
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true); // Nuevo estado para saber si estamos "buscando"

  useEffect(() => {
    // 1. SIMULACIÓN ASÍNCRONA (Evita el error de React)
    // Hacemos de cuenta que tardamos 500ms en preguntar a la base de datos
    const checkDatabase = setTimeout(() => {
      if (codigo === 'error') {
        setError(true);
      }
      setLoading(false); // Terminamos de cargar
    }, 500);

    return () => clearTimeout(checkDatabase);
  }, [codigo]);

  useEffect(() => {
    // 2. LÓGICA DEL CONTADOR
    // Solo inicia si ya terminamos de cargar y NO hay error
    if (loading || error) return;

    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          // 3. REDIRECCIÓN FINAL
          window.location.href = "https://www.google.com"; 
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, error]);

  // PANTALLAS
  if (loading) {
    return <h2 style={{textAlign:'center', marginTop:'50px'}}>🔎 Verificando enlace...</h2>;
  }

  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>
        <h1>🚫 Error 404</h1>
        <p>El enlace no existe.</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
      <h1>⏳ Redireccionando en {countdown}...</h1>
      <p>Destino encontrado para: <strong>{codigo}</strong></p>
    </div>
  );
}

export default Redirect;