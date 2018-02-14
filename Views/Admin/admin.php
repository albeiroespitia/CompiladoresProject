<!DOCTYPE html>
<html>
<head>
  	<!-- Compiled and minified CSS -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
 	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">
	<style>
  .active2 a{
     color: #fff;
  }
  .pagination li.active {
    background-color: #16a085;
}
  .active2{
    background-color: #bdc3c7;
   
      }
    </style>
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
	 <center> <li class="titulo">Administracion </li> </center>
      <li class="selected"><a>Señas</a></li>
      <li><a href="preparar.php">Preparar clase</a></li>
     
    </ul>
    </div>

    <div class="col s9" style="margin-top:0%; ">
      <h3>Base de datos de señas</h3>
      <a href="../../index.html" class="cerrar-sesion">Salir</a>
     <a class="waves-effect waves-light btn agregarButton" href="#modal1">Agregar</a>
      <ul id='ul-letras' style="width: 102%;" class="col s12 pagination">
  	    <li class="disabled"><a ><i class="material-icons">chevron_left</i></a></li>
  	    <li id="a" class="active"><a onclick="reload('a',0)">A</a></li>
  	    <li id="b" class="waves-effect"><a onclick="reload('b',0)">B</a></li>
  	    <li id="c" class="waves-effect"><a onclick="reload('c',0)">C</a></li>
  	    <li id="d" class="waves-effect"><a  onclick="reload('d',0)">D</a></li>
  	    <li id="e" class="waves-effect"><a  onclick="reload('e',0)">E</a></li>
  	    <li id="f" class="waves-effect"><a  onclick="reload('f',0)">F</a></li>
  	    <li id="g" class="waves-effect"><a  onclick="reload('g',0)">G</a></li>
  	    <li id="h" class="waves-effect"><a  onclick="reload('h',0)">H</a></li>
  	    <li id="i" class="waves-effect"><a  onclick="reload('i',0)">I</a></li>
  	    <li id="j" class="waves-effect"><a  onclick="reload('j',0)">J</a></li>
  	    <li id="k" class="waves-effect"><a  onclick="reload('k',0)">K</a></li>
  	    <li id="l" class="waves-effect"><a  onclick="reload('l',0)">L</a></li>
  	    <li id="m" class="waves-effect"><a  onclick="reload('m',0)">M</a></li>
  	    <li id="n" class="waves-effect"><a  onclick="reload('n',0)">N</a></li>
  	    <li id="o" class="waves-effect"><a  onclick="reload('o',0)">O</a></li>
  	    <li id="p" class="waves-effect"><a  onclick="reload('p',0)">P</a></li>
  	    <li id="q" class="waves-effect"><a  onclick="reload('q',0)">Q</a></li>
  	    <li id="r" class="waves-effect"><a  onclick="reload('r',0)">R</a></li>
  	    <li id="s" class="waves-effect"><a  onclick="reload('s',0)">S</a></li>
  	    <li id="t" class="waves-effect"><a  onclick="reload('t',0)">T</a></li>
  	    <li id="u" class="waves-effect"><a  onclick="reload('u',0)">U</a></li>
  	    <li id="v" class="waves-effect"><a  onclick="reload('v',0)">V</a></li>
  	    <li id="x" class="waves-effect"><a  onclick="reload('x',0)">X</a></li>
  	    <li id="y" class="waves-effect"><a  onclick="reload('y',0)">Y</a></li>
  	    <li id="z" class="waves-effect"><a  onclick="reload('z',0)">Z</a></li>

  	    <li class="waves-effect"><a><i class="material-icons">chevron_right</i></a></li>
	  </ul>
    <br>
    <div class="col s13"></div>
    
     <table class="tablaDatos">
        <thead>
          <!--
          <center>
       <ul id="ul-indices" class="pagination col s12">
          <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
          <li id="1" class="active2"><a onclick="subindice(0)"href="#!">1</a></li>
          <li id="2" class="waves-effect"><a onclick="subindice(15)">2</a></li>
          <li id="3" class="waves-effect"><a onclick="subindice(30)">3</a></li>
          <li id="4" class="waves-effect"><a onclick="subindice(45)">4</a></li>
          <li id="5" class="waves-effect"><a onclick="subindice(60)">5</a></li>
          <li class="waves-effect"><a"><i class="material-icons">chevron_right</i></a></li>
        </ul>
      </center>
    -->
          <tr>

              <th>ID</th>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Opciones</th>

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