import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// 👇 ESTA ES TU API DEL MÓDULO 3 (La que lee DynamoDB)
const MODULE_3_API_URL = "https://rwfkmc03y1.execute-api.us-east-1.amazonaws.com";

function Redirect() {
  const { codigo } = useParams();
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [destino, setDestino] = useState(null); // Aquí guardaremos la URL real (Netflix, Google, etc)

  // 1. CONSULTAR A TU BACKEND (MÓDULO 3)
  useEffect(() => {
    const fetchDestino = async () => {
      try {
        console.log("Consultando destino para:", codigo);
        // Llamamos a tu API
        const response = await axios.get(`${MODULE_3_API_URL}/stats/${codigo}`);
        
        console.log("Respuesta BD:", response.data);

        // Si la API devuelve una urlOriginal, la guardamos
        if (response.data && response.data.urlOriginal) {
          setDestino(response.data.urlOriginal);
        } else {
          // Si el código no existe en la BD
          setError(true);
        }
        setLoading(false);

      } catch (err) {
        console.error("Error conectando con Módulo 3:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchDestino();
  }, [codigo]);

  // 2. CUENTA REGRESIVA Y REDIRECCIÓN
  useEffect(() => {
    // Solo iniciamos el conteo si ya tenemos un DESTINO válido
    if (loading || error || !destino) return;

    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          // 🚀 ¡DESPEGUE! Redirigimos a la URL real que trajo la base de datos
          window.location.href = destino; 
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, error, destino]);

  // 3. PANTALLAS VISUALES
  if (loading) {
    return <div style={styles.container}><h2>🔎 Buscando en la nube...</h2></div>;
  }

  if (error) {
    return (
      <div style={styles.container}>
        <h1 style={{color: 'red'}}>🚫 Enlace no encontrado</h1>
        <p>El código <strong>{codigo}</strong> no existe en nuestra base de datos.</p>
        <a href="/" style={styles.link}>Crear un nuevo link</a>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>⏳ Redirigiendo...</h1>
        <div style={styles.counter}>{countdown}</div>
        <p>Te estamos enviando a tu destino original.</p>
        <p style={{fontSize: '0.8em', color: '#888', marginTop: '10px'}}>Código: {codigo}</p>
      </div>
    </div>
  );
}

// Estilos simples para que se vea bien
const styles = {
  container: {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
    height: '100vh', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4'
  },
  card: {
    backgroundColor: 'white', padding: '40px', borderRadius: '15px', 
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '400px'
  },
  counter: {
    fontSize: '4em', fontWeight: 'bold', color: '#007bff', margin: '20px 0'
  },
  link: {
    color: '#007bff', textDecoration: 'none', fontWeight: 'bold', marginTop: '20px', display: 'block'
  }
};

export default Redirect;