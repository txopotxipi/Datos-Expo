<?php
// Mostrar errores de PHP
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Leer los datos del cuerpo de la solicitud
$datosNuevos = json_decode(file_get_contents('php://input'), true);

// Ruta al archivo JSON
$rutaArchivo = 'datos.json';

// Leer el archivo JSON
$datosJson = file_get_contents($rutaArchivo);

// Decodificar los datos JSON a un array PHP
$datos = json_decode($datosJson, true);

// Buscar el elemento que quieres actualizar
foreach ($datos['especialidades'] as $indiceEspecialidad => $especialidad) {
    if ($especialidad['nombre'] === $datosNuevos['nombre']) {
        // Actualizar el valor del elemento
        $datos['especialidades'][$indiceEspecialidad]['valor'] = $datosNuevos['valor'];
    }
    foreach ($especialidad['elementos'] as $indiceElemento => $elemento) {
        if ($elemento['nombre'] === $datosNuevos['nombre']) {
            // Actualizar el valor del elemento
            $datos['especialidades'][$indiceEspecialidad]['elementos'][$indiceElemento]['valor'] = $datosNuevos['valor'];
        }
        foreach ($elemento['componentes'] as $indiceComponente => $componente) {
            if ($componente['nombre'] === $datosNuevos['nombre']) {
                // Actualizar el valor del componente
                $datos['especialidades'][$indiceEspecialidad]['elementos'][$indiceElemento]['componentes'][$indiceComponente]['valor'] = $datosNuevos['valor'];
            }
        }
    }
}

// Codificar los datos a JSON
$datosJson = json_encode($datos);

// Guardar los datos actualizados en el archivo JSON
file_put_contents($rutaArchivo, $datosJson);

// Escribe un mensaje en el archivo de registro
file_put_contents('registro.txt', 'Datos actualizados: ' . print_r($datosNuevos, true) . "\n", FILE_APPEND);

// Devolver una respuesta
echo 'Datos recibidos: ' . print_r($datosNuevos, true);
?>
