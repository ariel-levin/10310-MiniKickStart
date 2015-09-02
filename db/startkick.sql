-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 02, 2015 at 11:33 PM
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

--
-- Dumping data for table `backers`
--

INSERT INTO `backers` (`projectId`, `UserName`, `Amount`) VALUES
(13, 'a@a.a', 2000),
(13, 'asd@asd.asd', 500),
(13, 'test2', 1500),
(14, 'a@a.a', 3000);

-- --------------------------------------------------------

--
-- Table structure for table `projectpic`
--

CREATE TABLE IF NOT EXISTS `projectpic` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ProjectId` int(11) NOT NULL,
  `Path` varchar(200) NOT NULL DEFAULT 'projects/default_image.png	',
  PRIMARY KEY (`ID`,`ProjectId`),
  KEY `pid_fk` (`ProjectId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `projectpic`
--

INSERT INTO `projectpic` (`ID`, `ProjectId`, `Path`) VALUES
(1, 13, 'projects/default_image.png'),
(2, 13, 'projects/13/a81b5eef8d0538d07a63144960a76928.png');

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
  `VideoYouTubeID` varchar(200) DEFAULT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `EndAt` timestamp NULL DEFAULT NULL,
  `Owner` varchar(30) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Owner` (`Owner`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=30 ;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`ID`, `Name`, `Description`, `AmountNeeded`, `MainPic`, `VideoYouTubeID`, `CreatedAt`, `EndAt`, `Owner`) VALUES
(13, 'Project 1', 'Rooms oh fully taken by worse do. Points afraid but may end law lasted. Was out laughter raptures returned outweigh. Luckily cheered colonel me do we attacks on highest enabled. Tried law yet style child.', 5000, 'projects/13/a81b5eef8d0538d07a63144960a76928.png', '4XbWc4r4_iU', '2015-08-29 14:21:10', '2015-09-29 10:49:29', 'a@a.a'),
(14, 'zxczxc', 'zxcxzc', 500, 'projects/default_image.png', NULL, '2015-08-11 21:00:00', '2015-08-31 21:00:00', 'a@a.a'),
(20, 'Test New Project', 'Cras auctor nibh augue, quis ultricies ante ultrices sed. Praesent finibus ultricies turpis eu congue. Integer pulvinar, quam in sagittis sodales, felis leo blandit purus, et aliquet nibh est non velit. Donec sagittis gravida mollis. Maecenas mattis metus in cursus posuere.', 10000, 'projects/default_image.png', 'k4xsqw463Hs', '2015-09-02 20:56:35', '2016-07-30 17:56:09', 'a@a.a'),
(21, 'Project 2', 'Nullam maximus ipsum in justo condimentum, commodo rhoncus tortor lacinia. Quisque nulla dolor, interdum vel tincidunt eget, auctor ac magna. Nullam varius orci nunc, eu gravida dui vehicula nec. Integer id vehicula orci.', 3000, 'projects/default_image.png', 'fwj8-0B1tUw', '2015-09-02 21:02:42', '2018-01-19 20:01:45', 'a@a.a'),
(27, 'aaaaaa', 'aaaaaaaaaaaaaa', 123123, 'projects/default_image.png', 'undefined', '2015-09-02 21:26:21', '2015-09-18 18:26:13', 'a@a.a'),
(28, 'bbbbbb', 'bbbbbbbbbbbbbbbbbbbb', 1231, 'projects/default_image.png', 'undefined', '2015-09-02 21:26:44', '2016-06-16 18:26:22', 'a@a.a'),
(29, 'ccccc', 'cccccccccccccccccccccccccc', 30000, 'projects/default_image.png', 'QN1X6vXA-Y0', '2015-09-02 21:27:54', '2016-08-02 18:26:46', 'a@a.a');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(30) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `UserAuthLvl` varchar(20) NOT NULL,
  `FirstName` varchar(30) NOT NULL,
  `LastName` varchar(30) NOT NULL,
  `Gender` varchar(15) NOT NULL,
  PRIMARY KEY (`UserName`),
  UNIQUE KEY `id` (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `UserName`, `Password`, `UserAuthLvl`, `FirstName`, `LastName`, `Gender`) VALUES
(1, 'a@a.a', '580539cf96c3de01abf3bdd25e05b108', '1', 'Ariel', 'Levin', 'Male'),
(2, 'a@b.c', '580539cf96c3de01abf3bdd25e05b108', '0', '', '', ''),
(3, 'asd@asd.asd', '580539cf96c3de01abf3bdd25e05b108', '2', 'Bla', 'Blu', 'Female'),
(8, 'asdas@p.c', '580539cf96c3de01abf3bdd25e05b108', '2', 'foo', 'goo', 'Male'),
(4, 'test', '2414e7de746416b3b3baa7f0f23d8067', '0', '', '', ''),
(5, 'test1', 'b740f3ca40f9544ffd7e65dd6f65f7fb', '0', '', '', ''),
(6, 'test2', '2414e7de746416b3b3baa7f0f23d8067', '0', '', '', ''),
(7, 'yoni@s-access.com', '448da7d4bf06cc984bfcdd891445971b', '1', 'Yoni', 'Maymon', 'Male');

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
