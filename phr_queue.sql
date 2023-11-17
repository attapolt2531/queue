/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80030
Source Host           : localhost:3306
Source Database       : phr_queue

Target Server Type    : MYSQL
Target Server Version : 80030
File Encoding         : 65001

Date: 2023-11-16 14:51:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for callqueue
-- ----------------------------
DROP TABLE IF EXISTS `callqueue`;
CREATE TABLE `callqueue` (
  `id` int NOT NULL AUTO_INCREMENT,
  `queue_id` varchar(255) DEFAULT NULL,
  `point_id` int DEFAULT NULL,
  `datetime_call` datetime DEFAULT NULL,
  `status` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `queue_id` (`queue_id`)
) ENGINE=InnoDB AUTO_INCREMENT=443 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of callqueue
-- ----------------------------
INSERT INTO `callqueue` VALUES ('363', '442', '1', '2023-10-19 13:40:41', 'Y');
INSERT INTO `callqueue` VALUES ('364', '445', '2', '2023-10-19 13:41:03', 'Y');
INSERT INTO `callqueue` VALUES ('365', '444', '2', '2023-10-19 13:41:04', 'Y');
INSERT INTO `callqueue` VALUES ('366', '442', '2', '2023-10-19 13:41:05', 'Y');
INSERT INTO `callqueue` VALUES ('367', '445', '3', '2023-10-19 13:41:44', 'Y');
INSERT INTO `callqueue` VALUES ('368', '444', '3', '2023-10-19 13:41:45', 'Y');
INSERT INTO `callqueue` VALUES ('369', '442', '3', '2023-10-19 13:41:46', 'Y');
INSERT INTO `callqueue` VALUES ('370', '442', '3', '2023-10-19 13:42:11', 'Y');
INSERT INTO `callqueue` VALUES ('371', '444', '3', '2023-10-19 13:42:13', 'Y');
INSERT INTO `callqueue` VALUES ('372', '445', '3', '2023-10-19 13:42:14', 'Y');
INSERT INTO `callqueue` VALUES ('373', '443', '3', '2023-10-19 13:42:47', 'Y');
INSERT INTO `callqueue` VALUES ('374', '442', '3', '2023-10-19 13:43:05', 'Y');
INSERT INTO `callqueue` VALUES ('375', '444', '3', '2023-10-19 13:43:16', 'Y');
INSERT INTO `callqueue` VALUES ('376', '445', '3', '2023-10-19 13:43:27', 'Y');
INSERT INTO `callqueue` VALUES ('377', '445', '3', '2023-10-19 13:43:28', 'Y');
INSERT INTO `callqueue` VALUES ('378', '445', '3', '2023-10-19 13:43:46', 'Y');
INSERT INTO `callqueue` VALUES ('379', '445', '3', '2023-10-19 13:43:49', 'Y');
INSERT INTO `callqueue` VALUES ('380', '445', '3', '2023-10-19 13:44:07', 'Y');
INSERT INTO `callqueue` VALUES ('381', '442', '3', '2023-10-19 14:01:05', 'Y');
INSERT INTO `callqueue` VALUES ('382', '443', '3', '2023-10-19 14:03:49', 'Y');
INSERT INTO `callqueue` VALUES ('383', '446', '3', '2023-10-19 15:41:20', 'Y');
INSERT INTO `callqueue` VALUES ('384', '442', '1', '2023-10-19 15:41:31', 'Y');
INSERT INTO `callqueue` VALUES ('385', '443', '1', '2023-10-19 16:21:24', 'Y');
INSERT INTO `callqueue` VALUES ('386', '444', '1', '2023-10-19 16:21:35', 'Y');
INSERT INTO `callqueue` VALUES ('387', '445', '1', '2023-10-19 16:21:46', 'Y');
INSERT INTO `callqueue` VALUES ('388', '446', '3', '2023-10-19 16:21:51', 'Y');
INSERT INTO `callqueue` VALUES ('389', '442', '3', '2023-10-19 16:24:57', 'Y');
INSERT INTO `callqueue` VALUES ('390', '443', '3', '2023-10-19 16:25:07', 'Y');
INSERT INTO `callqueue` VALUES ('391', '444', '3', '2023-10-19 16:25:18', 'Y');
INSERT INTO `callqueue` VALUES ('392', '445', '2', '2023-10-19 16:25:27', 'Y');
INSERT INTO `callqueue` VALUES ('393', '447', '2', '2023-10-20 09:07:57', 'Y');
INSERT INTO `callqueue` VALUES ('394', '452', '2', '2023-10-20 09:08:15', 'Y');
INSERT INTO `callqueue` VALUES ('395', '448', '2', '2023-10-20 09:08:39', 'Y');
INSERT INTO `callqueue` VALUES ('396', '449', '2', '2023-10-20 09:08:59', 'Y');
INSERT INTO `callqueue` VALUES ('397', '450', '2', '2023-10-20 09:09:27', 'Y');
INSERT INTO `callqueue` VALUES ('398', '451', '2', '2023-10-20 09:09:30', 'Y');
INSERT INTO `callqueue` VALUES ('399', '447', '2', '2023-10-20 09:09:59', 'Y');
INSERT INTO `callqueue` VALUES ('400', '447', '2', '2023-10-20 09:27:57', 'Y');
INSERT INTO `callqueue` VALUES ('401', '453', '2', '2023-10-20 09:28:36', 'Y');
INSERT INTO `callqueue` VALUES ('402', '455', '2', '2023-10-20 09:30:57', 'Y');
INSERT INTO `callqueue` VALUES ('403', '454', '2', '2023-10-20 09:31:12', 'Y');
INSERT INTO `callqueue` VALUES ('404', '456', '2', '2023-10-20 09:31:26', 'Y');
INSERT INTO `callqueue` VALUES ('405', '456', '2', '2023-10-20 09:35:39', 'Y');
INSERT INTO `callqueue` VALUES ('406', '454', '2', '2023-10-20 09:35:40', 'Y');
INSERT INTO `callqueue` VALUES ('407', '453', '2', '2023-10-20 09:35:41', 'Y');
INSERT INTO `callqueue` VALUES ('408', '447', '1', '2023-10-20 09:41:47', 'Y');
INSERT INTO `callqueue` VALUES ('409', '447', '1', '2023-10-20 09:42:03', 'Y');
INSERT INTO `callqueue` VALUES ('410', '452', '1', '2023-10-20 09:50:50', 'Y');
INSERT INTO `callqueue` VALUES ('411', '455', '1', '2023-10-20 09:51:08', 'Y');
INSERT INTO `callqueue` VALUES ('412', '448', '1', '2023-10-20 09:51:22', 'Y');
INSERT INTO `callqueue` VALUES ('413', '448', '1', '2023-10-20 09:51:35', 'Y');
INSERT INTO `callqueue` VALUES ('414', '449', '1', '2023-10-20 09:51:51', 'Y');
INSERT INTO `callqueue` VALUES ('415', '450', '1', '2023-10-20 09:52:01', 'Y');
INSERT INTO `callqueue` VALUES ('416', '451', '1', '2023-10-20 09:52:13', 'Y');
INSERT INTO `callqueue` VALUES ('417', '453', '1', '2023-10-20 09:52:23', 'Y');
INSERT INTO `callqueue` VALUES ('418', '447', '1', '2023-10-20 10:23:05', 'Y');
INSERT INTO `callqueue` VALUES ('419', '447', '1', '2023-10-20 10:23:36', 'Y');
INSERT INTO `callqueue` VALUES ('420', '457', '1', '2023-10-20 10:42:30', 'Y');
INSERT INTO `callqueue` VALUES ('421', '458', '1', '2023-10-20 10:45:42', 'Y');
INSERT INTO `callqueue` VALUES ('422', '458', '1', '2023-10-20 10:50:23', 'Y');
INSERT INTO `callqueue` VALUES ('423', '459', '1', '2023-10-20 10:58:37', 'Y');
INSERT INTO `callqueue` VALUES ('424', '459', '1', '2023-10-20 10:59:15', 'Y');
INSERT INTO `callqueue` VALUES ('425', '460', '1', '2023-10-20 11:00:16', 'Y');
INSERT INTO `callqueue` VALUES ('426', '459', '1', '2023-10-20 11:00:28', 'Y');
INSERT INTO `callqueue` VALUES ('427', '459', '1', '2023-10-20 11:02:50', 'Y');
INSERT INTO `callqueue` VALUES ('428', '459', '1', '2023-10-20 11:03:55', 'Y');
INSERT INTO `callqueue` VALUES ('429', '447', '1', '2023-10-20 11:04:19', 'Y');
INSERT INTO `callqueue` VALUES ('430', '448', '1', '2023-10-20 11:04:36', 'Y');
INSERT INTO `callqueue` VALUES ('431', '448', '1', '2023-10-20 11:04:46', 'Y');
INSERT INTO `callqueue` VALUES ('432', '449', '1', '2023-10-20 11:04:47', 'Y');
INSERT INTO `callqueue` VALUES ('433', '450', '1', '2023-10-20 11:05:00', 'Y');
INSERT INTO `callqueue` VALUES ('434', '451', '1', '2023-10-20 11:05:01', 'Y');
INSERT INTO `callqueue` VALUES ('435', '461', '1', '2023-10-20 11:10:39', 'Y');
INSERT INTO `callqueue` VALUES ('436', '471', '1', '2023-10-20 11:10:51', 'Y');
INSERT INTO `callqueue` VALUES ('437', '472', '1', '2023-10-20 11:11:02', 'Y');
INSERT INTO `callqueue` VALUES ('438', '473', '1', '2023-10-20 11:11:13', 'Y');
INSERT INTO `callqueue` VALUES ('439', '462', '1', '2023-10-20 11:11:53', 'Y');

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
) ENGINE=InnoDB AUTO_INCREMENT=474 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of queue
-- ----------------------------
INSERT INTO `queue` VALUES ('438', '661018011900', '2', '1', '000013628', 'นายจำนงค์ สิทธิศรีจัน', 'ER(ฉุกเฉิน)', '2023-10-18', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('439', '661018104025', '2', '2', '000007931', 'น.ส.จริยาพร แก้วผนึก', 'หน้าห้องตรวจ', '2023-10-18', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('440', '661018052250', '2', '3', '000006144', 'นายฉัตรชัย สร้างแก้ว', 'ER(ฉุกเฉิน)', '2023-10-18', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('441', '661018061439', '1', '1', '000028936', 'นายไสว กับบุญ', 'เบาหวาน', '2023-10-18', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('442', '661019100312', '2', '1', '000047173', 'นายเอกชัย กิติราช', 'PCU', '2023-10-19', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('443', '661019071208', '2', '2', '000015591', 'นางน้อย คำสร้าง', 'เบาหวาน', '2023-10-19', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('444', '661019070638', '2', '3', '000021271', 'นางรุจี สุรดะนัย', 'เบาหวาน', '2023-10-19', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('445', '661019100313', '2', '4', '000007416', 'น.ส.นุชนาฏ มาตรี', 'ER(ฉุกเฉิน)', '2023-10-19', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('446', '661019064446', '2', '5', '000015755', 'นางอำไพล อานาม', 'เบาหวาน', '2023-10-19', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('447', '661020083747', '1', '1', '000032960', 'นายชาญวริญญ์ ดิเรกศิลป์', 'หน้าห้องตรวจ', '2023-10-20', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('448', '661020085730', '2', '1', '000007064', 'นายธีระพงษ์ น้อยอาสา', 'หน้าห้องตรวจ', '2023-10-20', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('449', '661020085354', '2', '2', '000015489', 'นายทิพกร ราศักดิ์', 'ห้องให้คำปรึกษา', '2023-10-20', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('450', '661020091909', '2', '3', '000047561', 'นางนวลศรี โพนบุตร', 'หน้าห้องตรวจ', '2023-10-20', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('451', '661020083317', '2', '4', '000027048', 'นางหก พันธ์ทอง', 'ห้องให้คำปรึกษา', '2023-10-20', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('452', '661020083608', '1', '2', '000035528', 'นายถิรเดช บัณฑิตวงศ์', 'หน้าห้องตรวจ', '2023-10-20', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('453', '661020084342', '2', '5', '000055161', 'นางสุกัลยา บัวมี', 'ทันตกรรม', '2023-10-20', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('454', '661020090340', '2', '6', '000019082', 'น.ส.แจ่มจันทร์ สนคณวงษ์', 'ห้องให้คำปรึกษา', '2023-10-20', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('455', '661020083234', '1', '3', '000012401', 'นายกิตติศักดิ์ เนียมจันทร์หอม', 'เบาหวาน', '2023-10-20', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('456', '661020085043', '2', '7', '000046604', 'ด.ช.ปารวี พิมบล', 'ทันตกรรม', '2023-10-20', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('457', '661020084342', '2', '8', '000055161', 'นางสุกัลยา บัวมี', 'ทันตกรรม', '2023-10-20', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('458', '661020094705', '2', '9', '000042664', 'นายฉลอง ราชวงษ์', 'ห้องให้คำปรึกษา', '2023-10-20', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('459', '661020090340', '2', '10', '000019082', 'น.ส.แจ่มจันทร์ สนคณวงษ์', 'ห้องให้คำปรึกษา', '2023-10-20', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('460', '661020083234', '2', '11', '000012401', 'นายกิตติศักดิ์ เนียมจันทร์หอม', 'เบาหวาน', '2023-10-20', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('461', '661020093437', '2', '12', '000042487', 'น.ส.นิยม รอดชมภู', 'หน้าห้องตรวจ', '2023-10-20', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('462', '661020092535', '2', '13', '000022069', 'นางทองย้อย ศรีหาวงษ์', 'ER(ฉุกเฉิน)', '2023-10-20', 'N', 'N', '01');
INSERT INTO `queue` VALUES ('463', '661020095216', '2', '14', '000019526', 'น.ส.สุนทร พันลำภักดิ์', 'หน้าห้องตรวจ', '2023-10-20', 'N', 'N', '02');
INSERT INTO `queue` VALUES ('464', '661020083747', '2', '15', '000032960', 'นายชาญวริญญ์ ดิเรกศิลป์', 'หน้าห้องตรวจ', '2023-10-20', 'N', 'N', '02');
INSERT INTO `queue` VALUES ('465', '661020102041', '2', '16', '000058175', 'นายประสิทธิ์ สวัสดิ์ราช', 'กลับบ้าน', '2023-10-20', 'N', 'N', '02');
INSERT INTO `queue` VALUES ('466', '661020100226', '2', '17', '000028863', 'นางเป นาระกุล', 'กายภาพบำบัด', '2023-10-20', 'N', 'N', '02');
INSERT INTO `queue` VALUES ('467', '661020085730', '2', '18', '000007064', 'นายธีระพงษ์ น้อยอาสา', 'หน้าห้องตรวจ', '2023-10-20', 'N', 'N', '02');
INSERT INTO `queue` VALUES ('468', '661020085354', '2', '19', '000015489', 'นายทิพกร ราศักดิ์', 'ห้องให้คำปรึกษา', '2023-10-20', 'N', 'N', '02');
INSERT INTO `queue` VALUES ('469', '661020100143', '2', '20', '000052395', 'นายพนมกรณ์ อ่อนสิน', 'ห้องให้คำปรึกษา', '2023-10-20', 'N', 'N', '02');
INSERT INTO `queue` VALUES ('470', '661020102813', '2', '21', '000026864', 'นายสาย ไสวงาม', 'PCU', '2023-10-20', 'N', 'N', '02');
INSERT INTO `queue` VALUES ('471', '661020095716', '2', '99', '000013150', 'นายสง่า ด้วงเสียว', 'ระบบทางเดินหายใจ', '2023-10-20', 'N', 'N', '02');
INSERT INTO `queue` VALUES ('472', '661020093817', '2', '100', '000016948', 'นายสาลี โลนุช', 'ความดันโลหิตสูง', '2023-10-20', 'N', 'N', '02');
INSERT INTO `queue` VALUES ('473', '661020083317', '2', '101', '000027048', 'นางหก พันธ์ทอง', 'ห้องให้คำปรึกษา', '2023-10-20', 'N', 'N', '01');

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
