<?php 
	
	require_once '../Model/DAO/ImagenProductoDAO.php';

	if(isset($_POST['tipo'])){

		if($_POST['tipo'] == 'listar'){
			$clienteDAO = new ImagenProductoDAO();
			$array_clientes = $clienteDAO->listarImagenes();
			$html = " ";
			if($array_clientes != 0){

				foreach ($array_clientes as $row) {
				$html .= '<tr>
				            <td id="idImagenProducto">'.$row['idImagenProducto'].' </td>
				            <td id="descripcion">'.$row['descripcionI'].'</td>
				            <td id="Imagen"><img src="/ProyectoDB/Galeria/ImagenesProducto/'.$row['imagen'].'" alt=""></td>
				            <td id="idProducto">'.$row['idProducto'].' </td>
				            <td id="nombreProducto">'.$row['nombreP'].' </td>
				            <td><a class="editar" href="#modal2"><i class="material-icons">edit</i></a><a class="borrar"><i class="material-icons">delete</i></a></td>
				          </tr>';
				
				}

				echo $html;
			}else{
				echo 'No hay datos';
			}
			

		}

		if($_POST['tipo'] == 'listarProductos'){
			$clienteDAO = new ImagenProductoDAO();
			$array_clientes = $clienteDAO->listarProductos();
			$html = " ";
			if($array_clientes != 0){

				$html = '<i class="material-icons prefix">account_circle</i>
					<select  id="tipoP" required name="productoP">
						<option value="" disabled selected>Escoje una opcion</option>';
				$contador = 1;
				foreach ($array_clientes as $row){
					$html .= '<option value="'.$row['idProducto'].'">'.$row['nombre'].'</option>';
					$contador++;
				}

				$html .= '</select>
						  <label>Producto</label>';

				echo $html;
			}else{
				echo 'No hay datos';
			}
			

		}

		if($_POST['tipo'] == 'listarProductosEditar'){
			$clienteDAO = new ImagenProductoDAO();
			$array_clientes = $clienteDAO->listarProductos();
			$html = " ";
			if($array_clientes != 0){

				$html = '<i class="material-icons prefix">account_circle</i>
					<select  id="tipoCE" required name="productoPE">
						<option value="" disabled selected>Escoje una opcion</option>';
				$contador = 1;
				foreach ($array_clientes as $row){
					$html .= '<option value="'.$row['idProducto'].'">'.$row['nombre'].'</option>';
					$contador++;
				}

				$html .= '</select>
						  <label>Producto</label>';

				echo $html;
			}else{
				echo 'No hay datos';
			}
			

		}

		if($_POST['tipo'] == 'eliminar'){
			$clienteDAO = new ImagenProductoDAO();
			$idImagenProducto = $_POST['idImagenProducto'];
			$errores = $clienteDAO->borrarImagen($idImagenProducto);
			if($errores == 0){
				echo 'Error';
			}
		

		}


	}


if(isset($_POST['inputImage'])){

    $res=new ImagenProductoDAO();
    $descripcion = $_POST['descripcionI'];
    $productoP = $_POST['productoP'];


    $nameImage=$_FILES['uploadFile']['name'];

    $ruta= $_SERVER['DOCUMENT_ROOT']."/ProyectoDB/Galeria/ImagenesProducto/";

    move_uploaded_file($_FILES['uploadFile']['tmp_name'],$ruta.$nameImage);

    $res->crearImagen($descripcion,$productoP,$nameImage);

    header('Location:../Views/Admin/Views/ImagenProducto/imagenproducto.php');
  }

  if(isset($_POST['inputImageEditar'])){

    $res=new ImagenProductoDAO();
    $idImagen = $_POST['idProducto'];
    $descripcion = $_POST['descripcionEditar'];
    $productoP = $_POST['productoPE'];


    $nameImage=$_FILES['uploadFile']['name'];

    $ruta= $_SERVER['DOCUMENT_ROOT']."/ProyectoDB/Galeria/ImagenesProducto/";

    move_uploaded_file($_FILES['uploadFile']['tmp_name'],$ruta.$nameImage);

    $res->editarImagen($idImagen,$nameImage,$descripcion,$productoP);

    header('Location:../Views/Admin/Views/ImagenProducto/imagenproducto.php');
  }


 ?>