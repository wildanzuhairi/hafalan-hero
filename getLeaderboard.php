<?php

$conn = mysqli_connect(
    "localhost",
    "root",
    "",
    "portfolio_db"
);

if(!$conn){
    die("Koneksi Gagal : ".mysqli_connect_error());
}

$result=mysqli_query($conn,"
SELECT
nama,
level,
xp
FROM leaderboard
ORDER BY xp DESC
LIMIT 10
");

$data=[];

while($row=mysqli_fetch_assoc($result)){
    $data[]=$row;
}

header("Content-Type: application/json");

echo json_encode($data);