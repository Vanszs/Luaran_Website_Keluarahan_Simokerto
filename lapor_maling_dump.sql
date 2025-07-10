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
  `role` enum('superadmin','admin') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'admin',
  `pending` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin_kelurahan1','simokerto123','Admin Simokerto','2025-07-02 14:21:23','superadmin',0),(2,'admin1','admin','admintest','2025-07-03 05:24:11','admin',0),(3,'bevan','simokerto123','admin_kelurahan1','2025-07-03 17:30:27','admin',0),(4,'rayhanfatur','rayhan0021','Rayhan Fatur Maulana','2025-07-04 07:33:32','admin',0);
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
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-01 12:45:07'),(2,2,'Jl. Kenanga No.22, Sidoarjo','Laporan kejadian di Jl. Kenanga No.22, Sidoarjo','2025-07-01 12:45:07'),(3,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 01:45:12'),(4,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 01:47:44'),(5,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 01:55:26'),(6,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 01:55:50'),(7,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 01:59:58'),(8,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:04:15'),(9,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:05:35'),(10,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:09:46'),(11,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:13:59'),(12,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:14:42'),(13,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:19:40'),(14,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:21:09'),(15,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:23:54'),(16,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:26:35'),(17,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:28:45'),(18,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 02:39:47'),(19,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 03:19:36'),(20,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 03:21:28'),(21,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 03:46:26'),(22,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 03:46:36'),(23,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 03:54:58'),(24,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 03:57:40'),(25,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 03:58:18'),(26,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 04:00:26'),(27,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 04:00:51'),(28,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 04:02:54'),(29,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 04:44:56'),(30,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 04:53:29'),(31,2,'Jl. Kenanga No.22, Sidoarjo','Laporan kejadian di Jl. Kenanga No.22, Sidoarjo','2025-07-02 05:18:17'),(32,2,'Jl. Kenanga No.22, Sidoarjo','Laporan kejadian di Jl. Kenanga No.22, Sidoarjo','2025-07-02 06:01:56'),(33,2,'Jl. Kenanga No.22, Sidoarjo','Laporan kejadian di Jl. Kenanga No.22, Sidoarjo','2025-07-02 06:12:03'),(34,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 06:23:36'),(35,1,'Jl. Melati No.10, Surabaya','Laporan kejadian di Jl. Melati No.10, Surabaya','2025-07-02 06:55:58'),(37,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-04 06:36:35'),(38,1,'Jl. Melati No.10, Surabaya',NULL,'2025-07-04 06:36:55');
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user1','pass1','Siti Aminahhh','Jl. Melati No.10, Surabaya','2025-07-01 12:45:07'),(2,'user2','pass2','Budi Santoso','Jl. Kenanga No.22, Sidoarjo','2025-07-01 12:45:07'),(3,'warga3','123456','Rina Wija','Jl. Anggrek No.5, Gresik','2025-07-01 12:45:07');
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

-- Dump completed on 2025-07-05  6:38:23
