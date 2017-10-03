
// jQuery
var onImagesLoad = function(callback){
	var images = 0,
		check;
	$("img").each(function(key){
		var item = $(this),
			img = new Image();
		images++;
		img.onload = function(){
			images--;
		};
		img.src = item.attr("src");
	});
	check = setInterval(function(){
		if(images === 0){
			callback();
			clearInterval(check);
			return;
		}
	}, 50);
};

// Traductor de Espa~ol a Lengua de Signos-Colombia
// 
// emails: intothenexo (a)hotmail, (a)gmail
// 2012-May-07
//
// WS
// Slideshow Fn's
// 
// initSliderFn           Inicializa el slider
// pauseSliderFn          Pausa el slider
// manualModeSliderFn     Activa el modo manual
// playSliderFn           Reproduce el slider
// replaySliderFn         Rebobina el slider
// slideActualFn          $return $obj slide actual
// slideActualNumFn       Actualiza el numero de slide actual
// actualizarContador     Actualiza el contador texto
// actualizarControles    Actualiza los controles
// actualizarNavegacion   Actualiza la navegacion
// obtenerSlide           $return $obj,$boolean slide a mostrar o false
// mostrarSlide           Muestra el slide
// mostrarCallback        Callback de mostrarSlide (Generador del bucle)
// handleBotonClick       Evento click de botones UI atras, adelante y config
// handleNavClick         Evento click de la navegacion
// generarNavegacion      Genera la navegacion
// eventosUI              Implementa los eventos a los botones
// 
//
// WVS
// Vertical Slideshow Fn's
//
// pauseSliderVerticalFn  Pausa el slider vertical
// rebootSlideVerticalFn  Reinicia el slide vertical
// mostrarSlideVertical   Recibe el slide y valida si se debe animar verticalmente
// infoImagen             Obtiene la informacion de la imagen actual
// animarFrames           Genera la animacion de los frames
// mostrarSymbol          Muestra el simbolo del signo
//
//
// T
// Traductor de Espa~ol a Signos-Colombia Fn's
// 
// actualizarLoader actualiza el lporcentaje del loader
// ajaxTraduccion   Ajax que obtiene la traduccion
// generarSlideshow Genera el slideshow con las imagenes de la traduccion  
// traducirSpaCol   Traduce de Espa~ol a Signos-Colombia
// numeroATexto     Convierte numero a texto
//
$(function(){  
  // WS
  var tiempoEntreSignos = 350, // Tiempo entre slides  
  tiempoFrame = 120, // Tiempo entre frames
  slideActualNum = 0,
  timeout, modoManual = false, pauseSlider = false, contador = false,
  
  $wrapper = $('.ws-wrapper'), 
  
    $loader = $('<div/>',{
      id:'ws-loader',
      text:'0'
    }).appendTo($wrapper),

    $contador = $('<div/>',{
      id:'ws-contador'
    }).insertAfter($wrapper),

    $navegacionWrap = $('<div/>',{
      id:'ws-navegacion',
    }).insertAfter($wrapper),
  
  $slideshow = $('#ws-translator'), 
  
    $gestosWrap = $('<div/>',{
      id:'ws-gestos'
    }).insertAfter($slideshow),

    $botonAtras = $('<div/>',{    
      'class':'ws-controles',
      id:'ws-btnAtras'
    }).insertAfter($slideshow),
    $botonAdelante = $('<div/>',{    
      'class':'ws-controles',
      id:'ws-btnAdelante'
    }).insertAfter($slideshow),    
    $botonReproducir = $('<div/>',{
      'class':'ws-controles',
      id:'ws-btnReproducir'
    }).insertAfter($slideshow),
    $botonRebobinar = $('<div/>',{
      'class':'ws-controles',
      id:'ws-btnRebobinar'
    }).insertAfter($slideshow),

    $botonConfig = $('<div/>',{
      id:'ws-btnConfig'
    }).insertAfter($slideshow),

    $controlesConfig = $('<div/>',{
      'class':'ws-controles-config-wrapper'
    }).insertAfter($slideshow),
      $botonVelLow = $('<div/>',{
        'class':'ws-controles-config',
        id:'ws-btnVelLow'
      }).appendTo($controlesConfig),
      $botonVelMed = $('<div/>',{
        'class':'ws-controles-config config-current',
        id:'ws-btnVelMed'
      }).appendTo($controlesConfig),
      $botonVelMax = $('<div/>',{
        'class':'ws-controles-config',
        id:'ws-btnVelMax'
      }).appendTo($controlesConfig),
  
  $slides, slidesTotal,
  
  // WVS
  imgRelAspecto = 0.75, // Relacion de aspecto de la imagen ej: 4:3 => 0.75
  $img, imgH, imgW,
  frameActual = 0, framesN, frameH,
  timeoutV, pauseSliderVertical = false,
  
  // T
  //ajaxRuta = 'model/traducir.php', // Constante URL de ajax
  ajaxRuta = G_ajaxRuta, // Constante URL de ajax
  //imgRuta = 'img/', // Carpeta de imagenes de la traduccion  
  imgRuta = G_imgRuta, // Carpeta de imagenes de la traduccion
  tradTxt = '', // Texto que se enviara por Ajax
  cantImg = 0, // Cantidad de imagenes de la traduccion recibida
  valorImg = 0, // Valor de cada imagen en porcentaje de progreso
  $tradInput = $('#h-trad-text'), // Texto enviado por el usuario
  inputMaxLetras = 140,
  $urlInput = $('#h-url'),
  //urlBase = 'hetah.net/modules/traductor/',
  urlBase = G_urlBase,
  urlTxt = '',
	tweetTxt = '',
  
  $controlesInput = $('<div/>',{
    'class':'h-controles-input'
  }).insertAfter($tradInput),
    $countdown = $('<div/>',{
      id:'t-countdown',
      text:inputMaxLetras
    }).appendTo($controlesInput),
    $botonLimpiar = $('<div/>',{
      id:'t-btn-clear'
    }).appendTo($controlesInput),
    $botonUrl = $('#t-btn-url'),
    
  //
  // Inicializa el slider
  initSliderFn = function(){
    pauseSlider = false;
    modoManual = false;
    clearTimeout(timeout);
    slideActualNum = 0;
        
    $loader.fadeOut();
    $slides = $slideshow.find('li'),
    slidesTotal = $slides.length,
    // Inicializo el bucle
    mostrarSlide($slides.eq(0));
    
    $('.ws-controles').css('display','block');
    $('#ws-btnRebobinar').css('display','none');
    generarNavegacion();
    actualizarNavegacion();
    actualizarContador();
  },
  
  // Pausa el slider
  pauseSliderFn = function(){
    pauseSlider = true;
    pauseSliderVerticalFn();    
  },

  // Reproduce el slider
  playSliderFn = function(){
    if (!pauseSliderVertical){
      pauseSliderFn();
    }else{
      pauseSlider = false;
      modoManual = false;
        
      var $slideActual = slideActualFn();
    
      mostrarSlide($slideActual);
    }    
  },
  
  // Rebobina el slider
  replaySliderFn = function(){
    pauseSlider = false;
    modoManual = false;
    mostrarSlide($slides.eq(0));    
  },
  
  // Activa el modo manual
  manualModeSliderFn = function(){  
    pauseSliderFn();
    modoManual = true;
  },
  
  // $return $obj slide actual
  slideActualFn = function(){
    return $slides.filter(':visible');
  },
  
  // Actualiza el numero de slide actual
  slideActualNumFn = function(){
    var $slideActual = slideActualFn();
    slideActualNum = $slideActual.prevAll().length;
  },
  
  // Actualiza el contador texto
  actualizarContador = function(){
    slideActualNumFn();

    var num = slideActualNum+1;
    
    if (contador){
      $contador.text(num +' de '+ slidesTotal);
    }
  },
  
  //
  // Actualiza los controles
  actualizarControles = function(){
    $botonAtras.css('display','block');
    $botonAdelante.css('display','block');
    $botonRebobinar.css('display','none');
    
    if (slideActualNum===0){
      $botonAtras.fadeOut();
    }
    if (slideActualNum+1===slidesTotal){
      $botonAdelante.fadeOut();
      $botonRebobinar.fadeIn();
    }
  },
  
  // Actualiza la navegacion
  actualizarNavegacion = function(){
    var $navActual = $navegacionWrap.find('a').eq(slideActualNum);
    //$navActual.removeClass('ui-btn-up-b').addClass('ui-btn-a').siblings().removeClass('ui-btn-a').addClass('ui-btn-up-b');    
    $navActual.removeClass('ui-btn ui-btn-inline ui-btn-corner-all ui-shadow ui-btn-up-b').addClass('i-btn ui-shadow-icon').siblings().removeClass('i-btn ui-shadow-icon').addClass('ui-btn ui-btn-inline ui-btn-corner-all ui-shadow ui-btn-up-b');    
    //$('#t-trad-txt').text($navActual.text());        
  },
  
  // $return $obj,$boolean slide a mostrar o false
  obtenerSlide = function( $slide, direccion ){
    var $returnSlide;
    
    if (!direccion){
      $returnSlide = $slide;
    }else{
      $returnSlide = $slide[direccion]();
    }
    
    if (!$returnSlide.length){
      //log('e: Llego a los limites del slider');
      pauseSliderFn();
      
      $returnSlide = false;
    }    
    return $returnSlide;
  },
  
  // Muestra el slide
  mostrarSlide = function( $slideAMostrar ){
    if (pauseSlider){
      if (!modoManual){
        //log('msg: El slider esta pausado asi que no hago mostrarSlide');
        return;
      }else{
        //log('msg: Detenido y modoManual activado')
      }
    }
    
    $botonReproducir.addClass('ws-btnReproducir-pausa');
    
    $slides.hide();
    $slideAMostrar.css({'display':'block'});
    
    actualizarContador();
    actualizarControles();
    actualizarNavegacion();
    mostrarSymbol();
    
    // Espero a la carga de la imagen
    var $selector = $slideAMostrar.find('img');
    //$($selector).onLoad( function(){
    //  mostrarSlideVertical();
    //});
    onImagesLoad( function(){
      mostrarSlideVertical();
    });
  },
  
  // Callback de mostrarSlide (Generador del bucle) desde SlideVertical
  mostrarCallback = function(){
    pauseSlider = false;
    modoManual = false;
    
    var $slideActual = slideActualFn(),
    $slideAMostrar = obtenerSlide($slideActual, 'next');
    
    if ($slideAMostrar){
      // Timeout para el siguiente slide
      timeout = setTimeout(function(){
        mostrarSlide($slideAMostrar);
      }, tiempoEntreSignos);
    }
  },
  
  // Evento click de botones UI atras, adelante y config
  handleBotonClick = function(e){
    var $this = $(this);
    
    // Controles de configuracion
    if (e.data.config){
      $botonConfig.toggleClass('config-current');
      $controlesConfig.slideToggle(320);
    }
    
    // Controles de velocidad
    if (e.data.velocidad){
      $this.toggleClass('config-current').siblings().removeClass('config-current');
      
      if (e.data.velocidad==='low'){
        tiempoFrame = 190;
        tiempoEntreSignos = 900;
      }
      if (e.data.velocidad==='med'){
        tiempoFrame = 120;
        tiempoEntreSignos = 350;
      }
      if (e.data.velocidad==='max'){
        tiempoFrame = 70;
        tiempoEntreSignos = 50;
      }
    }
    
    // Controles de direccion
    if(e.data.direccion){
      manualModeSliderFn();
      clearTimeout(timeout);
      rebootSlideVerticalFn();

      var $slideActual = slideActualFn(),
      $slideAMostrar = obtenerSlide($slideActual, e.data.direccion);

      if ($slideAMostrar){
        mostrarSlide($slideAMostrar);
      }
    }
  },
  
  // Evento click de la navegacion
  handleNavClick = function(e){
    var $nav = $(this);
    manualModeSliderFn();
    clearTimeout(timeout);
    rebootSlideVerticalFn();
    
    mostrarSlide($slides.eq(e.data.slideIndex));
    
    $nav.addClass('nav-current').siblings().removeClass('nav-current');
  },
  
  // Genera la navegacion
  generarNavegacion = function(){
    $navegacionWrap.css('display','block');
    $slides.each(function( index ){
      var $slide = $(this),
      $spanone = $('<span/>',{
        'class':'ws-nav-spanone ui-btn-inner ui-btn-corner-all',
          text:$slide.find('img').attr('alt')
      }),     
      $nav;
      if ($slide.data('tipoTrad')){
        $nav = $('<a/>',{          
          'class':'ws-trad-spelled ws-trad-'+$slide.data("tipoTrad")+' ui-btn ui-btn-inline ui-btn-corner-all ui-shadow ui-btn-up-b',
          'data-inline':'true',
          'data-role':'button',
          'data-theme':'b'
        });
      }else{      
        $nav = $('<a/>',{
          'class':'ui-btn ui-btn-inline ui-btn-corner-all ui-shadow ui-btn-up-b',
          'data-inline':'true',
          'data-role':'button',
          'data-theme':'b'
        });
      }
      $spanone.appendTo($nav);
      $nav.appendTo($navegacionWrap);

      $nav.bind('click', {slideIndex:index}, handleNavClick);
    });
  },
  
  // Implementa los eventos a los botones
  eventosUI = function(){
    $botonAtras.bind('click', {direccion:'prev'}, handleBotonClick);
    $botonAdelante.bind('click', {direccion:'next'}, handleBotonClick);
    $botonReproducir.bind('click', playSliderFn);
    $botonRebobinar.bind('click', replaySliderFn);
    
    $botonConfig.bind('click', {config:'show'}, handleBotonClick);
    
    $botonVelLow.bind('click', {velocidad:'low'}, handleBotonClick);
    $botonVelMed.bind('click', {velocidad:'med'}, handleBotonClick);
    $botonVelMax.bind('click', {velocidad:'max'}, handleBotonClick);

  },
    
  //***************************************************************************
  // Vertical Slideshow  
  //***************************************************************************

  // Pausa el slider vertical
  pauseSliderVerticalFn = function(){
    pauseSliderVertical = true;
    $botonReproducir.removeClass('ws-btnReproducir-pausa');
  },
  
  // Reinicia el slide vertical
  rebootSlideVerticalFn = function(){
    clearTimeout(timeoutV);
    
    if ($img) {
      $img.css({'marginTop':'0px'});
    }
    frameActual = 0;
  },
  
  // Recibe el slide y valida si se debe animar verticalmente
  mostrarSlideVertical = function(){    
    infoImagen();
    rebootSlideVerticalFn();   
    // Validacion de rigor: Si tiene mas de un frame animo
    if (framesN>1){      
      pauseSliderFn();
      pauseSliderVertical = false;
      animarFrames();
    }
  },
  
  // Obtiene la informacion de la imagen actual
  infoImagen = function(){    
    var $slideActual = slideActualFn();
    $img = $slideActual.find('img');    
    
    imgW = $img.width(),
    imgH = $img.height(),
    frameH = imgW*imgRelAspecto,
    framesN = imgH/frameH;
  },
  
  // Genera la animacion de los frames
  animarFrames = function(){    
    // Si no esta pausado animo
    if (!pauseSliderVertical){
      var FramesPosicion = 0;
      // Si el frameActual es el ultimo termino la animacion
      if (frameActual>=framesN){
        //log('e: V: Frame final');
        pauseSliderVerticalFn();
        rebootSlideVerticalFn();
        
        // Si no estamos en el ultimo slide continuo la reproduccion
        if (slideActualNum+1<slidesTotal){
          //log('msg: V: El slider aun no ha terminado');
          if (!modoManual){
            //log('msg: V: Modo manual off, reanudo slider')
            
            $botonReproducir.addClass('ws-btnReproducir-pausa');
            mostrarCallback();
          }
        }else{
          //log('msg: V: El slider ha llegado ha su fin');
        }
      }else{        
        $botonReproducir.addClass('ws-btnReproducir-pausa');
        FramesPosicion = frameActual*frameH;
        
        $img.css({'marginTop':'-'+FramesPosicion+'px'});
        frameActual++;
      
        timeoutV = setTimeout(function(){
          animarFrames();
        },tiempoFrame)
      }
    }
  },

  // Muestra el simbolo del signo
  mostrarSymbol = function(){    
    var $slideActual = slideActualFn(),
    gesture, x, y;
    
    if ($slideActual.data('gesture')){
      gesture = $slideActual.data('gesture');
      y = (gesture[0]-1) * 50;
      x = (gesture[1]-1) * 50;
      
    }else{      
      y=250;
      x=250;
    }
    
    $gestosWrap.css({
      'background-position':'-'+x+'px -'+y+'px'
    });
  },
  
  //***************************************************************************
  // Traductor
  //***************************************************************************  
  
  // actualizarLoader actualiza el lporcentaje del loader
  actualizarLoader = function(){
    $loader.text( parseInt($loader.text()) + valorImg);
  },
  
  // Ajax que: obtiene la traduccion
  ajaxTraduccion = function(){
    var request = $.ajax({
      type: "POST",
      url: ajaxRuta,
      data: 'txt='+tradTxt,
      dataType: "json"
    });
    
    // recibo JSON con traduccion palabra, imagen, gesto-flecha
    request.done( function( $trad ) {      
      if ($trad==='sinTraduccion'){
        alert('La frase ingresada no posee traducciÃ³n');
        $loader.fadeOut();
        return;
      }
      
      cantImg = $trad.shift();
      valorImg = parseInt(100/cantImg);
      
      $loader.text('0')
      
      $urlInput.val(urlBase+urlTxt);
      //updateTweet({
      //    'url':G_urlBase+urlTxt,
      //    'via':'fundacionhetah',
      //    'text':tweetTxt,
      //    'lang':'es'
      //});
      
      generarSlideshow($trad);
    });
  },  
  
  // Genera el slideshow con las imagenes de la traduccion
  generarSlideshow = function( $trad ){
    // vacio todo
    $slideshow.html('');
    $navegacionWrap.html('');
    rebootSlideVerticalFn();    
    
    var tradL = $trad.length;
    
    for (var i=0; i<tradL; i++){
      var $li
      // Recibo una palabra deletreada (varios signos)
      if ($.isArray($trad[i])){
        var signL = $trad[i].length;
        var checkeado=$("#checkbox-0:checkbox:checked").val();
        if(checkeado) {
            for (var j=0; j<signL; j++){
                $li = $('<li/>',{
                css:{display:'none'}
            });
          
            $li.data({
                'gesture':$trad[i][j].gesture//,
                //'tipoTrad':'spelled' // tipoTrad es usada por el css de la navegacion
            });
          
            /*if (j===0){ // estilos oldies
                $li.data('tipoTrad','spelled-first')
            }
            if (j+1===signL){
                $li.data('tipoTrad','spelled-last')
            }*/
          
            $('<img/>',{
                src:imgRuta+$trad[i][j].img,
                alt:$trad[i][j].word
            }).appendTo($li);

            $li.appendTo($slideshow);
            //$li.onImagesLoad(function(){actualizarLoader();});
            onImagesLoad(function(){actualizarLoader();});
          }
        }
      }else{
        // Recibo una letra o palabra (1 solo signo)
        $li = $('<li/>',{
          css:{display:'none'}
        });
                
        $li.data({
          'gesture':$trad[i].gesture
        });

          $('<img/>',{
            src:imgRuta+$trad[i].img,
            alt:$trad[i].word
          }).appendTo($li);
        
        $li.appendTo($slideshow);
        //$li.onImagesLoad(function(){actualizarLoader();});
        onImagesLoad(function(){actualizarLoader();});
      }      
    }    
    
    // Espero a la carga de la imagen
    //$('#ws-translator li img').onImagesLoad(function(){
     // initSliderFn();
    //});
    onImagesLoad(function(){
      initSliderFn();
    });
  },
  
  // Traduce de Espa~ol a Signos-Colombia
  traducirSpaCol = function(){
    // validacion
    if (!$tradInput.val().length){
      $botonLimpiar.click();
      return;
    }
    
    $loader.fadeIn();
    
    // 1. Sanitizo texto    
    // Convierto a minisculas y elimino espacios iniciales y finales
    var tradTxtTmp = $tradInput.val().toLowerCase().replace(/^\s+|\s+$/g,'');
    
    // Reemplazo acentos
      tradTxtTmp = tradTxtTmp.replace(/(Ã¡)/g,'a');
      tradTxtTmp = tradTxtTmp.replace(/(Ã©)/g,'e');
      tradTxtTmp = tradTxtTmp.replace(/(Ã­)/g,'i');
      tradTxtTmp = tradTxtTmp.replace(/(Ã³)/g,'o');
      tradTxtTmp = tradTxtTmp.replace(/(Ãº)/g,'u');
    
    // Elimino caracteres especiales
    //tradTxtTmp = tradTxtTmp.replace(/[^a-z0-9Ã± ]/g,"");
    //  tradTxtTmp = tradTxtTmp.replace(/[^a-zÃ±0-9 ]/g,"").replace(/^\s+|\s+$/g,'');
    
    //validacion
    if (!tradTxtTmp.length){
      alert('Ingrese caracteres validos');
      $loader.text('100');
      $loader.fadeOut();
      $botonLimpiar.click();
      return;
    }
    
    // Creo el texto para el tweet
    tweetTxt = tradTxtTmp;
    // Creo el texto para la url
    urlTxt = tradTxtTmp.replace(/^\s+|\s+$/g,'').replace(/( )/g,'%20').replace(/(Ã±)/g,'n-');
    
    // Creo array de palabras eliminando multiples espacios
    tradTxtTmp = tradTxtTmp.split(/\s+/);
    
    // 2. Elimino palabras no utilizadas en lengua de signos    
    var tradTxtTmpL = tradTxtTmp.length,
    tradTxtTmp2 = [];
    
    for (iT=0; iT<tradTxtTmpL; iT++){       
      if (parseFloat(tradTxtTmp[iT]) || parseFloat(tradTxtTmp[iT])==0){// 3. Limpio y convierto los numeros a texto
        nSub = Math.round(parseFloat(tradTxtTmp[iT]));
        nStr = nSub.toString().replace('.','');// xq un numero muy largo lo corta a 1.xxx y lo eleva, tons aca elimino ese .
        if (nStr.length>7){nSub = nStr.substr(0,7);} //corto el numero
        tradTxtTmp[iT] = nSub + '|' + numeroATexto(nSub);
      }
      
      if (tradTxtTmp[iT]!=''){
        tradTxtTmp2.push(tradTxtTmp[iT]);// Genero el nuevo array
      }
    }
    
    tradTxt = tradTxtTmp2;
    ajaxTraduccion();    
  },
  
  // Convierte numero a texto
  numeroATexto = function( num ){
    var n = num.toString(),
    nL = n.length;
    
    if (nL===7){n = numMillonATexto(n);}         //7 1000000 millon
    if (nL===6){n = numCentenaDeMilesATexto(n);} //6 100000  cienmil
    if (nL===5){n = numDecenaDeMilesATexto(n);}  //5 10000   diezmil    
    if (nL===4){n = numMilesATexto(n);}          //4 1000    millar
    if (nL===3){n = numCentenaATexto(n);}        //3 100     centena
    if (nL===2){n = numDecenaATexto(n);}         //2 10      decena
    if (nL===1){n = numUnidadATexto(n);}         //1 1       unidad
    
    return n;
  },
  
  numUnidadATexto = function( num ){// 0(1)
    var n = num;
    switch (n){
      case '0':n = 'cero';break;
      case '1':n = 'uno';break;
      case '2':n = 'dos';break;
      case '3':n = 'tres';break;
      case '4':n = 'cuatro';break;
      case '5':n = 'cinco';break;
      case '6':n = 'seis';break;
      case '7':n = 'siete';break;
      case '8':n = 'ocho';break;
      case '9':n = 'nueve';break;
    }
    return n;
  },
  
  numDecenaATexto = function( num ){// 00(2)
    var n = num;
    
    if (parseInt(n)<20){// 00-19
      if (parseInt(n)<10){// 00-09
        return numUnidadATexto(n[1]);
      }else{
        switch (n){// 10-19
          case '10':n = 'diez';break;
          case '11':n = 'once';break;
          case '12':n = 'doce';break;
          case '13':n = 'trece';break;
          case '14':n = 'catorce';break;
          case '15':n = 'quince';break;
          case '16':n = 'dieciseis';break;
          case '17':n = 'diecisiete';break;
          case '18':n = 'dieciocho';break;
          case '19':n = 'diecinueve';break;
          case '19':n = 'diecinueve';break;
        }
      }
    }else{// 20-99
      var nT;
      switch (n[0]){// 20,30...90
        case '2':nT = 'veinte';break;
        case '3':nT = 'treinta';break;
        case '4':nT = 'cuarenta';break;
        case '5':nT = 'cincuenta';break;
        case '6':nT = 'sesenta';break;
        case '7':nT = 'setenta';break;
        case '8':nT = 'ochenta';break;
        case '9':nT = 'noventa';break;
      }
      if (parseInt(n[1])===0){// 20,30...90 exacto
        return nT;
      }else{// 21-99
        return nT + '|' + numUnidadATexto(n[1]);        
      }      
    }
    return n;
  },
  
  numCentenaATexto = function( num ){// 000(3)
    var n = num;
    
    if (parseInt(n[0])===0){// 000-099
      return numDecenaATexto(n.substr(1,2));
    }else{
      var nT;  
      switch (n[0]){// 100,200...900
        case '1':nT = 'cien';break;// este es UN SOLO signo el de cien                
        case '2':nT = 'doscientos';break;
        case '3':nT = 'trecientos';break;
        case '4':nT = 'cuatrocientos';break;
        case '5':nT = 'quinientos';break;
        case '6':nT = 'seiscientos';break;
        case '7':nT = 'setecientos';break;
        case '8':nT = 'ochocientos';break;
        case '9':nT = 'novecientos';break;
      }
    }
    
    if (parseInt(n[1])===0 && parseInt(n[2])===0){// 100,200...900 exacto
      return nT;
    }else{// 101-999
      if (parseInt(n[0])===1){
        return nT + 'to|' + numDecenaATexto(n.substr(1,2));
      }else{
        return nT + '|' + numDecenaATexto(n.substr(1,2));
      }
    }
  },
  
  numMilesATexto= function( num ){// 0000(4)
    var n = num;
    
    if (parseInt(n[1])===0 && parseInt(n[2])===0 && parseInt(n[3])===0){// x000
      if (parseInt(n[0])===1){// 1000 exacto
        return 'mil';
      }
      if (parseInt(n[0])===2){// 2000 exacto
        return 'dos mil';
      }
      if (parseInt(n[0])===3){// 3000 exacto
        return 'tres mil';
      }
      if (parseInt(n[0])===4){// 4000 exacto
        return 'cuatro mil';
      }
      if (parseInt(n[0])===5){// 5000 exacto
        return 'cinco mil';
      }
      return numUnidadATexto(n[0]) + '|' + 'miles';// 6000,7000,8000,9000 exacto
    }else{// 1001-9999
      var nT;
      if (parseInt(n[0])===1){// 0001-1999
        nT = 'mil';
      }else{
        if (parseInt(n[0])>1 && parseInt(n[0])<6){
          nT = numUnidadATexto(n[0]) + ' mil';//2000-5999
        }else{
          nT = numUnidadATexto(n[0]) + '|' + 'miles';//6000-9999
        }
      }
      nT += '|' + numCentenaATexto(n.substr(1,3))//1001-9999
      
      return nT;
    }
  },
  
  numDecenaDeMilesATexto = function( num ){// 00000(5)
    var n = num,
    nT = numDecenaATexto(n.substr(0,2)) + '|miles';
    
    if (parseInt(n[2])===0 && parseInt(n[3])===0 && parseInt(n[4])===0){// xx000 exacto
      return nT;
    }
    return nT += '|' + numCentenaATexto(n.substr(2,5));    
  },
  
  numCentenaDeMilesATexto = function( num ){// 000000(6)
    var n = num,
    nT='';
    
    if (!(parseInt(n[0])===0 && parseInt(n[1])===0 && parseInt(n[2])===0)){
      nT = numCentenaATexto(n.substr(0,3));
      if (parseInt(n[0])===0 && parseInt(n[1])===0 && parseInt(n[2])===1){
        nT = nT.substr(0,(nT.length-1));
      }
      nT += '|mil';
    }
    
    if (parseInt(n[3])===0 && parseInt(n[4])===0 && parseInt(n[5])===0){// xxx000 exacto
      return nT;
    }
    
    return nT += '|' + numCentenaATexto(n.substr(3,6));
  },
  
  numMillonATexto= function( num ){// 0000000(7)
    var n = num;
    nT = numUnidadATexto(n[0]);
    
    if (parseInt(n[0])===1){
      nT = nT.substr(0, 2) + '|millon';
    }else{
      nT += '|millones';
    }
    
    if(parseInt(n[1])===0 && parseInt(n[2])===0 && parseInt(n[3])===0 &&
        parseInt(n[4])===0 && parseInt(n[5])===0 && parseInt(n[6])===0){// x000000 exacto
      return nT;
    }
    
    if (!(parseInt(n[1])===0 && parseInt(n[2])===0 && parseInt(n[3])===0)){
      nT += '|';
    }
    nT += numCentenaDeMilesATexto(n.substr(1, 6));
    return nT;
  };  
    
  // Evento boton traducir
  $('#ws-btn-trad').bind("click", function(){
    _gaq.push(['_trackEvent', 'traducir']);
    traducirSpaCol();    
    $( 'body' ).animate( {scrollTop:0}, 100);
  });	
  
  // Evento boton limpiar
  $botonLimpiar.bind("click", function(){
    $tradInput.val('').focus();
  });
   
  $('#limpiar').bind("click", function(){
    $tradInput.val('').focus();
   });

  // Evento boton URL
  $botonUrl.bind("click", function(){
    $urlInput.toggle().focus();
  });
  
  // Evento input URL
  $urlInput.bind('click',function(){
    this.select();
  });

  // Evento input
  $tradInput.keyup(function() {
    var inputL = $tradInput.val().length,
    inputR = inputMaxLetras - inputL;
    $countdown.html(inputR);
  })
  .keypress(function(e){
    if(e.which == 13){
      e.preventDefault();
      _gaq.push(['_trackEvent', 'traducir']);
      $('#ws-btn-trad').click();
      $( 'body' ).animate( {scrollTop:0}, 100);
    }
  })
  .attr("maxlength", inputMaxLetras);
    
  eventosUI();  
});

    
var log = function( arg ){
 console.log( arg );
}

