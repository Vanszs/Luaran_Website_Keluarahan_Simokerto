-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: lapor_maling
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` enum('superadmin','admin','petugas') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'admin',
  `pending` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin_kelurahan1','simokerto123','Admin Simokerto','2025-07-02 14:21:23','superadmin',0),(2,'admin1','admin','admintest','2025-07-03 05:24:11','admin',0),(5,'admin','admin123','Bevantyo Satria Pinandhita','2025-07-05 04:54:07','admin',0),(7,'bu_lurah','12345678','Bu lurah','2025-07-07 04:47:54','superadmin',0),(8,'test1','test1','user test','2025-07-07 10:48:56','admin',0);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `message` text COLLATE utf8mb4_general_ci NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pelapor` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jenis_laporan` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `reporter_type` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  `status` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-01 12:45:07',NULL,NULL,'user','pending'),(2,2,'Jl. Kenanga No.22, Sidoarjo','Laporan kejadian di Jl. Kenanga No.22, Sidoarjo','2025-07-01 12:45:07',NULL,NULL,'user','pending'),(3,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 01:45:12',NULL,NULL,'user','pending'),(4,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 01:47:44',NULL,NULL,'user','pending'),(5,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 01:55:26',NULL,NULL,'user','pending'),(6,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 01:55:50',NULL,NULL,'user','pending'),(7,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 01:59:58',NULL,NULL,'user','pending'),(8,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:04:15',NULL,NULL,'user','pending'),(9,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:05:35',NULL,NULL,'user','pending'),(10,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:09:46',NULL,NULL,'user','pending'),(11,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:13:59',NULL,NULL,'user','pending'),(12,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:14:42',NULL,NULL,'user','pending'),(13,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:19:40',NULL,NULL,'user','pending'),(14,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:21:09',NULL,NULL,'user','pending'),(15,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:23:54',NULL,NULL,'user','pending'),(16,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:26:35',NULL,NULL,'user','pending'),(17,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:28:45',NULL,NULL,'user','pending'),(18,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:39:47',NULL,NULL,'user','pending'),(19,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 03:19:36',NULL,NULL,'user','pending'),(20,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 03:21:28',NULL,NULL,'user','pending'),(21,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 03:46:26',NULL,NULL,'user','pending'),(22,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 03:46:36',NULL,NULL,'user','pending'),(23,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 03:54:58',NULL,NULL,'user','pending'),(24,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 03:57:40',NULL,NULL,'user','pending'),(25,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 03:58:18',NULL,NULL,'user','pending'),(26,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 04:00:26',NULL,NULL,'user','pending'),(27,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 04:00:51',NULL,NULL,'user','pending'),(28,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 04:02:54',NULL,NULL,'user','pending'),(29,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 04:44:56',NULL,NULL,'user','pending'),(30,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 04:53:29',NULL,NULL,'user','pending'),(31,2,'Jl. Kenanga No.22, Sidoarjo','Laporan kejadian di Jl. Kenanga No.22, Sidoarjo','2025-07-02 05:18:17',NULL,NULL,'user','pending'),(32,2,'Jl. Kenanga No.22, Sidoarjo','Laporan kejadian di Jl. Kenanga No.22, Sidoarjo','2025-07-02 06:01:56',NULL,NULL,'user','pending'),(33,2,'Jl. Kenanga No.22, Sidoarjo','Laporan kejadian di Jl. Kenanga No.22, Sidoarjo','2025-07-02 06:12:03',NULL,NULL,'user','pending'),(34,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 06:23:36',NULL,NULL,'user','pending'),(35,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 06:55:58',NULL,NULL,'user','pending'),(37,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-04 06:36:35',NULL,NULL,'user','pending'),(38,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-04 06:36:55',NULL,NULL,'user','pending'),(39,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-05 08:31:57',NULL,NULL,'user','pending'),(40,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-05 08:32:29',NULL,NULL,'user','pending'),(45,6,'gapunya alamat',NULL,'2025-07-06 13:08:16',NULL,NULL,'user','pending'),(46,7,'-',NULL,'2025-07-07 04:36:18',NULL,NULL,'user','pending'),(47,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 03:04:09',NULL,NULL,'user','pending'),(48,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 03:04:32',NULL,NULL,'user','pending'),(49,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 03:04:48',NULL,NULL,'user','pending'),(50,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 03:06:02',NULL,NULL,'user','pending'),(51,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 03:14:15',NULL,NULL,'user','pending'),(52,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 04:07:51',NULL,'kebakaran','user','pending'),(53,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 04:08:10',NULL,'kemalingan','user','pending'),(54,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 04:22:37',NULL,'kemalingan','user','pending'),(55,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 04:22:58',NULL,'kemalingan','user','pending'),(56,1,'wadawdwd RW 1',NULL,'2025-07-09 04:26:40',NULL,'kemalingan','user','pending'),(57,1,'wdwqddwqdw RW 1',NULL,'2025-07-09 04:34:49',NULL,'kemalingan','user','pending'),(58,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 04:53:30',NULL,'kemalingan','user','pending'),(59,1,'awdwadawd RW 1',NULL,'2025-07-09 04:53:41',NULL,'tawuran','user','pending'),(60,1,'jalan jalan RW 3',NULL,'2025-07-09 09:12:39',NULL,'kemalingan','user','pending'),(61,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 10:08:45',NULL,'kebakaran','user','pending'),(62,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 10:08:59',NULL,'kemalingan','user','pending'),(63,1,'wqdqwddfds RW 3',NULL,'2025-07-09 10:09:14',NULL,'kemalingan','user','pending'),(64,1,'wadawda RW 3',NULL,'2025-07-09 10:16:59',NULL,'kemalingan','user','pending'),(65,1,'wdsadaw RW 3',NULL,'2025-07-09 10:26:37',NULL,'tawuran','user','pending'),(66,1,'efef',NULL,'2025-07-09 14:02:51',NULL,'kemalingan','user','pending'),(67,1,'ff',NULL,'2025-07-09 14:15:14',NULL,'kemalingan','user','pending'),(68,1,'wdwd',NULL,'2025-07-09 14:21:34',NULL,'kemalingan','user','pending'),(69,1,'fefe',NULL,'2025-07-09 15:10:04',NULL,'kemalingan','user','pending'),(70,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 15:16:10',NULL,'tawuran','user','pending'),(71,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 15:16:38',NULL,'jaguh','user','pending'),(72,2,'Jl. Kenanga No.22, Sidoarjo',NULL,'2025-07-09 15:39:07',NULL,'jatuh','user','pending'),(73,1,'esfef',NULL,'2025-07-09 15:44:22',NULL,'kemalingan','user','pending'),(74,1,'efe',NULL,'2025-07-09 16:32:17',NULL,'kemalingan','admin','pending'),(75,1,'fsefsef',NULL,'2025-07-09 16:32:50',NULL,'kemalingan','admin','pending'),(76,1,'fgddgdf',NULL,'2025-07-09 16:35:54',NULL,'kemalingan','admin','pending'),(77,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 17:11:59',NULL,'ngantuk','user','pending'),(78,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 18:19:39',NULL,'kemalingan','user','pending'),(79,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 18:20:04',NULL,'kebakaran','user','pending'),(80,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-09 18:22:05',NULL,'kemalingan','user','pending'),(81,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 01:46:42',NULL,'kemalingan','user','pending'),(82,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 02:08:05',NULL,'kemalingan','user','pending'),(83,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 02:08:20',NULL,'kemalingan','user','pending'),(84,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 02:09:24',NULL,'kemalingan','user','pending'),(85,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 02:10:14',NULL,'kemalingan','user','pending'),(86,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 02:47:05',NULL,'kemalingan','user','pending'),(87,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 04:24:39',NULL,'kemalingan','user','pending'),(88,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 04:25:05',NULL,'kemalingan','user','pending'),(89,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 04:59:47',NULL,'kemalingan','user','pending'),(90,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 05:00:26',NULL,'kemalingan','user','pending'),(91,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 05:00:44',NULL,'kemalingan','user','pending'),(92,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 05:01:05',NULL,'kemalingan','user','pending'),(93,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 05:01:18',NULL,'tawuran','user','pending'),(94,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 05:01:42',NULL,'kebakaran','user','pending'),(95,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 05:04:00',NULL,'kemalingan','user','pending'),(96,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 05:13:01',NULL,'kemalingan','user','pending'),(97,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 05:13:41',NULL,'kemalingan','user','pending'),(98,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 05:13:53',NULL,'kemalingan','user','pending'),(99,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 12:19:54',NULL,'kemalingan','user','pending'),(100,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 12:58:12',NULL,'kemalingan','user','pending'),(101,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 12:59:10',NULL,'kemalingan','user','pending'),(102,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 12:59:23',NULL,'kemalingan','user','pending'),(103,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 12:59:37',NULL,'kemalingan','user','pending'),(104,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 12:59:49',NULL,'kemalingan','user','pending'),(105,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 13:00:03',NULL,'kemalingan','user','pending'),(106,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 13:00:27',NULL,'tawuran','user','pending'),(107,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 13:00:42',NULL,'hmmm','user','pending'),(108,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 13:06:16',NULL,'kemalingan','user','pending'),(109,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-10 13:06:39',NULL,'tawuran','user','pending');
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user1','pass1','Siti Aminah','Jl. Melati No.10, Surabaya','2025-07-01 12:45:07',NULL),(2,'user2','pass2','Budi Santoso','Jl. Kenanga No.22, Sidoarjo','2025-07-01 12:45:07',NULL),(3,'warga3','123456','Rina Wija','Jl. Anggrek No.5, Gresik','2025-07-01 12:45:07',NULL),(6,'melisa','1234567890','Meylisa Elvioraa','gapunya alamat','2025-07-06 07:02:56',NULL),(7,'bu_lurah','12345678','Bu lurah','-','2025-07-07 04:35:18',NULL),(8,'warga4','pass4','Vanszs','rw 3 rt 1','2025-07-09 15:57:08',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-10  8:11:03
