-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 19-03-2024 a las 18:23:28
-- Versión del servidor: 5.5.24-log
-- Versión de PHP: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `proyecto_arcade`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listado`
--

CREATE TABLE IF NOT EXISTS `listado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) NOT NULL,
  `subtitulo` text NOT NULL,
  `cuerpo` text NOT NULL,
  `img_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- Volcado de datos para la tabla `listado`
--

INSERT INTO `listado` (`id`, `titulo`, `subtitulo`, `cuerpo`, `img_id`) VALUES
(3, 'Jurassic Park Arcade (Raw Thrills) Front End Media', 'With Jurassic Park now being playable on TeknoParrot', ' its inevitable that people will now be adding it to their front ends, heres some awesome media to add to your front end for full ROAR effect! This media was created by the awesome guys over at Light Gun Lunatics on FaceBook.    ', 'diql4mbsjqsmvrvsuesa'),
(6, 'Mario Bros. back on Nintendo', 'the new mario bros cartridge is out! go tell your friends and start playing this game', 'he new mario bros cartridge is out! go tell your friends and start playing this gamethe new mssario bros cartridge is out! go tell your friends and start playing this game      ', 'zaeobvsx7omrv35dskf8'),
(11, 'Nuevas retro consolas', 'Llegan las últimas novedades del continente asiático. ', 'Por fin después de tanta espera están llegando las nuevas consolas diseñadas por Neo-Geo, a partir de marzo vas a poder encontrarlas en nuestros locales. ', 'x6toywtb4fgkhrdataz2'),
(13, 'Pacman', 'Pacman', 'nuevo Pacman sale a la venta. ', 's0v4nuurmr0rgyrvktaa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'Gaston', '81dc9bdb52d04dc20036dbd8313ed055'),
(2, 'Jorge', '81dc9bdb52d04dc20036dbd8313ed055');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
