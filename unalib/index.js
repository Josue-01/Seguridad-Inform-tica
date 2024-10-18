module.exports = {
  // Validar si un teléfono es correcto
  is_valid_phone: function (phone) {
      var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;
      return re.test(phone);
  },

  // Validar si el mensaje es una URL de imagen o video
  is_valid_url: function (url) {
      var reImage = /\.(jpeg|jpg|gif|png)$/i;  // Para imágenes
      var reVideo = /\.(mp4|webm|ogg)$/i;  // Para videos
      return reImage.test(url) || reVideo.test(url);
  },

  // Función para validar el mensaje
  validateMessage: function(msg) {
      var obj = JSON.parse(msg);

      // Evitar inyecciones de scripts
      obj.mensaje = obj.mensaje.replace(/</g, "&lt;").replace(/>/g, "&gt;");

      // Validar si el mensaje es una URL de imagen o video
      if (this.is_valid_url(obj.mensaje)) {
          console.log("Es una URL válida de imagen o video!");
      } else {
          console.log("No es una URL válida!");
      }

      return JSON.stringify(obj);
  },

  // Generar código embebido para mostrar imágenes o videos
  getEmbeddedCode: function(content) {
      // Si es una imagen o video, simplemente devuelve el contenido como está
      return content;
  }
};
