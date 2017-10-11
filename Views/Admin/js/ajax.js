function reload(){
	$.ajax({
		url: '/CompiladoresProject/Controller/ControllerImagen.php',
		data : {tipo : 'listar'},
		type : 'POST',
		success: function(res){
			$('.cuerpoTabla').html(res);
		}
	})
}

$.holdReady(true);
reload();
$.holdReady(false);

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