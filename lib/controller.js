function homeCtrl($scope,$rootScope , twitter){

	$scope.tituloT = 'Envia Tweet';
	$rootScope.titulo = 'Test de Api de Twitter';
	$rootScope.cuenta = '@medicoweb';

	
}

function followCtrl($scope , twitter){

	$scope.tituloS = 'Tus Seguidores'
	//$scope.seguidores = Seguidores.query();

	//$http.get('api.php?funcion=seguidores')
	twitter.seguidores().success(function(data){

		$scope.seguidores = data;
	});
	
}

function mensajeCtrl($scope, $routeParams , twitter){

	$scope.tituloM = 'Nuevo Mensaje Privado';

	if ($routeParams.user != '') {

		$scope.usuario = $routeParams.user;
	}else{

		$scope.usuario = '';
	}

	$scope.mensaje = ''; 
}

function listaMensajesCtrl($scope , $http , twitter){

	$scope.tituloLM = 'Mensjaes Privados';
	//$http.get('api.php?funcion=mensajes')

	twitter.mensajes().success(function(data){

		console.log(data);
		$scope.mensajes = data;
	});
}