<?php
    
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
    $pdo = null

?>