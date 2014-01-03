<?php

require('twitter/twitteroauth.php'); // Ruta donde tenemos en nuestro servidor la librería de Abraham.
  
  define('_CONSUMER_KEY','GSjEfv0ojs3Kj8TZVsQuw'); // Sustituye el segundo parámetro por tu Consumer key.
  define('_CONSUMER_SECRET','X8HDTUTENr7CzPkcv01WEQw5uSOvadzLvcN00ei39529196-e1wOYlV0ddLrizN4ULQr5b9BAUPEACFJ21YI9QzTJg'); // Sustituye el segundo parámetro por tu Consumer secret.
  define('_OAUTH_TOKEN','7'); // Sustituye el segundo parámetro por tu OAuth Token.
  define('_OAUTH_TOKEN_SECRET','17rSBLI42c67nHqDKEt9tuykuffCVsjraFK0bKF2Bulia'); // Sustituye el segundo parámetro por tu OAuth Token Secret.

  function getConnectionWithAccessToken() {
    $connection = new TwitterOAuth(_CONSUMER_KEY, _CONSUMER_SECRET,_OAUTH_TOKEN, _OAUTH_TOKEN_SECRET);
    return $connection;
  }

  //$twitter = $connection->post('statuses/update', array('status' => $noticia));  //Sirve para publicar en twitter
  //$twitter = $connection->post('direct_messages/new', array('screen_name' => $nombre,'text' => $noticia)); //Enviar mensaje Privado

  $connection = getConnectionWithAccessToken();
  $twitter = $connection->get('direct_messages', array('count' => '5'));

  echo json_decode($twitter);

?>