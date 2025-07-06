// === GALERÍA DINÁMICA ===
function mostrarInfo(id) {
  document.querySelectorAll('.info-producto').forEach(el => el.style.display = 'none');
  const seleccionado = document.getElementById(id);
  if (seleccionado) {
    seleccionado.style.display = 'block';
    seleccionado.scrollIntoView({ behavior: 'smooth' });
  }
}

// === CATEGORÍAS HORIZONTALES ===
function mostrarInfoCategoria(id) {
  document.querySelectorAll('.info-detalle').forEach(el => {
    el.style.display = 'none';
    el.classList.remove('fadeIn');
  });

  const elemento = document.getElementById(id);
  if (elemento) {
    elemento.style.display = 'block';
    setTimeout(() => {
      elemento.classList.add('fadeIn');
    }, 10);
    elemento.scrollIntoView({ behavior: 'smooth' });
  }
}

// === SLIDER FERRARI ===
let currentSlide = 0;
let intervaloAuto = null;
let usuarioIntervino = false;

function cambiarSlide(direccion) {
  const track = document.getElementById("sliderTrack");
  const slides = document.querySelectorAll(".slider-slide");
  const totalSlides = slides.length;

  currentSlide = (currentSlide + direccion + totalSlides) % totalSlides;
  const offset = -currentSlide * 100;
  track.style.transform = `translateX(${offset}%)`;
}

function iniciarAutoSlider() {
  intervaloAuto = setInterval(() => {
    if (!usuarioIntervino) {
      cambiarSlide(1);
    }
  }, 9000); // Cada 9 segundos
}

function detenerAutoSlider() {
  usuarioIntervino = true;
  clearInterval(intervaloAuto);
}

// === BLOQUES HORIZONTALES TIPO RULETA ===
let direccionBloques = 1; // 1 = derecha, -1 = izquierda
let intervaloScroll = null;
let usuarioIntervinoBloques = false;

function moverBloques() {
  const contenedor = document.querySelector('.bloques-horizontales');
  if (!contenedor) return;

  contenedor.scrollBy({ left: direccionBloques * 520, behavior: 'smooth' });

  if (direccionBloques === 1 && contenedor.scrollLeft + contenedor.clientWidth >= contenedor.scrollWidth - 5) {
    setTimeout(() => {
      contenedor.scrollTo({ left: 0, behavior: 'smooth' });
    }, 700);
  }

  if (direccionBloques === -1 && contenedor.scrollLeft <= 0) {
    setTimeout(() => {
      contenedor.scrollTo({ left: contenedor.scrollWidth, behavior: 'smooth' });
    }, 700);
  }
}

function iniciarScrollBloques() {
  if (intervaloScroll) clearInterval(intervaloScroll);
  intervaloScroll = setInterval(() => {
    if (!usuarioIntervinoBloques) moverBloques();
  }, 5000); // Mover cada 5 segundos
}

function cambiarDireccionBloques(dir) {
  direccionBloques = dir;
  usuarioIntervinoBloques = false; // Permite continuar scroll automático
  moverBloques();
  clearInterval(intervaloScroll);
  iniciarScrollBloques();
}

function detenerScrollBloques() {
  usuarioIntervinoBloques = true;
  clearInterval(intervaloScroll);
}

// === INICIALIZACIÓN GENERAL ===
document.addEventListener("DOMContentLoaded", () => {
  const sliderTrack = document.getElementById("sliderTrack");
  if (sliderTrack) {
    sliderTrack.addEventListener("click", detenerAutoSlider);
    iniciarAutoSlider();
  }

  const contenedor = document.querySelector('.bloques-horizontales');
  if (contenedor) {
    contenedor.addEventListener('click', detenerScrollBloques);
    iniciarScrollBloques();
    contenedor.style.scrollbarWidth = 'none'; // Para Firefox
    contenedor.style.overflow = 'hidden';
  }
});
