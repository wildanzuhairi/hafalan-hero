<?php

$conn = mysqli_connect(
    "localhost",
    "root",
    "",
    "portfolio_db"
);

$data=json_decode(file_get_contents("php://input"),true);

$lama=mysqli_real_escape_string($conn,$data["lama"]);
$baru=mysqli_real_escape_string($conn,$data["baru"]);

$cek=mysqli_query($conn,"
SELECT id
FROM leaderboard
WHERE nama='$baru'
");

if(mysqli_num_rows($cek)>0){

    echo json_encode([
        "status"=>"exists"
    ]);

    exit;

}

mysqli_query($conn,"
UPDATE leaderboard
SET
    nama='$baru',
    updated_at=NOW()
WHERE nama='$lama'
");

echo json_encode([
    "status"=>"success"
]);