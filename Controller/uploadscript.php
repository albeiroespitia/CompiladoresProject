<?php 
	
	require_once '../Model/DAO/ImagenDAO.php';
    $res=new ImagenDAO();
    $nombre = $_GET['nombre'];
    $link = $_GET['link'];


    if($res->crearImagen($nombre,$link)==1){
    	echo ' Se ha subido con exito la imagen '.$nombre;
    }else{
    	echo ' No se ha podido subir la imagen '.$nombre;
    }


?>