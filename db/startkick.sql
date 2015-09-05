-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2015 at 12:39 AM
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
(55, 'ariel@ks.com', 7050),
(55, 'haim@walla.com', 2250),
(55, 'val@gmail.com', 50),
(56, 'haim@walla.com', 186),
(56, 'shaul@gmail.com', 3000),
(57, 'ariel@gmail.com', 80),
(57, 'haim@walla.com', 489),
(58, 'haim@walla.com', 200000),
(58, 'inv@gmail.com', 520730),
(59, 'haim@walla.com', 660),
(60, 'haim@walla.com', 489),
(61, 'haim@walla.com', 8900),
(61, 'inv@gmail.com', 470);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=92 ;

--
-- Dumping data for table `projectpic`
--

INSERT INTO `projectpic` (`ID`, `ProjectId`, `Path`) VALUES
(58, 55, 'projects/55/a5550fc3cc2dd7553edd2f560ac98526.png'),
(59, 55, 'projects/55/33ad5047152f918acd723ffb83e18462.jpg'),
(60, 55, 'projects/55/1820890f2c060fae9d382bc9825c497a.png'),
(61, 55, 'projects/55/f3755eb0f738180a5a401aaec016f694.png'),
(62, 55, 'projects/55/8efc07507a790e8628c76b7f120e0b95.png'),
(63, 55, 'projects/55/351adfbfd75e114bfd18eaf3762f3048.jpg'),
(70, 58, 'projects/58/f10ccd6dc080e9776205990506a153c4.jpg'),
(71, 58, 'projects/58/1c2d77be83dd977f35417af88d891c68.jpg'),
(72, 58, 'projects/58/f08b979702e63fd6225da39145d1e871.jpg'),
(73, 61, 'projects/61/612d8886d7058ae1c2a1cb2a698aef2a.jpg'),
(74, 61, 'projects/61/8058d677cd86e2b1b2628e04fa8249e1.jpg'),
(75, 61, 'projects/61/a1082c226e6db8d54fe6e0d85ebf5042.jpg'),
(76, 56, 'projects/56/729232a329fb33060c428f0abf465bc3.jpg'),
(77, 56, 'projects/56/b27a88cd33c3d6ffa831f27f7df47a07.jpg'),
(78, 56, 'projects/56/a614e78440674f882dc9c5b3571e20c9.jpg'),
(82, 57, 'projects/57/328634f811ae38c5e4e923b059d7d280.jpg'),
(83, 57, 'projects/57/ef4f2af95d24022a470ae35326b730b9.jpg'),
(84, 57, 'projects/57/d1098240325d604db68b670ac6fc131a.jpg'),
(85, 57, 'projects/57/f72967250baddbfc2ea6fdf11c8686fb.jpg'),
(86, 57, 'projects/57/ff69991ad979dbf0d740f418069dd438.jpg'),
(87, 58, 'projects/58/d7704ec450e15b55955e4acbe33d8144.jpg'),
(88, 58, 'projects/58/78b69a9d4235af10f5ce6b0ebecfddba.jpg'),
(89, 61, 'projects/61/1edd291181facdd8b8e972591db1f83b.jpg'),
(90, 61, 'projects/61/baf65ed13b0856370c8e6349e82f85da.jpg'),
(91, 56, 'projects/56/71f5c1e2b0d7052c97652cf5d7ba6a37.jpg');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=63 ;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`ID`, `Name`, `Description`, `AmountNeeded`, `MainPic`, `VideoYouTubeID`, `CreatedAt`, `EndAt`, `Owner`) VALUES
(55, 'Project 2', 'Scarcely on striking packages by so property in delicate. Up or well must less rent read walk so be. Easy sold at do hour sing spot. Any meant has cease too the decay. Since party burst am it match', 10000, 'projects/55/b6485f20b9b37b56eef2d6a277f8e1c4.png', 'Q6vVuj3iggE', '2015-09-05 16:09:05', '2015-12-10 17:07:00', 'ariel@gmail.com'),
(56, 'Project 3', 'Stronger unpacked felicity to of mistaken. Fanny at wrong table ye in. Be on easily cannot innate in lasted months on. Differed and and felicity steepest mrs age outweigh. Opinions learning likewise daughter now age outweigh.', 7000, 'projects/56/e213b8cce34b2778a485c7ed0bf1fc8d.png', '5X_g9J-uZ7k', '2015-09-05 16:09:48', '2016-01-10 17:09:00', 'ariel@gmail.com'),
(57, 'Project 4', 'Situation admitting promotion at or to perceived be. Mr acuteness we as estimable enjoyment up. An held late as felt know. Learn do allow solid to grave. Middleton suspicion age her attention. Chiefly several bed its wishing.', 800, 'projects/57/5f63fa14ec3ee86f2e147a4b87f8a497.jpg', 'hHEA1Azun5Q', '2015-09-05 16:13:19', '2016-09-16 16:12:00', 'val@gmail.com'),
(58, 'KickStart', 'We combines the essence of the social enterprise movement with the hacker spirit of high-growth technology startups and gives advice for future entrepreneurs who want to build a big company while creating sustainable value for society at-large.', 1000000, 'projects/58/248757aa1d447443d87cba31cd764c01.png', 'MXKEccRiMeQ', '2015-09-05 16:28:45', '2015-09-07 20:00:00', 'ariel@ks.com'),
(59, 'Project 5', 'Rooms oh fully taken by worse do. Points afraid but may end law lasted. Was out laughter raptures returned outweigh. Luckily cheered colonel me do we attacks on highest enabled. Tried law yet style child.', 6000, 'projects/59/849d3557b149657a25a5609984519db3.png', 'DyewSPpreGU', '2015-07-01 16:30:47', '2015-08-01 17:28:00', 'ariel@ks.com'),
(60, 'Project 6', 'Delighted consisted newspaper of unfeeling as neglected so. Tell size come hard mrs and four fond are. Of in commanded earnestly resources it. At quitting in strictly up wandered of relation answered felicity.', 7000, 'projects/60/cb1e01750cd246a352624a422e68f436.jpg', 'HRbzwWsvShc', '2015-08-18 16:33:13', '2015-09-01 16:30:00', 'yoni@gmail.com'),
(61, 'Project 1', 'Whole wound wrote at whose to style in. Figure ye innate former do so we. Shutters but sir yourself provided you required his. So neither related he am do believe. Nothing but you hundred had use regular.', 20000, 'projects/61/6c3d836cb474bd20da850dc984f15528.png', 'ISAdFizEOdU', '2015-09-05 16:34:01', '2015-10-22 16:33:00', 'yoni@gmail.com');

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
  `Active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`UserName`),
  UNIQUE KEY `id` (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `UserName`, `Password`, `UserAuthLvl`, `FirstName`, `LastName`, `Gender`, `Active`) VALUES
(14, 'admin@ks.com', '580539cf96c3de01abf3bdd25e05b108', '0', 'Kick', 'Start', 'Male', 1),
(13, 'ariel@gmail.com', '448da7d4bf06cc984bfcdd891445971b', '1', 'Ariel', 'Cohen', 'Male', 1),
(18, 'ariel@ks.com', '580539cf96c3de01abf3bdd25e05b108', '1', 'Ariel', 'Levin', 'Male', 1),
(17, 'haim@walla.com', '448da7d4bf06cc984bfcdd891445971b', '2', 'Haim', 'Haim', 'Male', 1),
(19, 'inv@gmail.com', '580539cf96c3de01abf3bdd25e05b108', '2', 'Ryan', 'Woody', 'Male', 1),
(20, 'shaul@gmail.com', '448da7d4bf06cc984bfcdd891445971b', '2', 'shaul', 'shaul', 'Female', 1),
(15, 'val@gmail.com', '448da7d4bf06cc984bfcdd891445971b', '1', 'Val', 'Val', 'Female', 1),
(16, 'yoni@gmail.com', '580539cf96c3de01abf3bdd25e05b108', '1', 'Yoni', 'Maymon', 'Male', 1);

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
