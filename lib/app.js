app = angular.module('twitter', ['ngRoute','ngResource','firebase','angularFileUpload','ngCookies'])

app.config(function($routeProvider){

	$routeProvider.when('/',{
			templateUrl   : 'home.html',
			controller : 'homeCtrl'
			
	});

    $routeProvider.when('/chat',{
            templateUrl   : 'chat.html',
            controller    : 'chatCtrl'
            
    });

    $routeProvider.when('/correo',{
            templateUrl   : 'correo.html',
            controller    : 'CorreoCtrl'
            
    });

	$routeProvider.when('/listamensajes',{
			templateUrl   : 'listamensajes.html',
			controller 	  : 'listaMensajesCtrl'
			
	});

   $routeProvider.when('/login',{
            templateUrl   : 'login.html',
            controller    : 'entraCtrl'
            
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

    $routeProvider.when('/graficas',{
            templateUrl   : 'grafica.html',
            controller    : 'graficaCtrl'
            
    });

	$routeProvider.otherwise({redirectTo:'/login'});

});

var notificaciones = new Firebase("https://inventario.firebaseio.com/notificaciones");

app.run(function ($rootScope , $firebase , auth){

    $rootScope.titulo = 'Test de Api de Twitter';
    $rootScope.cuenta = '@medicoweb';
    $rootScope.push = 0;

    $rootScope.$on('$routeChangeStart', function(){
        //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
        //la cuál hemos inyectado en la acción run de la aplicación
        auth.checkStatus();
    });

    notificaciones.on('child_added',function(dataSnapshot){

        var valor = dataSnapshot.val();
        console.log(valor.mensaje);

    });

});


//factoria que controla la autentificación, devuelve un objeto
//$cookies para crear cookies
//$cookieStore para actualizar o eliminar
//$location para cargar otras rutas

app.factory("auth", function($cookies,$cookieStore,$location, $rootScope)
{
    return{
        login : function(username, password)
        {
            //creamos la cookie con el nombre que nos han pasado
            $cookies.username = username,
            $cookies.password = password;
            $rootScope.username = username;
            //mandamos a la home
            $location.path("/");
        },
        logout : function()
        {
            //al hacer logout eliminamos la cookie con $cookieStore.remove
            $cookieStore.remove("username"),
            $cookieStore.remove("password");
            //mandamos al login
            $location.path("/login");
        },
        checkStatus : function()
        {
            //creamos un array con las rutas que queremos controlar
            var rutasPrivadas = ["/dashboard","/","/chat","/correo","/listamensajes","/login","/login","/seguidores","/sube","/mensaje"];
            if(this.in_array($location.path(),rutasPrivadas) && typeof($cookies.username) == "undefined")
            {
                $location.path("/login");
            }
            //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
            //if(this.in_array("/login",rutasPrivadas) && typeof($cookies.username) != "undefined")
            //{
             //   $location.path("/");
            //}
        },
        in_array : function(needle, haystack)
        {
            var key = '';
            for(key in haystack)
            {
                if(haystack[key] == needle)
                {
                    return true;
                }
            }
            return false;
        }
    }
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
    	},
        enviaTweetMedia:function(mensaje,media){
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

app.directive('ngKeydown', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
             // this next line will convert the string
             // function name into an actual function
             var functionToCall = scope.$eval(attrs.ngKeydown);
             elem.on('keydown', function(e){
                  // on the keydown event, call my function
                  // and pass it the keycode of the key
                  // that was pressed
                  // ex: if ENTER was pressed, e.which == 13
                  functionToCall(e.which);
             });
        }
    };
});







 