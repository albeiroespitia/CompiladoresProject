String.prototype.replaceLatinChar = function() {
    return output = this.replace(/á|é|í|ó|ú|ñ|ä|ë|ï|ö|ü/ig, function(str, offset, s) {
        var str = str == "á" ? "a" : str == "é" ? "e" : str == "í" ? "i" : str == "ó" ? "o" : str == "ú" ? "u" : str == "ñ" ? "n" : str;
        str = str == "Á" ? "A" : str == "É" ? "E" : str == "Í" ? "I" : str == "Ó" ? "O" : str == "Ú" ? "U" : str == "Ñ" ? "N" : str;
        str = str == "Á" ? "A" : str == "É" ? "E" : str == "Í" ? "I" : str == "Ó" ? "O" : str == "Ú" ? "U" : str == "Ñ" ? "N" : str;
        str = str == "ä" ? "a" : str == "ë" ? "e" : str == "ï" ? "i" : str == "ö" ? "o" : str == "ü" ? "u" : str;
        str = str == "Ä" ? "A" : str == "Ë" ? "E" : str == "Ï" ? "I" : str == "Ö" ? "O" : str == "Ü" ? "U" : str;
        return (str);
    })
}
// logica   
var PrimeraVez = 0;
var desde = 0;
var veces = 0;
var n = 0;
var cantidad = 0;
var tradAnt = "";
var checkb = 0;
var checkdialogos = 0;
var FrameActual = 1;
$textoarea = $("#h-trad-text");
$('#ws-btn-esc').bind("click", function() {
    $('#h-trad-text').text('');
});
var texto = '';
$('#empezar').bind("click", function() {
    $('#empezar').removeClass("teal");
    $('#empezar').addClass("red");
    $("#empezar").html("<i class='material-icons'>mic_off</i>");
    $("#empezar").attr("id", "detener");
    // RECONOCIMIETO DE VOZ
    var Limpiar = function(tag) {
        texto = '';
        $textoarea.text('');
        n = 0;
        $('#textotraducido').html('');
        cantidad = 0;
        tradAnt = "";
        FrameActual = 1;
    }
    if (annyang) {
        // Let's define our first command. First the text we expect, and then the function it should call
        var ImprimirTexto = function(tag) {
            checkb = 0;
            checkdialogos = 0;
            if ($("#deletreo:checkbox:checked").val()) {
                checkb = 1;
            }
            if ($("#msjdialogo:checkbox:checked").val()) {
                checkdialogos = 1;
                console.log("El check cambia a 1");
            }
            if (checkdialogos == 1) {
                Materialize.toast(tag, 3000, 'rounded'); // 'rounded' is the class I'm applying to the toast
            }
            texto = texto + " " + tag;
            $textoarea.text(texto);
            traducirSpaCol();
            //MostrarDesde(1);
            Limpiar();
        }
        var commands = {
            'limpiar': function() {
                desde = 0;
                imagenprincipal = 0;
                PrimeraVez = 0;
                $('#ws-palabras').html('');
                $('#ws-translator').html('<li><img src="http://hetah.net/_assets/modules/traductor/img/conector_espera.jpg"/></li>');
            },
            '*tag': ImprimirTexto
        };
        annyang.setLanguage('es-CO');
        annyang.addCommands(commands);
        annyang.debug();
        annyang.start({
            continuous: false
        });
    }
});
// Boton detener
$('#detener').bind("click", function() {
    //annyang.stop();
    $('#detener').removeClass("red");
    $('#detener').addClass("teal");
    $("#detener").html("<i class='material-icons'>play_arrow</i>");
    $("#detener").attr("id", "empezar");
});
//SS
/*
        console.log(text);
        $textoarea.text(text);
        traducirSpaCol();
        MostrarDesde(1);*/
// FIN NUEVAS FUNCIONES ARTYOM
// LOGICA DE TEXTO A IMAGEN
traducirSpaCol = function() {
    console.log("Valor del deletreo: " + $("#deletreo:checkbox:checked").val());
    $tradInput = $('#h-trad-text'); // Texto enviado por el usuario
    // validacion
    if (!$tradInput.val().length) {
        // $botonLimpiar.click();
        return;
    }
    // 1. Sanitizo texto    
    // Convierto a minisculas y elimino espacios iniciales y finales
    var tradTxtTmp = $tradInput.val().toLowerCase().replace(/^\s+|\s+$/g, '');
    // Reemplazo acentos
    tradTxtTmp = tradTxtTmp.replaceLatinChar();
    tradTxtTmp = tradTxtTmp.replace(/(á)/g, 'a');
    tradTxtTmp = tradTxtTmp.replace(/(é)/g, 'e');
    tradTxtTmp = tradTxtTmp.replace(/(í)/g, 'i');
    tradTxtTmp = tradTxtTmp.replace(/(ó)/g, 'o');
    tradTxtTmp = tradTxtTmp.replace(/(ñ)/g, 'n');
    tradTxtTmp = tradTxtTmp.replace(/(ú)/g, 'u');
    tradTxtTmp = tradTxtTmp.split(/\s+/);
    // 2. Elimino palabras no utilizadas en lengua de signos    
    var tradTxtTmpL = tradTxtTmp.length,
        tradTxtTmp2 = [];
    for (iT = 0; iT < tradTxtTmpL; iT++) {
        if (parseFloat(tradTxtTmp[iT]) || parseFloat(tradTxtTmp[iT]) == 0) { // 3. Limpio y convierto los numeros a texto
            nSub = Math.round(parseFloat(tradTxtTmp[iT]));
            nStr = nSub.toString().replace('.', ''); // xq un numero muy largo lo corta a 1.xxx y lo eleva, tons aca elimino ese .
            if (nStr.length > 7) {
                nSub = nStr.substr(0, 7);
            } //corto el numero
            tradTxtTmp[iT] = nSub + '|' + numeroATexto(nSub);
        }
        if (tradTxtTmp[iT] != '') {
            tradTxtTmp2.push(tradTxtTmp[iT]); // Genero el nuevo array
        }
    }
    tradTxt = tradTxtTmp2;
    console.log("Esto va para la peticion: " + tradTxt);
    ajaxTraduccion();
    // LIMPIEZA
    /*
  $textoarea.val('');
  $textoarea.html('');
  $tradInput = "";
*/
}
numeroATexto = function(num) {
    var n = num.toString(),
        nL = n.length;
    if (nL === 7) {
        n = numMillonATexto(n);
    } //7 1000000 millon
    if (nL === 6) {
        n = numCentenaDeMilesATexto(n);
    } //6 100000  cienmil
    if (nL === 5) {
        n = numDecenaDeMilesATexto(n);
    } //5 10000   diezmil    
    if (nL === 4) {
        n = numMilesATexto(n);
    } //4 1000    millar
    if (nL === 3) {
        n = numCentenaATexto(n);
    } //3 100     centena
    if (nL === 2) {
        n = numDecenaATexto(n);
    } //2 10      decena
    if (nL === 1) {
        n = numUnidadATexto(n);
    } //1 1       unidad
    return n;
};
ajaxTraduccion = function() {
    console.log("Realizando peticion");
    var request = $.ajax({
        type: "POST",
        url: 'peticion.php',
        // data: 'txt='+tradTxt,
        data: {
            txt: tradTxt,
            check: checkb
        },
        dataType: "json",
    });
    // recibo JSON con traduccion palabra, imagen, gesto-flecha
    request.done(function($trad) {
        console.log($trad);
        generarSlideshow($trad);
        tradAnt = $trad + tradAnt;
    });
}
//Jose
var imagenprincipal = 0;
generarSlideshow = function($trad) {
    $slideshow = $('#ws-translator');
    if (imagenprincipal == 0) {
        $slideshow.html('');
        $('#ws-palabras').html('');
        imagenprincipal = 1;
    }
    /*$slideshow.hover(function() {
        $("li", this).css('display', 'none');
    });*/
    cantidad = $trad.length + $('#ws-translator li').length;
    var inicio = $('#ws-translator li').length;
    var sub = 0;
    for (var i = $('#ws-translator li').length; i < cantidad; i++) {
        $slideshow.append("<li id='imagen" + (i + 1) + "' style='display: none;'><img id='caja1'  style='margin-top: 0px;' src='Galeria/" + $trad[sub]['link'] + "'/> </li>");
        sub++;
    }
    console.log("la cantidad es:" + cantidad);
    for (var i in $trad) {
        var indice = parseInt(i);
        // console.log("El vector es "+$trad[i]['nombre']);
        $('#ws-palabras').append("<a  onclick='MostrarDesde(" + (inicio + 1) + ")'> " + $trad[i]['nombre'] + " <a/>");
        inicio++;
    }
    //console.log("el vector es : "+ $trad[0]['nombre']);
    /*
    for (var i=1; i<=cantidad; i++){

    $('#ws-translator').append("<a  onclick='MostrarDesde("+i+")'> "+ $trad[i-1]['nombre'] +" <a/>");
    }*/
    //$('#ws-translator li:last-child').css('display', 'block');
    //var n_hijos = $('#ws-translator li').size();   
    console.log("PrimeraVez:" + PrimeraVez);
    console.log("Numero de li: " + $('#ws-translator li').length);
    if (PrimeraVez == 0) {
        PrimeraVez = 1;
        if (desde == 0) {
            desde = 1;
        }
        MostrarDesde(desde);
    }
}

function NoQuedaInvisible() {}

function MostrarDesde($i) {
    var i = parseInt($i);
    BorrarImgVisibles(i);
    $('#ws-translator li:nth-child(' + i + ')').css('display', 'block');
    mostrar(parseInt(i));
    if (i < $('#ws-translator li').length || i == 1) {
        setTimeout("MostrarDesde(" + (i + 1) + ")", 1350);
    } else {
        NoQuedaInvisible();
        PrimeraVez = 0;
        desde = $('#ws-translator li').length + 1;
    }
}

function BorrarImgVisibles($k) {
    if ($k <= $('#ws-translator li').length) {
        for (var i = 1; i <= $('#ws-translator li').length; i++) {
            if ($('#ws-translator li:nth-child(' + i + ')').is(":visible")) {
                $('#ws-translator li:nth-child(' + i + ')').css('display', 'none');
            }
        }
    }
}

function mostrar($i) {
    //console.log($('#ws-translator li').find("img"));     
    // console.log("El parametro es: "+($i+1));
    var i = parseInt($i);
    n = n - 240;
    $('#imagen' + ($i) + ' :nth-child(1)').css("margin-top", n + "px");
    if (n != -2880) {
        setTimeout("mostrar(" + i + ")", 100);
    } else {
        $('#imagen' + ($i) + ' :nth-child(1)').css("margin-top", "0px");
        n = 0;
    }
}
// Funciones para convertir numero a texto
numUnidadATexto = function(num) { // 0(1)
        var n = num;
        switch (n) {
            case '0':
                n = 'cero';
                break;
            case '1':
                n = 'uno';
                break;
            case '2':
                n = 'dos';
                break;
            case '3':
                n = 'tres';
                break;
            case '4':
                n = 'cuatro';
                break;
            case '5':
                n = 'cinco';
                break;
            case '6':
                n = 'seis';
                break;
            case '7':
                n = 'siete';
                break;
            case '8':
                n = 'ocho';
                break;
            case '9':
                n = 'nueve';
                break;
        }
        return n;
    },
    numDecenaATexto = function(num) { // 00(2)
        var n = num;
        if (parseInt(n) < 20) { // 00-19
            if (parseInt(n) < 10) { // 00-09
                return numUnidadATexto(n[1]);
            } else {
                switch (n) { // 10-19
                    case '10':
                        n = 'diez';
                        break;
                    case '11':
                        n = 'once';
                        break;
                    case '12':
                        n = 'doce';
                        break;
                    case '13':
                        n = 'trece';
                        break;
                    case '14':
                        n = 'catorce';
                        break;
                    case '15':
                        n = 'quince';
                        break;
                    case '16':
                        n = 'dieciseis';
                        break;
                    case '17':
                        n = 'diecisiete';
                        break;
                    case '18':
                        n = 'dieciocho';
                        break;
                    case '19':
                        n = 'diecinueve';
                        break;
                    case '19':
                        n = 'diecinueve';
                        break;
                }
            }
        } else { // 20-99
            var nT;
            switch (n[0]) { // 20,30...90
                case '2':
                    nT = 'veinte';
                    break;
                case '3':
                    nT = 'treinta';
                    break;
                case '4':
                    nT = 'cuarenta';
                    break;
                case '5':
                    nT = 'cincuenta';
                    break;
                case '6':
                    nT = 'sesenta';
                    break;
                case '7':
                    nT = 'setenta';
                    break;
                case '8':
                    nT = 'ochenta';
                    break;
                case '9':
                    nT = 'noventa';
                    break;
            }
            if (parseInt(n[1]) === 0) { // 20,30...90 exacto
                return nT;
            } else { // 21-99
                return nT + '|' + numUnidadATexto(n[1]);
            }
        }
        return n;
    },
    numCentenaATexto = function(num) { // 000(3)
        var n = num;
        if (parseInt(n[0]) === 0) { // 000-099
            return numDecenaATexto(n.substr(1, 2));
        } else {
            var nT;
            switch (n[0]) { // 100,200...900
                case '1':
                    nT = 'cien';
                    break; // este es UN SOLO signo el de cien                
                case '2':
                    nT = 'doscientos';
                    break;
                case '3':
                    nT = 'trecientos';
                    break;
                case '4':
                    nT = 'cuatrocientos';
                    break;
                case '5':
                    nT = 'quinientos';
                    break;
                case '6':
                    nT = 'seiscientos';
                    break;
                case '7':
                    nT = 'setecientos';
                    break;
                case '8':
                    nT = 'ochocientos';
                    break;
                case '9':
                    nT = 'novecientos';
                    break;
            }
        }
        if (parseInt(n[1]) === 0 && parseInt(n[2]) === 0) { // 100,200...900 exacto
            return nT;
        } else { // 101-999
            if (parseInt(n[0]) === 1) {
                return nT + 'to|' + numDecenaATexto(n.substr(1, 2));
            } else {
                return nT + '|' + numDecenaATexto(n.substr(1, 2));
            }
        }
    },
    numMilesATexto = function(num) { // 0000(4)
        var n = num;
        if (parseInt(n[1]) === 0 && parseInt(n[2]) === 0 && parseInt(n[3]) === 0) { // x000
            if (parseInt(n[0]) === 1) { // 1000 exacto
                return 'mil';
            }
            if (parseInt(n[0]) === 2) { // 2000 exacto
                return 'dos mil';
            }
            if (parseInt(n[0]) === 3) { // 3000 exacto
                return 'tres mil';
            }
            if (parseInt(n[0]) === 4) { // 4000 exacto
                return 'cuatro mil';
            }
            if (parseInt(n[0]) === 5) { // 5000 exacto
                return 'cinco mil';
            }
            return numUnidadATexto(n[0]) + '|' + 'miles'; // 6000,7000,8000,9000 exacto
        } else { // 1001-9999
            var nT;
            if (parseInt(n[0]) === 1) { // 0001-1999
                nT = 'mil';
            } else {
                if (parseInt(n[0]) > 1 && parseInt(n[0]) < 6) {
                    nT = numUnidadATexto(n[0]) + ' mil'; //2000-5999
                } else {
                    nT = numUnidadATexto(n[0]) + '|' + 'miles'; //6000-9999
                }
            }
            nT += '|' + numCentenaATexto(n.substr(1, 3)) //1001-9999
            return nT;
        }
    },
    numDecenaDeMilesATexto = function(num) { // 00000(5)
        var n = num,
            nT = numDecenaATexto(n.substr(0, 2)) + '|miles';
        if (parseInt(n[2]) === 0 && parseInt(n[3]) === 0 && parseInt(n[4]) === 0) { // xx000 exacto
            return nT;
        }
        return nT += '|' + numCentenaATexto(n.substr(2, 5));
    },
    numCentenaDeMilesATexto = function(num) { // 000000(6)
        var n = num,
            nT = '';
        if (!(parseInt(n[0]) === 0 && parseInt(n[1]) === 0 && parseInt(n[2]) === 0)) {
            nT = numCentenaATexto(n.substr(0, 3));
            if (parseInt(n[0]) === 0 && parseInt(n[1]) === 0 && parseInt(n[2]) === 1) {
                nT = nT.substr(0, (nT.length - 1));
            }
            nT += '|mil';
        }
        if (parseInt(n[3]) === 0 && parseInt(n[4]) === 0 && parseInt(n[5]) === 0) { // xxx000 exacto
            return nT;
        }
        return nT += '|' + numCentenaATexto(n.substr(3, 6));
    },
    numMillonATexto = function(num) { // 0000000(7)
        var n = num;
        nT = numUnidadATexto(n[0]);
        if (parseInt(n[0]) === 1) {
            nT = nT.substr(0, 2) + '|millon';
        } else {
            nT += '|millones';
        }
        if (parseInt(n[1]) === 0 && parseInt(n[2]) === 0 && parseInt(n[3]) === 0 && parseInt(n[4]) === 0 && parseInt(n[5]) === 0 && parseInt(n[6]) === 0) { // x000000 exacto
            return nT;
        }
        if (!(parseInt(n[1]) === 0 && parseInt(n[2]) === 0 && parseInt(n[3]) === 0)) {
            nT += '|';
        }
        nT += numCentenaDeMilesATexto(n.substr(1, 6));
        return nT;
    };