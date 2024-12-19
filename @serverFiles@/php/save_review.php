<?php
session_start();
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');
//header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Origin: http://localhost:80');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Pobranie danych z żądania
$input = json_decode(file_get_contents('php://input'), true);

// Walidacja danych wejściowych
if (empty($input['review']) || empty($input['hotelId']) || empty($input['userNickname']) || trim($input['review']) == "") {
    echo json_encode(['status' => 'error', 'message' => 'Brak wymaganych danych do wystawienia recenzji']);
    exit;
}

$user_review = trim($input['review']);
$hotelId = filter_var($input['hotelId'], FILTER_VALIDATE_INT);
$user = trim($input['userNickname']);
$stars = filter_var($input['stars'], FILTER_VALIDATE_INT);

file_put_contents('statusLOGGGGGG.log', print_r($user, true), FILE_APPEND);

if(empty($_SESSION['loggedin']) || $_SESSION['loggedin'] == false || empty($_SESSION['nickname']) ||  $_SESSION['nickname'] != $user){
    echo json_encode(['status' => 'error', 'message' => 'Nie jesteś zalogowany, więc nie wystawisz recenzji']);
    exit;
}

if (!$hotelId) {
    echo json_encode(['status' => 'error', 'message' => 'Nieprawidłowe dane wejściowe']);
    exit;
}

// Połączenie z bazą danych
require_once 'db_connection.php';

$pdo->beginTransaction();

try {
    // Sprawdzenie istnienia użytkownika
    $stmt = $pdo->prepare("SELECT id FROM users WHERE nickname = :nickname");
    $stmt->execute([':nickname' => $user]);
    $userData = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$userData) {
        $pdo->rollBack();
        echo json_encode(['status' => 'error', 'message' => 'Użytkownik nie istnieje']);
        exit;
    }

    // Zapisanie recenzji
    $stmt = $pdo->prepare("INSERT INTO reviews (opis, stars, id_hotel, id_user) VALUES (:opis, :stars, :id_hotel, :id_user)");
    $stmt->execute([
        ':opis' => $user_review,
        ':stars' => $stars,
        ':id_hotel' => $hotelId,
        ':id_user' => $userData['id']
    ]);

    $pdo->commit();
    echo json_encode(['status' => 'success', 'message' => 'Udało się zapisać recenzję']);
} catch (PDOException $e) {
    $pdo->rollBack();
    error_log("Błąd PDO: " . $e->getMessage());

    echo json_encode([
        'status' => 'error',
        'message' => 'Błąd podczas zapisywania recencji: ' . $e->getMessage()
    ]);
    exit;
}
?>
