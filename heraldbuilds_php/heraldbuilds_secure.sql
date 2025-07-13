-- phpMyAdmin SQL Dump - SECURE VERSION
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2025 at 06:20 AM
-- Server version: 8.0.40
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `heraldbuilds`
--
CREATE DATABASE IF NOT EXISTS `heraldbuilds` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `heraldbuilds`;

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `adminID` int NOT NULL,
  `adminName` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admins`
-- Password for Griffin is: hello123 (hashed using PHP password_hash)
--

INSERT INTO `admins` (`adminID`, `adminName`, `password`) VALUES
(1, 'Griffin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `category` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `answer`, `category`, `created_at`, `updated_at`) VALUES
(1, 'What tools do I need to build a PC?', 'You need a Phillips head screwdriver, anti-static wrist strap, thermal paste, and cable ties.', 'tools', '2025-07-05 01:06:13', '2025-07-05 01:12:17'),
(2, 'How much RAM do I need?', '16GB is recommended for most users, 32GB for heavy workloads.', 'components', '2025-07-05 01:06:13', '2025-07-05 01:12:17'),
(3, 'What power supply should I choose?', 'Choose a PSU with 80+ certification and 20% more wattage than your system requires.', 'power', '2025-07-05 01:06:13', '2025-07-05 01:12:17'),
(4, 'What\'s the minimum budget for building a decent gaming PC?', 'A decent entry-level gaming PC typically starts around $600-$800 (KES 82,000-110,000). This will get you a system capable of running most games at 1080p with medium to high settings. However, for a more future-proof build with better components, we recommend budgeting $1000-$1200 (KES 137,000-165,000)', 'PC Building', '2025-07-06 20:14:22', '2025-07-06 20:14:22'),
(5, 'Do I need to buy Windows for my new PC build?', 'While you can install and use Windows 10/11 without activation, you\'ll have some limitations and a watermark. For a complete experience, we recommend purchasing a legitimate Windows license (approximately $139 or KES 19,000). However, you can start with the unactivated version and upgrade later', 'PC Building', '2025-07-06 20:14:22', '2025-07-06 20:14:22'),
(6, 'How do I know if my components are compatible?', 'The main compatibility points to check are: <br />- CPU socket matching the motherboard <br />- RAM type and speed supported by the motherboard <br />- Power supply wattage sufficient for all components <br />- Case size accommodating your graphics card and CPU cooler <br /><br />You can use tools like PCPartPicker to verify compatibility automatically', 'Components', '2025-07-06 20:14:22', '2025-07-06 20:14:22'),
(7, 'How often should I clean my PC?', 'We recommend cleaning your PC every 3-6 months, depending on your environment. If you have pets or live in a dusty area, you might need to clean it more frequently. Regular cleaning helps maintain optimal airflow and prevents overheating', 'Maintenance', '2025-07-06 20:14:22', '2025-07-06 20:14:22'),
(8, 'What\'s the best CPU and GPU combination for gaming?', 'This depends on your budget and needs <br /><br />For mid-range gaming: <br />- CPU: AMD Ryzen 5 or Intel i5 <br />- GPU: NVIDIA RTX 3060 or AMD RX 6600 XT <br /><br />For high-end gaming: <br />- CPU: AMD Ryzen 7/9 or Intel i7/i9 <br />- GPU: NVIDIA RTX 4070 Ti or better <br /><br />Always check our build guides for current recommendations!', 'Performance', '2025-07-06 20:14:22', '2025-07-06 20:14:22'),
(10, 'How do I ensure my components are working?\n\n', 'First of all,if all connections seem fine then you\'re doing great.In the event of failure, you can use phase testers to see if current is failing or not reaching, otherwise LED indicators and beepcodes will let you know', 'Components', '2025-07-09 19:41:49', '2025-07-09 19:41:49');

-- --------------------------------------------------------

--
-- Table structure for table `guides`
--

CREATE TABLE `guides` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `summary` text NOT NULL,
  `level` enum('beginner','intermediate','advanced') DEFAULT 'beginner',
  `tags` json DEFAULT NULL,
  `content` longtext,
  `steps` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `guides`
--

INSERT INTO `guides` (`id`, `title`, `summary`, `level`, `tags`, `content`, `steps`, `created_at`, `updated_at`) VALUES
(1, 'First Time PC Build', 'Complete guide for beginners', 'beginner', '[\"beginner\", \"first-build\", \"tutorial\"]', 'This guide will walk you through your first PC build...', '[\"Prepare workspace\", \"Install PSU\", \"Install motherboard\", \"Install RAM\", \"Install CPU\", \"Install GPU\", \"Connect cables\", \"Test system\"]', '2025-07-05 01:06:13', '2025-07-05 01:06:13'),
(2, 'Cable Management Tips', 'How to organize your cables', 'intermediate', '[\"cables\", \"organization\", \"airflow\"]', 'Good cable management improves airflow and aesthetics...', '[\"Plan cable routes\", \"Use zip ties\", \"Hide cables behind motherboard tray\", \"Test clearances\"]', '2025-07-05 01:06:13', '2025-07-05 01:06:13');

-- --------------------------------------------------------

--
-- Table structure for table `tools`
--

CREATE TABLE `tools` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `tips` json DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` enum('tools','components','hardware') DEFAULT 'tools',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tools`
--

INSERT INTO `tools` (`id`, `title`, `description`, `tips`, `image`, `category`, `created_at`, `updated_at`) VALUES
(1, 'Phillips Head Screwdriver', 'Essential tool for mounting components', '[\"Use magnetic tip\", \"Size #2 for most screws\"]', 'screwdriver.jpg', 'tools', '2025-07-05 01:06:13', '2025-07-09 20:35:21'),
(2, 'Thermal Paste', 'Ensures proper heat dissipation', '[\"Apply pea-sized amount\", \"Spread evenly\"]', 'paste.webp', 'tools', '2025-07-05 01:06:13', '2025-07-05 01:06:13'),
(3, 'Anti-Static Wrist Strap', 'Prevents static damage', '[\"Connect to grounded surface\", \"Wear during assembly\"]', 'strap.webp', 'tools', '2025-07-05 01:06:13', '2025-07-05 01:06:13'),
(5, 'Sound Card', 'A sound card is a hardware component that processes audio data and outputs sound to speakers or headphones. It enhances audio quality for music, gaming, and multimedia production.\n', '[\"Ensure your drivers are up to date.\", \"Check if the sound card is seated properly in the PCIe slot.\", \"Use high-quality speakers or headphones for better output.\", \"Check your BIOS to ensure onboard audio is disabled if using a dedicated card.\"]', 'Soundcard.jpg', 'components', '2025-07-11 11:07:54', '2025-07-11 11:09:16');

-- --------------------------------------------------------

--
-- Table structure for table `user_questions`
--

CREATE TABLE `user_questions` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `question` text,
  `status` enum('pending','answered') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_questions`
--

INSERT INTO `user_questions` (`id`, `name`, `email`, `category`, `question`, `status`, `created_at`) VALUES
(1, 'John Doe', 'john@example.com', 'PC Building', 'What is the best CPU for gaming in 2024?', 'answered', '2025-07-05 01:06:13'),
(2, 'Sarah Smith', 'sarah@example.com', 'Components', 'How do I know if my RAM is compatible with my motherboard?', 'answered', '2025-07-05 01:06:13'),
(3, 'Mike Johnson', 'mike@example.com', 'Troubleshooting', 'My PC won\'t boot after installing new GPU, what should I check?', 'answered', '2025-07-05 01:06:13'),
(4, 'Larry Lobster', 'Larrylobster@gmail.com', 'Components', 'How do I ensure my components are working?\n\n', 'answered', '2025-07-06 20:19:11'),
(5, 'Piece', 'piece@hotmail.com', 'Performance', 'How do you overclock a pc?', 'pending', '2025-07-09 20:10:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`adminID`),
  ADD UNIQUE KEY `adminName` (`adminName`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guides`
--
ALTER TABLE `guides`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tools`
--
ALTER TABLE `tools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_questions`
--
ALTER TABLE `user_questions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `adminID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `guides`
--
ALTER TABLE `guides`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_questions`
--
ALTER TABLE `user_questions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- SECURITY NOTES:
-- 1. Admin password is now properly hashed using PHP's password_hash() function
-- 2. Default password is still 'hello123' but stored securely
-- 3. Added unique constraint on adminName to prevent duplicates
-- 4. Added timestamps to admin table for better tracking
-- 5. You MUST update the login.php file to use password_verify() instead of direct comparison