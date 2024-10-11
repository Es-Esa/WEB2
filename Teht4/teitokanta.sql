-- --------------------------------------------------------
-- Verkkotietokone:              127.0.0.1
-- Palvelinversio:               10.11.0-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Versio:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for tutorials
CREATE DATABASE IF NOT EXISTS `tutorials` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `tutorials`;

-- Dumping structure for taulu tutorials.comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tutorialId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tutorialId` (`tutorialId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`tutorialId`) REFERENCES `tutorials` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

-- Dumping data for table tutorials.comments: ~6 rows (suunnilleen)
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` (`id`, `name`, `text`, `createdAt`, `updatedAt`, `tutorialId`) VALUES
	(1, 'bezkoder', 'Good job!', '2024-10-03 11:19:30', '2024-10-03 11:19:30', 1),
	(2, 'zkoder', 'One of the best tuts!', '2024-10-03 11:19:30', '2024-10-03 11:19:30', 1),
	(3, 'aKoder', 'Hi, thank you!', '2024-10-03 11:19:30', '2024-10-03 11:19:30', 2),
	(4, 'anotherKoder', 'Awesome tut!', '2024-10-03 11:19:30', '2024-10-03 11:19:30', 2),
	(17, 'no tämä on kommentti 3:een', 'Kommentti 3:een', '2024-10-07 11:54:24', '2024-10-07 11:54:24', 3),
	(18, 'Kommentti 4 - tutoriaalia varten', 'Kommentointi 4', '2024-10-07 12:30:39', '2024-10-07 12:30:39', 4),
	(19, 'not so good tutorial I think', 'Comment for tut 2', '2024-10-09 07:35:21', '2024-10-09 07:35:21', 2),
	(23, 'Tutoriaalia voisi kehittää ....', 'Testikommentti tutoriaaliin 4', '2024-10-09 11:12:00', '2024-10-09 11:12:00', 4),
	(24, 'esim. kuvaus 4', 'Tut 4 comment', '2024-10-09 11:17:39', '2024-10-09 11:17:39', 4);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;

-- Dumping structure for taulu tutorials.tutorials
CREATE TABLE IF NOT EXISTS `tutorials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `published` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table tutorials.tutorials: ~4 rows (suunnilleen)
/*!40000 ALTER TABLE `tutorials` DISABLE KEYS */;
INSERT INTO `tutorials` (`id`, `title`, `description`, `createdAt`, `updatedAt`, `published`) VALUES
	(1, 'Tut#1', 'Tut#1 Description', '2024-10-03 11:19:30', '2024-10-03 11:19:30', b'0'),
	(2, 'Tut#2', 'Tut#2 Description', '2024-10-03 11:19:30', '2024-10-03 11:19:30', b'0'),
	(3, 'Tut#3', 'Tutoriaali3', '2024-10-03 11:34:39', '2024-10-03 12:29:16', b'1'),
	(4, 'Tut#4', 'Tutoriaali4', '2024-10-03 12:14:17', '2024-10-03 12:17:33', b'0');
/*!40000 ALTER TABLE `tutorials` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;