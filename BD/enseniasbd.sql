-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-11-2017 a las 22:36:14
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `enseniasbd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagen`
--

CREATE TABLE `imagen` (
  `idImagen` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `link` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `imagen`
--

INSERT INTO `imagen` (`idImagen`, `nombre`, `link`) VALUES
(8, 'Hola', 'Hola.jpg'),
(9, 'A', 'A.jpg'),
(10, 'B', 'B.jpg'),
(11, 'C', 'C.jpg'),
(12, 'D', 'D.jpg'),
(13, 'E', 'E.jpg'),
(14, 'Estudiante', 'Estudiante.jpg'),
(15, 'F', 'F.jpg'),
(16, 'G', 'G.jpg'),
(17, 'H', 'H.jpg'),
(18, 'I', 'I.jpg'),
(19, 'J', 'J.jpg'),
(20, 'K', 'K.jpg'),
(21, 'L', 'L.jpg'),
(23, 'M', 'M.jpg'),
(24, 'N', 'N.jpg'),
(25, 'Ñ', 'Ñ.jpg'),
(26, 'O', 'O.jpg'),
(27, 'P', 'P.jpg'),
(28, 'Profesor', 'Profesor.jpg'),
(29, 'Q', 'Q.jpg'),
(30, 'R', 'R.jpg'),
(31, 'S', 'S.jpg'),
(32, 'T', 'T.jpg'),
(33, 'U', 'U.jpg'),
(34, 'Universidad', 'Universidad.jpg'),
(35, 'V', 'V.jpg'),
(36, 'W', 'W.jpg'),
(37, 'X', 'X.jpg'),
(38, 'Y', 'Y.jpg'),
(39, 'Z', 'Z.jpg'),
(40, 'El', 'El.jpg'),
(41, 'Objetivo', 'Objetivo.jpg'),
(42, 'Que', 'Que.jpg'),
(43, 'Sordos', 'Sordos.jpg'),
(44, 'Puedan', 'Puedan.jpg'),
(45, 'Entender', 'Entender.jpg'),
(46, 'Clases', 'Clases.jpg'),
(47, 'Con', 'Con1.jpg'),
(50, 'Bienvenidos', 'Bienvenido.jpg'),
(51, 'Semana', 'Semana.jpg'),
(53, 'Ciencia', 'Ciencia.jpg'),
(54, 'Estamos', 'Estamos.jpg'),
(55, 'En La', 'En.jpg'),
(56, 'La', 'La.jpg'),
(57, 'Del', 'Del.jpg'),
(58, 'Clase', 'Clases.jpg'),
(62, 'Lenguaje', 'Lenguaje.jpg'),
(65, 'Es', 'Es.jpg'),
(66, 'En', 'En.jpg'),
(67, 'De', 'De.jpg'),
(68, 'Compiladores', 'Compiladores.jpg'),
(69, 'Magdalena', 'Magdalena.jpg'),
(70, 'Auditiva', 'Auditiva.jpg'),
(71, 'Limitacion', 'Limitacion.jpg'),
(72, 'Personas', 'Personas.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `imagen`
--
ALTER TABLE `imagen`
  ADD PRIMARY KEY (`idImagen`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `imagen`
--
ALTER TABLE `imagen`
  MODIFY `idImagen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
