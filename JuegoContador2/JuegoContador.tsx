import React, { useState, useEffect } from "react";

const JuegoContador = () => {
  const [fase, setFase] = useState("inicio"); // inicio, preparacion, jugando, terminado
  const [mensaje, setMensaje] = useState("");
  const [contador, setContador] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(5);
  const [mejorRacha, setMejorRacha] = useState(
    () => parseInt(localStorage.getItem("mejorRacha") || "0") || 0
  );

  // Manejar inicio del juego
  const empezarJuego = () => {
    setFase("preparacion");
    let pasos = ["Preparados", "Listos", "¡Ya!"];
    pasos.forEach((texto, index) => {
      setTimeout(() => {
        setMensaje(texto);
        if (index === pasos.length - 1) {
          iniciarContador();
        }
      }, (index + 1) * 1000);
    });
  };

  // Inicia la fase de clickeo
  const iniciarContador = () => {
    setFase("jugando");
    setMensaje("");
    setContador(0);
    setTiempoRestante(5);
  };

  // Contador regresivo de los 5 segundos
  useEffect(() => {
    if (fase === "jugando" && tiempoRestante > 0) {
      const timer = setTimeout(() => {
        setTiempoRestante(tiempoRestante - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (fase === "jugando" && tiempoRestante === 0) {
      finalizarJuego();
    }
  }, [fase, tiempoRestante]);

  // Finaliza el juego y guarda la mejor racha
  const finalizarJuego = () => {
    setFase("terminado");
    if (contador > mejorRacha) {
      setMejorRacha(contador);
      localStorage.setItem("mejorRacha", contador.toString());
    }
  };

  // Incrementa contador de clicks
  const clickear = () => {
    setContador(contador + 1);
  };

  return (
    <div style={styles.container}>
      <h1>Juego de Clicks</h1>

      {fase === "inicio" && (
        <button onClick={empezarJuego} style={styles.boton}>
          Empezar
        </button>
      )}

      {fase === "preparacion" && <h2>{mensaje}</h2>}

      {fase === "jugando" && (
        <div>
          <h2>Clicks: {contador}</h2>
          <h3>Tiempo restante: {tiempoRestante}s</h3>
          <button onClick={clickear} style={styles.boton}>
            Clickear
          </button>
        </div>
      )}

      {fase === "terminado" && (
        <div>
          <h2>Clicks realizados: {contador}</h2>
          <h3>Mejor racha: {mejorRacha}</h3>
          <button onClick={empezarJuego} style={styles.boton}>
            Empezar
          </button>
        </div>
      )}
    </div>
  );
};

// Estilos simples
const styles = {
  container: {
    textAlign: "center" as const,
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
  },
  boton: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default JuegoContador;