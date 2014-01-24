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

  if ($accion == 'archivos') {

      $fname = $_REQUEST["dato"];
      if(isset($_FILES['file'])){
          //The error validation could be done on the javascript client side.
          $errors= array();        
          $file_name = $_FILES['file']['name'];
          $file_size =$_FILES['file']['size'];
          $file_tmp =$_FILES['file']['tmp_name'];
          $file_type=$_FILES['file']['type'];   
          $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
          $extensions = array("jpeg","jpg","png");        
          if(in_array($file_ext,$extensions )=== false){
           $errors[]="image extension not allowed, please choose a JPEG or PNG file.";
          }
          if($file_size > 2097152){
          $errors[]='File size cannot exceed 2 MB';
          }               
          if(empty($errors)==true){
              move_uploaded_file($file_tmp,"imagenes/".$file_name);
              echo $fname . " uploaded file: " . "imagenes/" . $file_name;
          }else{
              echo($errors);
          }
      }

  }

  if ($accion == 'correo') {

      $num = md5(time());
      $nombre  = $_REQUEST["nombre"];
      $mensaje  = $_REQUEST["mensaje"];

      //MAIL BODY
      $body = "
      <html>
      <head>
      <title>Correo de Prueba</title>
      </head>
      <body style='background:#EEE; padding:30px;'>
      <h2 style='color:#767676;'>Trabaja con nosotros</h2>";

      $body .= "
      <strong style='color:#0090C6;'>Nombre: </strong>
      <span style='color:#767676;'>" . $nombre . "</span>
      <br></br>";

      $body .= "
      <strong style='color:#0090C6;'>Mensaje: </strong>
      <span style='color:#767676;'>" . $mensaje . "</span>";

      $body .= "</body></html>";

      //$file_count = $_FILES['file'];

      $tot = count($_FILES['file']['name']);

      echo $tot;

      for ($i=0; $i < 3; $i++) { 

            $tmp_name = $_FILES["file"]["tmp_name"][$i];
            $name = $_FILES["file"]["name"][$i];
            echo("<b>Archivo </b> $key ");
            echo("<br />");
            echo("<b>el nombre original:</b> ");
            echo($name);
            echo("<br />");
            echo("<b>el nombre temporal:</b> \n");
            echo($tmp_name);
            echo("<br />");  

      }
       
       echo "hola";
        /*$_name=$_FILES["file"]["name"];
        $_type=$_FILES["file"]["type"];
        $_size=$_FILES["file"]["size"];
        $_temp=$_FILES["file"]["tmp_name"];*/

      if( strcmp($_name, "") ) //FILES EXISTS
      { 

        $fp = fopen($_temp, "rb");
        $file = fread($fp, $_size);
        $file = chunk_split(base64_encode($file)); 

        // MULTI-HEADERS Content-Type: multipart/mixed and Boundary is mandatory.
        $headers = "From: Pagina de Prueba <hola@hola.com>\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; "; 
        $headers .= "boundary=".$num."\r\n";
        $headers .= "--".$num."\n"; 

        // HTML HEADERS 
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "Content-Transfer-Encoding: 8bit\r\n";
        $headers .= "".$body."\n";
        $headers .= "--".$num."\n"; 

        // FILES HEADERS 
        $headers .= "Content-Type:application/octet-stream "; 
        $headers .= "name=\"".$_name."\"r\n";
        $headers .= "Content-Transfer-Encoding: base64\r\n";
        $headers .= "Content-Disposition: attachment; ";
        $headers .= "filename=\"".$_name."\"\r\n\n";
        $headers .= "".$file."\r\n";
        $headers .= "--".$num."--"; 

      }else { //FILES NO EXISTS

        // HTML HEADERS
        $headers = "From: GME \r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "Content-Transfer-Encoding: 8bit\r\n";
      } 

    // SEND MAIL
    //mail("salcala@medicavial.com.mx", "Prueba" , $body, $headers);


  }
  

?>