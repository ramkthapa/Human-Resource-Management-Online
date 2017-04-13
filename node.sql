-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 31, 2014 at 07:34 PM
-- Server version: 5.5.16
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `node`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE IF NOT EXISTS `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `departmentName` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `departmentName`) VALUES
(1, 'Sales Department'),
(3, 'Purchase Department'),
(5, 'Marketing Department'),
(6, 'Warehouse Department'),
(9, 'finance and audit');

-- --------------------------------------------------------

--
-- Table structure for table `empleave`
--

CREATE TABLE IF NOT EXISTS `empleave` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empid` varchar(15) NOT NULL,
  `availableDays` int(50) NOT NULL,
  `leaveType` text NOT NULL,
  `leaveStart` varchar(11) NOT NULL,
  `leaveEnd` varchar(11) NOT NULL,
  `description` text NOT NULL,
  `status` int(11) NOT NULL,
  `read` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `empleave`
--

INSERT INTO `empleave` (`id`, `empid`, `availableDays`, `leaveType`, `leaveStart`, `leaveEnd`, `description`, `status`, `read`) VALUES
(5, '78687', 0, 'Sick Leave', '3 Jan 2013', '10 Jan 2013', 'i am sick', 2, 1),
(6, '78687', 0, 'Sick Leave', '3 Jan 2013', '10 Jan 2013', 'i am sick', 1, 1),
(7, '78687', 0, 'Annual Leave', '24 Jan 2013', '25 Jan 2013', 'i need annual leave', 1, 1),
(8, '78687', 0, 'Casual Leave', '18 Jan 2013', '19 Jan 2013', 'i need casual leave', 1, 1),
(9, '78687', 0, 'Casual Leave', '3 Jan 2013', '4 Jan 2013', 'pet kharab hai', 1, 1),
(10, '78687', 0, 'Sick Leave', '2 Jan 2013', '6 Jan 2013', 'hiv aids', 1, 1),
(11, '78687', 0, 'Sick Leave', '2 Jan 2013', '6 Jan 2013', 'hiv aids', 1, 1),
(12, '78687', 0, 'Sick Leave', '2 Jan 2014', '1 Jan 2014', 'dfdkfkd', 1, 1),
(13, '78687', 0, 'Sick Leave', '9 Jan 2014', '11 Jan 2014', 'I am not feeling good.', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE IF NOT EXISTS `employee` (
  `id` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `middleName` varchar(20) DEFAULT NULL,
  `lastName` varchar(20) NOT NULL,
  `department` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `country` varchar(20) NOT NULL,
  `homeTown` varchar(30) NOT NULL,
  `contactNo` varchar(25) NOT NULL,
  `email` varchar(45) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `maritalStatus` varchar(20) NOT NULL,
  `dateofBirth` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `firstName`, `middleName`, `lastName`, `department`, `position`, `country`, `homeTown`, `contactNo`, `email`, `gender`, `maritalStatus`, `dateofBirth`) VALUES
(1, 'admin', 'hrm', 'manager', 0, 0, 'Germany', 'dallas', '256256345', 'china_yub@yahoo.coom', 1, 'married', '01 Jan 2014'),
(78687, 'yubraj', '', 'thapa', 1, 2, 'Nepal', 'Kathmandu', '4915217260904', 'yubrajme@gmail.com', 1, 'single', '10 Jan 1990'),
(78688, 'rahul', '', 'agrawal', 3, 4, 'Germany', 'kiel', '562539', 'rahul@gmail.com', 1, 'single', '01 Jan 2013'),
(78689, 'Rajan', '', 'Lama', 6, 3, 'Germany', 'Kiel', '5626', 'rajan@mail.com', 1, 'divorced', '01 Jan 2013'),
(78690, 'shravan', 'kumar', 'thapa', 1, 4, 'India', 'Bombay', '562536', 'china_yub@yahoo.com', 1, 'married', '3 Jan 2013'),
(78691, 'Ram', 'Kumar', 'Thapa', 9, 6, 'Nepal', 'Pokhara', '56235624', 'ram@gmail.com', 1, 'married', '01 Jan 2013');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE IF NOT EXISTS `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from` int(11) NOT NULL,
  `to` int(11) NOT NULL,
  `msg` varchar(50) NOT NULL,
  `date` varchar(10) NOT NULL,
  `read` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=39 ;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `from`, `to`, `msg`, `date`, `read`) VALUES
(3, 8930, 9898, 'Hlw Samjhana I am Dell', '01/10/2014', 0),
(4, 9898, 8930, 'hlw dell', '01/10/2014', 0),
(5, 8930, 9898, 'Sanchai 6au..?', '01/10/2014', 0),
(6, 8930, 9898, 'I love you <3', '01/10/2014', 0),
(7, 9898, 8930, 'good morning', '01/10/2014', 0),
(8, 8930, 9898, 'I like you!', '01/10/2014', 0),
(9, 8930, 9898, 'I am Yubraj', '01/10/2014', 0),
(10, 8930, 9898, 'spajdi', '01/11/2014', 0),
(12, 9898, 8930, 'i lop u ', '01/14/2014', 0),
(13, 45, 8930, 'ma ram kumar thapa', '01/14/2014', 0),
(14, 555, 8930, 'am bastola', '01/14/2014', 0),
(15, 2, 78687, 'hey apple can u give me ball', '01/18/2014', 1),
(16, 2, 78687, 'hey apple can u give me ball', '01/18/2014', 1),
(17, 2, 78687, 'hey apple can u give me ball', '01/18/2014', 1),
(18, 2, 4, 'hi Malika..', '01/18/2014', 1),
(19, 4, 2, 'hello how are you..?', '01/18/2014', 1),
(20, 2, 78687, 'hello apple.. how is ur health', '01/18/2014', 1),
(21, 2, 78687, 'yo man. what;s up ', '01/18/2014', 0),
(22, 2, 78687, 'yo man. what;s up ', '01/18/2014', 0),
(23, 1, 78687, 'hello apple\r\n', '01/19/2014', 1),
(24, 1, 78688, 'iuuiuiuiiuiu', '01/19/2014', 1),
(25, 1, 78688, 'iuuiuiuiiuiu', '01/19/2014', 1),
(26, 1, 78687, 'hi apple.. ', '01/19/2014', 1),
(27, 78687, 78688, 'hi rahul... ', '01/19/2014', 1),
(28, 1, 78688, 'muahhhhhh', '01/19/2014', 1),
(29, 1, 78687, 'muahhhhhh', '01/19/2014', 1),
(30, 1, 78687, 'muahhhhhh', '01/19/2014', 1),
(31, 1, 78687, 'i love u ..', '01/19/2014', 1),
(32, 78687, 1, 'i lov u too admin', '01/19/2014', 1),
(33, 78687, 1, 'i lov u too admin', '01/19/2014', 1),
(34, 78687, 1, 'i lov u too admin', '01/19/2014', 1),
(35, 1, 78687, 'hlw apple..', '01/20/2014', 1),
(36, 1, 78687, 'chush', '01/20/2014', 1),
(37, 1, 78687, 'you are doing really good.. ', '01/20/2014', 1),
(38, 78687, 1, 'thank you dear manager', '01/20/2014', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notice`
--

CREATE TABLE IF NOT EXISTS `notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `type` int(11) NOT NULL,
  `notice` varchar(500) NOT NULL,
  `date` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `id_2` (`id`),
  KEY `id_3` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `notice`
--

INSERT INTO `notice` (`id`, `title`, `type`, `notice`, `date`) VALUES
(17, 'Board Meeting', 1, 'We announce, we are going to conduct our board meeting on 5th of jan 2014. ', '01/19/2014'),
(18, 'Annual Function', 1, 'We are going to celebrate our Golden Jublie on Jan 19,2014 . Please every employees are invited for party ', '01/19/2014'),
(19, 'Staff Recruitment', 1, 'Result of staff recruitment is published on notice board.', '01/19/2014'),
(20, 'Human Resource Management', 0, 'A Human Resources Management System (HRMS) or Human Resources Information System (HRIS), refers to the systems and processes at the intersection between human resource management (HRM) and information technology. ', '01/19/2014'),
(21, 'HRM', 1, 'A Human Resources Management System (HRMS) or Human Resources Information System.', '01/19/2014'),
(22, 'New Product Launch', 1, 'The function of human resources (HR) departments is generally administrative and common to all organizations. We are going to launch our new product', '01/20/2014');

-- --------------------------------------------------------

--
-- Table structure for table `performance`
--

CREATE TABLE IF NOT EXISTS `performance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empId` int(11) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `project_begin` varchar(20) NOT NULL,
  `project_end` varchar(20) NOT NULL,
  `rating` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `performance`
--

INSERT INTO `performance` (`id`, `empId`, `project_name`, `project_begin`, `project_end`, `rating`) VALUES
(4, 555, 'Movie', '17 Jan 2014', '26 Jan 2014', 2),
(5, 9823, 'Content Management', '25 Jan 2014', '26 Jan 2014', 1),
(7, 4, 'Robotics', '16 Jan 2014', '25 Jan 2014', 4),
(8, 6, 'Artificial Intelligence', '15 Jan 2014', '25 Jan 2014', 3),
(9, 3, 'Science Fiction', '22 Jan 2014', '31 Jan 2014', 2),
(10, 2, 'Warehouse Leakage', '23 Jan 2014', '25 Jan 2014', 1),
(11, 1, 'AI', '9 Jan 2014', '16 Jan 2014', 5),
(12, 78687, 'computer IT Software', '8 Jan 2014', '10 Jan 2014', 4),
(13, 78687, 'Javascipt Project', '1 Jan 2014', '25 Jan 2014', 4);

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE IF NOT EXISTS `person` (
  `id` varchar(10) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `access` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`id`, `Name`, `password`, `access`) VALUES
('1', 'admin', 'admin', 1),
('78687', 'yubraj', 'cat', 0),
('78688', 'rahul', 'wwc1WpNk', 0),
('78689', 'Rajan', 'XehvKC5t', 0),
('78690', 'shravan', 'CiTNs7wM', 0),
('78691', 'Ram', 'NNBfWSNB', 0);

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE IF NOT EXISTS `position` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `positionName` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`id`, `positionName`) VALUES
(2, 'Sales Executive'),
(3, 'Warehouse Manager'),
(4, 'Purchase Manager'),
(6, 'Quality Ofiicer');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
