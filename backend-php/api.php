<?php
// KonexApp/backend-php/api.php

// Permitir explícitamente a Nuxt (puerto 3000) acceder al puerto 8000
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
} else {
    header("Access-Control-Allow-Origin: *");
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    http_response_code(200);
    exit(0);
}

header("Content-Type: application/json; charset=UTF-8");

// Conexión a la base de datos 'konex'
$host = "localhost";
$db_name = "konex";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=" . $host . ";dbname=" . $db_name . ";charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $exception) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Error de conexión: " . $exception->getMessage()]);
    exit();
}

// ... El resto del bloque del switch o "if ($action === 'get_inicio')" se queda exactamente igual

// 3. PROCESAMIENTO DE LA ACCIÓN
$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action === 'get_inicio') {
    try {
        // A. Consultar Banners
        $stmtBanners = $pdo->prepare("SELECT id, titulo, imagen FROM banners ORDER BY id DESC");
        $stmtBanners->execute();
        $banners = $stmtBanners->fetchAll() ?: []; // Fallback a array vacío si no hay datos

        // B. Consultar Categorías (Con mapeo exacto a tu estructura de producción)
        $stmtCategorias = $pdo->prepare("SELECT id, nombre, slug FROM categorias WHERE estado = 1 ORDER BY id ASC");
        $stmtCategorias->execute();
        $categorias = $stmtCategorias->fetchAll() ?: [];

        // C. Consultar Productos (Validando stock y estado activo)
        $stmtProductos = $pdo->prepare("SELECT id, categoria_id, nombre, descripcion, imagen, precio_detal, precio_mayor, minimo_mayor, stock FROM productos WHERE estado = 1 AND stock > 0 ORDER BY id DESC");
        $stmtProductos->execute();
        $productos = $stmtProductos->fetchAll() ?: [];

        // 4. SANITIZACIÓN Y CASTEO SEGURO DE TIPOS DE DATOS
        if (!empty($productos)) {
            foreach ($productos as &$prod) {
                $prod['id'] = (int)$prod['id'];
                $prod['categoria_id'] = (int)$prod['categoria_id'];
                $prod['precio_detal'] = (float)$prod['precio_detal'];
                $prod['precio_mayor'] = (float)$prod['precio_mayor'];
                $prod['minimo_mayor'] = (int)$prod['minimo_mayor'];
                $prod['stock'] = (int)$prod['stock'];
            }
        }
        
        if (!empty($categorias)) {
            foreach ($categorias as &$cat) {
                $cat['id'] = (int)$cat['id'];
            }
        }

        if (!empty($banners)) {
            foreach ($banners as &$ban) {
                $ban['id'] = (int)$ban['id'];
            }
        }

        // 5. RETORNO DE RESPUESTA EXITOSA
        echo json_encode([
            "success" => true,
            "banners" => $banners,
            "categorias" => $categorias,
            "productos" => $productos
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); // Evita escapar barras en las rutas de imágenes

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Error de consulta: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Acción no válida o ausente"]);
}