function muestraMensjaes(){

	$('#boton').on('click',ObtenMensajes);
}

function ObtenMensajes(){

	$('#respuesta').html( '<p class="loading">cargando...</p>' );
	$.get('api.php',function (data){

		// $.each(data, function(index, value) {
		//     console.log(index + value);
		// })
		var datos = $.parseJSON(data);

		// for (var k in data) {
		//   console.log(data[k]);
		// }

		//console.log(datos);
		$('#respuesta').html('');

		var pagina;

		$.each(datos, function(index, valor) {
		    
			pagina = '';
			pagina += '<div class="list-group">';
			pagina += '<a href="' + valor.id + '" class="list-group-item">';
			pagina += '<img src="' + valor.avatar + '" alt="@"' + valor.de + ' class="img-circle">';
			pagina += '<h4 class="list-group-item-heading">@' + valor.de + '</h4>';
			pagina += '<p class="list-group-item-text">' + valor.texto + '</p></a></div>';

			$('#respuesta').append(pagina);
		});

	});			
	
}

$(document).on('ready', muestraMensjaes);