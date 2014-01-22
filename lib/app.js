app = angular.module('twitter', ['ngRoute','ngResource','firebase','angularFileUpload'])

app.config(function($routeProvider){

	$routeProvider.when('/',{
			templateUrl   : 'home.html',
			controller : 'homeCtrl'
			
	});

    $routeProvider.when('/chat',{
            templateUrl   : 'chat.html',
            controller    : 'chatCtrl'
            
    });

	$routeProvider.when('/listamensajes',{
			templateUrl   : 'listamensajes.html',
			controller 	  : 'listaMensajesCtrl'
			
	});

	$routeProvider.when('/mensaje',{
			templateUrl   : 'mensaje.html',
			controller 	  : 'mensajeCtrl'
			
	});

	$routeProvider.when('/mensaje/:user',{
			templateUrl   : 'mensaje.html',
			controller 	  : 'mensajeCtrl'
			
	});

	$routeProvider.when('/seguidores',{
			templateUrl   : 'seguidores.html',
			controller 	  : 'followCtrl'
			
	});

    $routeProvider.when('/sube',{
            templateUrl   : 'subearchivos.html',
            controller    : 'subeCtrl'
            
    });


	$routeProvider.otherwise({redirectTo:'/'});

});

var notificaciones = new Firebase("https://inventario.firebaseio.com/notificaciones");

app.run(function ($rootScope , $firebase){

    $rootScope.titulo = 'Test de Api de Twitter';
    $rootScope.cuenta = '@medicoweb';
    $rootScope.push = 0;

    notificaciones.on('child_added',function(dataSnapshot){

        var valor = dataSnapshot.val();

        console.log(valor.mensaje);

    });

});

app.factory('twitter', function($http){

    return {
    	seguidores:function(){
    		return $http.get('api.php?funcion=seguidores');
    	},

    	amigos:function(){
    		return $http.get('api.php?funcion=amigos');
    	},

    	mensajes:function(){
    		return $http.get('api.php?funcion=mensajes');
    	},

    	enviaMensaje:function(para,contenido){
    		return $http({
    			url :'api.php?funcion=enviaMensaje&nombre='+para+'&mensaje='+contenido,
    			method:'POST'
    		});
    	},
    	enviaTweet:function(mensaje){
    		return $http({
    			url :'api.php?funcion=tweet&noticia='+mensaje,
    			method : 'POST',
    		});
    	}
    }

});

/*app.factory('Seguidores', function($resource){

    return $resource('api.php',{funcion :'seguidores'}, 
    		{
      			query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    		});
  });*/

app.directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0;i<files.length;i++) {
                    //emit event upward
                    scope.$emit("fileSelected", { file: files[i] });
                }                                       
            });
        }
    };
});