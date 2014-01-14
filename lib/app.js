app = angular.module('twitter', ['ngRoute','ngResource'])

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

	$routeProvider.otherwise({redirectTo:'/'});

});


app.factory('twitter', function($http){

    return {
    	seguidores:function(){
    		return $http.get('api.php?funcion=seguidores');
    	},

    	mensajes:function(){
    		return $http.get('api.php?funcion=mensajes');
    	}
    }
  });

/*app.factory('Seguidores', function($resource){

    return $resource('api.php',{funcion :'seguidores'}, 
    		{
      			query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    		});
  });*/