-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 29, 2015 at 07:08 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `startkick`
--

-- --------------------------------------------------------

--
-- Table structure for table `backers`
--

CREATE TABLE IF NOT EXISTS `backers` (
  `projectId` int(11) NOT NULL,
  `UserName` varchar(30) NOT NULL,
  `Amount` int(11) NOT NULL,
  PRIMARY KEY (`projectId`,`UserName`),
  KEY `fk_UserName` (`UserName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `projectpic`
--

CREATE TABLE IF NOT EXISTS `projectpic` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ProjectId` int(11) NOT NULL,
  `Path` varchar(200) NOT NULL DEFAULT 'KickStart\\src\\img\\default_image.png',
  PRIMARY KEY (`ID`,`ProjectId`),
  KEY `pid_fk` (`ProjectId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Description` mediumtext,
  `AmountNeeded` int(11) NOT NULL,
  `MainPic` varchar(200) NOT NULL DEFAULT 'projects/default_image.png',
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Owner` varchar(30) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Owner` (`Owner`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`ID`, `Name`, `Description`, `AmountNeeded`, `MainPic`, `CreatedAt`, `Owner`) VALUES
(13, 'Project 1', 'Rooms oh fully taken by worse do. Points afraid but may end law lasted. Was out laughter raptures returned outweigh. Luckily cheered colonel me do we attacks on highest enabled. Tried law yet style child.', 5000, 'projects/13/a81b5eef8d0538d07a63144960a76928.png', '2015-08-29 14:21:10', 'test1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `UserName` varchar(30) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `UserAuthLvl` varchar(20) NOT NULL,
  `FirstName` varchar(30) NOT NULL,
  `LastName` varchar(30) NOT NULL,
  `Gender` varchar(15) NOT NULL,
  PRIMARY KEY (`UserName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserName`, `Password`, `UserAuthLvl`, `FirstName`, `LastName`, `Gender`) VALUES
('a@a.a', '580539cf96c3de01abf3bdd25e05b108', '1', 'Ariel', 'Levin', 'Male'),
('a@b.c', '580539cf96c3de01abf3bdd25e05b108', '0', '', '', ''),
('asd@asd.asd', '580539cf96c3de01abf3bdd25e05b108', '2', 'Bla', 'Blu', 'Female'),
('test', '2414e7de746416b3b3baa7f0f23d8067', '0', '', '', ''),
('test1', 'b740f3ca40f9544ffd7e65dd6f65f7fb', '0', '', '', ''),
('test2', '2414e7de746416b3b3baa7f0f23d8067', '0', '', '', ''),
('yoni@s-access.com', '448da7d4bf06cc984bfcdd891445971b', '1', 'Yoni', 'Maymon', 'Male');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `backers`
--
ALTER TABLE `backers`
  ADD CONSTRAINT `fk_projectId` FOREIGN KEY (`projectId`) REFERENCES `projects` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_UserName` FOREIGN KEY (`UserName`) REFERENCES `users` (`UserName`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projectpic`
--
ALTER TABLE `projectpic`
  ADD CONSTRAINT `pid_fk` FOREIGN KEY (`ProjectId`) REFERENCES `projects` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `prjoect_owner_fk` FOREIGN KEY (`Owner`) REFERENCES `users` (`UserName`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
