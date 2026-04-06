# Challenge técnico - JuegoContador

Este repositorio contiene 3 variantes del mismo ejercicio:

- `JuegoContador1`
- `JuegoContador2`
- `JuegoContador3`

Cada carpeta incluye una versión ejecutable en HTML (con React + Babel por CDN) y un archivo `JuegoContador.tsx` como versión en TypeScript/React.

## Requisitos

- Node.js 18 o superior
- npm (incluido con Node.js)
- Navegador web (Chrome, Edge o Firefox)

Verificar instalación:

```bash
node -v
npm -v
```

## Opción 1 (rápida): ejecutar cada solución como página HTML

> Esta opción no compila TypeScript. Ejecuta la versión embebida en `index.html` (o `index copy.html`).

### 1) JuegoContador1

Desde la raíz del repositorio:

```bash
cd JuegoContador1
npx serve -l 5501
```

Abrir en el navegador:

- http://localhost:5501/index%20copy.html

### 2) JuegoContador2

Desde la raíz del repositorio:

```bash
cd JuegoContador2
npx serve -l 5502
```

Abrir en el navegador:

- http://localhost:5502/index.html

### 3) JuegoContador3

Desde la raíz del repositorio:

```bash
cd JuegoContador3
npx serve -l 5503
```

Abrir en el navegador:

- http://localhost:5503/index.html

### Detener servidores

En cada terminal, presionar `Ctrl + C`.

---

## Opción 2 (recomendada): ejecutar el archivo `JuegoContador.tsx` con Vite

Las carpetas no traen configuración de build (`scripts`, `vite.config`, `tsconfig`, etc.).
Por eso, para correr el `.tsx` hay que montar un proyecto React + TypeScript.

### Pasos (por cada carpeta que quieras probar)

Ejemplo para `JuegoContador3`:

1. Crear proyecto base con Vite en una carpeta temporal:

```bash
npm create vite@latest juego-contador-vite -- --template react-ts
cd juego-contador-vite
npm install
```

2. Reemplazar el contenido de `src/App.tsx` con el código de `JuegoContador3/JuegoContador.tsx`.

3. Iniciar servidor de desarrollo:

```bash
npm run dev
```

4. Abrir la URL que muestra Vite (normalmente `http://localhost:5173`).

## Notas útiles

- El puntaje récord se guarda en `localStorage` del navegador.
- Si querés resetear récord: abrir DevTools > Application/Storage > Local Storage y borrar la clave correspondiente.
- El archivo `package.json` incluido en cada carpeta no define scripts de arranque, por eso se usa servidor estático (opción 1) o Vite (opción 2).
