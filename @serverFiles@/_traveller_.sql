-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2024 at 10:42 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `_traveller_`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `hotel_info`
--

CREATE TABLE `hotel_info` (
  `id` int(11) NOT NULL,
  `opis` mediumtext DEFAULT NULL,
  `id_hotelu` int(11) DEFAULT NULL,
  `hotel_imgs` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `hotel_info`
--

INSERT INTO `hotel_info` (`id`, `opis`, `id_hotelu`, `hotel_imgs`) VALUES
(1, 'Obiekt Residence Bambi Boutique położony jest w Zakopanem. Oferuje on pokoje z bezpłatnym WiFi oraz telewizorem z płaskim ekranem i dostępem do kanałów satelitarnych. Na miejscu do dyspozycji Gości jest bezpłatny prywatny parking.\r\n\r\nPokoje w obiekcie Bambi Boutique są przestronne. Wystrój ich wnętrz utrzymany jest w stylu regionalnym i obejmuje zdobienia z jasnego drewna. Wszystkie mieszczą łazienkę.\r\n\r\nKażdy pokój w obiekcie Residence Bambi wyposażony został w czajnik elektryczny i radio. Większość z nich dysponuje także balkonem z malowniczym widokiem na Tatry.\r\n\r\nNa terenie obiektu Bambi Boutique znajduje się kryty plac zabaw dla dzieci, boisko oraz wydzielona część ze sprzętem do grillowania. Transfer lotniskowy dostępny jest za dodatkową opłatą.\r\n\r\nOd Krupówek budynek oddalony jest o 1,2 km, a od dworca kolejowego i autobusowego w Zakopanem – o 2 km.\r\n\r\nParom bardzo się podoba ta lokalizacja – za pobyt dla 2 osób oceniają ją na 9,2.', 5, 'hotel_bambi_botique.jpg hotel_bambi_botique2.jpg hotel_bambi_botique3.jpg\r\nhotel_bambi_botique4.jpg\r\nhotel_bambi_botique5.jpg'),
(2, 'Trzygwiazdkowy Hotel Dwór Karolówka położony jest w spokojnej okolicy, około 5 km od centrum Zakopanego, w pobliżu wejścia do Tatrzańskiego Parku Narodowego. Na miejscu dostępny jest bezpłatny parking.\r\n\r\nWszystkie pokoje w hotelu Dwór Karolówka wykończono w stylu regionalnym i jasnych barwach, a ich wnętrza zdobią stylowe meble. Każdy z nich wyposażony jest w telewizor LCD, lodówkę, zestaw do parzenia kawy i herbaty oraz czajnik elektryczny. Na miejscu dostępne jest też bezpłatne Wi-Fi. W każdym pokoju mieści się łazienka z suszarką do włosów.\r\n\r\nPersonel recepcji chętnie udziela informacji turystycznych. Na miejscu można nabyć bilety na kolejki linowe wjeżdżające na Kasprowy Wierch i Gubałówkę.\r\n\r\nŚniadanie w formie bufetu serwowane jest w hotelowej restauracji, która specjalizuje się w daniach kuchni regionalnej. Menu obejmuje również lekkie dania kuchni międzynarodowej oraz potrawy wegetariańskie i bezglutenowe. Do dyspozycji Gości jest ogród z placem zabaw, a także kącik dla dzieci przy restauracji.\r\n\r\nZa dodatkową opłatą Goście mogą korzystać z sauny i wanny z hydromasażem (po wcześniejszej rezerwacji w recepcji), zamówić masaże i zabiegi kosmetyczne (rejestracja odbywa się w recepcji).\r\n\r\nParom bardzo się podoba ta lokalizacja – za pobyt dla 2 osób oceniają ją na 8,9.', 6, 'hotel_dwor_karolowka.jpg\r\nhotel_dwor_karolowka2.jpg\r\nhotel_dwor_karolowka3.jpg\r\nhotel_dwor_karolowka4.jpg\r\nhotel_dwor_karolowka5.jpg'),
(3, 'Hotel Logos położony jest w Zakopanem, zaledwie 300 metrów od Krupówek i 1 km od parku wodnego Aqua Park Zakopane. Na miejscu dostępne jest bezpłatne Wi-Fi oraz taras słoneczny. Na miejscu dostępny jest prywatny parking. W hotelu znajduje się strefa spa z saunami fińskimi i parowymi, wanną z hydromasażem, gabinetami zabiegowymi i salą fitness.\r\n\r\nWszystkie pokoje zostały wyposażone w telewizor z płaskim ekranem. Niektóre pokoje dysponują częścią wypoczynkową. Wszystkie pokoje obejmują łazienkę. Dla Gości przygotowano bezpłatny zestaw kosmetyków i suszarkę do włosów.\r\n\r\nRecepcja jest czynna przez całą dobę.\r\n\r\nW okolicy panują doskonałe warunki do uprawiania rozmaitych form aktywnego wypoczynku, w tym narciarstwa i turystyki rowerowej. Obiekt jest oddalony o 1,3 km od skoczni narciarskiej Wielka Krokiew i o 1,8 km od wyciągu narciarskiego Polana Szymoszkowa. Odległość od lotniska Kraków-Balice wynosi 88 km.\r\n\r\nParom bardzo się podoba ta lokalizacja – za pobyt dla 2 osób oceniają ją na 9,6.', 7, 'hotel_lagos.jpg\r\nhotel_lagos2.jpg\r\nhotel_lagos3.jpg\r\nhotel_lagos4.jpg\r\nhotel_lagos5.jpg'),
(4, 'Hotel Belvedere Resort&SPA usytuowany jest w pobliżu Doliny Białego w Zakopanem i oferuje duże spa oraz centrum odnowy biologicznej. Ciche pokoje zapewniają telewizor z dostępem do kanałów telewizji satelitarnej oraz bezpłatny bezprzewodowy dostęp do Internetu.\r\n\r\nHotel Belvedere Resort&SPA znajduje się zaledwie 10 minut spacerem od Krupówek. Od wyciągu narciarskiego Polana Szymoszkowa dzielą go 4 km.\r\n\r\nPokoje wyposażone są w minibar i sejf. W każdym z nich znajduje się łazienka z podgrzewaną podłogą, suszarką do włosów i szlafrokiem.\r\n\r\nSpa w hotelu Belvedere obejmuje wannę z hydromasażem, saunę, łaźnię parową i kryty basen z hydromasażem. Centrum spa oferuje także zabiegi talasoterapii oraz różnego rodzaju masaże.\r\n\r\nNa terenie hotelu Belvedere działają 3 restauracje: Ziemiańska, Wieniawy i Pod Aniołem. Ostatnia z nich dysponuje dużym drewnianym tarasem z pięknym, panoramicznym widokiem na Tatry. Rano w restauracji Wieniawy serwowane jest urozmaicone śniadanie w formie bufetu.\r\n\r\nParom bardzo się podoba ta lokalizacja – za pobyt dla 2 osób oceniają ją na 9,2.', 8, 'hotel_belvedere.jpg\r\nhotel_belvedere2.jpg\r\nhotel_belvedere3.jpg\r\nhotel_belvedere4.jpg\r\nhotel_belvedere5.jpg'),
(5, 'Hotel Nosalowy Dwór położony jest w spokojnej części Zakopanego, u podnóża góry Nosal. Oferuje on pokoje z bezpłatnym dostępem do Internetu i telewizorem z dostępem do kanałów satelitarnych.\r\n\r\nJasne pokoje w hotelu Nosalowy Dwór urządzone są w eleganckim, klasycznym stylu. Wszystkie pokoje są ogrzewane i dysponują łazienką z wanną lub prysznicem.\r\n\r\nGoście hotelu Nosalowy Dwór mają dostęp do spa i centrum odnowy biologicznej z wanną z hydromasażem i sauną. Obiekt oferuje również wypożyczalnię sprzętu narciarskiego, przechowalnię sprzętu narciarskiego oraz szkółkę narciarską. Hotelowa restauracja serwuje dania kuchni regionalnej i międzynarodowej.\r\n\r\nW promieniu 200 metrów od obiektu znajduje się wiele wyciągów narciarskich. Odległość od Krupówek wynosi 2 km. Dworzec kolejowy i autobusowy w Zakopanem dzieli od obiektu 6 minut jazdy samochodem.\r\n\r\nParom bardzo się podoba ta lokalizacja – za pobyt dla 2 osób oceniają ją na 8,8.', 9, 'hotel_nosalowy_dwor.jpg\r\nhotel_nosalowy_dwor2.jpg\r\nhotel_nosalowy_dwor3.jpg\r\nhotel_nosalowy_dwor4.jpg\r\nhotel_nosalowy_dwor5.jpg');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `placowki`
--

CREATE TABLE `placowki` (
  `id` int(11) NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  `place` varchar(50) DEFAULT NULL,
  `coord_x` decimal(6,4) DEFAULT NULL,
  `coord_y` decimal(6,4) DEFAULT NULL,
  `adult_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `kid_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `link` varchar(100) NOT NULL DEFAULT 'not_definied',
  `img` varchar(40) NOT NULL DEFAULT 'not_definied'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `placowki`
--

INSERT INTO `placowki` (`id`, `name`, `place`, `coord_x`, `coord_y`, `adult_price`, `kid_price`, `link`, `img`) VALUES
(5, 'Hotel Bambi Boutique', 'Zakopane', 49.2918, 19.9355, 90.00, 75.00, 'not_definied', 'hotel_bambi_botique.jpg'),
(6, 'Hotel Dwór Karolówka', 'Zakopane', 49.2846, 20.0046, 85.00, 80.00, 'not_definied', 'hotel_dwor_karolowka.jpg'),
(7, 'Hotel Logos', 'Zakopane', 49.2896, 19.9548, 76.00, 70.00, 'not_definied', 'hotel_lagos.jpg'),
(8, 'Hotel Belvedere Resort&SPA', 'Zakopane', 49.2850, 19.9558, 100.00, 95.00, 'not_definied', 'hotel_belvedere.jpg'),
(9, 'Hotel Nosalowy Dwór', 'Zakopane', 49.2856, 19.9883, 130.00, 110.00, 'not_definied', 'hotel_nosalowy_dwor.jpg');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `user_login` varchar(100) DEFAULT NULL,
  `reservation_date` date DEFAULT NULL,
  `days` int(11) NOT NULL,
  `summary_price` int(11) NOT NULL,
  `childs` int(11) DEFAULT NULL,
  `adults` int(11) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `food` tinyint(1) DEFAULT NULL,
  `hotel_name` varchar(100) DEFAULT NULL,
  `hotel_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `user_login`, `reservation_date`, `days`, `summary_price`, `childs`, `adults`, `wifi`, `food`, `hotel_name`, `hotel_id`) VALUES
(2, 'marek.makowski@poczta.onet.eu', '2024-12-11', 3, 2345, 3, 3, 0, 0, 'Hotel Belvedere Resort&SPA', 8),
(3, 'pierniczkot@gmail.com', '2024-12-05', 3, 1520, 2, 3, 0, 0, 'Hotel Belvedere Resort&SPA', 8),
(4, 'pierniczkot@gmail.com', '2024-12-05', 8, 9330, 2, 7, 0, 0, 'Hotel Belvedere Resort&SPA', 8),
(5, 'pierniczkot@gmail.com', '2024-12-11', 8, 3210, 1, 3, 0, 0, 'Hotel Belvedere Resort&SPA', 8),
(7, 'pierniczkot@gmail.com', '2024-12-05', 4, 830, 1, 1, 0, 0, 'Hotel Belvedere Resort&SPA', 8),
(11, 'pierniczkot@gmail.com', '2024-12-18', 1, 195, 1, 1, 0, 0, 'Hotel Belvedere Resort&SPA', 8),
(12, 'pierniczkot@gmail.com', '2024-12-18', 1, 295, 1, 2, 0, 0, 'Hotel Belvedere Resort&SPA', 8),
(13, 'pierniczkot@gmail.com', '2024-12-18', 1, 95, 1, 0, 0, 0, 'Hotel Belvedere Resort&SPA', 8);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `opis` text DEFAULT NULL,
  `stars` int(11) DEFAULT NULL,
  `id_hotel` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `opis`, `stars`, `id_hotel`, `id_user`) VALUES
(1, 'Ten hotel jest znakomity. Serdecznie polecam, bardzo miła obsługa, pyszne jedzenie oraz piękny widok na górzysty krajobraz z pokoi na drugim piętrze. Świetnie spędzony urlop.', 5, 8, 1),
(2, 'Ten hotel to totalna porażka. Jakaś ruina bym powiedział. Ściany w wielu miejscach popękane i niepomalowane. Jedzenie odgrzewane z supermarketu jakiegoś. Odradzam komukolwiek tam jechać, a przynajmniej do momentu do którego nie skończą remontować tego hotelu', 2, 6, 13),
(3, 'Świetny hotel. Najlepszy w jakim byłam. Wart każdej wydanej złotówki. A obsługa w hotelu znakomita. Wspaniali ludzie', 4, 8, 1),
(4, 'Bardzo podobał mi się pobyt w tym hotelu. \r\nMyślę że mogę śmiało polecić ten hotel wszystkim którzy szukają stosunkowo niedrogiego hotelu na pobyt podczas wakacji. Zwłaszcza dla dużej rodziny. Naprawdę dobre miejsce na odpoczynek.', 4, 8, 34),
(5, 'Izolacji dźwiękowej nie ma w ogóle chociaż hotel stwierdza że ma. Spać się nie da.', 2, 5, 34),
(6, 'Gorąco polecam ten ośrodek', 3, 8, 2),
(7, 'Bardzo fajny hotel z super góralskim klimatem o wysublimowanym stylu, bez kiczu. W pokojach czujesz się jak w góralskich mieszkaniach, a nie w typowym bezdusznym pokoju hotelowym.', 5, 5, 1),
(8, 'Grupa Bambi Zakopane to świetne miejsce na wypoczynek w Zakopanem! Śniadania były sycące i smaczne. A pobyt przyjemny.', 4, 5, 3),
(9, 'Świetne miejsce z przecudowną i bardzo pomocną obsługą, której bardzo dziękujemy za pomoc w odesłaniu zostawionych rzeczy.', 5, 5, 2),
(10, 'Przyjeżdżam do Hotelu Karolówka kolejny rok z rzędu. Hotel położony jest w atrakcyjnej lokalizacji, dogodnej dla turystów zarówno ceniących sobie ciszę i wypoczynek w czystej postaci jak również dla tych spragnionych gór. Serdecznie polecam.', 5, 6, 8),
(11, 'Nasz tygodniowy pobyt oceniamy bardzo dobrze. Hotel jest ładny i przestronny, pokoje czyste, jedzenie w restauracji przepyszne a obsługa bardzo miła i uprzejma.', 5, 6, 11),
(12, 'Odwiedziliśmy hotel po raz drugi i na pewno ostatni, w pokoju zimno, nie działające odpowiedni jacuzzi, oraz kilkudniowe winogrono na śniadanie, pleśń w pokoju i w kabinie prysznicowej, za taki pobyt cena nie adekwatna do jakości. Pozdrawiam', 1, 6, 9),
(13, 'Dobre śniadanie, czysty pokój, bardzo miła obsługa. Mimo, że spędziliśmy tam tylko jedną noc, z czystym sumieniem mogę polecić :)', 4, 6, 34),
(17, 'Jedzenie bardzo dobre, śniadania nie są monotonne, pyszne, niczego nie brakuje. Ponadto ceny potraw z karty są naprawdę atrakcyjne. Jak ktoś ceni ciszę, dobrą lokalizację i do tego smaczne jedzenie to GORĄCO POLECAMY', 5, 7, 4),
(18, 'Bardzo fajny hotel z przepysznym jedzeniem oraz ogólnodostępną strefą SPA. W prawdzie podczas naszego pobytu sauna parowa była nieczynna, ale jacuzzi oraz sauna sucha w cenie pobytu to bardzo miły bonus. Polecamy', 5, 7, 5),
(19, 'Jest to niezwykle swietny hotel i goraco szystkim go polecam', 3, 8, 2),
(22, 'Witam wszystkich tu serdecznie, bo gdy wchodze to robie sie niebezpiecznie', 3, 8, 1),
(23, 'Ten hotel jest naprawdę swietny :)', 3, 8, 2),
(24, 'Kocham ten hotel!!!', 3, 8, 35),
(25, 'Kurde ale tanio w tym hotelu polecam', 3, 8, 35),
(28, 'BEZ INTERNETU!!!! LUB BARDZO ZŁY. PERSONEL CHCIAŁ NAWET POMÓC I POWIEDZIAŁ, ŻE TAK TO JEST. UNIKAJ TEGO HOTELU, JEŚLI MUSISZ KORZYSTAĆ Z INTERNETU.', 1, 7, 6),
(29, 'Spędziliśmy w Logos tylko jedną noc, ale zdecydowanie chetnie do nich wrócę. Pokoje OK, obsługa miła i pomocna. Lokalizacja hotelu OK.', 4, 7, 7),
(30, 'Nie polecam. Przyjechalismy po kilku latach. Hotel jest zaniedbany. Wszystko co sie zniszylo nie jest naprawiane. Sniadania srednie. Mniejsza sala zabaw dla dzieci praktycznie bez zabawek. Wiekszosc zepsuta. Na plus mila obsluga hotelowa oraz lokalizacja hotelu.', 2, 9, 12),
(31, 'Świetne jedzienie. Super malpi gaj przy barze i  genialny zewnętrzny plac zabaw. Wspaniała strefa spa. Jeden z najlepszych hoteli w jakim byłem. Polecam', 5, 9, 11),
(32, 'Rewelacyjny hotel w pięknej lokalizacji. Bardzo wysoki poziom. Ładne pokoje, wygodne łóżko, pyszne jedzenie- codziennie coś innego, bardzo miła obsługa na każdym stanowisku.', 5, 9, 10),
(33, 'Lokalizacja, basen, sauny zasługują na pozytywną opinię. Duży, przestronny pokój z pięknym widokiem również. Śniadania na tle innych hoteli 4-gwiazdkowych wypadają słabo. Podczas 4-dniowego pobytu tylko raz mieliśmy posprzątany pokój.', 3, 9, 9);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(255) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `nickname` varchar(100) NOT NULL DEFAULT 'guest',
  `phone` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `nickname`, `phone`) VALUES
(1, 'marek.makowski@poczta.onet.eu', 'kotek@21sd', 'Mr. markos', NULL),
(2, 'pierniczkot@gmail.com', 'makapaka&lol2', 'Makapaczka', NULL),
(3, 'oliwianowak@gmail.com', 'noli09X#', 'oliwia', '123456789'),
(4, 'lenek27@gmail.com', 'len2*cD', 'len', '111111111'),
(5, 'nonik1@outlook.com', 'n0n*X#Z', 'non', '222222222'),
(6, 'jon.zen@outlook.com', 'jok@$Na', 'jonz', '333333333'),
(7, 'nua77@gmail.com', 'mosad2E#', 'nua', '444444444'),
(8, 'konai.zz2@outlook.com', 'k#zzE2', 'konz', '555555555'),
(9, 'uuja@wp.pl', 'uU3$z', 'uuj', '666666666'),
(10, 'okelZET@wp.pl', 'ok*Z^N', 'okel', '777777777'),
(11, 'supergosc@wp.pl', 's$Zasda43', 'supG', '888888888'),
(12, 'lecea@wp.pl', 'lzzz*Pole3', 'leć', '999999999'),
(13, 'jaksha@gmail.com', 'j0N$11', 'jaksha', '101010101'),
(34, 'basia.kowalska@wp.pl', 'calineczka#1pl', 'basiulenka', '726938273'),
(35, 'traverMAN', 'travelling23PL@', 'traverMAN', '928635111');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `hotel_info`
--
ALTER TABLE `hotel_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_hotelu` (`id_hotelu`);

--
-- Indeksy dla tabeli `placowki`
--
ALTER TABLE `placowki`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hotel_id` (`hotel_id`);

--
-- Indeksy dla tabeli `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_hotel` (`id_hotel`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hotel_info`
--
ALTER TABLE `hotel_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `placowki`
--
ALTER TABLE `placowki`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hotel_info`
--
ALTER TABLE `hotel_info`
  ADD CONSTRAINT `hotel_info_ibfk_1` FOREIGN KEY (`id_hotelu`) REFERENCES `placowki` (`id`);

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `placowki` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`id_hotel`) REFERENCES `placowki` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
