<?php 
	
	require_once '../Model/DAO/ImagenDAO.php';

	if(isset($_POST['tipo'])){

		if($_POST['tipo'] == 'listar'){
			$imagenDAO = new ImagenDAO();
			$array_imagenes = $imagenDAO->listarImagenes();
			$html = " ";
			if($array_imagenes != 0){

				foreach ($array_imagenes as $row) {
				$html .= '<tr>
				            <td id="idImagenProducto">'.$row['idImagen'].' </td>
				            <td id="descripcion">'.$row['link'].'</td>
				            <td id="Imagen"><img src="/CompiladoresProject/Galeria/'.$row['link'].'" alt=""></td>
				            <td><a class="editar" href="#modal2"><i class="material-icons">edit</i></a><a class="borrar"><i class="material-icons">delete</i></a></td>
				          </tr>';
				
				}

				echo $html;
			}else{
				echo 'No hay datos';
			}
			

		}

		

		
		if($_POST['tipo'] == 'eliminar'){
			$imagenDAO = new ImagenDAO();
			$idImagenProducto = $_POST['idImagen'];
			$errores = $imagenDAO->borrarImagen($idImagen);
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