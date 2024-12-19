<?php
session_start();
header('Content-Type: application/json');
//header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Origin: http://localhost:80');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit;
}

// Pobierz dane z żądania
$input = json_decode(file_get_contents('php://input'), true);
$hotel_name = $input['hotelName'] ?? null;

if (!$hotel_name) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Hotel name is required']);
    exit;
}

require_once 'db_connection.php';

try {
    // Przygotowanie i wykonanie zapytania SQL
    $stmt = $pdo->prepare("
        SELECT reviews.id, reviews.opis, reviews.stars, reviews.id_user, users.nickname FROM reviews, placowki,users 
        WHERE reviews.id_hotel = placowki.id AND placowki.name = :hotel_name AND users.id = reviews.id_user
    ");
    $stmt->bindParam(':hotel_name', $hotel_name, PDO::PARAM_STR);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'status' => 'success',
        'data' => $data
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>
