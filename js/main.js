function onReady(){

	var options = {
						'maxCharacterSize': 140,
						'originalStyle': 'originalTextareaInfo',
						'warningStyle' : 'warningTextareaInfo',
						'warningNumber': 100,
						'displayFormat' : '#input/#max'
				};

	$('#noticia').textareaCount(options);
	$('#mensaje').textareaCount(options);
	

}

$(document).on('ready', muestraMensjaes);