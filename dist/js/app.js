// Formulario de Contacto
document.addEventListener('DOMContentLoaded', function(){

  const email = {
      email: '',
      asunto: '',
      mensaje: ''
  }


  // seleccionar los elementos del interfaz
  
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const formulario = document.querySelector('#formulario');
  const btnSubmit = document.querySelector('#formulario button[type= "submit"]');
  const btnReset = document.querySelector('#formulario button[type= "reset"]');
  const spinner = document.querySelector('#spinner');

  // Asignar eventos
  inputEmail.addEventListener('input', validar);
  inputAsunto.addEventListener('input', validar);
  inputMensaje.addEventListener('input', validar);

  formulario.addEventListener('submit', enviarEmail);

  btnReset.addEventListener('click', function(e)  {
      e.preventDefault();
      resetFormulario()

  });

  function enviarEmail(e) {
      e.preventDefault();

      spinner.classList.add('flex');
      spinner.classList.remove('hidden');

      setTimeout(() => {
          spinner.classList.remove('flex');
          spinner.classList.add('hidden');
      
          resetFormulario();

          // Crear una alerta
          const alertaExito = document.createElement('P');
          alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercarse');
          alertaExito.textContent = 'mensaje enviado correctamente';

          formulario.appendChild(alertaExito);

          setTimeout(() => {
              alertaExito.remove();

          }, 3000);
      }, 3000);
  }


  function validar(e) {

      if(e.target.value.trim() === '') {
          mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
          email[e.target.name] = '';
          comprobarEmail()
          return;
      }

      if(e.target.id === 'email' && !validarEmail(e.target.value)) {
          mostrarAlerta('El email no es valido', e.target.parentElement);
          email[e.target.name] = '';
          comprobarEmail();
          return;
      };

      limpiarAlerta(e.target.parentElement);

      // Asignar los valores
      email[e.target.name] = e.target.value.trim().toLowerCase();

      // Comprobar el objeto de email
      comprobarEmail()
  }

  function mostrarAlerta(mensaje, referencia) {
      limpiarAlerta(referencia);
      
      // Generar alerta en HTML
      const error = document.createElement('P');
      error.textContent = mensaje;
      error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
      
      // Inyectar el error al formulario
      referencia.appendChild(error);
  }
  // comprueba si ya existe una alerta
  function limpiarAlerta(referencia) {
      const alerta = referencia.querySelector('.bg-red-600')
      if(alerta) {
          alerta.remove();
      }
  }

  function validarEmail(email) {
      const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
      const resultado = regex.test(email);
      return resultado;
  }

  function comprobarEmail() {
      if(Object.values(email).includes('')) {
          btnSubmit.classList.add('opacity-50');
          btnSubmit.disabled = true;
          return;

      }
      btnSubmit.classList.remove('opacity-50');
      btnSubmit.disabled = false;
  }

  function resetFormulario() {
      // reiniciar el objeto
      email.email = '';
      email.asunto = '';
      email.mensaje = '';


      formulario.reset();
      comprobarEmail();
  }


});


// Menu responsive
 // Seleccionar elementos del DOM
 const menuIcon = document.querySelector('.menu-icon');
 const navBar = document.querySelector('.nav-bar');
 const navLinks = document.querySelectorAll('.nav-link');

// Agregar evento click al icono del menú
 menuIcon.addEventListener('click', () => {
   navBar.classList.toggle('show');
});

// Agregar eventos click a los enlaces del menú
 navLinks.forEach(link => {
   link.addEventListener('click', () => {
     navBar.classList.remove('show');
   });
 });

// Ajustar el menú al tamaño de la pantalla
 window.addEventListener('resize', () => {
   if (window.innerWidth > 768) {
     navBar.classList.remove('show');
   }
 });


// animate css
const magicalUnderlines = Array.from(document.querySelectorAll('.underline--magical'));


// HELPER FUNCTIONS

// 1. Get random number in range. Used to get random index from array.
const randNumInRange = max => Math.floor(Math.random() * (max - 1));

// 2. Merge two separate array values at the same index to 
// be the same value in new array.
const mergeArrays = (arrOne, arrTwo) => arrOne
  .map((item, i) => `${item} ${arrTwo[i]}`)
  .join(', ');

// 3. Curried function to add a background to array of elms
const addBackground = (elms) => (color) => {
  elms.forEach(el => {
    el.style.backgroundImage = color;
  });
}
// 4. Function to get data from API
const getData = async(url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
}

// 5. Partial Application of addBackground to always apply 
// background to the magicalUnderlines constant
const addBackgroundToUnderlines = addBackground(magicalUnderlines);

// GRADIENT FUNCTIONS

// 1. Build CSS formatted linear-gradient from API data
const buildGradient = (obj) => `linear-gradient(${obj.direction}, ${mergeArrays(obj.colors, obj.positions)})`;

// 2. Get single gradient from data pulled in array and
// apply single gradient to a callback function
const applyGradient = async(url, callback) => {
  const data = await getData(url);
  const gradient = buildGradient(data[randNumInRange(data.length)]);
  callback(gradient);
}

