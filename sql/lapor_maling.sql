-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Database: `lapor_maling`
--

CREATE DATABASE IF NOT EXISTS lapor_maling;
USE lapor_maling;

-- Table structure for table `admin`
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` enum('superadmin','admin') NOT NULL DEFAULT 'admin',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `admin` (`id`, `username`, `password`, `name`, `created_at`, `role`) VALUES
(1, 'admin_kelurahan1', 'simokerto123', 'Admin Simokerto', '2025-07-02 14:21:23', 'superadmin'),
(2, 'admin1', '12345678', 'admintest', '2025-07-03 05:24:11', 'admin');

-- Table structure for table `users`
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `username`, `password`, `name`, `address`, `created_at`) VALUES
(1, 'user1', 'pass1', 'Siti Aminah', 'Jl. Melati No.10, Surabaya', '2025-07-01 12:45:07'),
(2, 'user2', 'pass2', 'Budi Santoso', 'Jl. Kenanga No.22, Sidoarjo', '2025-07-01 12:45:07'),
(3, 'warga3', '123456', 'Rina Wija', 'Jl. Anggrek No.5, Gresik', '2025-07-01 12:45:07');

-- Table structure for table `reports`
CREATE TABLE IF NOT EXISTS `reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `reports` (`id`, `user_id`, `address`, `description`, `created_at`) VALUES
(1, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-01 12:45:07'),
(2, 2, 'Jl. Kenanga No.22, Sidoarjo', 'Laporan kejadian di Jl. Kenanga No.22, Sidoarjo', '2025-07-01 12:45:07'),
(3, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 01:45:12'),
(4, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 01:47:44'),
(5, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 01:55:26'),
(6, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 01:55:50'),
(7, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 01:59:58'),
(8, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 02:04:15'),
(9, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 02:05:35'),
(10, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 02:09:46'),
(11, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 02:13:59'),
(12, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 02:14:42'),
(13, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 02:19:40'),
(14, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 02:21:09'),
(15, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 02:23:54'),
(16, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 02:26:35'),
(17, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 02:28:45'),
(18, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 02:39:47'),
(19, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 03:19:36'),
(20, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 03:21:28'),
(21, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 03:46:26'),
(22, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 03:46:36'),
(23, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 03:54:58'),
(24, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 03:57:40'),
(25, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 03:58:18'),
(26, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 04:00:26'),
(27, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 04:00:51'),
(28, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 04:02:54'),
(29, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 04:44:56'),
(30, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 04:53:29'),
(31, 2, 'Jl. Kenanga No.22, Sidoarjo', 'Laporan kejadian di Jl. Kenanga No.22, Sidoarjo', '2025-07-02 05:18:17'),
(32, 2, 'Jl. Kenanga No.22, Sidoarjo', 'Laporan kejadian di Jl. Kenanga No.22, Sidoarjo', '2025-07-02 06:01:56'),
(33, 2, 'Jl. Kenanga No.22, Sidoarjo', 'Laporan kejadian di Jl. Kenanga No.22, Sidoarjo', '2025-07-02 06:12:03'),
(34, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 06:23:36'),
(35, 1, 'Jl. Melati No.10, Surabaya', 'Laporan kejadian di Jl. Melati No.10, Surabaya', '2025-07-02 06:55:58');

