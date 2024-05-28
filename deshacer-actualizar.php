<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $jsonFile = 'datos.json';
    $jsonData = json_decode(file_get_contents($jsonFile), true);

    foreach ($jsonData['especialidades'] as &$especialidad) {
        foreach ($especialidad['elementos'] as &$elemento) {
            if ($elemento['nombre'] === $data['nombreOriginal']) {
                $elemento['nombre'] = $data['nombre'];
                $elemento['descripcion'] = $data['descripcion'];
                $elemento['valor'] = $data['valor'];
                break;
            }
        }
    }

    file_put_contents($jsonFile, json_encode($jsonData, JSON_PRETTY_PRINT));
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
