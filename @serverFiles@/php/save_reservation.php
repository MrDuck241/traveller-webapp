<?php
session_start();

error_reporting(0);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'php-error.log');


header('Access-Control-Allow-Credentials: true'); // Dodaj ten nagłówek
header('Content-Type: application/json');
//header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Origin: http://localhost:80');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Pobranie danych z żądania
$input = json_decode(file_get_contents('php://input'), true);
// Walidacja danych wejściowych
if (!isset($input['login']) || !isset($input['selectedDate']) || $input['selectedDate'] == "" ||
    !isset($input['dayAmount']) || (int)$input['dayAmount'] == 0 || !isset($input['reservationPrice']) || 
    !isset($input['childNumber']) || ((int)$input['childNumber'] == 0 && (int)$input['adultNumber'] == 0) || !isset($input['adultNumber']) ||
    !isset($input['hotelName']) || !isset($input['hotelId']) ||
    ((int)$input['childNumber'] > 0 && (int)$input['adultNumber'] == 0)) {
    echo json_encode(['status' => 'error', 'message' => 'Brak wymaganych danych do zapisania rezerwacji']);
    exit;
}

$login = trim($input['login']);
$date = trim($input['selectedDate']);
$days = filter_var($input['dayAmount'], FILTER_VALIDATE_INT);
$price = filter_var($input['reservationPrice'], FILTER_VALIDATE_INT);
$childs = filter_var($input['childNumber'], FILTER_VALIDATE_INT);
$adults = filter_var($input['adultNumber'], FILTER_VALIDATE_INT);
$WiFiSelected = filter_var($input['wifiSelected'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
$foodSelected = filter_var($input['foodSelected'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
$hotelName = trim($input['hotelName']);
$hotel_id = filter_var($input['hotelId'], FILTER_VALIDATE_INT);


if($_SESSION['loggedin'] == false || $_SESSION['login'] != $login){
    echo json_encode(['status' => 'error', 'message' => 'Nie jesteś zalogowany, więc nic nie zarezerwujesz']);
    exit;
}

// Połączenie z bazą danych
require_once 'db_connection.php';

$pdo->beginTransaction();

try {
    // Zapisanie recenzji
    $stmt = $pdo->prepare("INSERT INTO `reservations` (`user_login`, `reservation_date`, `days`, `summary_price`, `childs`, `adults`, `wifi`, `food`, `hotel_name`, `hotel_id`) VALUES (:user_login, :reservation_date, :days, :summary_price, :childs, :adults, :wifi, :food, :hotel_name, :hotel_id)");
    $stmt->execute([
        ':user_login' => $login, 
        ':reservation_date' => $date, 
        ':days' => $days, 
        ':summary_price' => $price, 
        ':childs' => $childs, 
        ':adults' => $adults, 
        ':wifi' => $WiFiSelected, 
        ':food' => $foodSelected, 
        ':hotel_name' => $hotelName, 
        ':hotel_id' => $hotel_id
    ]);

    $pdo->commit();
    echo json_encode(['status' => 'success', 'message' => 'Udało się zapisać recenzję']);
} catch (PDOException $e) {
    $pdo->rollBack();

    echo json_encode([
        'status' => 'error',
        'message' => 'Błąd podczas zapisywania recencji: ' . $e->getMessage()
    ]);
    exit;
}
?>
