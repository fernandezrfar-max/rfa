// Menú hamburguesa
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("open");
    const lines = hamburger.querySelectorAll(".line");
    lines.forEach(line => line.classList.toggle("open"));
});

// Scroll animations
const elements = document.querySelectorAll(".animate-on-scroll");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

// Form
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("✅ Gracias por contactarnos. Te responderemos pronto.");
    form.reset();
});

// Fondo animado con partículas
const canvas = document.getElementById("bg-animation");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerWidth; // Corregí esto, debería ser innerHeight si se usa en el CSS body

// Corrigiendo el tamaño del canvas al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.forEach(p => {
        if (p.x > canvas.width) p.x = canvas.width;
        if (p.y > canvas.height) p.y = canvas.height;
    });
});

let particles = [];
for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.fillStyle = "rgba(0,255,255,0.6)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();



document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const loginForm = document.querySelector('.login-form');

    // 1. Funcionalidad Mostrar/Ocultar Contraseña
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            // Cambia el tipo de input entre 'password' y 'text'
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Cambia el icono del ojo
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash'); // Ojo tachado
        });
    }

    // 2. Ejemplo de Manejo de Envío del Formulario (Validación)
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita el envío del formulario por defecto

            // **Aquí es donde agregarías la lógica de validación de credenciales**
            const userOrEmail = document.querySelector('.input-group input[type="text"]').value;
            const password = passwordInput.value;

            console.log('Intento de inicio de sesión con:', { userOrEmail, password });
            
            // Ejemplo de validación simple
            if (userOrEmail.trim() === '' || password.trim() === '') {
                alert('Por favor, ingresa tu usuario/correo y contraseña.');
            } else {
                // Si la validación en el cliente es exitosa, se enviaría la solicitud al servidor
                // alert('Iniciando sesión...');
                // **Aquí iría el código para enviar los datos al servidor (fetch/XMLHttpRequest)**
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Definimos las credenciales esperadas
    const USUARIO_CORRECTO = "ricardofernandez@gmail.com";
    const CLAVE_CORRECTA = "ricardo.!16";

    // Intentamos recuperar los datos de la URL (si venimos de la página de login)
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const password = urlParams.get('password');
    const page = urlParams.get('page');

    // 1. Verificar si estamos en la página de inicio de sesión y enviar datos
    if (page === 'login') {
        if (email === USUARIO_CORRECTO && password === CLAVE_CORRECTA) {
            // Éxito: Redirigir al panel de administrador
            window.location.replace("admin_dashboard.html"); 
        } else if (email || password) {
            // Error: Mostrar mensaje si se enviaron credenciales incorrectas
            alert("Credenciales incorrectas. Inténtalo de nuevo.");
            // Opcional: Redirigir de nuevo a la página de login sin los parámetros de error
            // window.location.replace("login.html");
        }
    } 
    
    // 2. Si estamos en el dashboard sin credenciales simuladas, no hacemos nada (asumiendo que ya pasaron el login)
    // En una app real, aquí se verificaría un token de sesión.
});

// Función para simular el cierre de sesión (redirige a la página de login o principal)
function logout() {
    alert("Cerrando sesión...");
    window.location.replace("login.html"); // Reemplaza con tu página de login real
}

function validateAndSimulateLogin(event) {
    const email = document.querySelector('input[type="text"]').value;
    const password = document.getElementById('password').value;

    // Adjuntamos los valores al formulario antes de enviarlo
    event.currentTarget.action = `admin_dashboard.html?page=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    return true; // Permitir el envío
}