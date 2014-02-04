

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
	$scope.tituloF = 'A quien Sigues'

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

function entraCtrl( $rootScope , $scope , auth){

	$rootScope.username = '';
	$scope.tituloI = 'Inicio de sesion';

	$scope.login = function(){

        auth.login($scope.username, $scope.password);
    }

}

function chatCtrl($scope , $firebase, $cookies){
	
	$scope.tituloCH = 'Chat'
	$scope.mensajes = $firebase(notificaciones);

	$scope.enviaMsg = function (){

		$scope.mensajes.$add({usuario: $cookies.username, mensaje: $scope.mensaje});
		$scope.mensaje = '';
		
	}

	$scope.presiona = function(keycode){

		if (keycode == 13) {

	      	$scope.enviaMsg();

	    }
	}
}

function subeCtrl($scope , $upload){

	
	$scope.error = '';
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
		        file: file
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

function CorreoCtrl($scope, $upload){
	$scope.tituloC = 'Envio de correo electronico'
	$scope.files = [];
	//listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            console.log(args.file);
            $scope.files.push(args.file);
        });
    });

    $scope.onFileSelect = function($files) {

    	for (var i = 0; i < $files.length; i++) {

    		var file = $files[i];

    		console.log(file);
    		$scope.files.push(file);

    	}
    }


    $scope.enviaCorreo = function($files){

    	//for (var i = 0; i < $scope.files.length; i++) {

		    var file = $scope.files[0];
		      		    
		    $scope.upload = $upload.upload({
		        url: 'api.php?funcion=correo', //upload.php script, node.js route, or servlet url
		        method: 'POST',
		        //headers: { 'Content-Type': false },
		        // headers: {'headerKey': 'headerValue'}, withCredential: true,
		        /*transformRequest: function (data) {
	                var formData = new FormData();
	                //need to convert our json object to a string version of json otherwise
	                // the browser will do a 'toString()' on the object which will result 
	                // in the value '[Object object]' on the server.
	                //formData.append("model", angular.toJson(data.model));
	                //now add all of the assigned files
	                for (var i = 0; i < data.files; i++) {
	                    //add each file to the form data and iteratively name them
	                    formData.append("file" + i, data.files[i]);
	                }

	                return formData;
	            },*/
			    data: {nombre : $scope.nombre , mensaje : $scope.mensaje},
		        file: file
		        //file: $files //upload multiple files, this feature only works in HTML5 FromData browsers
		        /* set file formData name for 'Content-Desposition' header. Default: 'file' */
		        //fileFormDataName: myFile,
		        /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
		        //formDataAppender: function(formData, key, val){} 
		      }).progress(function(evt) {
		        	console.log('porcentaje: ' + parseInt(100.0 * evt.loaded / evt.total));
		      }).success(function(data, status, headers, config) {
		        	// file is uploaded successfully
		        	console.log(data);
		        	console.log(headers);
		      });

		//}

    }


}