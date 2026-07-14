<?php
// tasa.php - La forma más simple posible
header('Content-Type: application/json');

// Obtenemos la tasa de una API gratuita que ya nos da el JSON directo
// Ejemplo: una API que publica la tasa del BCV o paralelo
$url = "https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv"; 

$tasa_json = @file_get_contents($url);

if ($tasa_json) {
    $data = json_decode($tasa_json, true);
    // Extraemos el valor del campo correspondiente
    $tasa = $data['monitors']['usd']['price'];
    echo json_encode(["tasa" => $tasa]);
} else {
    // Valor de respaldo si la API falla
    echo json_encode(["tasa" => 45.00]);
}
?>