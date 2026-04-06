import React, { useState, useEffect, useRef, FC, CSSProperties } from 'react';

const JuegoContador: FC = () => {
  // Estados del juego: 'inicio', 'cuenta-regresiva', 'jugando', 'terminado'
  const [estado, setEstado] = useState('inicio');
  const [mensajeInicial, setMensajeInicial] = useState('');
  const [clicks, setClicks] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(5);
  const [record, setRecord] = useState(
    () => Number(localStorage.getItem('recordJuegoContador')) || 0
  );

  // Referencia para el intervalo del cronómetro
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Lógica de la cuenta regresiva inicial (Preparados, listos, ya)
  const iniciarCuentaRegresiva = () => {
    setEstado('cuenta-regresiva');
    setClicks(0);
    setTiempoRestante(5);
    
    const fases = ['Preparados...', 'Listos...', '¡YA!'];
    fases.forEach((texto, index) => {
      setTimeout(() => {
        setMensajeInicial(texto);
        if (index === fases.length - 1) {
          // Un segundo después del "YA", empezamos el juego
          setTimeout(() => comenzarJuego(), 1000);
        }
      }, index * 1000);
    });
  };

  const comenzarJuego = () => {
    setEstado('jugando');
    // Iniciar cronómetro de 5 segundos
    timerRef.current = setInterval(() => {
      setTiempoRestante((prev) => prev - 1);
    }, 1000);
  };

  // Efecto para vigilar cuando el tiempo llega a 0
  useEffect(() => {
    if (tiempoRestante === 0 && estado === 'jugando') {
      finalizarJuego();
    }
  }, [tiempoRestante, estado]);

  const finalizarJuego = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
    setEstado('terminado');
    
    // Guardar récord si es superado
    if (clicks > record) {
      setRecord(clicks);
      localStorage.setItem('recordJuegoContador', clicks.toString());
    }
  };

  const manejarClick = () => {
    if (estado === 'jugando') {
      setClicks((prev) => prev + 1);
    }
  };

  return (
    <main style={styles.container}>
      <h1>JuegoContador</h1>
      
      {/* Sección de Récord */}
      <p style={styles.record}>Racha máxima: {record}</p>

      {/* Pantalla Inicial o Final */}
      {(estado === 'inicio' || estado === 'terminado') && (
        <div style={styles.box}>
          {estado === 'terminado' && (
            <div style={styles.resultado}>
              <h2>¡Tiempo agotado!</h2>
              <p>Hiciste <strong>{clicks}</strong> clicks.</p>
              {clicks >= record && clicks > 0 && <p style={styles.nuevoRecord}>¡Nuevo Récord!</p>}
            </div>
          )}
          <button style={styles.btnStart} onClick={iniciarCuentaRegresiva}>
            {estado === 'inicio' ? 'Empezar Juego' : 'Reintentar'}
          </button>
        </div>
      )}

      {/* Pantalla de Cuenta Regresiva */}
      {estado === 'cuenta-regresiva' && (
        <h2 style={styles.mensajeEspera}>{mensajeInicial}</h2>
      )}

      {/* Pantalla de Juego Activo */}
      {estado === 'jugando' && (
        <div style={styles.box}>
          <h2 style={styles.timer}>Tiempo: {tiempoRestante}s</h2>
          <p style={styles.contadorActual}>Clicks: {clicks}</p>
          <button 
            style={styles.btnClick} 
            onMouseDown={manejarClick}
          >
            ¡CLICKEAR AQUÍ!
          </button>
        </div>
      )}
    </main>
  );
};

// Estilos simples en JS para mantener todo en un archivo (KISS)
const styles = {
  container: {
    fontFamily: 'system-ui, sans-serif',
    textAlign: 'center' as const,
    padding: '2rem',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    minHeight: '100vh',
    backgroundColor: '#f0f2f5'
  },
  record: { fontSize: '1.2rem', color: '#555' },
  box: { marginTop: '2rem' },
  btnStart: {
    padding: '1rem 2rem',
    fontSize: '1.5rem',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  btnClick: {
    padding: '3rem 5rem',
    fontSize: '2rem',
    cursor: 'pointer',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
    transition: 'transform 0.1s',
    WebkitUserSelect: 'none' as const,
    userSelect: 'none' as const
  },
  timer: { fontSize: '2.5rem', color: '#ff4444' },
  contadorActual: { fontSize: '1.8rem', fontWeight: 'bold' },
  mensajeEspera: { fontSize: '3rem', marginTop: '3rem', color: '#333' },
  resultado: { marginBottom: '1.5rem' },
  nuevoRecord: { color: '#e91e63', fontWeight: 'bold', animation: 'pulse 1s infinite' }
};

export default JuegoContador;