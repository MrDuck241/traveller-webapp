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

header('Content-Type: application/json; charset=utf-8'); // Ustawienie nagłówka JSON

try {
    // Przygotowanie i wykonanie zapytania SQL
    $stmt = $pdo->query("SELECT * FROM placowki"); // Zmień 'your_table_name' na swoją tabelę
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC); // Pobranie wszystkich wierszy jako tablica asocjacyjna
    foreach ($data as &$row) {
        // Przekształcamy coord_x i coord_y na obiekt coords
        $row['coords'] = [
            'lat' => (float) $row['coord_x'],
            'lng' => (float) $row['coord_y']
        ];
    }
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
