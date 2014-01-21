

function homeCtrl($scope, $rootScope , $firebase, twitter){

	

	$scope.tituloT = 'Envia Tweet';
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

function chatCtrl($scope , $firebase, $rootScope){
	
	$rootScope.push = 1;
	$scope.tituloCH = 'Chat'
	$scope.mensajes = $firebase(notificaciones);

	$scope.enviaMsg = function (){

		$scope.mensajes.$add({usuario: $scope.usuario, mensaje: $scope.mensaje});
		$scope.mensaje = '';
		
	}
}

function subeCtrl($scope , $upload){

	$scope.files = [];
	$scope.error = '';

	//listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });

    $scope.envia = function(){
    	console.log($scope.files);

    	
    }

    $scope.onFileSelect = function($files) {
	
	$scope.error = '';

		for (var i = 0; i < $files.length; i++) {

		    var file = $files[0];

		    if (file.type.indexOf('image') == -1) {
		         $scope.error = 'La extension no es de tipo imagen';           
		    }else{
		    	if (file.size > 2097152){
		         $scope.error ='El archivo excede los 2MB dispnibles';
		    	}
		    }
		      
		    
		    $scope.upload = $upload.upload({
		        url: 'api.php?funcion=archivos', //upload.php script, node.js route, or servlet url
		        method: 'POST',
		        // headers: {'headerKey': 'headerValue'}, withCredential: true,
		        data: {dato: 'datos Enviados'},
		        file: file,
		        // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
		        /* set file formData name for 'Content-Desposition' header. Default: 'file' */
		        //fileFormDataName: myFile,
		        /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
		        //formDataAppender: function(formData, key, val){} 
		      }).progress(function(evt) {
		        	console.log('porcentaje: ' + parseInt(100.0 * evt.loaded / evt.total));
		      }).success(function(data, status, headers, config) {
		        	// file is uploaded successfully
		        	console.log(data);
		      });

		}
 	};


}