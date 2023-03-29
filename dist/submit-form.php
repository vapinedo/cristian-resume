<?php
// Verificar si el formulario ha sido enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  
  // Obtener los valores de los campos del formulario
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];
  
  // Validar los campos
  if (empty($name) || empty($email) || empty($message)) {
    // Si algún campo está vacío, mostrar un mensaje de error
    echo "Por favor, complete todos los campos del formulario.";
  } else {
    // Si todos los campos están completos, enviar el correo electrónico
    $to = "cristianpinedom@gmail.com";
    $subject = "Nuevo mensaje de contacto";
    $body = "Nombre: " . $name . "\nCorreo electrónico: " . $email . "\nMensaje: " . $message;
    $headers = "From: " . $email;
    
    if (mail($to, $subject, $body, $headers)) {
      // Si el correo electrónico se envía correctamente, mostrar un mensaje de éxito
      echo "Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.";
    } else {
      // Si hay un error al enviar el correo electrónico, mostrar un mensaje de error
      echo "Ha ocurrido un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.";
    }
  }
}
?>
