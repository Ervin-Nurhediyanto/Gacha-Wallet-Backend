-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 25 Sep 2020 pada 20.44
-- Versi server: 10.4.10-MariaDB
-- Versi PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gachawallet`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idOther` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `note` varchar(256) NOT NULL,
  `transaction` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `histories`
--

INSERT INTO `histories` (`id`, `idUser`, `idOther`, `amount`, `time`, `note`, `transaction`) VALUES
(1, 1, 2, 1000, '2020-09-25 18:08:10', 'nyoba transfer', 'Transfer'),
(3, 2, 1, 500000, '2020-09-25 18:13:36', 'coba transfer', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `phonenumbers`
--

CREATE TABLE `phonenumbers` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `phoneNumber` varchar(256) NOT NULL,
  `priority` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `phonenumbers`
--

INSERT INTO `phonenumbers` (`id`, `idUser`, `phoneNumber`, `priority`) VALUES
(1, 1, '082322059666', '1'),
(2, 1, '082345394535', '2'),
(3, 1, '23423423534', '2'),
(4, 2, '4834953845', '2'),
(5, 2, '081xxxxxxxxx', '1');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(256) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(256) NOT NULL,
  `roleId` int(8) NOT NULL,
  `pin` varchar(128) NOT NULL,
  `image` varchar(256) NOT NULL,
  `firstName` varchar(256) NOT NULL,
  `lastName` varchar(256) NOT NULL,
  `infoUser` varchar(256) NOT NULL,
  `saldo` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `roleId`, `pin`, `image`, `firstName`, `lastName`, `infoUser`, `saldo`) VALUES
(1, 'cafeinai', 'cafeinai311@gmail.com', '$2a$10$1CPqulqV.aLV3L9tseIa9u9U4UIUsKJ6yFce4X9vqDUDsi/z25/9i', 1, '692025', 'http://localhost:4000/uploads/1600942807476-Cafeinai.jpg', 'Ervin', 'Nurhediyanto', 'Fullstack Developer', '6000'),
(2, 'erubin', 'cafeinai689@gmail.com', '$2a$10$VXREqL6r.1lS2YJ7pXB4t.3jSOsgrNSs/eONLweLH4EfMVYco57Oy', 2, '', '', '', '', '', ''),
(4, 'erubin', 'cafeinai321@gmail.com', '$2a$10$VXREqL6r.1lS2YJ7pXB4t.3jSOsgrNSs/eONLweLH4EfMVYco57Oy', 2, '', '', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- Indeks untuk tabel `phonenumbers`
--
ALTER TABLE `phonenumbers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `phonenumbers`
--
ALTER TABLE `phonenumbers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `phonenumbers`
--
ALTER TABLE `phonenumbers`
  ADD CONSTRAINT `phonenumbers_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
