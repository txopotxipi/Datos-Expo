<?php
// Mostrar errores de PHP
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Ruta al archivo JSON
$rutaArchivo = 'datos.json';

// Leer el archivo JSON
$datosJson = file_get_contents($rutaArchivo);

// Decodificar los datos JSON a un array PHP
$datos = json_decode($datosJson, true);

// Aquí puedes modificar los datos si lo necesitas
// ...

// Codificar los datos a JSON
$datosJson = json_encode($datos);

// Devolver los datos como JSON
header('Content-Type: application/json');
echo $datosJson;