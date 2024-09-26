/*---------------------------------- MODAL LOGIN-------------------------------- */

// Modal.js

// Obtener elementos
const modal = document.getElementById('authModal');
const triggers = [document.getElementById('loginTrigger1'), document.getElementById('loginTrigger2')];
const closeModal = document.querySelector('.close');

// Abrir modal cuando se haga clic en cualquiera de los activadores
triggers.forEach(trigger => {
    trigger.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar la redirección
        modal.style.display = 'flex'; // Mostrar el modal
    });
});

// Cerrar el modal cuando se hace clic en la 'X'
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Cerrar el modal cuando se hace clic fuera de él
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Función para cambiar entre las secciones de Login y Register
function openTab(evt, sectionName) {
    var i, tabcontent, tablinks;

    // Ocultar todas las secciones
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Quitar la clase 'active' de todas las pestañas
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar la sección seleccionada y añadir la clase 'active' a la pestaña seleccionada
    document.getElementById(sectionName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Mostrar el login por defecto
document.getElementById("loginSection").style.display = "block";

// Función para mostrar/ocultar contraseñas
function togglePassword(id) {
    var input = document.getElementById(id);
    input.type = (input.type === "password") ? "text" : "password";
}



/* -----------------------------REGISTER-------------------------------- */

// Función para guardar los datos de registro
function saveUserData() {
    const userName = document.getElementById('firstName').value;
    const userEmail = document.getElementById('email').value;
    const userPhone = document.getElementById('phone').value;
    const userDNI = document.getElementById('dni').value;
    const userPassword = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Verificar si las contraseñas coinciden
    if (userPassword !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }


    // Guardar datos en localStorage
    localStorage.setItem(userDNI, JSON.stringify({ userName, userEmail, userPhone, userPassword }));
    alert("Registro exitoso.");
    document.getElementById('registerForm').reset();
}

// Manejo del evento de envío del formulario de registro
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío por defecto
    saveUserData(); // Llama a la función para guardar los datos
});






/* -------------------------------LOGIN------------------------------------------ */

// Función para validar el inicio de sesión
function loginUser() {
    const loginDNI = document.getElementById('loginUsername').value; // Solo DNI
    const loginPassword = document.getElementById('loginPassword').value;

    const storedUserData = JSON.parse(localStorage.getItem(loginDNI));

    // Verificar si el usuario existe y si la contraseña es correcta
    if (storedUserData && storedUserData.userPassword === loginPassword) {
        alert("Inicio de sesión exitoso.");
        
        // Guardar el estado de sesión en localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(storedUserData));

        // Mostrar el nombre en los elementos deseados
        document.getElementById('userName1').innerText = storedUserData.userName;
        document.getElementById('userName2').innerText = storedUserData.userName;

       
    } else {
        alert("DNI o contraseña incorrectos.");
    }
}

// Verificar el estado de sesión al cargar la página
window.addEventListener('load', function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);
        document.getElementById('userName1').innerText = userData.userName;
        document.getElementById('userName2').innerText = userData.userName;
    }
});

// Manejo del evento de envío del formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío por defecto
    loginUser(); // Llama a la función para iniciar sesión
});

// Función para cerrar sesión
function logoutUser() {
    localStorage.removeItem('loggedInUser');
    alert("Has cerrado sesión.");
    // Redirigir a la página de inicio o de inicio de sesión
    window.location.href = "/Login"; // Cambia por tu página de destino
}

// Asocia la función de cierre de sesión a un botón o enlace
document.getElementById('logoutButton').addEventListener('click', logoutUser);
