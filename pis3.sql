-- phpMyAdmin SQL Dump
-- version 5.2.1-2.fc39
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-03-2024 a las 20:54:37
-- Versión del servidor: 10.5.23-MariaDB
-- Versión de PHP: 8.2.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pis3`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alergias`
--

CREATE TABLE `alergias` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alergias`
--

INSERT INTO `alergias` (`id`, `name`) VALUES
(1, 'Ibuprofeno'),
(2, 'Latex'),
(3, 'Frutos secos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `assets`
--

CREATE TABLE `assets` (
  `id` int(11) NOT NULL,
  `ruta` varchar(255) NOT NULL,
  `public` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `assets`
--

INSERT INTO `assets` (`id`, `ruta`, `public`, `createdAt`, `updatedAt`) VALUES
(1, '1.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(2, '2.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(3, '3.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(4, '4.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(5, '5.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(6, '6.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(7, '7.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(8, '8.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(9, '9.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(10, '10.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(11, '11.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(12, '12.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(13, '13.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(14, '14.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(15, '15.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(16, '16.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(17, '17.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(18, '18.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(19, '19.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(20, '20.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(21, 'a.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(22, 'b.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(23, 'c.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(24, 'd.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(25, 'e.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(26, 'f.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(27, 'g.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(28, 'h.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(29, 'i.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(30, 'j.jpg', 0, '2024-03-06 19:47:39', '2024-03-06 19:47:39'),
(31, '17770286-022c-45a9-9902-3a4f9b7918e8.jpg', 0, '2024-03-06 19:51:59', '2024-03-06 19:51:59'),
(32, '82d4e7f9-77a7-47ce-9680-36855327de32.jpg', 0, '2024-03-06 19:51:59', '2024-03-06 19:51:59'),
(33, '64ac38a4-50ae-4e4b-8eb2-aa206bfe0f97.jpg', 0, '2024-03-06 19:52:32', '2024-03-06 19:52:32'),
(34, '51e1730c-ce42-41f1-9f72-3c0a5b316d70.jpg', 0, '2024-03-06 20:09:34', '2024-03-06 20:09:34'),
(35, 'a09d82cd-75ae-4143-8da0-290c37db563c.jpg', 0, '2024-03-06 20:13:31', '2024-03-06 20:13:31'),
(36, '3d625861-3156-4df4-9aa5-621e82eeee08.jpg', 0, '2024-03-06 20:15:47', '2024-03-06 20:15:47'),
(37, '41e3e55b-2ce9-4d49-88da-e5fe76770cda.jpg', 0, '2024-03-06 20:18:29', '2024-03-06 20:18:29'),
(38, 'c4c74add-0115-40a1-b97b-1b722b0f5152.jpg', 0, '2024-03-06 20:19:13', '2024-03-06 20:19:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'MASTER', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(2, 'NADADOR', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(3, 'TODOS', '2024-03-06 19:47:41', '2024-03-06 19:47:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_clases`
--

CREATE TABLE `categoria_clases` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria_clases`
--

INSERT INTO `categoria_clases` (`id`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Infantil', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(2, 'Alevin', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(3, 'Cadete', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(4, 'Master', '2024-03-06 19:47:41', '2024-03-06 19:47:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clase`
--

CREATE TABLE `clase` (
  `id` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clase_has_usuario`
--

CREATE TABLE `clase_has_usuario` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_clase` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `id_new` int(11) DEFAULT NULL,
  `author` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicio`
--

CREATE TABLE `ejercicio` (
  `id` int(11) NOT NULL,
  `idTipo` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ejercicio`
--

INSERT INTO `ejercicio` (`id`, `idTipo`, `descripcion`, `createdAt`, `updatedAt`) VALUES
(1, 1, '400m (75m crol + 25 Estilo)', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(2, 2, '100m espalda suave, 2x50 Punto muerto de mariposa con respiración frontal /30”, 6x300m Nado continuo (6 brazadas fuertes cada 50m y  mirar tres veces cada 50m al frente / 45”), 3x200m Aeróbico medio a ritmo con Palas + Aletas /1”', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(3, 3, '200m', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(4, 1, '50m Punto muerto de mariposa, 50m Punto muerto de pecho, 50m Punto muerto de espalda, 50m Punto muerto de braza', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(5, 2, '200m Nado libre, 200m Nado mariposa, 200m Nado pecho, 200m Nado espalda, 200m Nado braza', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(6, 3, '100m Nado continuo, 100m Nado de combinación (braza + pecho + espalda + estilos)', '2024-03-06 19:47:41', '2024-03-06 19:47:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicioEntrenamiento`
--

CREATE TABLE `ejercicioEntrenamiento` (
  `id` int(11) NOT NULL,
  `ejercicioId` int(11) NOT NULL,
  `idEntrenamiento` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ejercicioEntrenamiento`
--

INSERT INTO `ejercicioEntrenamiento` (`id`, `ejercicioId`, `idEntrenamiento`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(2, 2, 1, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(3, 3, 1, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(4, 4, 2, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(5, 5, 2, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(6, 6, 2, '2024-03-06 19:47:41', '2024-03-06 19:47:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenamientos`
--

CREATE TABLE `entrenamientos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entrenamientos`
--

INSERT INTO `entrenamientos` (`id`, `nombre`, `descripcion`, `createdAt`, `updatedAt`) VALUES
(1, '3000 metros', 'Entrenamiento de 3000 metros en las Lagunas de Ruidera.', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(2, 'Entrenamiento de Natación', 'Entrenamiento de natación de resistencia y velocidad en piscina. Incluye series de estilos libres, espalda, pecho y braza, con intervalos de descanso y calentamiento.', '2024-03-06 19:47:41', '2024-03-06 19:47:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenamientosUsuarios`
--

CREATE TABLE `entrenamientosUsuarios` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `idEntrenamiento` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entrenamientosUsuarios`
--

INSERT INTO `entrenamientosUsuarios` (`id`, `id_user`, `idEntrenamiento`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '2024-03-06 19:47:41', '2024-03-06 19:47:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `escaparate`
--

CREATE TABLE `escaparate` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventoNoSocios`
--

CREATE TABLE `eventoNoSocios` (
  `id` int(11) NOT NULL,
  `idNoSocio` int(11) NOT NULL,
  `idEvento` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eventoNoSocios`
--

INSERT INTO `eventoNoSocios` (`id`, `idNoSocio`, `idEvento`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(2, 2, 1, '2024-03-06 19:47:41', '2024-03-06 19:47:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `fecha` varchar(255) NOT NULL,
  `sede` varchar(255) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `visible` tinyint(1) DEFAULT NULL,
  `privado` tinyint(1) DEFAULT NULL,
  `resultado` int(11) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `nombre`, `fecha`, `sede`, `idCategoria`, `visible`, `privado`, `resultado`, `desc`, `createdAt`, `updatedAt`) VALUES
(1, '24H', '12/05/2024', 'Puertollano', 3, 1, 0, 5, '¡Hola a todos los amantes de la natación! Hoy queremos hablaros sobre un evento muy emocionante que está a punto de tener lugar: la competición de natación 24 horas.\n\n        Este evento único en su clase reunirá a nadadores de todo el país para competir en una maratón acuática que pondrá a prueba su resistencia y habilidades en el agua. Durante 24 horas seguidas, los participantes nadarán sin parar en una piscina olímpica, en equipos o individualmente, con el objetivo de completar la mayor cantidad de metros posibles.\n        \n        La competición de natación 24 horas es una oportunidad perfecta para poner a prueba tus límites, superarte a ti mismo y disfrutar de la compañía de otros apasionados de la natación. Además, es una forma divertida de recaudar fondos para organizaciones benéficas y causas solidarias, ya que los participantes pueden buscar patrocinadores que se comprometan a donar una cantidad de dinero por cada metro nadado.\n        \n        Durante el evento, habrá descansos programados para que los nadadores puedan recuperar fuerzas, alimentarse y reponer energías. También habrá actividades complementarias, como clases de yoga acuático, charlas sobre nutrición deportiva y sesiones de masaje para relajar los músculos cansados.\n        \n        La competición de natación 24 horas es una experiencia única que te permitirá vivir la emoción de la competición, la camaradería de compartir la piscina con otros nadadores y la satisfacción de superar un desafío físico y mental. ¡No te lo pierdas y únete a nosotros en este emocionante evento acuático!\n        \n        ¡Nos vemos en la piscina!', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(2, 'Competicion regional', '30/05/2024', 'Puertollano', 1, 0, 1, NULL, '¡Hola a todos los amantes de la natación en Puertollano! Hoy queremos compartir con ustedes toda la información sobre la emocionante competición regional que se llevará a cabo en nuestra ciudad.\n\n      Este evento tan esperado reunirá a los mejores nadadores de la región, quienes competirán en diferentes categorías y modalidades. Desde los más jóvenes hasta los más experimentados, todos tendrán la oportunidad de demostrar su talento y habilidades en el agua.\n      \n      La competición se llevará a cabo en la piscina municipal de Puertollano, un lugar emblemático que ha sido testigo de grandes hazañas deportivas a lo largo de los años. Los espectadores podrán disfrutar de un ambiente vibrante y lleno de emoción, mientras animan a sus nadadores favoritos.\n      \n      Además de las pruebas individuales, también habrá competiciones por equipos, donde la estrategia y la coordinación serán clave para alcanzar la victoria. Los clubes de natación de la región se enfrentarán en intensas batallas acuáticas, demostrando su trabajo en equipo y su dedicación al deporte.\n      \n      Los ganadores de cada categoría recibirán trofeos y reconocimientos, pero lo más importante es el espíritu de camaradería y la pasión por la natación que se respirará en cada carrera. Todos los participantes se esforzarán al máximo para alcanzar sus metas y superar sus propios límites, en busca de la gloria deportiva.\n      \n      Así que no te pierdas esta emocionante competición regional de natación en Puertollano. Ven a apoyar a tus nadadores favoritos, disfruta del ambiente festivo y vive la emoción de la competición en cada brazada. ¡Nos vemos en la piscina!', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(3, 'Competicion provincial', '30/06/2024', 'Ciudad Real', 1, 1, 1, NULL, '¡Hola a todos los amantes de la natación en Puertollano! Hoy queremos compartir con ustedes toda la información sobre la emocionante competición regional que se llevará a cabo en nuestra ciudad.\n\n    Este evento tan esperado reunirá a los mejores nadadores de la región, quienes competirán en diferentes categorías y modalidades. Desde los más jóvenes hasta los más experimentados, todos tendrán la oportunidad de demostrar su talento y habilidades en el agua.\n    \n    La competición se llevará a cabo en la piscina municipal de Puertollano, un lugar emblemático que ha sido testigo de grandes hazañas deportivas a lo largo de los años. Los espectadores podrán disfrutar de un ambiente vibrante y lleno de emoción, mientras animan a sus nadadores favoritos.\n    \n    Además de las pruebas individuales, también habrá competiciones por equipos, donde la estrategia y la coordinación serán clave para alcanzar la victoria. Los clubes de natación de la región se enfrentarán en intensas batallas acuáticas, demostrando su trabajo en equipo y su dedicación al deporte.\n    \n    Los ganadores de cada categoría recibirán trofeos y reconocimientos, pero lo más importante es el espíritu de camaradería y la pasión por la natación que se respirará en cada carrera. Todos los participantes se esforzarán al máximo para alcanzar sus metas y superar sus propios límites, en busca de la gloria deportiva.\n    \n    Así que no te pierdas esta emocionante competición regional de natación en Puertollano. Ven a apoyar a tus nadadores favoritos, disfruta del ambiente festivo y vive la emoción de la competición en cada brazada. ¡Nos vemos en la piscina!', '2024-03-06 19:47:41', '2024-03-06 19:47:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventosUsuarios`
--

CREATE TABLE `eventosUsuarios` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idEvento` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eventosUsuarios`
--

INSERT INTO `eventosUsuarios` (`id`, `idUsuario`, `idEvento`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(2, 1, 2, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(3, 2, 2, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(4, 2, 3, '2024-03-06 19:47:41', '2024-03-06 19:47:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `faltas`
--

CREATE TABLE `faltas` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_clase` int(11) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `legal_texts`
--

CREATE TABLE `legal_texts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `body` text DEFAULT NULL,
  `main_image` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `share_counter` int(11) DEFAULT 0,
  `visit_counter` int(11) DEFAULT 0,
  `likes_counter` int(11) DEFAULT 0,
  `dislikes_counter` int(11) DEFAULT 0,
  `duration` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `news`
--

INSERT INTO `news` (`id`, `title`, `body`, `main_image`, `id_user`, `summary`, `share_counter`, `visit_counter`, `likes_counter`, `dislikes_counter`, `duration`, `category`, `createdAt`, `updatedAt`) VALUES
(1, 'Nueva página!!', 'Le damos la bienvenida a la nueva página', 1, 1, NULL, 0, 6, 0, 0, NULL, NULL, '2024-03-06 19:47:41', '2024-03-06 20:06:29'),
(3, 'Beneficium arbor creber vilicus textor pecus unde aestus advenio.', 'Acidus custodia trucido. Vestigium coepi facere aestivus caritas. Sufficio suggero succurro cultura.\nCursus creta voluptatum atqui tubineus voveo villa aeneus. Adsidue cultura damno aequitas bene ademptio. Peccatus ago cinis velut.\nComitatus vos acceptus a alter temptatio. Odit concido excepturi ascisco deserunt deficio maxime doloremque clamo. Vulgus territo texo aveho vapulus.', 22, 1, 'ascisco,deserunt,vapulus.,trucido.,Adsidue,acceptus,cultura.\nCursus,aequitas,cultura', 49, 49, 14, 16, '45', 'Books', '2024-03-06 19:47:41', '2024-03-06 20:20:31'),
(4, 'Calamitas esse callide sum tum vorax adeptio.', 'Centum attollo vigor cohibeo. Colo amor aranea cariosus claustrum collum tergo rerum talio. Ager dicta curatio adeo alienus validus demonstro substantia thesaurus cresco.\nClementia utpote clam tergeo comptus stella cetera ars. Thesaurus taceo xiphias caveo subito. Supellex vel copiose vinum dolore accedo viriliter clamo comitatus.\nStudio cado votum. Valeo strenuus coniuratio balbus omnis corpus harum. Victus conduco sui theatrum validus strenuus dolore sonitus.', 23, 1, 'cetera,theatrum,vinum,amor,curatio,caveo,clamo,dolore,vel,copiose,collum,cohibeo.', 29, 51, 35, 43, '2', 'Electronics', '2024-03-06 19:47:41', '2024-03-06 20:06:49'),
(5, 'Tabgo volutabrum tamisium arbitro.', 'Delibero corrumpo viridis depono utrum tener trado vilitas adopto. Aufero consequuntur summopere cito tumultus argumentum degenero. Animus decumbo admitto verto tabgo cerno ulciscor ullam corrupti.\nSto angelus dolore congregatio commodi adhaero suppono congregatio. Sortitus teres temeritas tempore nihil comes at. Vel tantillus apparatus communis viduo deduco adstringo umbra varius modi.\nConicio dolorem aut coma venustas causa video desparatus suadeo astrum. Voco umerus censura uredo audentia temperantia adhaero sed in. Quia depraedor autem subseco varietas.', 24, 1, 'communis,venustas,decumbo,suadeo,desparatus,Quia,desparatus,Aufero,degenero.,congregatio.,nihil,viridis,adhaero,adhaero', 48, 38, 27, 11, '39', 'Movies', '2024-03-06 19:47:41', '2024-03-06 20:06:55'),
(6, 'Curo validus coepi comptus videlicet tumultus cohibeo vomer aureus brevis.', 'Tollo crepusculum videlicet porro adsum traho atrocitas confero vero hic. Vero dolores sunt annus. Attollo verecundia culpo suffragium.\nIllum dolorem adeo thymbra. Tollo confugo una consequatur verus quam architecto defleo. Est atrox calco odio tactus collum contabesco aptus.\nBeatae adfectus creber vorago conqueror distinctio coma. Crux caelestis spiculum veniam. Repellat causa asper cursus tenuis tunc cernuus curis adsum speciosus.', 25, 1, 'confugo,Attollo,contabesco,dolores,consequatur,contabesco,dolorem,thymbra.,Repellat,Tollo,adfectus', 31, 4, 26, 37, '46', 'Health', '2024-03-06 19:47:41', '2024-03-06 20:06:44'),
(7, 'Beatus concido civitas subseco suscipit asper nulla.', 'Defleo infit ex terror comparo crudelis. Deorsum crudelis demonstro arbitro alioqui deprimo. Deficio eos victoria.\nNeque cinis candidus eligendi derelinquo admoveo accendo. Aequitas tubineus cura coma. Curto vulnero audax paulatim dens tui avaritia.\nNihil deputo defleo callide. Voveo degenero terga. Voluntarius attollo laudantium deduco tamquam quisquam deripio amplexus toties desparatus.', 26, 1, 'coma.,Defleo,callide.,eos,paulatim,toties,paulatim,quisquam,desparatus.', 10, 28, 34, 17, '2', 'Garden', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(8, 'Damno admitto somnus casus.', 'Carbo versus sophismata ut. Pel admiratio certe curia non aggredior suasoria suus. Voluptatibus vulgus acquiro.\nQuidem strues via. Careo aptus pauper vaco tersus caelestis tenuis trans eveniet. Calculus adnuo cariosus tactus caecus ventito.\nSunt dedecor pectus placeat autus amitto tubineus tenuis decens dolorem. Sum adamo constans tantillus provident tenetur maiores tibi vesco. Volva uberrime civitas tego quidem urbs voco.', 27, 1, 'voco.,tenuis,tactus,Voluptatibus,sophismata,maiores,vulgus,suasoria,amitto,dolorem.,certe', 27, 51, 12, 29, '8', 'Automotive', '2024-03-06 19:47:41', '2024-03-06 20:07:59'),
(9, 'Utrum aestus adaugeo odit aufero.', 'Beatus sed accusator. Blanditiis id amplexus doloribus cimentarius desipio atavus cado conculco necessitatibus. Alo aestas cicuta patior triduana utique cupiditas speculum.\nSimilique spectaculum creator bellicus tertius acquiro centum acerbitas complectus iure. Caecus crepusculum curto magni. Deripio civis venustas.\nComprehendo ter ars. Trado dens amet aurum curriculum cinis acies succedo. Ait vulariter antea truculenter calculus.', 28, 1, 'amplexus,dens,Beatus,ter,crepusculum,magni.,succedo.,doloribus,cado,conculco', 22, 20, 35, 34, '2', 'Beauty', '2024-03-06 19:47:41', '2024-03-06 20:06:17'),
(10, 'Modi ager tollo carcer.', 'Spiritus comedo utor alienus. Distinctio verumtamen chirographum cuius sponte accedo cupressus solium acquiro. Conculco stabilis demulceo volubilis molestias nam cohors defetiscor cribro.\nVapulus concido aspernatur custodia vomica calco eveniet centum eligendi turpis. Cum aequus adhaero ullam defungo. Voluptates canto veritatis ad molestiae terga aro bellum.\nCorreptius defero patior desino. Accusamus anser conservo complectus. Vallum solium aeger coerceo amiculum voro infit.', 29, 1, 'defungo.,Conculco,amiculum,Spiritus,Conculco,Accusamus,complectus.,alienus.,sponte,turpis.,Vallum', 48, 33, 8, 21, '48', 'Tools', '2024-03-06 19:47:41', '2024-03-06 20:06:51'),
(11, 'Versus unus enim uxor depraedor stips copiose itaque ea sonitus.', 'Una cras arcesso. Acerbitas umerus thema stabilis cado adimpleo casso cena. Cibo conturbo sopor tibi certus volubilis tunc culpo cupio.\nCaritas altus appono defessus. Agnosco depromo armarium suffoco socius valetudo causa cimentarius. Illo doloribus conicio demitto cedo strenuus creta facere.\nTumultus adaugeo cresco valetudo. Tertius stillicidium verus torqueo vinum. Aetas complectus aptus ambitus vobis voluntarius conicio virtus sollers.', 30, 1, 'cras,umerus,valetudo,vinum.,Illo,volubilis,conicio,cena.,conicio,Una,cresco', 8, 27, 47, 36, '0', 'Tools', '2024-03-06 19:47:41', '2024-03-06 20:15:17'),
(12, 'Nueva noticia', '<ul><li>asdfasdfConculco</li><li>paulatim</li><li>conicio</li><li>cetera</li><li>theatrum</li><li>vinum</li></ul><p><br></p>', 35, 1, '', 0, 1, 0, 0, '2', 'Salud', '2024-03-06 20:14:37', '2024-03-06 20:18:33'),
(13, 'Nueva noticia', '<ul><li>asdfasdfConculco</li><li>paulatim</li><li>conicio</li><li>cetera</li><li>theatrum</li><li>vinum</li></ul><p><br></p>', 35, 1, '', 0, 0, 0, 0, '2', 'Salud', '2024-03-06 20:14:53', '2024-03-06 20:14:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noSocios`
--

CREATE TABLE `noSocios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `noSocios`
--

INSERT INTO `noSocios` (`id`, `nombre`, `apellidos`, `email`, `createdAt`, `updatedAt`) VALUES
(1, 'Juan', 'Cuesta', 'Juan@gmail.com', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(2, 'Emilio', 'nose', 'Emilio@gmail.com', '2024-03-06 19:47:41', '2024-03-06 19:47:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntuaciones`
--

CREATE TABLE `puntuaciones` (
  `id` int(11) NOT NULL,
  `nota` int(11) DEFAULT NULL,
  `idEntrenamiento` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `puntuaciones`
--

INSERT INTO `puntuaciones` (`id`, `nota`, `idEntrenamiento`, `createdAt`, `updatedAt`) VALUES
(1, 6, 1, '2024-03-06 19:47:41', '2024-03-06 19:47:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntuacionUsuarios`
--

CREATE TABLE `puntuacionUsuarios` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `idPuntuacion` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `puntuacionUsuarios`
--

INSERT INTO `puntuacionUsuarios` (`id`, `id_user`, `idPuntuacion`, `createdAt`, `updatedAt`) VALUES
(1, 3, 1, '2024-03-06 19:47:41', '2024-03-06 19:47:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respond_comments`
--

CREATE TABLE `respond_comments` (
  `id` int(11) NOT NULL,
  `respond_to` int(11) DEFAULT NULL,
  `id_comment` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rols`
--

CREATE TABLE `rols` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rols`
--

INSERT INTO `rols` (`id`, `name`, `desc`) VALUES
(1, 'admin', 'Administrador de todo el dominio'),
(2, 'tutor', 'Usuario que está acargo de un socio'),
(3, 'socio', 'Usuario que paga la cuota y es miembro'),
(4, 'entrenador', 'Usuario que entrena a los socios'),
(5, 'redactor', 'Usuario que solo se encarga de redactar noticias'),
(6, 'webmaster', 'Usuario que se encarga de la gestión de la web, editar la historia, la forma de contactar, y subir ficheros a eventos y a la parte de asambleas ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20240130112439-create-assets.js'),
('20240130112440-create-users.js'),
('20240202110224-create-rol.js'),
('20240202110543-create-user-rol.js'),
('20240202112020-create-tutor-user.js'),
('20240203145051-create-categoria.js'),
('20240203145051-create-tipo.js'),
('20240203195431-create-ejercicio.js'),
('20240203195432-create-entrenamiento.js'),
('20240203195632-create-entrenamiento-usuario.js'),
('20240203195744-create-ejercicio-entrenamiento.js'),
('20240203195744-create-puntuacion.js'),
('20240203195829-create-puntuacion-usuario.js'),
('20240203204916-create-clase.js'),
('20240203211227-create-faltas.js'),
('20240203211949-create-clase-has-usuario.js'),
('20240206081325-create-no-socio.js'),
('20240207092935-create-escaparate.js'),
('20240213153029-create-user-assets.js'),
('20240215195402-create-news.js'),
('20240215213643-create-comments.js'),
('20240220165010-create-legal-texts.js'),
('20240220165138-create-user-accept-legal-text.js'),
('20240220165314-create-alergias.js'),
('20240220165336-create-user-alergias.js'),
('20240227094713-create-categoria-clase.js'),
('20240231201522-create-eventos.js'),
('20240243155524-create-evento-usuario.js'),
('20240256082341-create-evento-no-socio.js'),
('20240303124703-create-respond-comment.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo`
--

CREATE TABLE `tipo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo`
--

INSERT INTO `tipo` (`id`, `nombre`, `descripcion`) VALUES
(1, 'calentamiento', 'El propósito principal del calentamiento es aumentar la temperatura corporal, mejorar la circulación sanguínea, flexibilizar los músculos y articulaciones, y activar el sistema cardiovascular.'),
(2, 'principal', 'Durante el ejercicio principal, se suelen realizar movimientos y actividades más desafiantes, con una mayor intensidad y enfoque en la carga de trabajo específica para lograr los beneficios deseados.'),
(3, 'relax', 'La fase de relajación al final del entrenamiento, también conocida como enfriamiento, generalmente incluye ejercicios diseñados para reducir la frecuencia cardíaca, relajar los músculos y facilitar la transición del cuerpo de una actividad física intensa a un estado de reposo. ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tuto_users`
--

CREATE TABLE `tuto_users` (
  `id_tutor` int(11) NOT NULL,
  `id_socio` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tuto_users`
--

INSERT INTO `tuto_users` (`id_tutor`, `id_socio`, `createdAt`, `updatedAt`) VALUES
(17, 3, '2024-03-06 20:12:06', '2024-03-06 20:12:06'),
(17, 5, '2024-03-06 20:12:06', '2024-03-06 20:12:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `photo_profile` int(11) DEFAULT 1,
  `num_socio` int(11) DEFAULT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `tlf` varchar(255) DEFAULT NULL,
  `domicilio` varchar(255) DEFAULT NULL,
  `corriente_pago` tinyint(1) DEFAULT 1,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `born_date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `photo_profile`, `num_socio`, `firstName`, `lastName`, `email`, `password`, `tlf`, `domicilio`, `corriente_pago`, `active`, `born_date`, `createdAt`, `updatedAt`) VALUES
(1, 38, NULL, 'admin', 'admin', 'admin@piscina.com', '$2b$10$3jfRP/tZnj7svrTtyIu1x.MFkMunE1e3HBDI9C/apTKCtE7pEfxPy', NULL, 'calle perfecto n5', 1, 1, '2000-01-01 00:00:00', '2024-03-06 19:47:40', '2024-03-06 20:19:15'),
(2, 2, NULL, 'prueba', 'tutor', 'tutor@piscina.com', '$2b$10$x78GdPLmoWlgRJ4e890mVuP7jsIQX6Vw4CMBEE6bfr5/rcX.K4TQ.', NULL, '403691.30310115 4282638.6555873', 1, 1, '2000-01-01 00:00:00', '2024-03-06 19:47:40', '2024-03-06 19:47:40'),
(3, 3, NULL, 'prueba', 'socio', 'socio@piscina.com', '$2b$10$UF6Wj5vQJqGSgfqgF0UamOOFUfXOtbDG1hg4Qx7HHpXdrlNSnlO0a', NULL, '403691.30310115 4282638.6555873', 1, 1, '2000-01-01 00:00:00', '2024-03-06 19:47:40', '2024-03-06 19:47:40'),
(4, 4, NULL, 'tutor', 'socio', 'tutorsocio@piscina.com', '$2b$10$bMNZ5eIBoMB7DVhipmEI6eWdFiNybdQqtLz9EZiNgzivYVoPvXIJ6', NULL, '403691.30310115 4282638.6555873', 1, 1, '2000-01-01 00:00:00', '2024-03-06 19:47:40', '2024-03-06 19:47:40'),
(5, 5, NULL, 'entrenador', 'entrenador', 'entrenador@piscina.com', '$2b$10$Q5GCTNI.hVwR2bEOSwp7MeNtXX8WJ9pz20fScNBJZsI4ZVTYdRm7m', NULL, '403691.30310115 4282638.6555873', 1, 1, '2000-01-01 00:00:00', '2024-03-06 19:47:40', '2024-03-06 19:47:40'),
(6, 6, NULL, 'socio', 'menor', 'menor@piscina.com', '$2b$10$E3F8UUlf4/03smUqeYtPsupXZcx4qiSkiSVZAaHHWA.cJBMMi7/g6', NULL, '503691.30310115 4282638.6555873', 1, 1, '2010-01-01 00:00:00', '2024-03-06 19:47:40', '2024-03-06 19:47:40'),
(8, 8, NULL, 'Pierce', 'Swaniawski', 'Henry.Klein1@gmail.com', '$2b$10$5ADljDRqhPmV98YLtaudxu7DO7l3j/vqpXzQI4Of9iMVJn/8g7sHC', '(598) 822-2398 x9617', '4607 Talon Fall', 1, 1, '1993-07-12 12:47:50', '2024-03-06 19:47:40', '2024-03-06 19:47:40'),
(9, 9, NULL, 'Florine', 'King', 'Alicia.Skiles58@hotmail.com', '$2b$10$c0ZTH.DaELBezIcRsU/TXeUDtZqj5hWvph2GR3EhS87A5U0J/ftp6', '1-840-724-6566', '152 Bianka Courts', 0, 0, '1944-10-18 15:52:59', '2024-03-06 19:47:40', '2024-03-06 19:47:40'),
(10, 10, NULL, 'Ceasar', 'Wehner', 'Gideon.Becker@gmail.com', '$2b$10$KZDpBob26LcE2tsv5GFkvudbnyeWLhoQIQEMFGsKICrwQjhSiut5O', '329.306.6984 x210', '30947 E High Street', 0, 0, '1978-04-20 20:42:17', '2024-03-06 19:47:40', '2024-03-06 19:47:40'),
(11, 11, NULL, 'Aurore', 'Kassulke', 'Garrick69@gmail.com', '$2b$10$ajAkWpZHcYkWgyKN2gKGmuP1jUakbeJVYCupn5IuMUG4dYVlKoTHa', '(843) 911-2903 x388', '41202 Brook Street', 1, 0, '1996-09-23 02:16:28', '2024-03-06 19:47:40', '2024-03-06 19:47:40'),
(12, 12, NULL, 'Charles', 'McCullough', 'Lula75@yahoo.com', '$2b$10$6d2vllPJQ0ug/TfUN4tYtOn41Uw0cIT6zp42LrSbiDnSvyin35nfa', '1-242-589-3911', '101 Tate Spring', 1, 0, '1977-07-10 05:27:56', '2024-03-06 19:47:40', '2024-03-06 19:47:40'),
(13, 13, NULL, 'Willis', 'Balistreri', 'Chauncey_Durgan30@yahoo.com', '$2b$10$ykGUFF6Mab/UvPhaXvQwV.usUGGgNoIyOCXuemT8Eii6Shi7EtI9y', '853.636.0220 x00390', '7176 Broad Lane', 0, 0, '1949-07-30 22:43:45', '2024-03-06 19:47:40', '2024-03-06 19:47:40'),
(14, 14, NULL, 'Dannie', 'Lebsack-Keebler', 'Pattie_Gibson@hotmail.com', '$2b$10$evoiyjKF7ge/hRgJXRAOUu3RngIJwZ8RVzIJoNThHAGFS9i.YYAIy', '409-959-4252 x97825', '62736 Richmond Avenue', 1, 1, '2005-11-12 13:19:21', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(15, 15, NULL, 'Brian', 'Marks', 'Lucile_Luettgen@yahoo.com', '$2b$10$RQnfnXmh8lv890x1Vaqq..1uNTeEuyvKcTANZZsvAe9xqVjsJAlay', '572.571.6532', '348 Mill Lane', 1, 0, '1955-08-05 01:26:10', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(16, 16, NULL, 'Idell', 'Hoppe', 'Gus92@yahoo.com', '$2b$10$YxmqJOD7t3nFHgcOTjPIMeOY0XW7vYQiDDt2ZygnC/9df0Rxmnj.C', '912-827-2201', '9817 Mueller Villages', 0, 0, '1967-04-29 08:13:17', '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(17, 34, NULL, 'badr', 'hamidou', 'badrhamidou@gmail.com', '$2b$10$1JILVs0.ZajmMlt40EqoU.A.zPfD8JhjnBsxslXOeVQBvItc4XoV.', NULL, NULL, 1, 1, NULL, '2024-03-06 20:09:36', '2024-03-06 20:11:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_accept_legal_texts`
--

CREATE TABLE `user_accept_legal_texts` (
  `id_user` int(11) NOT NULL,
  `id_legal_text` int(11) DEFAULT NULL,
  `acceptedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_alergias`
--

CREATE TABLE `user_alergias` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_alergia` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_assets`
--

CREATE TABLE `user_assets` (
  `id_user` int(11) NOT NULL,
  `id_asset` int(11) NOT NULL,
  `public` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_rols`
--

CREATE TABLE `user_rols` (
  `id_user` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_rols`
--

INSERT INTO `user_rols` (`id_user`, `id_rol`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2024-03-06 20:19:15', '2024-03-06 20:19:15'),
(2, 2, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(2, 3, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(2, 4, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(3, 2, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(3, 3, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(4, 2, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(4, 3, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(5, 3, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(5, 4, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(6, 3, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(8, 2, '2024-03-06 19:47:41', '2024-03-06 19:47:41'),
(17, 2, '2024-03-06 20:12:05', '2024-03-06 20:12:05'),
(17, 3, '2024-03-06 20:12:05', '2024-03-06 20:12:05');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alergias`
--
ALTER TABLE `alergias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categoria_clases`
--
ALTER TABLE `categoria_clases`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clase`
--
ALTER TABLE `clase`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clase_has_usuario`
--
ALTER TABLE `clase_has_usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_clase` (`id_clase`);

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_new` (`id_new`),
  ADD KEY `author` (`author`);

--
-- Indices de la tabla `ejercicio`
--
ALTER TABLE `ejercicio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idTipo` (`idTipo`);

--
-- Indices de la tabla `ejercicioEntrenamiento`
--
ALTER TABLE `ejercicioEntrenamiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ejercicioId` (`ejercicioId`),
  ADD KEY `idEntrenamiento` (`idEntrenamiento`);

--
-- Indices de la tabla `entrenamientos`
--
ALTER TABLE `entrenamientos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `entrenamientosUsuarios`
--
ALTER TABLE `entrenamientosUsuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `idEntrenamiento` (`idEntrenamiento`);

--
-- Indices de la tabla `escaparate`
--
ALTER TABLE `escaparate`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `eventoNoSocios`
--
ALTER TABLE `eventoNoSocios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNoSocio` (`idNoSocio`),
  ADD KEY `idEvento` (`idEvento`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCategoria` (`idCategoria`),
  ADD KEY `resultado` (`resultado`);

--
-- Indices de la tabla `eventosUsuarios`
--
ALTER TABLE `eventosUsuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idEvento` (`idEvento`);

--
-- Indices de la tabla `faltas`
--
ALTER TABLE `faltas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_clase` (`id_clase`);

--
-- Indices de la tabla `legal_texts`
--
ALTER TABLE `legal_texts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `main_image` (`main_image`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `noSocios`
--
ALTER TABLE `noSocios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `puntuaciones`
--
ALTER TABLE `puntuaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEntrenamiento` (`idEntrenamiento`);

--
-- Indices de la tabla `puntuacionUsuarios`
--
ALTER TABLE `puntuacionUsuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `idPuntuacion` (`idPuntuacion`);

--
-- Indices de la tabla `respond_comments`
--
ALTER TABLE `respond_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `respond_to` (`respond_to`),
  ADD KEY `id_comment` (`id_comment`);

--
-- Indices de la tabla `rols`
--
ALTER TABLE `rols`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `tipo`
--
ALTER TABLE `tipo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tuto_users`
--
ALTER TABLE `tuto_users`
  ADD PRIMARY KEY (`id_tutor`,`id_socio`),
  ADD KEY `id_socio` (`id_socio`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `photo_profile` (`photo_profile`);

--
-- Indices de la tabla `user_accept_legal_texts`
--
ALTER TABLE `user_accept_legal_texts`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_legal_text` (`id_legal_text`);

--
-- Indices de la tabla `user_alergias`
--
ALTER TABLE `user_alergias`
  ADD PRIMARY KEY (`id`,`id_user`,`id_alergia`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_alergia` (`id_alergia`);

--
-- Indices de la tabla `user_assets`
--
ALTER TABLE `user_assets`
  ADD PRIMARY KEY (`id_user`,`id_asset`),
  ADD KEY `id_asset` (`id_asset`);

--
-- Indices de la tabla `user_rols`
--
ALTER TABLE `user_rols`
  ADD PRIMARY KEY (`id_user`,`id_rol`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alergias`
--
ALTER TABLE `alergias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `assets`
--
ALTER TABLE `assets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `categoria_clases`
--
ALTER TABLE `categoria_clases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `clase`
--
ALTER TABLE `clase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clase_has_usuario`
--
ALTER TABLE `clase_has_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ejercicio`
--
ALTER TABLE `ejercicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `ejercicioEntrenamiento`
--
ALTER TABLE `ejercicioEntrenamiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `entrenamientos`
--
ALTER TABLE `entrenamientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `entrenamientosUsuarios`
--
ALTER TABLE `entrenamientosUsuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `escaparate`
--
ALTER TABLE `escaparate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `eventoNoSocios`
--
ALTER TABLE `eventoNoSocios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `eventosUsuarios`
--
ALTER TABLE `eventosUsuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `faltas`
--
ALTER TABLE `faltas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `legal_texts`
--
ALTER TABLE `legal_texts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `noSocios`
--
ALTER TABLE `noSocios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `puntuaciones`
--
ALTER TABLE `puntuaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `puntuacionUsuarios`
--
ALTER TABLE `puntuacionUsuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `respond_comments`
--
ALTER TABLE `respond_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rols`
--
ALTER TABLE `rols`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tipo`
--
ALTER TABLE `tipo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `user_alergias`
--
ALTER TABLE `user_alergias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clase_has_usuario`
--
ALTER TABLE `clase_has_usuario`
  ADD CONSTRAINT `clase_has_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `clase_has_usuario_ibfk_2` FOREIGN KEY (`id_clase`) REFERENCES `clase` (`id`);

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_new`) REFERENCES `news` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`author`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `ejercicio`
--
ALTER TABLE `ejercicio`
  ADD CONSTRAINT `ejercicio_ibfk_1` FOREIGN KEY (`idTipo`) REFERENCES `tipo` (`id`);

--
-- Filtros para la tabla `ejercicioEntrenamiento`
--
ALTER TABLE `ejercicioEntrenamiento`
  ADD CONSTRAINT `ejercicioEntrenamiento_ibfk_1` FOREIGN KEY (`ejercicioId`) REFERENCES `ejercicio` (`id`),
  ADD CONSTRAINT `ejercicioEntrenamiento_ibfk_2` FOREIGN KEY (`idEntrenamiento`) REFERENCES `entrenamientos` (`id`);

--
-- Filtros para la tabla `entrenamientosUsuarios`
--
ALTER TABLE `entrenamientosUsuarios`
  ADD CONSTRAINT `entrenamientosUsuarios_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `entrenamientosUsuarios_ibfk_2` FOREIGN KEY (`idEntrenamiento`) REFERENCES `entrenamientos` (`id`);

--
-- Filtros para la tabla `eventoNoSocios`
--
ALTER TABLE `eventoNoSocios`
  ADD CONSTRAINT `eventoNoSocios_ibfk_1` FOREIGN KEY (`idNoSocio`) REFERENCES `noSocios` (`id`),
  ADD CONSTRAINT `eventoNoSocios_ibfk_2` FOREIGN KEY (`idEvento`) REFERENCES `eventos` (`id`);

--
-- Filtros para la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `eventos_ibfk_2` FOREIGN KEY (`resultado`) REFERENCES `assets` (`id`);

--
-- Filtros para la tabla `eventosUsuarios`
--
ALTER TABLE `eventosUsuarios`
  ADD CONSTRAINT `eventosUsuarios_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `eventosUsuarios_ibfk_2` FOREIGN KEY (`idEvento`) REFERENCES `eventos` (`id`);

--
-- Filtros para la tabla `faltas`
--
ALTER TABLE `faltas`
  ADD CONSTRAINT `faltas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `faltas_ibfk_2` FOREIGN KEY (`id_clase`) REFERENCES `clase` (`id`);

--
-- Filtros para la tabla `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`main_image`) REFERENCES `assets` (`id`),
  ADD CONSTRAINT `news_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `puntuaciones`
--
ALTER TABLE `puntuaciones`
  ADD CONSTRAINT `puntuaciones_ibfk_1` FOREIGN KEY (`idEntrenamiento`) REFERENCES `entrenamientos` (`id`);

--
-- Filtros para la tabla `puntuacionUsuarios`
--
ALTER TABLE `puntuacionUsuarios`
  ADD CONSTRAINT `puntuacionUsuarios_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `puntuacionUsuarios_ibfk_2` FOREIGN KEY (`idPuntuacion`) REFERENCES `puntuaciones` (`id`);

--
-- Filtros para la tabla `respond_comments`
--
ALTER TABLE `respond_comments`
  ADD CONSTRAINT `respond_comments_ibfk_1` FOREIGN KEY (`respond_to`) REFERENCES `comments` (`id`),
  ADD CONSTRAINT `respond_comments_ibfk_2` FOREIGN KEY (`id_comment`) REFERENCES `comments` (`id`);

--
-- Filtros para la tabla `tuto_users`
--
ALTER TABLE `tuto_users`
  ADD CONSTRAINT `tuto_users_ibfk_1` FOREIGN KEY (`id_tutor`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tuto_users_ibfk_2` FOREIGN KEY (`id_socio`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`photo_profile`) REFERENCES `assets` (`id`);

--
-- Filtros para la tabla `user_accept_legal_texts`
--
ALTER TABLE `user_accept_legal_texts`
  ADD CONSTRAINT `user_accept_legal_texts_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_accept_legal_texts_ibfk_2` FOREIGN KEY (`id_legal_text`) REFERENCES `legal_texts` (`id`);

--
-- Filtros para la tabla `user_alergias`
--
ALTER TABLE `user_alergias`
  ADD CONSTRAINT `user_alergias_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_alergias_ibfk_2` FOREIGN KEY (`id_alergia`) REFERENCES `alergias` (`id`);

--
-- Filtros para la tabla `user_assets`
--
ALTER TABLE `user_assets`
  ADD CONSTRAINT `user_assets_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_assets_ibfk_2` FOREIGN KEY (`id_asset`) REFERENCES `assets` (`id`);

--
-- Filtros para la tabla `user_rols`
--
ALTER TABLE `user_rols`
  ADD CONSTRAINT `user_rols_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_rols_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `rols` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
