

   
   var PrimeraVez = 0;
   var desde=0;
  var veces = 0;         
  var n =0;
  var cantidad = 0;
  var tradAnt= "";
  var checkb=0;
  var FrameActual = 1;
  $textoarea = $("#h-trad-text");
 $('#ws-btn-esc').bind("click", function(){
  $('#h-trad-text').text('');
  
  }); 
 var texto = '';

 $('#empezar').bind("click", function(){


 $('#empezar').removeClass("teal");
$('#empezar').addClass("red");
 $("#empezar").html("<i class='material-icons'>mic_off</i>"); 
$("#empezar").attr("id","detener");  

// RECONOCIMIETO DE VOZ


        if (annyang) {
            // Let's define our first command. First the text we expect, and then the function it should call
            var ImprimirTexto = function(tag) {
              texto = texto +" "+ tag;
              $textoarea.text(texto);
              traducirSpaCol();
              //MostrarDesde(1);
              Limpiar();
            }
            var Limpiar = function() {
              
              texto = '';
              $textoarea.text('');
              n =0;
               $('#textotraducido').html('');
              cantidad = 0;
              tradAnt= "";
              FrameActual = 1;
              
            };
            var commands = {
                'limpiar': function () {
                    Limpiar();
                },
                '*tag' :
                    ImprimirTexto
                
            };
            annyang.setLanguage('es-CO');
            annyang.addCommands(commands);
            annyang.debug();
            annyang.start({ continuous: false });
        }
          }); 

// Boton detener
  $('#detener').bind("click", function(){
     //annyang.stop();
    $('#detener').removeClass("red");
    $('#detener').addClass("teal");
    $("#detener").html("<i class='material-icons'>play_arrow</i>"); 
    $("#detener").attr("id","empezar"); 
}); 
//SS
/*
        console.log(text);
        $textoarea.text(text);
        traducirSpaCol();
        MostrarDesde(1);*/
  
// FIN NUEVAS FUNCIONES ARTYOM
 // LOGICA DE TEXTO A IMAGEN
  
  
   traducirSpaCol = function(){
   	
   	 checkb=0;
        if($("#deletreo:checkbox:checked").val()) {
        	checkb=1;
        }
   	console.log("Valor del deletreo: "+$("#deletreo:checkbox:checked").val());
   	
	$tradInput = $('#h-trad-text'); // Texto enviado por el usuario
    // validacion
    if (!$tradInput.val().length){
      // $botonLimpiar.click();
      return;
    }
   
    
    // 1. Sanitizo texto    
    // Convierto a minisculas y elimino espacios iniciales y finales
    var tradTxtTmp = $tradInput.val().toLowerCase().replace(/^\s+|\s+$/g,'');
    // Reemplazo acentos
      tradTxtTmp = tradTxtTmp.replace(/(Ã¡)/g,'a');
      tradTxtTmp = tradTxtTmp.replace(/(Ã©)/g,'e');
      tradTxtTmp = tradTxtTmp.replace(/(Ã­)/g,'i');
      tradTxtTmp = tradTxtTmp.replace(/(Ã³)/g,'o');
      tradTxtTmp = tradTxtTmp.replace(/(Ãº)/g,'u');
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
   console.log("Esto va para la peticion: "+tradTxt);

    ajaxTraduccion();
    // LIMPIEZA
    /*
	$textoarea.val('');
	$textoarea.html('');
	$tradInput = "";
*/
	
   }

  ajaxTraduccion = function(){
    console.log("Realizando peticion");
    var request = $.ajax({
     type: "POST",
      url: '../../peticion.php',
     // data: 'txt='+tradTxt,
     data: {txt : tradTxt, check: checkb},

      dataType: "json",
     
    });

    // recibo JSON con traduccion palabra, imagen, gesto-flecha
    request.done( function( $trad ) {  
      
      
    console.log($trad);
      
      
      generarSlideshow($trad);
   tradAnt = $trad + tradAnt;
    

    });

  }
  //Jose
  var imagenprincipal=0;
  generarSlideshow = function($trad){
   

    $slideshow = $('#ws-translator');
    if(imagenprincipal==0){
      $slideshow.html('');
      imagenprincipal=1;
    }
    
    /*$slideshow.hover(function() {
        $("li", this).css('display', 'none');
    });*/ 
      cantidad = $trad.length + $('#ws-translator li').length;
      var inicio = $('#ws-translator li').length;
      var sub=0;
    for (var i=$('#ws-translator li').length; i<cantidad; i++){
    $slideshow.append( "<li id='imagen"+(i+1)+"' style='display: none;'><img id='caja1'  style='margin-top: 0px;' src='../../Galeria/"+$trad[sub]['link']+"'/> </li>" );
    sub++;
   
    }
    console.log("la cantidad es:"+cantidad);
    for (var i in $trad) {
      
        var indice = parseInt(i);
         // console.log("El vector es "+$trad[i]['nombre']);
           $('#ws-palabras').append("<a  style='color: #b91616;' onclick='MostrarDesde("+(inicio+1)+")'> "+ $trad[i]['nombre'] +" <a/>");
           inicio++;
      
    }

    //console.log("el vector es : "+ $trad[0]['nombre']);

    /*
    for (var i=1; i<=cantidad; i++){

    $('#ws-translator').append("<a  onclick='MostrarDesde("+i+")'> "+ $trad[i-1]['nombre'] +" <a/>");
    }*/
    //$('#ws-translator li:last-child').css('display', 'block');
    //var n_hijos = $('#ws-translator li').size();   
    console.log("PrimeraVez:"+PrimeraVez);
    console.log("Numero de li: "+$('#ws-translator li').length);
    if(PrimeraVez==0){
      PrimeraVez=1;
      
      if(desde==0){
      	desde=1;
      }
      MostrarDesde(desde);
      
    }  
   
    } 
     function NoQuedaInvisible(){
    

     }
     function MostrarDesde($i){
      var i = parseInt($i);
       
      BorrarImgVisibles(i); 
      $('#ws-translator li:nth-child('+i+')').css('display', 'block');
      mostrar(parseInt(i));

        if( i < $('#ws-translator li').length || i==1 ){
        setTimeout("MostrarDesde("+(i+1)+")",1350);
      }else{
        NoQuedaInvisible();
        PrimeraVez=0;
        desde=$('#ws-translator li').length + 1;
      }
      
     }
     function BorrarImgVisibles($k){
      if($k<=$('#ws-translator li').length){
        for(var i=1; i<=$('#ws-translator li').length; i++){
          if( $('#ws-translator li:nth-child('+i+')').is(":visible") ){
            $('#ws-translator li:nth-child('+i+')').css('display', 'none');
          }
        }
      }
     }
   function mostrar($i) {
          //console.log($('#ws-translator li').find("img"));     
         
         // console.log("El parametro es: "+($i+1));
          var i = parseInt($i);
          n = n - 240;
          
           $('#imagen'+($i)+' :nth-child(1)').css("margin-top", n+"px");
          
          if(n!=-2880){
            setTimeout("mostrar("+i+")",100);
          }else{
           $('#imagen'+($i)+' :nth-child(1)').css("margin-top", "0px"); 
          n=0;
          }
         
      }

    
