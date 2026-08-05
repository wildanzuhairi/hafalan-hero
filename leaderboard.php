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

$data=json_decode(file_get_contents("php://input"),true);

$nama=mysqli_real_escape_string($conn,$data["nama"]);
$xp=(int)$data["xp"];
$level=(int)$data["level"];

// cek apakah nama sudah ada
$cek=mysqli_query($conn,"
SELECT id,xp
FROM leaderboard
WHERE nama='$nama'
");

if(mysqli_num_rows($cek)>0){

    $lama=mysqli_fetch_assoc($cek);

    // hanya update jika xp lebih tinggi
    if($xp>$lama["xp"]){

        mysqli_query($conn,"
        UPDATE leaderboard
        SET
        xp='$xp',
        level='$level'
        WHERE nama='$nama'
        ");

    }

}else{

    mysqli_query($conn,"
    INSERT INTO leaderboard
    (
        nama,
        xp,
        level
    )
    VALUES
    (
        '$nama',
        '$xp',
        '$level'
    )
    ");

}

echo "ok";