<?php
session_start();
// Dołączenie pliku z połączeniem do bazy
//header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Origin: http://localhost:80');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit;
}

require_once 'db_connection.php';

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['login'])) {
    echo json_encode(['success' => false, 'message' => 'Brak wymaganych danych']);
    exit;
}

$login = trim($input['login']);

try {
    // Przygotowanie i wykonanie zapytania SQL
    $stmt = $pdo->prepare("SELECT *
    FROM reservations WHERE user_login = :login");
    $stmt->execute([':login' => $login]);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Zwracanie danych jako JSON
    echo json_encode([
        'status' => 'success',
        'data' => $data
    ]);
} catch (PDOException $e) {
    // Obsługa błędów zapytania SQL
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>
