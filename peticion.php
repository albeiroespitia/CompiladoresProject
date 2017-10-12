<?php

	function connectDB(){

	   $conexion = mysqli_connect("localhost", "root", "", "enseniasbd");
	 
	    return $conexion;
	}
	function disconnectDB($conexion){

    $close = mysqli_close($conexion);

    return $close;
	}


	function getArraySQL($sql){
    //Creamos la conexión con la función anterior
    $conexion = connectDB();

    //generamos la consulta

    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8
    
    if(!$result = mysqli_query($conexion, $sql)) die(); //si la conexión cancelar programa

    $rawdata = array(); //creamos un array

    //guardamos en un array multidimensional todos los datos de la consulta
    $i=0;

    while($row = mysqli_fetch_array($result))
    {
        $rawdata[$i] = $row;
        $i++;
    }
     disconnectDB($conexion); //desconectamos la base de datos

    return $rawdata; //devolvemos el array
}
	$txt = $_POST['txt']; // Variable post
	//$txt = $_GET['txt'];
	$myArray = [];
	foreach ($txt as &$imagen) {
	$sql = 'SELECT * FROM imagen WHERE nombre = "'.$imagen.'" ';
	
	$myArray =  array_merge($myArray, getArraySQL($sql));
    
	}
	if(empty($myArray)){
	
		
		$ArrayTexto = [];
		foreach ($txt as &$text2) {
		$ArrayTexto = str_split( $text2);
		}

		$myArray = [];	
		foreach ($ArrayTexto as &$imagen) {
			$sql = 'SELECT * FROM imagen WHERE nombre = "'.$imagen.'" ';
			
			$myArray =  array_merge($myArray, getArraySQL($sql));
		    
		}

	}
	echo json_encode($myArray);	
   
?>