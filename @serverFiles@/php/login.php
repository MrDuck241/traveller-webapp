<?php
session_start();
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');
//header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Origin: http://localhost:80');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Odbierz dane JSON
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['login']) || !isset($input['password']) || trim($input['login']) == "" || trim($input['password']) == "") {
    echo json_encode(['success' => false, 'message' => 'Brak wymaganych danych']);
    exit;
}

$login = $input['login'];
$password = $input['password'];

try {

    $pdo = new PDO('mysql:host=localhost;dbname=_traveller_', 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    $stmt = $pdo->prepare('SELECT * FROM users WHERE login = :login');
    $stmt->execute(['login' => $login]);
    $user = $stmt->fetch();

    if ($user && $password === $user['password']) {
        $_SESSION['loggedin'] = true;
        $_SESSION['login'] = $user['login'];
        $_SESSION['nickname'] = $user['nickname'];
        echo json_encode(['success' => true, 'message' => 'Zalogowano pomyślnie', 'nickname' => $user['nickname'], 'login' => $user['login']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Nieprawidłowy login lub hasło']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Błąd bazy danych: ' . $e->getMessage()]);
}
