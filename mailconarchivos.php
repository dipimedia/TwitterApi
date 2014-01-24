<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>

<?php

if ($_POST){ 

	$num = md5(time());

	//MAIL BODY
	$body = "
	<html>
	<head>
	<title>Formulario Trabaja con nosotros</title>
	</head>
	<body style='background:#EEE; padding:30px;'>
	<h2 style='color:#767676;'>Trabaja con nosotros</h2>";

	$body .= "
	<strong style='color:#0090C6;'>Nombre: </strong>
	<span style='color:#767676;'>" . $_POST["nombre"] . "</span>";

	$body .= "
	<strong style='color:#0090C6;'>Apellidos: </strong>
	<span style='color:#767676;'>" . $_POST["apellido"] . "</span>";

	$body .= "
	<strong style='color:#0090C6;'>Email: </strong>
	<span style='color:#767676;'>" . $_POST["email"] . "</span>";

	$body .= "
	<strong style='color:#0090C6;'>Teléfono: </strong>
	<span style='color:#767676;'>" . $_POST["telefono"] . "</span>";

	$body .= "</body></html>";

	$_name=$_FILES["filead"]["name"];
	$_type=$_FILES["filead"]["type"];
	$_size=$_FILES["filead"]["size"];
	$_temp=$_FILES["filead"]["tmp_name"]; 

	if( strcmp($_name, "") ) //FILES EXISTS
	{ 
		$fp = fopen($_temp, "rb");
		$file = fread($fp, $_size);
		$file = chunk_split(base64_encode($file)); 

		// MULTI-HEADERS Content-Type: multipart/mixed and Boundary is mandatory.
		$headers = "From: Pagina de Prueba <prueba@prueba.com>\r\n";
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
mail("salcala@medicavial.com.mx", "Prueba" , $body, $headers);

echo "<div class='ok'>
<strong>El formulario se ha enviado correctamente.</strong></div>";

}
?>