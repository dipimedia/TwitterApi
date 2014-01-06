<?php

require('twitter/twitteroauth.php'); // Ruta donde tenemos en nuestro servidor la librería de Abraham.
  
  define('_CONSUMER_KEY','GSjEfv0ojs3Kj8TZVsQuw'); // Sustituye el segundo parámetro por tu Consumer key.
  define('_CONSUMER_SECRET','X8HDTUTENr7CzPkcv01WEQw5uSOvadzLvcN00eiJg'); // Sustituye el segundo parámetro por tu Consumer secret.
  define('_OAUTH_TOKEN','739529196-e1wOYlV0ddLrizN4ULQr5b9BAUPEACFJ21YI9QzT'); // Sustituye el segundo parámetro por tu OAuth Token.
  define('_OAUTH_TOKEN_SECRET','17rSBLI42c67nHqDKEt9tuykuffCVsjraFK0bKF2Bulia'); // Sustituye el segundo parámetro por tu OAuth Token Secret.

  function getConnectionWithAccessToken() {
    $connection = new TwitterOAuth(_CONSUMER_KEY, _CONSUMER_SECRET,_OAUTH_TOKEN, _OAUTH_TOKEN_SECRET);
    return $connection;
  }

  //$twitter = $connection->post('statuses/update', array('status' => $noticia));  //Sirve para publicar en twitter
  //$twitter = $connection->post('direct_messages/new', array('screen_name' => $nombre,'text' => $noticia)); //Enviar mensaje Privado

  $connection = getConnectionWithAccessToken();
  $twitter = $connection->get('direct_messages');

  //echo json_encode($twitter);

  $resultado = array();
  $general = array();
  $i = 0;

  foreach ($twitter as $tweet) {
    
    $resultado['id'] = $tweet->id;
    $resultado['texto'] = $tweet->text;
    $resultado['de'] = $tweet->sender->screen_name;
    $resultado['avatar'] = $tweet->sender->profile_image_url;
    $resultado['fecha'] = $tweet->created_at;

    $general[$i] = $resultado;
    $i++;

  }

  echo json_encode($general);

?>