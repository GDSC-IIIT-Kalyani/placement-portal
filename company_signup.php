<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer\src\Exception.php';
    require 'PHPMailer\src\PHPMailer.php';
    require 'PHPMailer\src\SMTP.php';
    
    $data = json_decode($_POST['data']);

    $company_id = 1000;
    $company_name = $data->name;
    $email = $data->email;
    $ctc = (int) $data->ctc;
    $no_of_jobs = (int)$data->jobs;
    $desc = "";

    $pdo = new PDO("mysql:host=localhost;dbname=iiitk_placement;", "root", "");
    
    $stmt = $pdo->query("SELECT MAX(`id`) FROM `companies`");
    $max_id = $stmt->fetch(PDO::FETCH_NUM)[0];
    if (isset($max_id)) {
        $company_id = $max_id + 1;
    }

    $stmt = $pdo->prepare("INSERT INTO `companies` (`id`,`name`,`email`,`ctc`,`no_of_jobs`,`description`) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bindParam(1, $company_id);
    $stmt->bindParam(2, $company_name);
    $stmt->bindParam(3, $email);
    $stmt->bindParam(4, $ctc);
    $stmt->bindParam(5, $no_of_jobs);
    $stmt->bindParam(6, $desc);
    $done = $stmt->execute();

    $stmt = $pdo->prepare("INSERT INTO `skills` (`company_id`, `skill`) VALUES (?, ?)");
    foreach ($data->skills as $skill) {
        $stmt->execute([$company_id, $skill]);
    }

    $stmt = $pdo->prepare("INSERT INTO `job_positions` (`company_id`, `position`) VALUES (?, ?)");
    foreach ($data->positions as $position) {
        $stmt->execute([$company_id, $position]);
    }
    
    echo "Company Successfully Registered.";

    // kind of weird, but thats how PDO connections are closed.
    $pdo = null;

    $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
    try {
        //Server settings
        $mail->SMTPDebug = 2;                                 // Enable verbose debug output
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'placement.iiitk@gmail.com';                 // SMTP username
        $mail->Password = 'iiitkalyani';                           // SMTP password
        $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587;                                    // TCP port to connect to

        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );
        //Recipients
        $mail->setFrom('placement.iiitk@gmail.com', 'Placement Cell, IIIT Kalyani');
        $mail->addAddress('anubhavp28@gmail.com', 'Anubhav Patel');     // Add a recipient

        //Attachments

        //Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'Here is the subject';
        $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }
?>