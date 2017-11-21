<!DOCTYPE html>
<html>
<head>
  	<!-- Compiled and minified CSS -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
 	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">
	<link rel="stylesheet" type="text/css" href="css/styles.css">
  <link rel="stylesheet" type="text/css" href="../../css/estilo.css">
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
      <li ><a href="admin.php">Señas</a></li>
      <li class="selected"><a>Preparar clase</a></li>
     
    </ul>
    </div>

    <div class="col s9">
      <!-- Contenido -->

    
   <blockquote>
      Transcribe tu clase y prueba como luciría.
    </blockquote>
   
 

     <div class="row">
    <div style="margin-left:25%;" class="col s12 m6">
      <div class="card">
        <div class="card-image">
<center>
          <div class="ws-wrapper">
            <div class="switch">
          
          <label>
            <p> Deletrear las palabras que no encuentre. </p>
            Off
            <input id="deletreo" type="checkbox" checked="true">
            <span class="lever"></span>
            On
          </label>
        </div>
    <ul id="ws-translator">
       
      <li><img src="http://hetah.net/_assets/modules/traductor/img/conector_espera.jpg"/></li>

    </ul>
    <div id="ws-palabras"></div>
  </div>
  <a style="background: #ffffff;" onclick='MostrarDesde(1)' class="btn-floating  waves-effect waves-light teal darken-2"><i class="material-icons">replay</i> </a>
  
</center>
<br>
          <span class="card-title teal-text"><strong>En-Se&ntildeas</strong></span>
          
           <!-- <a id="detener" class="btn-floating halfway-fab waves-effect waves-effect red"><i class="material-icons">stop</i></a> -->
         
        </div>
        <div class="card-content teal darken-1">
          <label for="h-trad-text">Dime algo...</label>
         <textarea id="h-trad-text"  maxlength="140" class="materialize-textarea" style="height: 52px; width: 90%;     color: white;"></textarea>


    <a style="background: #ffffff;" onclick='traducirSpaCol()' class="btn-floating  waves-effect waves-light teal darken-2"><i class="material-icons">translate</i></a>
        </div>
      </div>
    </div>
  </div>
    <blockquote>
      Preparar tu clase, ayudará a que las imagenes carguen más rapido, durante la traducción sincronizada.
    </blockquote>
    </div>

      

</div>


    <script src="js/logica.js"></script>
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>
    <script type="text/javascript" src="js/ajax.js"></script>
    <script type="text/javascript" src="js/initialization.js"></script>
</body>
</html>