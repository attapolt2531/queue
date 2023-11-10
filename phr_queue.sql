/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80030
Source Host           : localhost:3306
Source Database       : phr_queue

Target Server Type    : MYSQL
Target Server Version : 80030
File Encoding         : 65001

Date: 2023-10-14 09:51:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for callqueue
-- ----------------------------
DROP TABLE IF EXISTS `callqueue`;
CREATE TABLE `callqueue` (
  `id` int NOT NULL AUTO_INCREMENT,
  `queue_id` int DEFAULT NULL,
  `point_id` int DEFAULT NULL,
  `datetime_call` datetime DEFAULT NULL,
  `status` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `queue_id` (`queue_id`)
) ENGINE=InnoDB AUTO_INCREMENT=275 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of callqueue
-- ----------------------------
INSERT INTO `callqueue` VALUES ('255', '425', '1', '2023-10-13 17:30:06', null);
INSERT INTO `callqueue` VALUES ('256', '426', '1', '2023-10-13 17:39:35', null);
INSERT INTO `callqueue` VALUES ('257', '426', '1', '2023-10-13 17:40:31', null);
INSERT INTO `callqueue` VALUES ('258', '433', '1', '2023-10-13 17:40:40', null);
INSERT INTO `callqueue` VALUES ('259', '433', '1', '2023-10-13 17:40:48', null);
INSERT INTO `callqueue` VALUES ('260', '430', '1', '2023-10-13 17:41:01', null);
INSERT INTO `callqueue` VALUES ('261', '431', '1', '2023-10-13 17:41:28', null);
INSERT INTO `callqueue` VALUES ('262', '432', '1', '2023-10-13 17:41:35', null);
INSERT INTO `callqueue` VALUES ('263', '432', '1', '2023-10-13 17:41:50', null);
INSERT INTO `callqueue` VALUES ('264', '434', '2', '2023-10-13 17:42:40', null);
INSERT INTO `callqueue` VALUES ('265', '434', '2', '2023-10-13 17:43:08', null);
INSERT INTO `callqueue` VALUES ('266', '437', '2', '2023-10-13 17:44:23', null);
INSERT INTO `callqueue` VALUES ('267', '435', '1', '2023-10-13 17:44:39', null);
INSERT INTO `callqueue` VALUES ('268', '436', '1', '2023-10-13 17:44:47', null);
INSERT INTO `callqueue` VALUES ('269', '436', '1', '2023-10-13 17:45:05', null);
INSERT INTO `callqueue` VALUES ('270', '427', '1', '2023-10-13 17:45:34', null);
INSERT INTO `callqueue` VALUES ('271', '429', '1', '2023-10-13 17:45:36', null);
INSERT INTO `callqueue` VALUES ('272', '428', '2', '2023-10-13 17:53:08', null);
INSERT INTO `callqueue` VALUES ('273', '425', '2', '2023-10-13 17:53:22', null);
INSERT INTO `callqueue` VALUES ('274', '425', '2', '2023-10-13 17:53:26', null);

-- ----------------------------
-- Table structure for qstatus
-- ----------------------------
DROP TABLE IF EXISTS `qstatus`;
CREATE TABLE `qstatus` (
  `status` varchar(255) CHARACTER SET tis620 COLLATE tis620_thai_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET tis620 COLLATE tis620_thai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=tis620 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of qstatus
-- ----------------------------
INSERT INTO `qstatus` VALUES ('01', 'มาแล้ว');
INSERT INTO `qstatus` VALUES ('02', 'ยังไม่มา');

-- ----------------------------
-- Table structure for queue
-- ----------------------------
DROP TABLE IF EXISTS `queue`;
CREATE TABLE `queue` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vn` varchar(255) DEFAULT NULL,
  `queue_type` varchar(255) DEFAULT NULL,
  `queue` int DEFAULT NULL,
  `hn` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `dep` varchar(255) DEFAULT NULL,
  `vstdate` date DEFAULT NULL,
  `calling` varchar(255) DEFAULT NULL,
  `print` varchar(255) DEFAULT '',
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=438 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of queue
-- ----------------------------
INSERT INTO `queue` VALUES ('425', '661013083413', '1', '1', '000020340', 'น.ส.สุพรรณษา คำมันตรี', 'ER(ฉุกเฉิน)', '2023-10-13', 'Y', 'N', '01');
INSERT INTO `queue` VALUES ('426', '661013095936', '1', '2', '000016578', 'นางอำไพร แสงจันทร์', 'ER(ฉุกเฉิน)', '2023-10-13', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('427', '661013090114', '2', '1', '000018880', 'นางเป่ง สูงสุมาร', 'ER(ฉุกเฉิน)', '2023-10-13', 'Y', 'N', '01');
INSERT INTO `queue` VALUES ('428', '661013094656', '1', '3', '000027727', 'นางถาวร ก้อนฆ้อง', 'ER(ฉุกเฉิน)', '2023-10-13', 'Y', 'N', '01');
INSERT INTO `queue` VALUES ('429', '661013095806', '2', '2', '000059006', 'นางบังอร แสงเปล่งปลั่ง', 'ER(ฉุกเฉิน)', '2023-10-13', 'Y', 'N', '01');
INSERT INTO `queue` VALUES ('430', '661013103141', '2', '3', '000040696', 'ด.ญ.กัลยาณี พันธ์ลำภักดิ์', 'ER(ฉุกเฉิน)', '2023-10-13', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('431', '661013094542', '2', '4', '000003052', 'น.ส.พัชรินทร์ แซ่เฮ้ง', 'ER(ฉุกเฉิน)', '2023-10-13', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('432', '661013091454', '2', '5', '000020797', 'นายอุทัย เหล่าโสด', 'ER(ฉุกเฉิน)', '2023-10-13', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('433', '661013100630', '1', '4', '000020121', 'นางแพงศรี เจริญรัมย์', 'ER(ฉุกเฉิน)', '2023-10-13', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('434', '661013103224', '2', '6', '000051616', 'ด.ช.วชิรวิชญ์ นันทะมีชัย', 'ER(ฉุกเฉิน)', '2023-10-13', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('435', '661013095025', '2', '7', '000026663', 'นายอนันต์ ธาตุวิสัย', 'ER(ฉุกเฉิน)', '2023-10-13', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('436', '661013094044', '2', '8', '000052171', 'นางแดง จันทร์พิทักษ์', 'ER(ฉุกเฉิน)', '2023-10-13', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('437', '661013095025', '2', '9', '000026663', 'นายอนันต์ ธาตุวิสัย', 'ER(ฉุกเฉิน)', '2023-10-13', 'N', 'N', '01');

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `id` int NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of type
-- ----------------------------
INSERT INTO `type` VALUES ('1', 'A', 'คิวด่วน');
INSERT INTO `type` VALUES ('2', 'B', 'คิวปกติ');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `dep` varchar(255) DEFAULT NULL,
  `point` varchar(255) DEFAULT NULL,
  `vstdate` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('19', 'อรรถพล', 'ทะคง', 'attapol.takhong@hotmail.com', '$2b$10$uzQkFt1loONgtQ6ESQclAORTZYsWqX8WoWKXSpH9C4mOtCYso8ExS', '002', '', '2023-10-10 14:18:29');
INSERT INTO `users` VALUES ('20', 'test', 'test', 'attapol.bra@gmail.com', '$2b$10$djAqmdSiUglKFpdg4EOocuHPKlnMVQSvO2uYnDyXSv9tbNZ524DAO', '002', '', '2023-10-12 13:52:12');
