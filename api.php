<?php

require('twitter/twitteroauth.php'); // Ruta donde tenemos en nuestro servidor la librería de Abraham.
  
  define('_CONSUMER_KEY','8FyBUlHFwm7Trketnleg'); // Sustituye el segundo parámetro por tu Consumer key.
  define('_CONSUMER_SECRET','KCMxPhKj2r2jitPB0WpVz0Ij1LGGm1MXPmlThTEJ34'); // Sustituye el segundo parámetro por tu Consumer secret.
  define('_OAUTH_TOKEN','2274936284-yOwD67gG0H8TdlWIDC7SB6hgbO2R33hFRy9fIYn'); // Sustituye el segundo parámetro por tu OAuth Token.
  define('_OAUTH_TOKEN_SECRET','5vWewFS7qN7Cl2FcEzqbL9Az8GF70ESRG3FbxHhwvZdQO'); // Sustituye el segundo parámetro por tu OAuth Token Secret.

  function getConnectionWithAccessToken() {
    $connection = new TwitterOAuth(_CONSUMER_KEY, _CONSUMER_SECRET,_OAUTH_TOKEN, _OAUTH_TOKEN_SECRET);
    return $connection;
  }
  
  //$twitter = $connection->post('statuses/update', array('status' => $noticia));  //Sirve para publicar en twitter
  //$twitter = $connection->post('direct_messages/new', array('screen_name' => $nombre,'text' => $noticia)); //Enviar mensaje Privado
  $connection = getConnectionWithAccessToken();
  $resultado = array();
  $general = array();
  $accion = $_REQUEST['funcion'];

  if ($accion == 'mensajes') {

      $twitter = $connection->get('direct_messages');

      //echo json_encode($twitter);
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
    
  }


  if ($accion == 'enviaMensaje') {
      
    $nombre = $_REQUEST['nombre'];
    $mensaje = $_REQUEST['mensaje'];
    $twitter = $connection->post('direct_messages/new', array('screen_name' => $nombre,'text' => $mensaje));
    
    echo json_encode($twitter);

  }

  if ($accion == 'tweet') {
      
      $noticia = $_REQUEST['noticia'];
      $twitter = $connection->post('statuses/update', array('status' => $noticia));

      echo json_encode($twitter);
  }


  if ($accion == 'seguidores') {
      
    $twitter = $connection->get('followers/list');
    $i = 0;

      foreach ($twitter->users as $user) {
        
        $resultado['usuario'] = $user->screen_name;
        $resultado['nombre'] = $user->name;
        $resultado['avatar'] = $user->profile_image_url;
        
        $general[$i] = $resultado;
        $i++;

      }

      echo json_encode($general);

  }

  if ($accion == 'amigos') {
    
    $twitter = $connection->get('friends/list');
    $i = 0;

      foreach ($twitter->users as $user) {
        
        $resultado['usuario'] = $user->screen_name;
        $resultado['nombre'] = $user->name;
        $resultado['avatar'] = $user->profile_image_url;
        
        $general[$i] = $resultado;
        $i++;

      }
    echo json_encode($general);

  }
  

?>