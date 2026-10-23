// ============================================================
// 1. TUS DATOS: edita solo este arreglo
//    icono: un emoji | titulo y texto: lo tuyo | foto: ruta en /img
// ============================================================
const gustos = [
  { icono: "🍳", titulo: "Cocina", texto: "postres y tortas.", foto: "../img/cocina.jpeg" },
  { icono: "🎸", titulo: "Música", texto: "canciones que simpre me puden sacar del vacio emocional.", foto: "../img/musica.jpeg" },
  { icono: "🎮", titulo: "Videojuegos", texto: "Arena Breakout, sin duda el mejor juego que he jugado.", foto: "../img/juegos.jpeg" },
  { icono: "👨‍👩‍👧", titulo: "Amigos", texto: "Amigos que alegraron mi instancia en el colegio.", foto: "../img/amigos.jpeg" },
  { icono: "⚽", titulo: "gym", texto: "EL gimnasio me cambio la vida.", foto: "../img/gym.jpeg" },
  { icono: "🐶", titulo: "Mascotas", texto: "Mi felino mas amado del mundo.", foto: "../img/mascota.jpeg" },
  { icono: "⛩️", titulo: "Animes", texto: "Romcoms y peleas que alegran tu dia y hacen ver el amor de otra forma.", foto: "../img/animes.jpeg" },
];

// ============================================================
// 2. Dibuja las tarjetas
// ============================================================
const contenedor = document.getElementById("gustos");

contenedor.innerHTML = gustos.map(g => `
  <article class="gusto" data-foto="${g.foto}">
    <div class="gusto__cabecera">
      <span class="gusto__icono">${g.icono}</span>
      <h3>${g.titulo}</h3>
    </div>
    <p>${g.texto}</p>
  </article>
`).join("");

// ============================================================
// 3. Lente circular que sigue el mouse
// ============================================================
const seccion = document.getElementById("about");
const lente = document.getElementById("lente");

let objetivoX = 0, objetivoY = 0;
let x = 0, y = 0;
let fotoActual = "";
const reducirMovimiento = matchMedia("(prefers-reduced-motion: reduce)").matches;

seccion.addEventListener("mousemove", (e) => {
  objetivoX = e.clientX;
  objetivoY = e.clientY;

  const elemento = e.target.closest("[data-foto]");

  if (!elemento) {
    lente.classList.remove("activo");
    return;
  }

  const foto = elemento.dataset.foto;
  if (foto !== fotoActual) {
    fotoActual = foto;
    lente.style.backgroundImage = `url("${foto}")`;
  }
  lente.classList.add("activo");
});

seccion.addEventListener("mouseleave", () => lente.classList.remove("activo"));

function animar() {
  const suavidad = reducirMovimiento ? 1 : 0.18;
  x += (objetivoX - x) * suavidad;
  y += (objetivoY - y) * suavidad;
  lente.style.transform = `translate(${x}px, ${y}px)`;
  requestAnimationFrame(animar);
}
animar();

const video = document.getElementById("videoAnime");
const aviso = document.getElementById("sonido");

video.addEventListener("click", () => {
  video.muted = !video.muted;
  aviso.textContent = video.muted
    ? "🔇 Click para activar sonido"
    : "🔊 Sonido activado";
  video.play();
});
