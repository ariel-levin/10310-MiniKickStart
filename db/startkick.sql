-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 04, 2015 at 10:19 PM
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
(14, 'a@a.a', 3000),
(39, 'yoni@s-access.com', 3500),
(46, 'asd@asd.asd', 500);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=51 ;

--
-- Dumping data for table `projectpic`
--

INSERT INTO `projectpic` (`ID`, `ProjectId`, `Path`) VALUES
(1, 13, 'projects/default_image.png'),
(2, 13, 'projects/13/a81b5eef8d0538d07a63144960a76928.png'),
(15, 13, 'projects/13/6e770c82434bb924ef2703039f9eb83b.png'),
(16, 13, 'projects/13/fb2666994d8718a6ace24f2953dca3da.jpg'),
(17, 13, 'projects/13/c83783951efd844a7ecdd63a2f5f9008.png'),
(18, 13, 'projects/13/7ccd64082e4646be1bafd8a890b72dff.png'),
(19, 13, 'projects/13/5ef148cc6490730ee795c77d9b7be31f.png'),
(20, 13, 'projects/13/526c63392f2bda84c84f1714390af8ff.jpg'),
(21, 13, 'projects/13/94679472bddc261db52bcd70815d94ad.png'),
(22, 13, 'projects/13/2b41c5e75f89b6ce91a0a7e9f0414362.jpg'),
(23, 13, 'projects/13/f64b18357da16006f4a1923599abcfae.png'),
(24, 13, 'projects/13/f6749d7013037ef71e19f852d0d49a9c.png'),
(25, 13, 'projects/13/aba6a31e7f1784f35c6869a64d90e97e.png'),
(26, 13, 'projects/13/d84c4e9b0561ffe53012301e2fa89128.jpg'),
(33, 47, 'projects/47/4c3069d609ad5a5079b3d09eab013c88.png'),
(34, 47, 'projects/47/d5342d6c16be12fa04479564e584a49a.jpg'),
(35, 47, 'projects/47/9510321f8b79fa2df0ead2d0c5651c0f.png'),
(36, 47, 'projects/47/c928039677ef8243f280568445bd0c26.png'),
(37, 47, 'projects/47/24bba2e6a199ca9cf387df558a1fa3bb.png'),
(38, 47, 'projects/47/35802306ca2ee8574e10805beb442311.jpg'),
(39, 47, 'projects/47/ad2219265e1eb0dcf138be0211d66f23.png'),
(40, 47, 'projects/47/72325c0c18422e09b850fc02e416c298.jpg'),
(41, 47, 'projects/47/bcab930e9c66e89130b44bb54e6996bd.png'),
(42, 47, 'projects/47/e19652ca8ca2f01cd8d076d9e882c1ec.png'),
(43, 47, 'projects/47/41fda2b08c9fd9cf8320e50f0d69048c.png'),
(44, 47, 'projects/47/588319a2a9659c5c28cc636705466412.jpg'),
(45, 51, 'projects/51/dba748c2f03552cff77618771ca2924b.png'),
(46, 51, 'projects/51/db8df349758b59a3b282cee140c28050.png'),
(47, 52, 'projects/52/3dcbd45f22dff83e1f44f50cbcaff0ca.png'),
(48, 52, 'projects/52/579df2736c511079742003ef6a33991a.png'),
(49, 52, 'projects/52/7e530a7a50110ca77a08d409090bbb37.png'),
(50, 52, 'projects/52/8d41dbfb43e0255cb59cb2dda83529c4.jpg');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=53 ;

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
(29, 'ccccc', 'cccccccccccccccccccccccccc', 30000, 'projects/default_image.png', 'QN1X6vXA-Y0', '2015-09-02 21:27:54', '2016-08-02 18:26:46', 'a@a.a'),
(30, 'Project 3', 'sadlasl;kdja skldj askldjaklsdlasjdalksj lkasdj laskdjlaksjdlkasd', 6000, 'projects/default_image.png', 'undefined', '2015-09-03 17:40:46', '2015-09-10 14:39:00', 'a@a.a'),
(32, 'aaaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaaaaaaaa', 123, 'projects/default_image.png', 'undefined', '2015-09-03 18:38:01', '2015-09-03 15:37:39', 'a@a.a'),
(34, 'aaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaaaaaaaa', 123, 'projects/34/e16ea1e959daca6735f0e8045e976cc5.png', 'undefined', '2015-09-03 18:52:11', '2015-09-03 15:51:50', 'a@a.a'),
(35, 'asdasda', 'sdaadasdasasdasd', 121231, 'projects/default_image.png', 'undefined', '2015-09-03 19:01:36', '2015-09-03 16:01:26', 'a@a.a'),
(39, 'aaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaaa', 123123, 'projects/39/f4c7289672eebcd3f148202e7db474dd.jpg', 'undefined', '2015-09-03 19:44:26', '2015-09-04 16:44:13', 'a@a.a'),
(40, 'bla bla yoni', 'lalalalalalala', 1231231, 'projects/40/b70c5b7f58df82293e967ff81831a8cb.jpg', 'undefined', '2015-09-03 19:44:58', '2015-09-04 16:44:30', 'a@a.a'),
(42, 'asdasdas', 'dasdasdasdafdsfds sdasdsaads', 3214, 'projects/default_image.png', 'undefined', '2015-09-03 19:47:57', '2015-09-04 16:47:49', 'a@a.a'),
(43, 'lolipop', 'sadsadasdsadas asd asdasdasd', 5000, 'projects/43/57bd48edfcb2f65d608a9a255ca56d9c.png', 'ey-5GqwlRMU', '2015-09-03 19:50:14', '2015-09-05 16:48:15', 'a@a.a'),
(46, 'aaaaaaaa', 'aaaaaaaaaaaaaaaaaaaaa', 123, 'projects/default_image.png', 'undefined', '2015-09-04 07:09:26', '2015-09-05 04:10:00', 'a@a.a'),
(47, 'ccccccccccb', 'yoni ha manyak', 12313, 'projects/47/a6c458d9fce844dc3baec899dffbe43d.jpg', '_8Sh1CDDfmI', '2015-09-04 07:10:38', '2015-09-08 07:09:00', 'a@a.a'),
(48, 'asdf asdf', 'asdasfsadasdasdasdasd', 3070, 'projects/default_image.png', 'undefined', '2015-09-04 08:45:28', '2015-09-07 08:41:00', 'a@a.a'),
(49, 'gggggggg', 'sdgfsdfsdfsdfsdsdfsdf', 5000, 'projects/default_image.png', 'undefined', '2015-09-04 08:47:37', '2015-09-05 08:47:00', 'a@a.a'),
(50, 'hhhhhhhhhhhhh', 'sdadsadsadsadsadsadaad', 6000, 'projects/50/681f0b4a4aca129be7f7f29be6690009.png', 'undefined', '2015-09-04 08:48:02', '2015-09-05 08:47:00', 'a@a.a'),
(51, 'tttttttt', 'dsfdsfdsfsdfsdfsdfsd', 300, 'projects/default_image.png', 'undefined', '2015-09-04 08:48:31', '2015-09-05 08:48:00', 'a@a.a'),
(52, 'Bla bla', 'aslkdjalksdjaklsdhjakjshd aksjhd ad1234 jke rjk3l4h224kjhl', 9000, 'projects/52/25977ddc870cfebb4c13835ae74b5618.png', 'undefined', '2015-09-04 18:45:09', '2015-09-07 18:44:00', 'asd@asd.asd');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `UserName`, `Password`, `UserAuthLvl`, `FirstName`, `LastName`, `Gender`, `Active`) VALUES
(1, 'a@a.a', '580539cf96c3de01abf3bdd25e05b108', '1', 'Ariel', 'Levin', 'Male', 1),
(2, 'a@b.c', '580539cf96c3de01abf3bdd25e05b108', '0', 'ariel', 'levin', 'Male', 1),
(9, 'aasasd@basadsd.csdas', '996f71b6f348469d27d5a586e020f044', '2', 'sadasdas', 'asdsadsadsad', 'Female', 1),
(3, 'asd@asd.asd', '580539cf96c3de01abf3bdd25e05b108', '1', 'Ryan', 'Woody', 'Male', 1),
(8, 'asdas@p.c', 'ef775988943825d2871e1cfa75473ec0', '2', 'foo', 'goo', 'Male', 1),
(4, 'test', '2414e7de746416b3b3baa7f0f23d8067', '0', 'test', 'tester', 'Male', 1),
(5, 'test1', 'b740f3ca40f9544ffd7e65dd6f65f7fb', '0', '', '', '', 1),
(6, 'test2', '2414e7de746416b3b3baa7f0f23d8067', '1', 'toster', 'oven', 'Male', 1),
(7, 'yoni@s-access.com', '448da7d4bf06cc984bfcdd891445971b', '1', 'Yoni', 'Maymon', 'Male', 1);

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
