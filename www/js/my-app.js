  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
            {path: '/juego/', url: 'juego.html',},
            {path: '/fin/', url: 'fin.html',},
            {path: '/index/', url: 'index.html',},
            ]
      
        
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

var jugador1="";
var jugador2="";
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="juego"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
    $$('#muestraJ1').html(jugador1);
    $$('#muestraJ2').html(jugador2);

    //click en celda de puntos
     $$('.numero').on('click', function() {
        fnNumeros(this.id);
     });


})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
    $$('#btnInicio').on('click', fnNombre); 
})

$$(document).on('page:init', '.page[data-name="fin"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
})


function fnNombre () {
    jugador1= $$('#jugador1').val();
    jugador2= $$('#jugador2').val();
    mainView.router.navigate('/juego/');

}


function fnNumeros(id) {  //llamada en (linea 50) onclick .numero
    debugger;
    var valor= id.slice(1);
    valor=parseInt(valor);
    var cant;
    // selector de ppvr q abro, selector para marcar altura, boolean
    app.popover.open(".open-popover" , ".page-current" , "animate");
    //esto va acá adentro para que funcione, no mover! 
    $$('.cantDados').on('click', function() {
       // console.log("presionaste "+this.value);
        cant=this.value;
        ponerPuntos(valor,cant);
        app.popover.close(".popover" , "animate");
    //
    });
}

function ponerPuntos(valor,cant){
   
    console.log("-------------------------------------------------------");
    console.log("valor: "+valor);
    console.log("cant: "+ cant);
    var x = cant*valor;
    console.log("suma de puntos: "+x);
    console.log("-------------------------------------------------------");
}