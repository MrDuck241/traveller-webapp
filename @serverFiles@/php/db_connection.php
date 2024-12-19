<?php
// Ustawienia połączenia z bazą danych
$host = 'localhost'; // lub IP serwera bazy danych
$dbname = '_traveller_'; // nazwa bazy danych
$username = 'root'; // nazwa użytkownika MySQL
$password = ''; // hasło do MySQL

try {
    // Tworzenie połączenia za pomocą PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    // Ustawienie trybu błędów na wyjątki
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Obsługa błędów połączenia
    die("Błąd połączenia z bazą danych: " . $e->getMessage());
}
?>
