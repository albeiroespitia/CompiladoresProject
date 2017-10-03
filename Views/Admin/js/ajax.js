function reload(){
	$.ajax({
		url: '/ProyectoDB/Controller/ControllerCiudad.php',
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
	
	$('#add-form').submit(function(e){
		e.preventDefault();
		var nombreCiudad = $('input[name="nombreCiudad"]').val();
		$.ajax({
			url: '/ProyectoDB/Controller/ControllerCiudad.php',
			data : {tipo : 'agregar',nombreCiudad: nombreCiudad},
			type : 'POST',
			success: function(res){
				if(res == 'Error'){
					$('.error-create').html('Hubo un error al ingresar la nueva ciudad');
				}else{
					 Materialize.toast('Ciudad creada exitosamente!', 2000) 
					 reload();
					 $('#modal1').modal('close');
					 $('.error-create').html('');
					$('input[name="nombreCiudad"]').val(' ');
				}

			}
		})
	})

	$('#edit-form').submit(function(e){
		e.preventDefault();
		var nuevoNombreCiudad = $('input[name="nuevoNombreCiudad"]').val();
		console.log(nuevoNombreCiudad);
		$.ajax({
			url: '/ProyectoDB/Controller/ControllerCiudad.php',
			data : {tipo : 'editar', idCiudad: pk1 , nombreCiudad: nuevoNombreCiudad},
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
		var idCiudad = $(this).closest('tr').find('#idCiudad').html();
		$.ajax({
			url: '/ProyectoDB/Controller/ControllerCiudad.php',
			data : {tipo : 'eliminar',idCiudad: idCiudad},
			type : 'POST',
			success: function(res){
				if(res == 'Error'){
					Materialize.toast('Error al eliminar la ciudad, Verifica que no este siendo usada!', 2000);
				}else{
					Materialize.toast('Ciudad eliminada exitosamente!', 2000);
					reload();
				}
			}
		})
	})


	$(document).on('click', '.editar' ,function(){
		    pk1 = $(this).closest('tr').find('#idCiudad').html();
		    pk2 = $(this).closest('tr').find('#nombre').html();

			$('input[name="nuevoNombreCiudad"]').val(pk2);
	});










});