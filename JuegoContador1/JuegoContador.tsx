import { useEffect, useRef, useState } from "react";

const DURACION_JUEGO_SEGUNDOS = 5;
const MENSAJES_CUENTA_ATRAS = ["Preparados", "Listos", "Ya"] as const;
const CLAVE_MEJOR_RACHA = "juego-contador-mejor-racha";

type EstadoJuego = "inicial" | "cuentaAtras" | "jugando" | "finalizado";

function JuegoContador() {
	const [estado, setEstado] = useState<EstadoJuego>("inicial");
	const [contador, setContador] = useState(0);
	const [tiempoRestante, setTiempoRestante] = useState(DURACION_JUEGO_SEGUNDOS);
	const [mensajeCuentaAtras, setMensajeCuentaAtras] = useState("");
	const [mejorRacha, setMejorRacha] = useState(0);

	const intervalRef = useRef<number | null>(null);
	const contadorRef = useRef(0);

	const limpiarIntervalo = () => {
		if (intervalRef.current !== null) {
			window.clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	useEffect(() => {
		const valorGuardado = localStorage.getItem(CLAVE_MEJOR_RACHA);
		if (!valorGuardado) {
			return;
		}

		const rachaParseada = Number.parseInt(valorGuardado, 10);
		if (!Number.isNaN(rachaParseada) && rachaParseada >= 0) {
			setMejorRacha(rachaParseada);
		}
	}, []);

	useEffect(() => {
		return () => {
			limpiarIntervalo();
		};
	}, []);

	const finalizarJuego = () => {
		const clicksFinales = contadorRef.current;

		setEstado("finalizado");
		setTiempoRestante(0);

		setMejorRacha((rachaActual) => {
			const nuevaRacha = Math.max(rachaActual, clicksFinales);
			if (nuevaRacha !== rachaActual) {
				localStorage.setItem(CLAVE_MEJOR_RACHA, String(nuevaRacha));
			}
			return nuevaRacha;
		});
	};

	const iniciarJuego = () => {
		setEstado("jugando");
		setMensajeCuentaAtras("");
		setTiempoRestante(DURACION_JUEGO_SEGUNDOS);

		limpiarIntervalo();
		intervalRef.current = window.setInterval(() => {
			setTiempoRestante((tiempoActual) => {
				if (tiempoActual <= 1) {
					limpiarIntervalo();
					finalizarJuego();
					return 0;
				}
				return tiempoActual - 1;
			});
		}, 1000);
	};

	const iniciarPartida = () => {
		limpiarIntervalo();

		setEstado("cuentaAtras");
		setContador(0);
		contadorRef.current = 0;
		setTiempoRestante(DURACION_JUEGO_SEGUNDOS);
		setMensajeCuentaAtras(MENSAJES_CUENTA_ATRAS[0]);

		let indiceMensaje = 0;
		intervalRef.current = window.setInterval(() => {
			indiceMensaje += 1;
			if (indiceMensaje < MENSAJES_CUENTA_ATRAS.length) {
				setMensajeCuentaAtras(MENSAJES_CUENTA_ATRAS[indiceMensaje]);
				return;
			}

			limpiarIntervalo();
			iniciarJuego();
		}, 1000);
	};

	const incrementarContador = () => {
		if (estado !== "jugando") {
			return;
		}
		setContador((valorActual) => {
			const nuevoValor = valorActual + 1;
			contadorRef.current = nuevoValor;
			return nuevoValor;
		});
	};

	return (
		<main>
			<h1>JuegoContador</h1>

			<p>Tiempo restante: {tiempoRestante} segundos</p>

			{estado === "inicial" && (
				<button type="button" onClick={iniciarPartida}>
					Empezar
				</button>
			)}

			{estado === "cuentaAtras" && <p>{mensajeCuentaAtras}</p>}

			{estado === "jugando" && (
				<section>
					<p>Contador: {contador}</p>
					<button type="button" onClick={incrementarContador}>
						Clickear
					</button>
				</section>
			)}

			{estado === "finalizado" && (
				<section>
					<p>Clicks realizados: {contador}</p>
					<p>Mejor racha: {mejorRacha}</p>
					<button type="button" onClick={iniciarPartida}>
						Empezar
					</button>
				</section>
			)}
		</main>
	);
}

export default JuegoContador;
