app = angular.module('twitter', ['ngRoute','ngResource','firebase'])

app.config(function($routeProvider){

	$routeProvider.when('/',{
			templateUrl   : 'home.html',
			controller : 'homeCtrl'
			
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

    $routeProvider.when('/chat',{
            templateUrl   : 'chat.html',
            controller    : 'chatCtrl'
            
    });

	$routeProvider.otherwise({redirectTo:'/'});

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