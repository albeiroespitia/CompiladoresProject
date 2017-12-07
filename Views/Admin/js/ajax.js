function reload(letra, desde){

	//Cambiar active ul de letras
	$('.pagination li.active').removeClass("active");
	$("#"+letra).addClass("active");

	//Cambiar active ul de indices
	$('li.active2').removeClass("active2");
	var indice = (parseInt(desde)/15)+1;
	$("#"+indice).addClass("active2");

	$.ajax({
		url: '/CompiladoresProject/Controller/ControllerImagen.php',
		data : {tipo : 'listar', letraI: letra, indice: desde },
		type : 'POST',
		success: function(res){
			$('.cuerpoTabla').html(res);
		}
	})
}

$.holdReady(true);
reload('a',0);
$.holdReady(false);

function subindice(desde){
	reload($('.pagination li.active a').text().toLowerCase(),desde);
	//console.log($('.pagination li.active a').text().toLowerCase());
}


$(document).ready(function() {
	
	

	$('#edit-form').submit(function(e){
		e.preventDefault();
		var nuevoNombreImagen = $('input[name="nuevoNombreImagen"]').val();
		console.log(nuevoNombreImagen);
		$.ajax({
			url: '/CompiladoresProject/Controller/ControllerImagen.php',
			data : {tipo : 'editar', idImagen: pk1 , nombreImagen: nuevoNombreImagen, linkImagen: pk3},
			type : 'POST',
			success: function(res){
				if(res == 'Error'){
					$('.error-create').html('Hubo un error al ingresar la nueva ciudad');
				}else{
					 Materialize.toast('Ciudad editada exitosamente!', 2000) 
					 reload();
					 $('#modal2').modal('close');
					 $('.error-create').html('');
				}

			}
		})
	})

	$(document).on('click', '.borrar' ,function(){	
		console.log
		var idImagen = $(this).closest('tr').find('#idImagenProducto').html();
		$.ajax({
			url: '/CompiladoresProject/Controller/ControllerImagen.php',
			data : {tipo : 'eliminar',idImagen: idImagen},
			type : 'POST',
			success: function(res){
				if(res == 'Error'){
					Materialize.toast('Error al eliminar la ciudad, Verifica que no este siendo usada!', 2000);
				}else{
					Materialize.toast('Imagen eliminada exitosamente!', 2000);
					reload();
				}
			}
		})
	})


	$(document).on('click', '.editar' ,function(){
		    pk1 = $(this).closest('tr').find('#idImagenProducto').html();
		    pk2 = $(this).closest('tr').find('#descripcion').html();
		    pk3 = $(this).closest('tr').find('Imagen').html();

			$('input[name="nuevoNombreImagen"]').val(pk2);
	});










});