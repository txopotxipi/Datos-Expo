<?php
$rutaArchivo = 'datos.json';
if (is_writable($rutaArchivo)) {
    echo 'El archivo es escribible';
} else {
    echo 'El archivo no es escribible';
}
?>
