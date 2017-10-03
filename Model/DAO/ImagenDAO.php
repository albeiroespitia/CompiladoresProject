<?php 

	include 'Conexion.php';

	class ImagenDAO extends Conexion{

		public function ImagenDAO(){
			$this->db=parent::Conexion();
		}



		public function listarImagenes(){
			$sql = "SELECT * from imagen";
			$consulta = $this->db->prepare($sql);
			$resultado = $consulta->execute();
			$imagenes = $consulta->fetchall(PDO::FETCH_ASSOC);

			if($imagenes == true){
				return $imagenes;
			}else{
				return 0;
			}

			$consulta->closeCursor();

		}

		public function editarImagen($idImagen,$nombre,$link){
			$sql='UPDATE imagen SET nombre = ?,link = ? WHERE idImagen = ?';
			$consulta = $this->db->prepare($sql);
			$respuesta= $consulta->execute(array($nombre,$link,$idImagen));
			$consulta->closeCursor();

			if($respuesta==true){
				echo 'EDICION EXITOSA!!';
			}else{
				echo 'ERROR AL EDITAR!!';
			}
		}

		public function borrarImagen($idImagen){
			try{
				$sql = "DELETE FROM imagen WHERE idImagen = ?";
				$consulta = $this->db->prepare($sql);
				$resultado = $consulta->execute(array($idImagen));
				return 1;
			}catch (PDOException $e){
				return 0;
			}

			$consulta->closeCursor();

		}


		public function crearImagen($nombre,$link){
			try{
				$sql = "INSERT INTO imagen VALUES(NULL,?,?)";
				$consulta = $this->db->prepare($sql);
				$resultado = $consulta->execute(array($nombre,$link));
				return 1;
			}catch (PDOException $e){
				return 0;
			}

			$consulta->closeCursor();
		}





	}

 ?>