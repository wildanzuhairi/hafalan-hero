<!DOCTYPE html>
<html lang="id">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Hafalan Hero 30 Juz</title>

<link rel="stylesheet" href="style.css">

<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&display=swap" rel="stylesheet">

<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#0F6B3A">

<link rel="apple-touch-icon" href="icons/icon-192.png">
</head>


<body>


<header>

<h1>
📖 HAFALAN HERO
</h1>


<div class="stats">

👤
<span id="playerName">
Loading...
</span>

&nbsp;&nbsp;

⭐ XP :
<span id="xp">0</span>

&nbsp;&nbsp;

🔥 LEVEL :
<span id="level">1</span>

</div>


</header>




<main>


<!-- HERO -->

<section class="hero">


<div class="character">

<img src="hero.png" 
id="heroImage"
alt="Hero">

</div>



<div class="bubble">

<p id="heroMessage">

Halo Hero!
Siap menaklukkan 30 Juz?

</p>

</div>


</section>





<!-- PROGRESS -->


<section class="progress">


<h2>
🏆 Progress Hafalan
</h2>


<div class="bar">

<div id="progressBar"></div>

</div>


<p>

Juz selesai:
<span id="juzDone">
0
</span>
/
30

</p>


</section>







<!-- MAP -->


<section class="map-section">


<h3>📖 Mode Belajar</h3>

<div class="surah-picker">

    <label for="surahSelect">
        📖 Pilih Surah
    </label>


    <select id="surahSelect">

        <option value="">
            🌙 -- Pilih Surah -- 🌙
        </option>

    </select>


</div>

<button id="gantiNama">
✏️ Ganti Nama
</button>

<button onclick="openDonasi()">

💚 Donasi

</button>

<button id="btnSurah">

📖 Buka Surah

</button>

<button id="btnCloseSurah">

❌ Tutup Surah

</button>

<div id="hasilSurah" style="display:none;"></div>



<!-- MODE MURAJAAH -->
<div class="murajaah-box">

    <h3>🎧 Mode Muraja'ah</h3>

    <label>Mode Muraja'ah</label>

    <select id="murajaahMode">

    <option value="surah">
    📖 Berdasarkan Surah
    </option>

    <option value="juz">
    🏆 Berdasarkan Juz
    </option>

    </select>

    


    <div id="murajaahSurahBox">

    <label>Surah</label>

    <select id="murajaahSurah">

    <option value="">
    -- Pilih Surah --
    </option>
    

    </select>
    

    </div>

    



    <div id="murajaahJuzBox" style="display:none">


    <label>Juz</label>

    <select id="murajaahJuz">

    <option value="">
    -- Pilih Juz --
    </option>


    </select>


    </div>

    <br>

    <div id="ayatRangeBox">

    <label>Ayat Mulai</label>

    <input
    id="murajaahMulai"
    type="number"
    value="1">


    <label>Ayat Akhir</label>

    <input
    id="murajaahAkhir"
    type="number"
    value="1">

    </div>

    <br>

    <label>Jumlah Pengulangan</label>
    <input
        id="murajaahRepeat"
        type="number"
        value="5"
        min="1">

    <br>

    <label>Qari</label>

    <select id="qariSelect">
         <option>Memuat daftar qari...</option>
    </select>

    <br><br>

    <label>
    🎚️ Kecepatan Bacaan
    </label>

    <input 
    type="range"
    id="speedAudio"
    min="0.5"
    max="2.5"
    step="0.1"
    value="1">

    <span id="speedValue">
    1x
    </span>

    <br><br>

    <button id="btnMurajaah">
        ▶ Mulai Muraja'ah
    </button>

    <button id="stopMurajaah">
        ⏹ Stop
    </button>

    <p id="statusMurajaah"></p>

    <audio
        id="audioMurajaah"
        controls>
    </audio>

</div>



<hr>

<h3>

🎮 Mode Quiz

</h3>

<button id="btnQuizJuz">

📚 Quiz Berdasarkan Juz

</button>

<button id="btnQuizSurah">

📖 Quiz Berdasarkan Surah

</button>

<button id="btnQuizArti">
🌎 Quiz Arti Ayat
</button>

<button id="btnQuizNomor">
🔢 Quiz Nomor Ayat
</button>

<button id="btnQuizTebakSurah">
📖 Quiz Tebak Surah
</button>





<div class="hero-player">


<img src="hero.png">


<span id="heroText">

Mulai perjalanan!

</span>


</div>




<div id="juzList">

</div>



</section>








<!-- BADGE -->


<section class="badge-section">


<h2>
🏅 Badge Hero
</h2>


<div id="badges">

<span>
🌱 Pemula
</span>


</div>


</section>









<!-- QUIZ -->


<section class="quiz">


<h2>
📖 Misi Hafalan
</h2>



<div class="mission-card">


<h3 id="surahName">

Memuat Surah...

</h3>



<div id="ayatText">

</div>

<div class="belajar-panel">

<button id="btnBelajar">
📖 Mode Belajar
</button>


<div id="panelBelajar" style="display:none">


<h3>Arab</h3>
<div id="belajarArab"></div>


<h3>Latin</h3>
<div id="belajarLatin"></div>


<h3>Terjemahan Indonesia</h3>
<div id="belajarArti"></div>


<h3>Audio</h3>

<audio 
id="audioAyat"
controls>
</audio>


</div>

</div>



<h3>

Pilih jawaban yang benar

</h3>




<div id="answerBox">

</div>




<button id="nextBtn">

➡️ Ayat Berikutnya

</button>




<p id="result">

</p>



</div>


</section>







</main>



<!-- =========================
     PAPAN PERINGKAT
========================= -->

<section class="leaderboard">

<h2>🏆 Papan Peringkat Hero</h2>

<table class="leaderboard-table">

<thead>

<tr>
<th>Peringkat</th>
<th>Hero</th>
<th>Level</th>
<th>XP</th>
</tr>

</thead>

<tbody id="leaderboardBody">

</tbody>

</table>

</section>

<!-- =========================
     MODAL DONASI HAFALAN HERO
========================= -->

<div id="donasiModal" class="hero-modal">


<div class="hero-modal-content">


<button 
class="close-modal"
onclick="closeDonasi()">

❌

</button>



<h2>
💚 Dukungan Hafalan Hero
</h2>



<p>
Terima kasih telah menggunakan Hafalan Hero.
</p>


<p>
Game edukasi ini dibuat untuk membantu belajar,
menghafal, dan murojaah Al-Qur'an.
</p>



<div class="donasi-box">


<h3>
☕ Dukung Pengembangan
</h3>


<p>
Semoga menjadi amal jariyah.
</p>

<p>
🏦 BNI
2084225728 - Wildan Zuhairi</p>
<button 
onclick="copyDonasi()">


📋 Salin Rekening

</button>


</div>



<p id="donasiStatus"></p>


</div>


</div>


<footer>

Hafalan Hero 30 Juz © 2026

</footer>






<script src="game.js"></script>

<script>

if("serviceWorker" in navigator){

window.addEventListener("load",()=>{

navigator.serviceWorker.register("sw.js")

.then(()=>{

console.log("PWA Ready");

});

});

}

</script>

</body>


</html>

