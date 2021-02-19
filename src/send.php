<?php

$userName = $_POST['userName'];
$userPhone = $_POST['userPhone'];
$userEmail = $_POST['userEmail'];
$userQuestion = $_POST['userQuestion'];
$formName = $_POST['formName'];

// Load Composer's autoloader
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    $mail->CharSet = 'utf-8';
    //Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                       // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'burdukoaskijvladislav@gmail.com';               // SMTP username
    $mail->Password   = '89385143014aa';                        // SMTP password
    $mail->SMTPSecure = 'ssl';            // Enable TLS encryption; 
    $mail->Port       = 465;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('burdukoaskijvladislav@gmail.com', 'Владислав');
    $mail->addAddress('burdukovskij.vlad@mail.ru');     // Add a recipient
    
    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = "Новая заявка с сайта";
    
    if ($formName == 'modal-form') {
        $mail->Body    = "Имя пользователя ${userName}, его телефон: ${userPhone}. Его почта: ${userEmail}";
    } else if ($formName == 'control-form') {
        $mail->Body    = "Имя пользователя ${userName}, его телефон: ${userPhone}.";
    } else if ($formName == 'footer-form') {
        $mail->Body    = "Имя пользователя ${userName}, его телефон: ${userPhone}. Его вопрос: ${userQuestion}";
    } else {
        $mail->ErrorInfo = 'Invalid form name';
        throw new Exception('Invalid form name');
    }    
    
// header('Location: index.html');
  
    $result = $mail->send();
    // Проверяем результат отправки сообщения
    if ($result == true) {
    echo "Форма успешно отправлена";
    } else {
    echo "Сообщение не был отправлено. Неверно указаны настройки вашей почты";
    }

    } catch (Exception $e) {
        echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
    }
?>