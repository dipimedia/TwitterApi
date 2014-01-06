function muestraMensjaes(){

	$('#dm').find('#boton').on('click',ObtenMensajes);
	$('.label').html('0');

	var options = {
						'maxCharacterSize': 140,
						'originalStyle': 'originalTextareaInfo',
						'warningStyle' : 'warningTextareaInfo',
						'warningNumber': 130,
						'displayFormat' : '#input/#max'
				};
	$('textarea').textareaCount(options);

	$('#twettea').on('click',enviatweet);

	$('#enviaMensaje').on('click',enviaMensaje);

	$('#seguidores').on('click',muestraSeguidores);


}

function muestraSeguidores () {

	var home = $('#lista');    
      
	home.html('');

	var barra = '';
	barra += '<div class="progress progress-striped active">';
	barra += '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only">100% Complete</span></div>';
	barra += '</div>';

	home.html( barra );

	$.get('api.php?funcion=seguidores',function (data){

		var datos = $.parseJSON(data);

		//console.log(datos);
		home.html('');

		var pagina;

		if (datos.length > 0 ){

			$.each(datos, function(index, valor) {

			    pagina = '';
				pagina += '<a href="' + valor.usuario + '" class="list-group-item">';
				pagina += '<img src="' + valor.avatar + '" alt="@"' + valor.usuario + ' class="img-circle">';
				pagina += '<h4 class="list-group-item-heading">@' + valor.usuario + '</h4>';
				pagina += '<p class="list-group-item-text">' + valor.nombre + '</p></a>';
				
				home.append(pagina);
			});

		}else{

		    pagina = '';
			pagina += '<h4 class="list-group-item-heading">No se Encontro Ningun Seguidor</h4>';
			home.append(pagina);
		}

	});			
	
}

function enviaMensaje(){

	var nombre = $('#usuario').val();
	var mensaje = $('#mensaje').val();
	var url = 'api.php?funcion=enviaMensaje&nombre=' + nombre + '&mensaje='+ mensaje;

	$.post(url ,function (data){

		console.log(data);

		$('#mensaje').val('');

	});
}

function enviatweet(){

	var noticia = $('#noticia').val();
	var url = 'api.php?funcion=tweet&noticia=' + noticia;

	$.post(url ,function (data){

		console.log(data);

		$('#noticia').val('');

	});

} 

function cuentaLetras(e){

	var letras = $(this).val().split(/\b[\s,\.\-:;]*/).length;

	console.log(letras);

		if (letras > 140) {

			$('.label').html(letras);
			$('.label').addclass('label-danger');

		}else{

			$('.label').removeClass('label-danger');
			$('.label').html(letras);
		};
	
}

function ObtenMensajes(){

var home = $('#respuesta');    
      
	home.html('');

	var barra = '';
	barra += '<div class="progress progress-striped active">';
	barra += '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only">100% Complete</span></div>';
	barra += '</div>';

	home.html( barra );

	$.get('api.php?funcion=mensajes',function (data){

		var datos = $.parseJSON(data);

		//console.log(datos);
		home.html('');

		var pagina;

		if (datos.length > 0 ){

			$.each(datos, function(index, valor) {

			    pagina = '';
				pagina += '<a href="' + valor.id + '" class="list-group-item">';
				pagina += '<img src="' + valor.avatar + '" alt="@"' + valor.de + ' class="img-circle">';
				pagina += '<h4 class="list-group-item-heading">@' + valor.de + '</h4>';
				pagina += '<p class="list-group-item-text">' + valor.texto + '</p></a>';
				
				home.append(pagina);
			});

		}else{

		    pagina = '';
			pagina += '<h4 class="list-group-item-heading">No se Encontro Ningun Mensaje</h4>';
			home.append(pagina);
		}

	});			
	
}

$(document).on('ready', muestraMensjaes);