-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-10-2017 a las 05:40:57
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
(39, 'Z', 'Z.jpg');

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
  MODIFY `idImagen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
