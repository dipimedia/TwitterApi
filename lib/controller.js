function homeCtrl($scope, $rootScope , $firebase, twitter){

	

	$scope.tituloT = 'Envia Tweet';
	$rootScope.titulo = 'Test de Api de Twitter';
	$rootScope.cuenta = '@medicoweb';
	$scope.mensaje = '';

	$scope.enviaTweet = function (){

		twitter.enviaTweet($scope.mensaje).success(function(data){

			console.log(data);
			$scope.mensaje = '';

		});
		
	}
	
}

function followCtrl($scope , twitter){

	$scope.tituloS = 'Tus Seguidores'
	$scope.tituloF = 'A quin Sigues'

	twitter.seguidores().success(function(data){

		$scope.seguidores = data;
	});

	twitter.amigos().success(function(data){

		$scope.amigos = data;
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

	$scope.enviamensaje = function (){

		twitter.enviaMensaje($scope.usuario,$scope.mensaje).success(function(data){
			console.log(data);
			if (data.errors) {
				alert(data.errors.message);
			}else{
				alert('todo Bien');
				$scope.mensajes = '';
			};
			//$scope.mensajes = data;
		});

	}

}

function listaMensajesCtrl($scope , $http , twitter){

	$scope.tituloLM = 'Mensjaes Privados';

	twitter.mensajes().success(function(data){
		$scope.mensajes = data;
	});

}

function chatCtrl($scope , $firebase){

	var notificaciones = new Firebase("https://inventario.firebaseio.com/notificaciones");

	$scope.tituloCH = 'Chat'
	$scope.mensajes = $firebase(notificaciones);

	$scope.enviaMsg = function (){

		$scope.mensajes.$add({usuario: $scope.usuario, mensaje: $scope.mensaje});
		$scope.mensaje = '';
		
	}


	

}