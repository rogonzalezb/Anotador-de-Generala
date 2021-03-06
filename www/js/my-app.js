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
    routes: [{
        path: '/juego/',
        url: 'juego.html',
      },
      {
        path: '/fin/',
        url: 'fin.html',
      },
      {
        path: '/index/',
        url: 'index.html',
      },
    ],

    // ... other parameters
  });

  var mainView = app.views.create('.view-main');

  // -------------- VARIABLES -------------
  var jugador1 = "Jugador 1";
  var jugador2 = "Jugador 2";
  var valor = "";
  var cant = "";
  var idActual = "";
  var valorFinal = 0;
  var servido = 0;
  var valorFigura = 0;
  var sumaTotal = 0;
  var cantDeCeldas = 0;
  var total1 = 0;
  var total2 = 0;

  // Handle Cordova Device Ready Event
  $$(document).on('deviceready', function() {
    console.log("Device is ready!");
  });

  $$(document).on('page:init', function(e) {
    // Do something here when page loaded and initialized
    console.log(e);
  })


  // ----------- PAGE:INIT --------------

  $$(document).on('page:init', '.page[data-name="index"]', function(e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);

    $$('#btnInicio').on('click', fnNombre);
  })


  $$(document).on('page:init', '.page[data-name="juego"]', function(e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);

    $$('#muestraJ1').html(jugador1);

    $$('#muestraJ2').html(jugador2);

    //click en celda de puntos
    $$('.numero').on('click', function() {
      fnNumeros(this.id);
    });

    //click en popover para seleccionar cantidad de dados
    $$('.cantDados').on('click', function() {
      cant = this.value;
      fnCalcular();
      $$('[id="' + idActual + '"]').html(valorFinal);
      fnTotal(idActual);
      fnFin();
    });

    //click en popover, boton TACHAR, escribe una x
    $$('.tacha').on('click', function() {
      $$('[id="' + idActual + '"]').html('X');
      fnTotal(idActual);
      fnFin();
      app.popover.close(".popover", "animate");
    })

    //click en popover, boton VACIAR, vuelve valor a 0
    $$('.vacia').on('click', function() {
      $$('[id="' + idActual + '"]').html('0');
      fnTotal(idActual);
      fnFin();
      app.popover.close(".popover", "animate");
    })

    //click en los puntos de juegos mayores
    $$('.figura').on('click', function() {
      fnFiguras(this.id);
    });

    //click en popover de juegos mayores, value 1 corresponde a servido
    $$('.tipoJuego').on('click', function() {
      if (this.value == '1') {
        valorFigura += 5;
      }
      if (this.value == '1' && valorFigura == 65) {
        console.log('ganaste todo');
      }
      $$('[id="' + idActual + '"]').html(valorFigura);
      fnTotal(idActual);
      fnFin();
      app.popover.close(".popover", "animate");
    })

    $$('#limpiar').on('click', fnLimpiar);

    $$('#terminar').on('click', fnFinalDelJuego);
  })


  $$(document).on('page:init', '.page[data-name="fin"]', function(e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);

    $$('#j1').html(jugador1 + ": " + total1 + ' puntos.');

    $$('#j2').html(jugador2 + ": " + total2 + ' puntos.');
    total1=parseInt(total1);
    total2=parseInt(total2);
    if (total1 > total2) {
      $$('#ganador1').html("Ganador: " + jugador1 + "!");
      $$('.copa').attr('src', 'img/copa2.png');
    } else if (total1 < total2) {
      $$('#ganador1').html("Ganador: " + jugador2 + "!");
      $$('.copa').attr('src', 'img/copa2.png');
    } else {
      $$('#ganador1').html("No hay ganador");
      $$('.copa').attr('src', 'img/empate.png').addClass('empate').removeClass('copa');
    }
    $$('#volverInicio').on('click', function() {
      fnLimpiar();
      $$('#jugador1').val('');
      $$('#jugador2').val('');
      mainView.router.navigate('/index/');
    })
  })

  // ---------- FUNCIONES -------------

  function fnNombre() { //llamada linea 66
    jugador1 = 'Jugador 1';
    jugador2 = 'Jugador 2';
    if ($$('#jugador1').val() != '') {
      jugador1 = $$('#jugador1').val()
    };
    if ($$('#jugador2').val() != '') {
      jugador2 = $$('#jugador2').val()
    };
    mainView.router.navigate('/juego/');
  }

  function fnNumeros(id) { //llamada en (linea 50) onclick .numero
    valor = id.slice(1);
    valor = parseInt(valor);
    idActual = id;
    // selector de ppvr q abro, selector para marcar altura, boolean
    app.popover.open("[data-popover = 'popUno']", "body", "animate");
  };

  function fnCalcular() { //llamada linea 79
    cant = parseInt(cant);
    console.log('valor ' + valor);
    console.log('cant ' + cant);
    valorFinal = cant * valor;
    console.log(valorFinal);
    app.popover.close(".popover", "animate");
  }

  function fnFiguras(id) { //llamada linea 100
    app.popover.open("[data-popover = 'popDos']", ".page-content", "animate");
    fig = id.slice(1, 3);
    console.log(fig);
    idActual = id;
    switch (fig) {
      case '7':
        valorFigura = 10;
        break
      case '8':
        valorFigura = 20;
        break
      case '9':
        valorFigura = 30;
        break
      case '10':
        valorFigura = 40;
        break
      case '11':
        valorFigura = 60;
        break
      default:
        console.log('entre pero no ando')
    }
  }

  function fnTotal(id) { //llamada linea 111
    var suma = 0;
    sumaTotal = 0;
    equipo = id.slice(0, 1);
    for (var i = 1; i < 12; i++) {
      suma = $$('[id="' + equipo + i + '"]').html();
      if (suma != 'X') {
        suma = parseInt(suma);
        sumaTotal += suma;
      }
    }
    $$('[id="total' + equipo + '"]').html(sumaTotal);
  }

  function fnFin() { //llamada linea 112
    cantDeCeldas = 0;
    for (var i = 1; i < 12; i++) {
      suma = $$('[id="' + '1' + i + '"]').html();
      if (suma != 0) {
        cantDeCeldas += 1;
      }
    }
    for (var i = 1; i < 12; i++) {
      suma = $$('[id="' + '2' + i + '"]').html();
      if (suma != 0) {
        cantDeCeldas += 1;
      }
    }
    if (cantDeCeldas == 22) {
      console.log('ganaste');
      fnFinalDelJuego();
    }
  }

  function fnLimpiar() { //llamada linea 116 y 139
    $$('.numero').html(0);
    $$('.figura').html(0);
    $$('#total1').html(0);
    $$('#total2').html(0);
  }

  function fnFinalDelJuego() { //llamada linea 121
    total1 = $$('#total1').html();
    total2 = $$('#total2').html();
    mainView.router.navigate('/fin/');

  }
