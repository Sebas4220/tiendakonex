<?php
// backend-php/admin_api.php

// 1. CONTROL DE CORS ULTRA COMPATIBLE
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Puedes dejarlo en '*' o especificar el puerto de tu Nuxt para mayor seguridad
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); // Cache por 1 día
}

// Los métodos permitidos durante el chequeo Preflight (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    // IMPORTANTE: Responder 200 OK y matar el script aquí mismo para el Preflight
    http_response_code(200);
    exit(0);
}

// 2. CONFIGURACIÓN DEL CONTENIDO DE RESPUESTA NORMAL
header("Content-Type: application/json; charset=UTF-8");


// 3. CONEXIÓN A LA BASE DE DATOS
$host = "localhost";
$db_name = "konex";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=" . $host . ";dbname=" . $db_name . ";charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $exception) {
    echo json_encode(["success" => false, "error" => "Error de conexión: " . $exception->getMessage()]);
    exit();
}

// ... de aquí para abajo dejas tu bloque switch($action) tal cual como lo tenías

// 2. DETECTAR LA ACCIÓN SOLICITADA
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {

    // --- ACCIÓN: REGISTRAR PRODUCTO (CON IMAGEN) ---
    case 'add_producto':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            echo json_encode(["success" => false, "error" => "Método no permitido"]);
            exit();
        }

        // Recibir los campos de texto del FormData de Nuxt
        $nombre = $_POST['nombre'] ?? '';
        $categoria_id = $_POST['categoria_id'] ?? '';
        $precio_mayor = $_POST['precio_mayor'] ?? 0;
        $minimo_mayor = $_POST['minimo_mayor'] ?? 1;
        $precio_detal = $_POST['precio_detal'] ?? 0;
        $ruta_imagen = 'uploads/default_producto.png'; // Imagen por defecto si algo falla

        // Validar y procesar el archivo binario de la imagen
        if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES['imagen']['tmp_name'];
            $fileName = $_FILES['imagen']['name'];
            $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
            
            // Generar un nombre único para evitar que se pisen archivos con el mismo nombre
            $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
            $dest_path = 'uploads/' . $newFileName;

            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                $ruta_imagen = $dest_path; // Guardamos la ruta relativa
            }
        }

        try {
            $query = "INSERT INTO productos (nombre, categoria_id, precio_mayor, minimo_mayor, precio_detal, imagen) 
                      VALUES (:nombre, :categoria_id, :precio_mayor, :minimo_mayor, :precio_detal, :imagen)";
            
            $stmt = $pdo->prepare($query);
            $stmt->execute([
                ':nombre' => $nombre,
                ':categoria_id' => $categoria_id,
                ':precio_mayor' => $precio_mayor,
                ':minimo_mayor' => $minimo_mayor,
                ':precio_detal' => $precio_detal,
                ':imagen' => $ruta_imagen
            ]);

            echo json_encode(["success" => true, "message" => "Producto guardado con éxito"]);
        } catch (Exception $e) {
            echo json_encode(["success" => false, "error" => $e->getMessage()]);
        }
        break;


    // --- ACCIÓN: REGISTRAR CATEGORÍA (JSON plano) ---
    case 'add_categoria':
        // Como Nuxt envía un JSON directo en este formulario, lo leemos del input stream
        $data = json_decode(file_get_contents("php://input"), true);
        $nombre_cat = $data['nombre'] ?? '';

        if (empty($nombre_cat)) {
            echo json_encode(["success" => false, "error" => "El nombre es obligatorio"]);
            exit();
        }

        try {
            $query = "INSERT INTO categorias (nombre) VALUES (:nombre)";
            $stmt = $pdo->prepare($query);
            $stmt->execute([':nombre' => $nombre_cat]);

            echo json_encode(["success" => true, "message" => "Categoría creada con éxito"]);
        } catch (Exception $e) {
            echo json_encode(["success" => false, "error" => $e->getMessage()]);
        }
        break;


    // --- ACCIÓN: REGISTRAR BANNER PUBLICITARIO (CON IMAGEN) ---
    case 'add_banner':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            echo json_encode(["success" => false, "error" => "Método no permitido"]);
            exit();
        }

        $titulo = $_POST['titulo'] ?? '';
        $ruta_banner = 'uploads/default_banner.png';

        if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES['imagen']['tmp_name'];
            $fileName = $_FILES['imagen']['name'];
            $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
            
            $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
            $dest_path = 'uploads/' . $newFileName;

            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                $ruta_banner = $dest_path;
            }
        }

        try {
            $query = "INSERT INTO banners (titulo, imagen) VALUES (:titulo, :imagen)";
            $stmt = $pdo->prepare($query);
            $stmt->execute([
                ':titulo' => $titulo,
                ':imagen' => $ruta_banner
            ]);

            echo json_encode(["success" => true, "message" => "Banner publicado con éxito"]);
        } catch (Exception $e) {
            echo json_encode(["success" => false, "error" => $e->getMessage()]);
        }
        break;

    default:
        echo json_encode(["success" => false, "error" => "Acción no válida"]);
        break;
}