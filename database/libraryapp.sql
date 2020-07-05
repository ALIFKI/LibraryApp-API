-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Waktu pembuatan: 05 Jul 2020 pada 17.41
-- Versi server: 5.7.21
-- Versi PHP: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `libraryapp`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `authors`
--

DROP TABLE IF EXISTS `authors`;
CREATE TABLE IF NOT EXISTS `authors` (
  `id_author` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_author`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `authors`
--

INSERT INTO `authors` (`id_author`, `author`, `created_at`, `updated_at`) VALUES
(2, 'ALIFKI', '2020-06-09 05:12:06', '2020-06-09 05:12:06'),
(4, 'J.K Rowling', '2020-06-10 11:07:30', '2020-06-10 11:07:30'),
(6, 'Andrea Hirata', '2020-06-10 11:07:49', '2020-06-17 12:45:50'),
(7, 'J.R.R Tolkien', '2020-06-10 12:07:18', '2020-06-11 04:05:28'),
(8, 'Raditya Dika', '2020-06-17 12:38:59', '2020-06-17 12:38:59');

-- --------------------------------------------------------

--
-- Struktur dari tabel `books`
--

DROP TABLE IF EXISTS `books`;
CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `id_genre` int(11) NOT NULL,
  `id_author` int(10) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `genre` (`id_genre`,`id_author`),
  KEY `id_author` (`id_author`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `books`
--

INSERT INTO `books` (`id`, `title`, `description`, `image`, `id_genre`, `id_author`, `status`, `created_at`, `updated_at`) VALUES
(33, 'A book edite v2', '<p><span style=\"background-color: #e03e2d;\"><strong>loremipsym</strong></span></p>', '1055294498647932_41939990._SY475_.jpg', 10, 6, 'Available', '2020-06-16 10:41:11', '2020-07-02 07:37:21'),
(56, 'Harry potter and the death hollow', '<p><span class=\"notranslate\"><em><strong>Harry Potter</strong></em>&nbsp;is a series of&nbsp;<a title=\"Fantasy literature\" href=\"https://translate.googleusercontent.com/translate_c?client=srp&amp;depth=1&amp;hl=id&amp;prev=search&amp;rurl=translate.google.com&amp;sl=id&amp;sp=nmt4&amp;tl=en&amp;u=https://en.m.wikipedia.org/wiki/Fantasy_literature&amp;usg=ALkJrhhatT63ZiygIZAACz6urJsnkKP9dQ\">fantasy novels</a>&nbsp;written by British author&nbsp;<a title=\"J. K. Rowling\" href=\"https://translate.googleusercontent.com/translate_c?client=srp&amp;depth=1&amp;hl=id&amp;prev=search&amp;rurl=translate.google.com&amp;sl=id&amp;sp=nmt4&amp;tl=en&amp;u=https://en.m.wikipedia.org/wiki/J._K._Rowling&amp;usg=ALkJrhi2nLvR22tMO1n7YzIblxHCFNmJFQ\">JK Rowling</a>&nbsp;.</span>&nbsp;<span class=\"notranslate\">The novels chronicle the lives of a young&nbsp;<a title=\"Magician (fantasy)\" href=\"https://translate.googleusercontent.com/translate_c?client=srp&amp;depth=1&amp;hl=id&amp;prev=search&amp;rurl=translate.google.com&amp;sl=id&amp;sp=nmt4&amp;tl=en&amp;u=https://en.m.wikipedia.org/wiki/Magician_(fantasy)&amp;usg=ALkJrhivUFG5_U00tX4tpMpp_8K5z8xuxA\">wizard</a>&nbsp;,&nbsp;<a title=\"Harry Potter (character)\" href=\"https://translate.googleusercontent.com/translate_c?client=srp&amp;depth=1&amp;hl=id&amp;prev=search&amp;rurl=translate.google.com&amp;sl=id&amp;sp=nmt4&amp;tl=en&amp;u=https://en.m.wikipedia.org/wiki/Harry_Potter_(character)&amp;usg=ALkJrhhpyBUGgWAzk1MOH9EI-DuBVLUbuA\">Harry Potter</a>&nbsp;, and his friends&nbsp;<a title=\"Hermione Granger\" href=\"https://translate.googleusercontent.com/translate_c?client=srp&amp;depth=1&amp;hl=id&amp;prev=search&amp;rurl=translate.google.com&amp;sl=id&amp;sp=nmt4&amp;tl=en&amp;u=https://en.m.wikipedia.org/wiki/Hermione_Granger&amp;usg=ALkJrhi9KNamY9IsNHmPGpk8xEG-hA2ZtA\">Hermione Granger</a>&nbsp;and&nbsp;<a title=\"Ron Weasley\" href=\"https://translate.googleusercontent.com/translate_c?client=srp&amp;depth=1&amp;hl=id&amp;prev=search&amp;rurl=translate.google.com&amp;sl=id&amp;sp=nmt4&amp;tl=en&amp;u=https://en.m.wikipedia.org/wiki/Ron_Weasley&amp;usg=ALkJrhg20jVgwiLcA0WuAjLVZwyykmeKIg\">Ron Weasley</a>&nbsp;, all of whom are students at&nbsp;<a class=\"mw-redirect\" title=\"Hogwarts School of Witchcraft and Wizardry\" href=\"https://translate.googleusercontent.com/translate_c?client=srp&amp;depth=1&amp;hl=id&amp;prev=search&amp;rurl=translate.google.com&amp;sl=id&amp;sp=nmt4&amp;tl=en&amp;u=https://en.m.wikipedia.org/wiki/Hogwarts_School_of_Witchcraft_and_Wizardry&amp;usg=ALkJrhivVQp0C7t_blpelx17NW12oWdQZA\">Hogwarts School of Witchcraft and Wizardry</a>&nbsp;.</span>&nbsp;<span class=\"notranslate\">The main&nbsp;<a title=\"Story arc\" href=\"https://translate.googleusercontent.com/translate_c?client=srp&amp;depth=1&amp;hl=id&amp;prev=search&amp;rurl=translate.google.com&amp;sl=id&amp;sp=nmt4&amp;tl=en&amp;u=https://en.m.wikipedia.org/wiki/Story_arc&amp;usg=ALkJrhiLhaOrJO_E4ryTzyR_4VUm8bnOWg\">story arc</a>&nbsp;concerns Harry\'s struggle against&nbsp;<a title=\"Lord Voldemort\" href=\"https://translate.googleusercontent.com/translate_c?client=srp&amp;depth=1&amp;hl=id&amp;prev=search&amp;rurl=translate.google.com&amp;sl=id&amp;sp=nmt4&amp;tl=en&amp;u=https://en.m.wikipedia.org/wiki/Lord_Voldemort&amp;usg=ALkJrhjR65iGAToEbIJoEB4RWMjfnRQkfA\">Lord Voldemort</a>&nbsp;, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the&nbsp;<a title=\"Ministry of Magic\" href=\"https://translate.googleusercontent.com/translate_c?client=srp&amp;depth=1&amp;hl=id&amp;prev=search&amp;rurl=translate.google.com&amp;sl=id&amp;sp=nmt4&amp;tl=en&amp;u=https://en.m.wikipedia.org/wiki/Ministry_of_Magic&amp;usg=ALkJrhiEx8JxC7OE4YXlQrFrhMUbfDTmfg\">Ministry of Magic</a>&nbsp;and subject to all wizards and&nbsp;<a title=\"Muggles\" href=\"https://translate.googleusercontent.com/translate_c?client=srp&amp;depth=1&amp;hl=id&amp;prev=search&amp;rurl=translate.google.com&amp;sl=id&amp;sp=nmt4&amp;tl=en&amp;u=https://en.m.wikipedia.org/wiki/Muggle&amp;usg=ALkJrhhF1d9_-twaOP5rCTVxhw35LOspOQ\">Muggles</a>&nbsp;(non-magical people).</span></p>', '6400650396540024_MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg', 3, 4, 'Available', '2020-06-30 17:03:41', '2020-07-02 06:58:55'),
(59, 'new book', '<p>dsadasda</p>', '8482650151225536_41939990._SY475_.jpg', 7, 4, 'Available', '2020-07-01 09:23:20', '2020-07-02 06:59:04'),
(60, 'New book Copy', '<p>dsadsa</p>', '7468120997394344_41939990._SY475_.jpg', 10, 6, 'Available', '2020-07-01 09:24:53', '2020-07-01 09:24:53'),
(61, 'dummy edite now now', '<p>dasdsdsa</p>', '3419267381436971_MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg', 12, 2, 'Available', '2020-07-01 14:48:19', '2020-07-02 06:59:36'),
(62, 'dummy  edite search', '<p>dasdsda</p>', '0733963372838438_41939990._SY475_.jpg', 5, 6, 'Available', '2020-07-01 14:49:49', '2020-07-02 06:59:41'),
(63, 'test book', '<p>buku tets uth dak pdas orab a ds&nbsp;</p>', '0079329626472444_MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg', 9, 2, 'Available', '2020-07-01 19:49:54', '2020-07-01 19:49:54'),
(64, 'Dummy', '<p>dasdsdad</p>', '0290835254344401_41939990._SY475_.jpg', 12, 4, 'Available', '2020-07-01 20:05:17', '2020-07-02 06:59:57'),
(65, 'Harry Potter', 'lorem ipsum', '1820708398310011_MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg', 2, 7, 'Available', '2020-07-01 20:33:39', '2020-07-02 02:20:16'),
(67, 'New Book', '<p>ini Deskripsi buku baru yang di buat</p>', '5642222855958893_MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg', 7, 8, 'Available', '2020-07-02 02:22:10', '2020-07-02 07:00:04'),
(68, 'New Book 2', '<p>dasdsadas</p>', '5210246574940809_MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg', 7, 8, 'Available', '2020-07-02 02:22:53', '2020-07-02 07:00:16');

-- --------------------------------------------------------

--
-- Struktur dari tabel `genres`
--

DROP TABLE IF EXISTS `genres`;
CREATE TABLE IF NOT EXISTS `genres` (
  `id_genre` int(11) NOT NULL AUTO_INCREMENT,
  `genre` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_genre`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `genres`
--

INSERT INTO `genres` (`id_genre`, `genre`, `created_at`, `updated_at`) VALUES
(2, 'Adventure', '2020-06-10 04:13:03', '2020-06-10 04:13:03'),
(3, 'Fantasy', '2020-06-10 05:07:04', '2020-06-10 05:07:04'),
(5, 'Humor', '2020-06-10 05:07:26', '2020-06-18 01:46:53'),
(7, 'Nasional', '2020-06-10 05:07:56', '2020-06-10 05:07:56'),
(9, 'Remaja', '2020-06-10 08:51:18', '2020-06-17 12:36:16'),
(10, 'Novel', '2020-06-11 04:16:47', '2020-06-11 04:16:47'),
(11, 'Komedi', '2020-06-17 12:35:04', '2020-06-17 12:35:04'),
(12, 'Horor', '2020-06-18 01:45:43', '2020-06-18 01:45:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_users` int(11) NOT NULL,
  `id_admin` int(11) DEFAULT NULL,
  `id_books` int(11) NOT NULL,
  `periode_of_time` int(11) NOT NULL,
  `borrowing_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `return_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_users` (`id_users`),
  KEY `id_admin` (`id_admin`,`id_books`),
  KEY `id_books` (`id_books`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `id_users`, `id_admin`, `id_books`, `periode_of_time`, `borrowing_date`, `return_date`, `created_at`, `updated_at`) VALUES
(8, 6, NULL, 33, 2, '2020-06-17 05:22:24', '2020-06-17 13:19:28', '2020-06-17 05:22:24', '2020-06-17 13:19:28'),
(13, 18, NULL, 33, 2, '2020-07-02 02:11:39', NULL, '2020-07-02 02:11:39', '2020-07-02 02:11:39'),
(14, 18, NULL, 56, 2, '2020-07-02 02:14:46', NULL, '2020-07-02 02:14:46', '2020-07-02 02:14:46'),
(15, 18, NULL, 64, 2, '2020-07-02 02:15:58', NULL, '2020-07-02 02:15:58', '2020-07-02 02:15:58'),
(16, 18, NULL, 33, 2, '2020-07-02 07:32:00', NULL, '2020-07-02 07:32:00', '2020-07-02 07:32:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` int(11) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `role` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(5, 'Anisa', 'mockingbirds233@gmail.com', 1, NULL, '$2b$10$A8Ho9ZxGTR6AC0GdKa93FOpq5Q0XSjJimfG7s6sDpWouXZLg0Q70W', NULL, '2020-06-13 12:46:50', '2020-06-13 12:46:50'),
(6, 'Alifki', 'alifki81@gmail.com', 2, NULL, '$2b$10$WoVprAUUbF8oGa6ERrZqp.Dwq9bNih6d95tFOXBoCsD0/.0TGnVHq', NULL, '2020-06-15 09:01:28', '2020-06-15 09:01:28'),
(7, 'User Test', 'user@gmail.com', 2, NULL, '$2b$10$p/EOqAMJXh3dqdxX6T392e2GVdqVdpk.bttahtlUKBxxOxngSajme', NULL, '2020-06-17 12:46:57', '2020-06-17 12:46:57'),
(8, 'Arka', 'demy@mail.com', 2, NULL, '$2b$10$oNW8bmcgUYTiizLG4OjV7e5Sj8eUpXcpeuTEziifmZDv9w.LPWsrm', NULL, '2020-06-18 01:53:32', '2020-06-18 01:53:32'),
(9, 'noval', 'noval@mail.com', 2, NULL, '$2b$10$9LMrXLcGXvNmWmvAGwFF7.41T.cOrlDF7U.vFOPDd.TEfUDKiuqla', NULL, '2020-06-18 04:33:09', '2020-06-18 04:33:09'),
(10, 'Anisa', 'admin@admin.com', 1, NULL, '$2b$10$tSMZVcNQrg2t5/ifXO2kg.r.gXI53xkgc5DQgYkKI1LJHO7/Cbex2', NULL, '2020-06-30 12:34:35', '2020-06-30 12:34:35'),
(11, 'Alifki', 'dasdas@mail.com', 2, NULL, '$2b$10$XWN5qShj.44VODcENMnQl.H9UobZXhpR0NK6VM/8GcpAvipDGA8M2', NULL, '2020-06-30 17:14:45', '2020-06-30 17:14:45'),
(17, 'User 1', 'user1@gmail.com', 2, NULL, '$2b$10$wB8zD6jH39K56a/yJPWLLuF1sGUpQWZBWXywqUHwl7McHl7S4Tp1i', NULL, '2020-07-02 02:07:22', '2020-07-02 02:07:22'),
(18, 'User 2', 'user2@gmail.com', 2, NULL, '$2b$10$EeIbnwfVt2/oj27RgP8gl.D4PloF3p0fM7bJkbhFJOs7qUiegzFHK', NULL, '2020-07-02 02:09:29', '2020-07-02 02:09:29'),
(19, 'Noval', 'noval@gmail.com', 2, NULL, '$2b$10$J.FdTespdaSdn3K9cef3GOLsQ15N50N0Ufgo4rjtQqCWCq/ciMebG', NULL, '2020-07-02 07:30:48', '2020-07-02 07:30:48');

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`id_author`) REFERENCES `authors` (`id_author`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`id_genre`) REFERENCES `genres` (`id_genre`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`id_books`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
