<?php 
	
	require_once '../Model/DAO/ImagenDAO.php';

	if(isset($_POST['tipo'])){

		if($_POST['tipo'] == 'listar'){
			$imagenDAO = new ImagenDAO();
			$array_imagenes = $imagenDAO->listarImagenes($_POST['letraI'],$_POST['indice']);
			$html = " ";
			$num_indice = $imagenDAO->listarIndices($_POST['letraI']);
			if($num_indice!=0){
				foreach ($num_indice as $row){
					$cantidad=$row['cantidad'];
				}
				$seccion=($cantidad/15);
				$html .= '<tr><td colspan="3" style="text-align:center;">
       							<ul id="ul-indices" class="pagination col s12">
          							<li class="disabled"><a ><i class="material-icons">chevron_left</i></a></li>';
				// para el primero este active
          		$html .= ' <li id="1" class="active2"><a href="#" onclick="subindice(0)" >1</a></li>';
				for ($i=1; $i < $seccion; $i++) { 
					$html .= '<li id="'.($i+1).'"><a href="#" onclick="subindice('.($i*15).')" >'.($i+1).'</a></li>';
					
				}
				$html .= '<li class="waves-effect"><a"><i class="material-icons">chevron_right</i></a></li>
        					</ul>
     						</td></tr>';
			}

			if($array_imagenes != 0){

				foreach ($array_imagenes as $row) {
				$html .= '<tr>
				            <td id="idImagenProducto">'.$row['idImagen'].' </td>
				            <td id="descripcion">'.$row['nombre'].'</td>
				            <td id="Imagen"><li><img src="/CompiladoresProject/Galeria/'.$row['link'].'" alt=""></li></td>
				            <td>
				            <a class="editar" href="#"><i class="material-icons">play_circle_filled</i></a>
				            <a class="editar" href="#modal2"><i class="material-icons">edit</i></a><a class="borrar"><i class="material-icons">delete</i></a></td>
				          </tr>';
				
				}

				echo $html;
			}else{
				echo 'No hay datos';
			}
			

		}
/*
		if($_POST['tipo'] == 'editar'){
			$imagenDAO = new ImagenDAO();
			$idImagen = $_POST['idImagen'];
			$nombreImagen = $_POST['nombre'];
			$linkImagen = $_POST['link']
			$errores = $imagenDAO->editarImagen($idImagen,$nombreImagen,$linkImagen);
			if($errores == 0){
				echo 'Error';
			}
		

		}
		
*/
		
		if($_POST['tipo'] == 'eliminar'){
			$imagenDAO = new ImagenDAO();
			$idImagenProducto = $_POST['idImagen'];
			$errores = $imagenDAO->borrarImagen($idImagenProducto);
			if($errores == 0){
				echo 'Error';
			}
		

		}




	}

	if(isset($_POST['inputImage'])){

    $res=new ImagenDAO();
    $descripcion = $_POST['descripcionI'];


    $nameImage=$_FILES['uploadFile']['name'];

    $ruta= $_SERVER['DOCUMENT_ROOT']."/CompiladoresProject/Galeria/";

    move_uploaded_file($_FILES['uploadFile']['tmp_name'],$ruta.$nameImage);

    $res->crearImagen($descripcion,$nameImage);

    header('Location:../Views/Admin/admin.php');
  }





 ?>