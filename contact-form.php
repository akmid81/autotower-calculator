<?php
$data = json_decode(file_get_contents("php://input"), true);

$check = $data["check"];
if ($check != "") exit;

$type = $data["type"];
$hours = $data["hours"];
$x = $data["x"];
$cost = $data["cost"];
$name = $data["name"];
$tel = $data["tel"];

/* Куда слать письма */
$address = "adres@gmail.com";
/* Тема письма */
$sub = "Заявка на автовышку";
/* Адрес отправителя - ваш сервер */
$from = "info@adres.ru";

/* Макет сообщения */
$mes = "Заявка на автовышку \n

Параметры заказа:
Тип автовышки (м): $type
Количество часов: $hours
Расстояние от Ростова-на-Дону: $x
Расчетная стоимость: $cost

Данные заказчика:
Имя: $name
Телефон: - $tel";

if (mail($address, $sub, $mes, $from)) {
   echo json_encode(1);
} else {
   echo json_encode(0);
};

exit;
?>