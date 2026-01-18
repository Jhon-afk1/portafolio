document.addEventListener('DOMContentLoaded', () => {

    // 1. MENÚ MÓVIL
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    
    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('is-open');
            navToggle.classList.toggle('active');
        });
    }

    // 2. SCROLL SUAVE
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            if (nav && nav.classList.contains('is-open')) {
                nav.classList.remove('is-open');
                navToggle.classList.remove('active');
            }
        });
    });

    // 3. ROTACIÓN DE PALABRAS
    const rotatingWordElement = document.getElementById('rotating-word');
    
    if (rotatingWordElement) {
        const words = ["💡 Intuitivas", "🚀 Escalables", "📊 Basadas en Datos", "🛠️ Funcionales", "♻️ Sostenibles", "🚀 Eficientes", "🎯 Prácticas"];
        let wordIndex = 0;

        function rotateWord() {
            rotatingWordElement.classList.add('fade-out');
            
            setTimeout(() => {
                wordIndex = (wordIndex + 1) % words.length;
                rotatingWordElement.textContent = words[wordIndex];
                rotatingWordElement.classList.remove('fade-out');
            }, 200); 
        }

        setInterval(rotateWord, 2500); 
    }

    // 4. SLIDERS (ALEBRIJE & ECOSTASIS)
    function initSlider(trackId, prevBtnId, nextBtnId) {
        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);

        if (!track || !prevBtn || !nextBtn) return;

        const slides = track.querySelectorAll('.slide');
        let currentSlide = 0;
        let autoPlayInterval;
        let isAutoPlaying = true;

        const updateSlider = () => {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        };

        const startAutoPlay = () => {
            clearInterval(autoPlayInterval);
            isAutoPlaying = true;
            autoPlayInterval = setInterval(nextSlide, 6000); 
        };

        const stopAutoPlay = () => {
            if (isAutoPlaying) {
                clearInterval(autoPlayInterval);
                isAutoPlaying = false;
            }
        };

        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
        });

        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
        });

        track.parentElement.addEventListener('mouseenter', stopAutoPlay);
        track.parentElement.addEventListener('mouseleave', startAutoPlay);

        startAutoPlay();

    }

    initSlider('alebrije-track', 'prev-slide', 'next-slide');
    initSlider('ecostasis-track', 'prev-eco', 'next-eco');
    initSlider('flexsync-track', 'prev-flex', 'next-flex');
    
});

/* ================================================================
   LÓGICA DEL MODAL ALEBRIJE MAX
================================================================ */

// Función para ABRIR el modal
function alertaAlebrije(e) {
    if(e) e.preventDefault(); // Evita el salto de página
    const modal = document.getElementById('modal-alebrije');
    modal.classList.add('active');
}

// Función para CERRAR el modal
function cerrarModal() {
    const modal = document.getElementById('modal-alebrije');
    modal.classList.remove('active');
}

// Cerrar si se hace clic fuera de la cajita (en el fondo oscuro)
document.getElementById('modal-alebrije').addEventListener('click', function(e) {
    if (e.target === this) {
        cerrarModal();
    }
});

/* ================================================================
   LÓGICA DEL MODAL ECOSTASIS
================================================================ */

function alertaEcostasis(e) {
    if(e) e.preventDefault();
    const modal = document.getElementById('modal-ecostasis');
    modal.classList.add('active');
}

function cerrarModalEco() {
    const modal = document.getElementById('modal-ecostasis');
    modal.classList.remove('active');
}

// Cerrar al hacer clic fuera del modal (Fondo oscuro)
document.getElementById('modal-ecostasis').addEventListener('click', function(e) {
    if (e.target === this) {
        cerrarModalEco();
    }
});
/* ================================================================
   LÓGICA DEL MODAL FLEXSYNC
================================================================ */

function alertaFlex(e) {
    if(e) e.preventDefault();
    const modal = document.getElementById('modal-flex');
    modal.classList.add('active');
    
    // Pequeño efecto extra: Animación del ícono
    const icon = modal.querySelector('.modal-icon-flex');
    gsap.fromTo(icon, {rotation: 0}, {rotation: 360, duration: 1, ease: "back.out(1.7)"});
}

function cerrarModalFlex() {
    const modal = document.getElementById('modal-flex');
    modal.classList.remove('active');
}

document.getElementById('modal-flex').addEventListener('click', function(e) {
    if (e.target === this) {
        cerrarModalFlex();
    }
});
