<?php

	class Conexion{

		protected $db;

		public function Conexion(){
			try{
				$this->db= new PDO('mysql:host=localhost; dbname=enseniasbd','root','');
				$this->db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				$this->db->exec('SET CHARACTER SET utf8');
				//echo 'EXITO!!';
				return $this->db;
			}catch(Exception $e){
				echo 'ERROR EN LA LINEA'. $this->e->getLine();
			}
		}
	}

?>