var muestraMensjaes = function(){

	$('#boton').on('click',function(){

			$.get('api.php',function (data){

				forEach(id in data)
				{

					console.log(data.id);
				}
				
						
		});

	});
}

$(document).on('ready', muestraMensjaes);