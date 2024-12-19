<?php
session_start();
header('Content-Type: application/json');
//header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Origin: http://localhost:80');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$_SESSION['loggedin'] = false;
$_SESSION['login'] = null;


    echo json_encode([
        'status' => 'success',
        'message' => 'Wylogowano sie z konta'
    ]);

?>
