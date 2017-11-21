<!DOCTYPE html>
<html>
<head>
  	<!-- Compiled and minified CSS -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
 	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">
	<link rel="stylesheet" type="text/css" href="css/styles.css">
	<title>Admin</title>
</head>
<body>

 
    <div id="modal1" class="modal">
        <form action="../../Controller/ControllerImagen.php" id="add-form" method="POST" enctype="multipart/form-data">
        <div class="modal-content">
        <input type="hidden" name="idUser" value="<?=$_SESSION['idUsuario'];?>"></input>
        <div class="row">
              <div class="input-field col s12"><i class="material-icons prefix">account_circle</i>
                <input id="icon_prefix" type="text" name="descripcionI" class="validate" required>
                <label for="icon_prefix">Descripcion de la imagen</label>
              </div>
            </div>
          
             <div class="file-field input-field">
              <div class="btn">
                <span>File</span>
                <input name="uploadFile" type="file">
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text">
              </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="submit" name="inputImage" class="modal-action modal-close waves-effect waves-green btn-flat">Subir</button>
        </div>
        </form>
      </div>

       <div id="modal2" class="modal">
      <div class="modal-content">
        <div class="row">
          <form id="edit-form" action="" method="" class="col s12">
            <div class="row">
              <div class="input-field col s12"><i class="material-icons prefix active">account_circle</i>
                <input id="icon_prefix " type="text" name="nuevoNombre" class="validate" required>
                <label for="icon_prefix" class="active"></label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12"><i class="material-icons prefix active">account_circle</i>
                <input id="icon_prefix " type="text" name="nuevoTelefono" class="validate" required>
                <label for="icon_prefix" class="active"></label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12"><i class="material-icons prefix active">account_circle</i>
                <input id="icon_prefix " type="text" name="nuevoEmail" class="validate" required>
                <label for="icon_prefix" class="active"></label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12 selectCiudadEditar">  
              </div>
            </div>
            <div class="modal-footer">
              <h6 class="error-create"></h6>
              <button id="editButton" type="submit" class="modal-action waves-effect waves-green btn-flat"  name="editButon">Editar</button>
            </div>
          </form>
        </div>
      </div>
    </div>

<div class="row">

  <div class="col s3">
	<ul id="slide-out" class="side-nav fixed">
	  <li class="titulo">Administracion</li>
      <li class="selected"><a>Señas</a></li>
      <li><a href="preparar.php">Preparar clase</a></li>
     
    </ul>
    </div>

    <div class="col s9" style="padding: 5%; margin-top:0%; ">
      <h3>Base de datos de señas</h3>
      <a href="../../index.html" class="cerrar-sesion">Salir</a>
     <a class="waves-effect waves-light btn agregarButton" href="#modal1">Agregar</a>
     <table class="tablaDatos">
        <thead>
          <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Imagen</th>
          </tr>
        </thead>
        <tbody class="cuerpoTabla">
          
        </tbody>
      </table> 
    </div>

     

</div>



	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>
    <script type="text/javascript" src="js/ajax.js"></script>
    <script type="text/javascript" src="js/initialization.js"></script>
</body>
</html>