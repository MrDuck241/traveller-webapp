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

// Sprawdzenie poprawności danych wejściowych
if (!isset($input['login']) || !isset($input['password']) || !isset($input['phone']) || !isset($input['nick']) ||
trim($input['login']) == "" || trim($input['password']) == "" || trim($input['phone']) == "" ||
trim($input['nick']) == "" ||  strlen(trim($input['phone'])) < 9){
    echo json_encode(['status' => 'error', 'message' => 'Brak wymaganych danych']);
    exit;
}

$user_password = trim($input['password']);
$login = trim($input['login']);
$phone = trim($input['phone']);
$nick = trim($input['nick']);

// Walidacja danych


// Połączenie z bazą danych
require_once 'db_connection.php';

try {
    // Przygotowanie zapytania
    $stmt = $pdo->prepare("INSERT INTO users (login, password, nickname, phone) Values (:login, :password, :nick, :phone)");
    $stmt->execute([
        ':login' => $login,
        ':password' => $user_password,
        ':nick' => $nick,
        ':phone' => $phone
    ]);

    // Sukces
    echo json_encode([
        'status' => 'success',
        'message' => 'Rejestracja zakończona pomyślnie'
    ]);
} catch (PDOException $e) {
    // Obsługa błędów
    echo json_encode([
        'status' => 'error',
        'message' => 'Błąd podczas rejestracji: ' . $e->getMessage()
    ]);
    exit;
}
?>
