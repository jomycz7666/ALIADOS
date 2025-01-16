document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Función para actualizar el carrusel
    function updateCarousel() {
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            resetAutoplay();
        });
    });
    
    // Funciones para el control táctil
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    container.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });
    
    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Mínima distancia para considerar un swipe
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                // Swipe izquierda
                currentIndex = (currentIndex + 1) % totalSlides;
            } else {
                // Swipe derecha
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            }
            updateCarousel();
            resetAutoplay();
        }
    }
    
    // Función para reiniciar el autoplay
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Función para iniciar el autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }, 6000);
    }
    
    // Iniciar autoplay
    startAutoplay();

    // Header functionality
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Show menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    // Hide menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    // Mobile dropdown toggle
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 968) {
                e.preventDefault();
                dropdown.classList.toggle('show-dropdown');
            }
        });
    });

    // Header scroll behavior
    function scrollHeader() {
        const header = document.querySelector('.header');
        const heroSection = document.querySelector('.hero-carousel');
        const heroHeight = heroSection.offsetHeight;
        
        // Mostrar el header después de pasar el hero section
        if (window.scrollY >= heroHeight) {
            header.classList.add('show-header');
        } else {
            header.classList.remove('show-header');
        }
    }
    window.addEventListener('scroll', scrollHeader);

    // Asegurarnos de que el header esté oculto al cargar la página
    const header = document.querySelector('.header');
    header.classList.remove('show-header');
}); 