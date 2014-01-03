<?php

/* ############################################################# *
 * PRUEBA DE LA API DE TWITTER CON ACORTADOR DE URL DESDE BIT.LY *
 * ############################################################# */
 
 /**
 * Para registrar la aplicación y obtener el Consumer key, Consumer secret, OAuth Token y el OAuth Token Secret,
 * dirigirse a http://dev.twitter.com/apps
 */

function status_twitter($noticia,$nombre) {
   /* ######### PARA QUE FUNCIONE ESTA LIBRERIA ES NECESARIO ##########
      ######### TENER ACTIVADA LA EXTENSION CURL EN PHP.INI  ########## */
  require('twitter/twitteroauth.php'); // Ruta donde tenemos en nuestro servidor la librería de Abraham.
  
  define('_CONSUMER_KEY','GSjEfv0ojs3Kj8TZVsQuw'); // Sustituye el segundo parámetro por tu Consumer key.
  define('_CONSUMER_SECRET','X8HDTUTENr7CzPkcv01WEQw5uSOvadzLvcN00ei39529196-e1wOYlV0ddLrizN4ULQr5b9BAUPEACFJ21YI9QzTJg'); // Sustituye el segundo parámetro por tu Consumer secret.
  define('_OAUTH_TOKEN','7'); // Sustituye el segundo parámetro por tu OAuth Token.
  define('_OAUTH_TOKEN_SECRET','17rSBLI42c67nHqDKEt9tuykuffCVsjraFK0bKF2Bulia'); // Sustituye el segundo parámetro por tu OAuth Token Secret.
  
  // Función para acortar URL con bit.ly . Primero debemos registrarnos en http://bit.ly para obtener clave api y usuario
  function bitly($url_larga){
     $tiny = "http://api.bit.ly/v3/shorten?login=AQUI_VA_TU_NOMBRE_DE_USUARIO_EN_BIT_LY&apiKey=AQUI_VA_TU_API_KEY&format=txt&longUrl=".$url_larga;
     $sesion = curl_init();
     curl_setopt($sesion, CURLOPT_URL, $tiny);
     curl_setopt($sesion, CURLOPT_RETURNTRANSFER, 1);
     $url_tiny = curl_exec($sesion);
     curl_close($sesion);
     return($url_tiny);
   }
   
       //$bit = bitly($link); // Reducimos el link con la api de bit.ly
      //$quedan = (140-strlen($noticia))-4; // Calculamos los caracteres restantes que nos quedan para publicar restando los puntos suspensivo
      //$noticia = substr($noticia, 0, $quedan). ' ...' . $bit; // Cortamos el mensaje en caso de que sea muy largo
 
  function getConnectionWithAccessToken() {
    $connection = new TwitterOAuth(_CONSUMER_KEY, _CONSUMER_SECRET,_OAUTH_TOKEN, _OAUTH_TOKEN_SECRET);
    return $connection;
  }
  $connection = getConnectionWithAccessToken();
  //$twitter = $connection->post('statuses/update', array('status' => $noticia));  //Sirve para publicar en twitter
  //$twitter = $connection->post('direct_messages/new', array('screen_name' => $nombre,'text' => $noticia)); //Enviar mensaje Privado
  $twitter = $connection->get('direct_messages');

  return $twitter;  
}



// Comprobamos que existan las variables
if(isset($_POST['noticia'],$_POST['nombre'])) {
   
   // Convertimos texto URL a enlace
   function toLink($text){
      $text = html_entity_decode($text);
      $text = " ".$text;
      $text = eregi_replace('(((f|ht){1}tp://)[-a-zA-Z0-9@:%_\+.~#?&//=]+)','<a href="\\1">\\1</a>', $text);
       $text = eregi_replace('(((f|ht){1}tps://)[-a-zA-Z0-9@:%_\+.~#?&//=]+)','<a href="\\1">\\1</a>', $text);
      $text = eregi_replace('([[:space:]()[{}])(www.[-a-zA-Z0-9@:%_\+.~#?&//=]+)','\\1<a href="http://\\2">\\2</a>', $text);
       $text = eregi_replace('([_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.)+[a-z]{2,3})','<a href="mailto:\\1">\\1</a>', $text);
        return $text;
   }

   // Llamamos a la función para enviar el mensaje y acortar la url larga
    $elres = status_twitter($_POST['noticia'],$_POST['nombre']);
    //$txtRes = toLink($elres);

} 

   
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Actualizar el estado de nuestro espacio en Twitter con PHP + TwitterOAuth</title>
  <style type="text/css">
  #header{
     font-family:Verdana, Geneva, sans-serif;
      color: #C00;
      width: 800px;
      height: 80px;
      text-align: center;
      margin-top: 0;
      margin-right: auto;
      margin-bottom: 0;
      margin-left: auto;
  }

  .txt {
     font-family: Verdana, Geneva, sans-serif;
     font-size: 12px;
     color: #069;
     font-weight: bold;
      margin-bottom: 9px;
  }

  #nota {
     text-align: left;
     margin:-5px 0 5px 0;
     padding: 15px;
      width: 390px;
     border: 1px solid #FF8585;
     background-color: #FBE1DB;

  }

  .nota {
     font-family: Tahoma, Geneva, sans-serif;
     font-size: 12px;
     font-weight: bold;
     background-color: #FFFFFF;
     border: solid 1px #5ea0c1;
     text-align: center;   
     color: #C00;
  }
     
  </style>
</head>

<body>
<div id="header">
<h3>Envio de Mensajes directos</h3>
</div>
    <div id="updateStatus_Twitter">
     <form name="form_UpdateTwitter" method="POST" action="">
      <p>
        <label for="noticia">Nombre de usuario</label></p>
        <input type="text" name="nombre" id="nombre">
      </p>
      <p class="txt">
        <label for="noticia">¿Qué está pasando?</label></p>
        <textarea name="noticia" id="noticia" cols="32" rows="5"></textarea>      
      <p>
        <input type="submit" value="Enviar" />
      </p>
    </form>
    </div>
    
    <br />
<br />
<?php
if(isset($_POST['noticia'])) {      
   echo "Respuesta<br />\n<br />\n<b>" . $elres . "</b>\n<br />";
}else{
    echo "No Hay Tweets por enviar\n<br />";   
}
?>
</body>
</html>