<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $accion = $_POST['accion'];
    $nombre = $_POST['nombre'];

    // Leer los datos actuales
    $data = json_decode(file_get_contents('datos.json'), true);

    if ($accion == 'insertar') {
        $valor = $_POST['valor'];
        $padre = $_POST['padre'];
        // Crear un nuevo elemento
        $nuevoElemento = [
            'nombre' => $nombre,
            'valor' => $valor,
            'componentes' => []  // Inicializar con una lista vacía si no hay componentes
        ];
        // Buscar el elemento padre y agregar el nuevo elemento como componente
        foreach ($data['especialidades'] as &$especialidad) {
            if ($especialidad['nombre'] === $padre) {
                $especialidad['elementos'][] = $nuevoElemento;
                break;
            } else {
                foreach ($especialidad['elementos'] as &$elemento) {
                    if ($elemento['nombre'] === $padre) {
                        $elemento['componentes'][] = $nuevoElemento;
                        break 2;
                    }
                }
            }
        }
    } elseif ($accion == 'actualizar') {
        $nuevo_nombre = $_POST['nuevo_nombre'];
        $nuevo_valor = $_POST['nuevo_valor'];
        // Buscar y actualizar el elemento existente
        foreach ($data['especialidades'] as &$especialidad) {
            if ($especialidad['nombre'] === $nombre) {
                if ($nuevo_nombre) {
                    $especialidad['nombre'] = $nuevo_nombre;
                }
                if ($nuevo_valor) {
                    $especialidad['valor'] = $nuevo_valor;
                }
            } else {
                foreach ($especialidad['elementos'] as &$elemento) {
                    if ($elemento['nombre'] === $nombre) {
                        if ($nuevo_nombre) {
                            $elemento['nombre'] = $nuevo_nombre;
                        }
                        if ($nuevo_valor) {
                            $elemento['valor'] = $nuevo_valor;
                        }
                    } else {
                        foreach ($elemento['componentes'] as &$componente) {
                            if ($componente['nombre'] === $nombre) {
                                if ($nuevo_nombre) {
                                    $componente['nombre'] = $nuevo_nombre;
                                }
                                if ($nuevo_valor) {
                                    $componente['valor'] = $nuevo_valor;
                                }
                            }
                        }
                    }
                }
            }
        }
    } elseif ($accion == 'eliminar') {
        // Buscar y eliminar el elemento existente
        foreach ($data['especialidades'] as &$especialidad) {
            if ($especialidad['nombre'] === $nombre) {
                // Eliminar especialidad completa
                $data['especialidades'] = array_filter($data['especialidades'], function($e) use ($nombre) {
                    return $e['nombre'] !== $nombre;
                });
                break;
            } else {
                foreach ($especialidad['elementos'] as &$elemento) {
                    if ($elemento['nombre'] === $nombre) {
                        // Eliminar elemento de la especialidad
                        $especialidad['elementos'] = array_filter($especialidad['elementos'], function($e) use ($nombre) {
                            return $e['nombre'] !== $nombre;
                        });
                        break 2;
                    } else {
                        foreach ($elemento['componentes'] as &$componente) {
                            if ($componente['nombre'] === $nombre) {
                                // Eliminar componente del elemento
                                $elemento['componentes'] = array_filter($elemento['componentes'], function($c) use ($nombre) {
                                    return $c['nombre'] !== $nombre;
                                });
                                break 3;
                            }
                        }
                    }
                }
            }
        }
    }

    // Guardar los datos actualizados
    file_put_contents('datos.json', json_encode($data, JSON_PRETTY_PRINT));
    echo "Operación realizada correctamente.";
} else {
    echo "Método no permitido.";
}
?>
