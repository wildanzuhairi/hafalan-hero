
/* ===================================
   HAFALAN HERO 30 JUZ
   GAME ENGINE
=================================== */

// =========================
// MURAJAAH SYSTEM
// =========================


let murajaahAyat=[];

let murajaahIndex=0;

let murajaahRepeat=0;

let targetRepeat=5;

let murajaahModeAktif="surah";



let data = {

    xp:0,

    level:1,

    juzDone:0,

    currentJuz:1,

    ayat:0,

    badges:[
        "🌱 Pemula"
    ]

};



let currentAyat={};

let daftarAyat=[];

let quizMode="juz";

let quizTambahanMode="";

let surahDipilih=null;

let jawabanBenar="";




const pesanBenar=[

"🌸 MasyaAllah! Hafalanmu luar biasa.",
"✨ Alhamdulillah! Jawaban benar.",
"🤲 Baarakallahu fiik! Terus semangat.",
"📖 MasyaAllah, hafalanmu semakin kuat.",
"🌟 Allahumma barik! Kamu hebat.",
"💚 Lanjutkan, semoga Allah memudahkan hafalanmu.",
"🏆 Mantap! Terus istiqamah menghafal.",
"📚 Hebat! Sedikit demi sedikit menjadi bukit."

];




const pesanSalah=[

"😊 Belum tepat, yuk coba lagi.",
"📖 Tidak apa-apa, baca ulang ayatnya ya.",
"💚 Tetap semangat, setiap usaha bernilai ibadah.",
"🤲 Jangan menyerah, Allah memudahkan orang yang belajar.",
"🌸 Coba perhatikan lanjutan ayatnya lagi.",
"📚 Sedikit lagi, pasti bisa.",
"✨ Semangat Hero! Hafalan butuh latihan.",
"💪 Terus mencoba, insyaAllah berhasil."

];




// =========================
// SAVE GAME
// =========================


async function loadGame(){

    try{

    let save=localStorage.getItem("hafalanHero");

    if(save){

        data=JSON.parse(save);

    }

    }catch(e){

        console.log(e);

    }


    if(!data.badges){

        data.badges=[
            "🌱 Pemula"
        ];

    }

    if(!data.nama){

        let nama = prompt("Masukkan nama:");

        if(!nama || nama.trim()==""){

            nama = "Hamba Allah";

        }

        data.nama = nama.trim();

        saveGame();

    }
}




function saveGame(){

    localStorage.setItem(
        "hafalanHero",
        JSON.stringify(data)
    );

}

// =========================
// LOAD DAFTAR SURAH
// =========================


async function loadSurahList(){


try{


const response =
await fetch(
"https://api.alquran.cloud/v1/surah"
);


const json =
await response.json();



if(surahSelect){
    surahSelect.innerHTML =
    "<option value=''>-- Pilih Surah --</option>";
}

if(murajaahSurah){
    murajaahSurah.innerHTML =
    "<option value=''>-- Pilih Surah --</option>";
}



json.data.forEach(function(surah){


let option =
document.createElement("option");


option.value =
surah.number;


option.textContent =

surah.number+
". "+
surah.englishName+
" ("+
surah.name+
")";



if(surahSelect){
    surahSelect.appendChild(option);
}

if(murajaahSurah){

    let optionMurajaah =
    option.cloneNode(true);

    murajaahSurah.appendChild(optionMurajaah);

}

});



}

catch(err){

console.log(err);

}


}

async function loadQariList(){

    const qariSelect =
    document.getElementById("qariSelect");

    const speedAudio =
    document.getElementById("speedAudio");


    const speedValue =
    document.getElementById("speedValue");

    if(!qariSelect) return;

    try{

        const res = await fetch(
        "https://api.alquran.cloud/v1/edition?format=audio&type=versebyverse"
        );

        const json = await res.json();

        if(!json.data) return;

        qariSelect.innerHTML = "";

        json.data
        .filter(q=>q.language==="ar")
        .sort((a,b)=>a.englishName.localeCompare(b.englishName))
        .forEach(function(qari){

            let option =
            document.createElement("option");

            option.value =
            qari.identifier;

            option.textContent =
            qari.englishName;

            qariSelect.appendChild(option);

        });

        const last =
        localStorage.getItem("hafalanHeroQari");

        if(last){

            qariSelect.value = last;

        }

        qariSelect.onchange=function(){

            localStorage.setItem(
                "hafalanHeroQari",
                this.value
            );

        };

    }

    catch(err){

        console.log(err);

    }

}

function loadSpeedAudio(){

    if(!speedAudio) return;


    let speed =
    localStorage.getItem("hafalanHeroSpeed");


    if(speed){

        speedAudio.value = speed;

    }


    setAudioSpeed();


}


function setAudioSpeed(){

    if(!speedAudio) return;


    let speed =
    parseFloat(speedAudio.value);


    if(audioAyat){

        audioAyat.playbackRate = speed;

    }


    if(audioMurajaah){

        audioMurajaah.playbackRate = speed;

    }


    if(speedValue){

        speedValue.innerHTML =
        speed+"x";

    }


    localStorage.setItem(
        "hafalanHeroSpeed",
        speed
    );

}



if(speedAudio){

    speedAudio.oninput=function(){

        setAudioSpeed();

    };

}





// =========================
// TAMPIL SURAH
// =========================


async function loadSurah(){

    if(!surahSelect) return;

    const nomor = surahSelect.value;

    if(nomor==""){
        hasilSurah.innerHTML="";
        return;
    }

    surahDipilih = parseInt(nomor);



hasilSurah.innerHTML =
"Memuat...";



try{


const arab =
await fetch(

`https://api.alquran.cloud/v1/surah/${nomor}/quran-uthmani`

);



const indo =
await fetch(

`https://api.alquran.cloud/v1/surah/${nomor}/id.indonesian`

);



const arabJson =
await arab.json();



const indoJson =
await indo.json();



let html="";



arabJson.data.ayahs.forEach(
function(ayat,index){


html += `

<div class="ayat">

<h4>
Ayat ${ayat.numberInSurah}
</h4>


<p class="arab">
${ayat.text}
</p>


<p>
${indoJson.data.ayahs[index].text}
</p>


</div>

`;


});



hasilSurah.style.display="block";


hasilSurah.innerHTML=html;



}

catch(err){


console.log(err);


hasilSurah.innerHTML=
"❌ Gagal memuat surah";


}


}

// =========================
// DOM
// =========================

const murajaahSurah =
document.getElementById("murajaahSurah");

const murajaahMode =
document.getElementById("murajaahMode");


const murajaahJuz =
document.getElementById("murajaahJuz");


const murajaahSurahBox =
document.getElementById("murajaahSurahBox");


const murajaahJuzBox =
document.getElementById("murajaahJuzBox");


const murajaahMulai =
document.getElementById("murajaahMulai");


const murajaahAkhir =
document.getElementById("murajaahAkhir");


const murajaahRepeatInput =
document.getElementById("murajaahRepeat");


const btnMurajaah =
document.getElementById("btnMurajaah");


const audioMurajaah =
document.getElementById("audioMurajaah");


const statusMurajaah =
document.getElementById("statusMurajaah");

const xpEl =
document.getElementById("xp");


const levelEl =
document.getElementById("level");


const progress =
document.getElementById("progressBar");


const juzDone =
document.getElementById("juzDone");


const juzList =
document.getElementById("juzList");


const heroText =
document.getElementById("heroText");


const badges =
document.getElementById("badges");


const surahName =
document.getElementById("surahName");


const ayatText =
document.getElementById("ayatText");


const answerBox =
document.getElementById("answerBox");


const result =
document.getElementById("result");


const belajarArab =
document.getElementById("belajarArab");


const belajarLatin =
document.getElementById("belajarLatin");


const belajarArti =
document.getElementById("belajarArti");


const audioAyat =
document.getElementById("audioAyat");


const surahSelect =
document.getElementById("surahSelect");


const hasilSurah =
document.getElementById("hasilSurah");

const gantiNama =
document.getElementById("gantiNama");

const playerName =
document.getElementById("playerName");

const stopMurajaah =
document.getElementById("stopMurajaah");

function applyAudioSpeed(){

    let speed = 1;


    if(speedAudio){

        speed =
        parseFloat(speedAudio.value);

    }


    if(audioAyat){

        audioAyat.playbackRate = speed;

    }


    if(audioMurajaah){

        audioMurajaah.playbackRate = speed;

    }


    if(speedValue){

        speedValue.innerHTML =
        speed+"x";

    }


    localStorage.setItem(
        "hafalanHeroSpeed",
        speed
    );

}



function loadAudioSpeed(){

    let save =
    localStorage.getItem(
        "hafalanHeroSpeed"
    );


    if(save && speedAudio){

        speedAudio.value = save;

    }


    applyAudioSpeed();

}



if(speedAudio){

speedAudio.oninput=function(){

    applyAudioSpeed();

};


}

function lanjutMurajaah(){

    murajaahRepeat++;

    if(murajaahRepeat < targetRepeat){

        putarMurajaah();

    }else{

        murajaahRepeat = 0;

        murajaahIndex++;

        putarMurajaah();

    }

}

function loadMurajaahJuz(){

    if(!murajaahJuz) return;


    murajaahJuz.innerHTML =
    "<option value=''>-- Pilih Juz --</option>";


    for(let i=1;i<=30;i++){

        let option =
        document.createElement("option");

        option.value=i;

        option.textContent =
        "Juz "+i;


        murajaahJuz.appendChild(option);

    }

}

if(murajaahMode){

murajaahMode.onchange=function(){


if(this.value==="juz"){

    murajaahSurahBox.style.display="none";
    murajaahJuzBox.style.display="block";

    ayatRangeBox.style.display="none";

}else{

    murajaahSurahBox.style.display="block";
    murajaahJuzBox.style.display="none";

    ayatRangeBox.style.display="block";

}


};


}

const qariSelect =
document.getElementById("qariSelect");

if(qariSelect){

    const lastQari =
    localStorage.getItem("hafalanHeroQari");

    if(lastQari){

        qariSelect.value = lastQari;

    }

    qariSelect.onchange=function(){

        localStorage.setItem(
            "hafalanHeroQari",
            this.value
        );

    };

}


if(stopMurajaah){

    stopMurajaah.onclick=function(){

        audioMurajaah.pause();
        audioMurajaah.currentTime=0;

        murajaahAyat=[];
        murajaahIndex=0;
        murajaahRepeat=0;

        statusMurajaah.innerHTML="✅ Muraja'ah selesai";

        saveGame();

    };

}

let murajaahStat =
JSON.parse(localStorage.getItem("murajaahStat")) || {

totalAyat:0,
totalSesi:0,
totalRepeat:0,
durasi:0,
lastDate:""

};

localStorage.setItem(
"murajaahStat",
JSON.stringify(murajaahStat)
);

// =========================
// MURAJAAH PLAY SYSTEM
// =========================


async function mulaiMurajaah(){


let mode = murajaahMode.value;

murajaahModeAktif = mode;


let surah = murajaahSurah.value;


let juz = murajaahJuz.value;


let mulai = parseInt(murajaahMulai.value);


let akhir = parseInt(murajaahAkhir.value);


targetRepeat =
parseInt(murajaahRepeatInput.value);



/*
=========================
VALIDASI
=========================
*/


if(mode==="surah"){


    if(!surah){

        alert("Pilih surah terlebih dahulu");

        return;

    }


    if(!mulai || !akhir){

        alert("Isi ayat mulai dan akhir");

        return;

    }


    if(mulai > akhir){

        alert("Ayat awal tidak boleh lebih besar");

        return;

    }


    if((akhir - mulai) + 1 > 50){

        alert("Maksimal 50 ayat sekali murajaah");

        return;

    }


}
else{


    if(!juz){

        alert("Pilih juz terlebih dahulu");

        return;

    }


}



if(!targetRepeat || targetRepeat < 1){

    targetRepeat = 1;

}



statusMurajaah.innerHTML =
"⏳ Mengambil ayat...";



try{


let url="";



if(mode==="surah"){


    url =
    `https://api.alquran.cloud/v1/surah/${surah}/quran-uthmani`;


}
else{


    url =
    `https://api.alquran.cloud/v1/juz/${juz}/quran-uthmani`;


}



let res =
await fetch(url);



let json =
await res.json();



let semuaAyat =
json.data.ayahs;




/*
=========================
AMBIL AYAT
=========================
*/


if(mode==="surah"){


    // ambil range ayat surah

    murajaahAyat =
    semuaAyat.filter(function(a){


        return (

            a.numberInSurah >= mulai

            &&

            a.numberInSurah <= akhir

        );


    });


}
else{


    // JUZ = SEMUA AYAT

    murajaahAyat =
    semuaAyat;


}





if(murajaahAyat.length===0){


    alert("Ayat tidak ditemukan");

    return;


}



murajaahIndex = 0;

murajaahRepeat = 0;



putarMurajaah();



}

catch(err){


console.log(err);


statusMurajaah.innerHTML =
"❌ Gagal mengambil ayat";


}


}

function putarMurajaah(){


if(
murajaahIndex >= murajaahAyat.length
){

statusMurajaah.innerHTML =
"✅ Muraja'ah selesai";

return;

}



let ayat =
murajaahAyat[murajaahIndex];



statusMurajaah.innerHTML =

"📖 Ayat "
+
(
murajaahModeAktif==="surah"

?
ayat.numberInSurah

:

"Juz - "+(murajaahIndex+1)

)
+
" pengulangan "
+
(murajaahRepeat+1)
+
"/"
+
targetRepeat;



let currentQari = "ar.alafasy";

const qari =
document.getElementById("qariSelect");

if(qari){
    currentQari = qari.value;
}

audioMurajaah.pause();

audioMurajaah.currentTime = 0;

audioMurajaah.src =
`https://cdn.islamic.network/quran/audio/128/${currentQari}/${ayat.number}.mp3`;

audioMurajaah.onloadedmetadata=function(){

    applyAudioSpeed();

};

audioMurajaah.playbackRate =
parseFloat(speedAudio?.value || 1);


audioMurajaah.play().catch(async function(){

    console.log("Qari gagal, pakai Alafasy");

    audioMurajaah.src =
    `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayat.number}.mp3`;

    await audioMurajaah.play();

});






}

if(btnMurajaah){

btnMurajaah.onclick=function(){

mulaiMurajaah();

};

}

// =========================
// AUDIO ERROR HANDLER
// =========================

if(audioAyat){

audioAyat.onerror=function(){

console.log(
"Audio tidak tersedia"
);

};

}

if(audioMurajaah){

    audioMurajaah.addEventListener("ended", lanjutMurajaah);

}



// =========================
// PILIH SURAH
// =========================


if(surahSelect){


surahSelect.onchange=function(){


if(this.value){


surahDipilih =
parseInt(this.value);


}


};


}





// =========================
// UPDATE UI
// =========================


function updateUI(){


if(xpEl){

xpEl.innerHTML =
data.xp;

}



if(levelEl){

levelEl.innerHTML =
data.level;

}



if(juzDone){

juzDone.innerHTML =
data.juzDone;

}




let persen =
(data.juzDone/30)*100;



if(progress){

progress.style.width =
persen+"%";

}




if(heroText){

heroText.innerHTML =
data.nama +
" • Level " +
data.level +
" siap menghafal!";

}

if(playerName){

playerName.innerHTML =
data.nama;

}



renderBadge();


}








// =========================
// MAP 30 JUZ
// =========================


function createMap(){

if(!juzList){
    return;
}

juzList.innerHTML="";


for(let i=1;i<=30;i++){


let btn=document.createElement("button");


btn.className="juz-btn";



if(i > data.juzDone + 1){

    btn.classList.add("lock");

    btn.innerHTML =
    "🔒 Juz "+i;


}else{


    btn.innerHTML =
    "📖 Juz "+i;


    btn.onclick=function(){

        data.currentJuz = i;

        saveGame();

        document.querySelectorAll(".answer-btn")
        .forEach(btn => btn.disabled = true);

        loadAyat(i);

    };


}



juzList.appendChild(btn);


}


}

// =========================
// LOAD AYAT API
// =========================


async function loadAyat(juz){


if(!surahName || !ayatText){

return;

}



surahName.innerHTML =
"Loading...";


ayatText.innerHTML =
"⏳ Mengambil ayat...";


answerBox.innerHTML="";

result.innerHTML="";



try{


// =========================
// ARAB
// =========================


const arabRes =
await fetch(

`https://api.alquran.cloud/v1/juz/${juz}/quran-uthmani`

);

const ayatRangeBox =
document.getElementById("ayatRangeBox");



const arabJson =
await arabRes.json();

// =========================
// LATIN
// =========================


const latinRes =
await fetch(

`https://api.alquran.cloud/v1/juz/${juz}/en.transliteration`

);



const latinJson =
await latinRes.json();



// =========================
// TERJEMAHAN
// =========================


const artiRes =
await fetch(

`https://api.alquran.cloud/v1/juz/${juz}/id.indonesian`

);



const artiJson =
await artiRes.json();





let arab =
arabJson.data.ayahs;


let latin =
latinJson.data.ayahs;


let arti =
artiJson.data.ayahs;



if(!arab.length){

throw "Ayat kosong";

}



daftarAyat = arab;





// =========================
// RANDOM AYAT
// =========================


// kalau ayat terakhir
const index =
Math.floor(Math.random() * (arab.length - 1));

const ayat=arab[index];
const jawabanAyat=arab[index+1];



currentAyat =
ayat;



// jawaban sambung ayat

jawabanBenar =
jawabanAyat.text;





// =========================
// TAMPILKAN
// =========================


surahName.innerHTML =


(
ayat.surah?.englishName
||
"Al-Quran"

)

+

" Ayat "

+

ayat.numberInSurah;





ayatText.innerHTML =
ayat.text;





// =========================
// MODE BELAJAR
// =========================


if(belajarArab){


belajarArab.innerHTML =
ayat.text;



belajarLatin.innerHTML =
latin[index]?.text || "";



belajarArti.innerHTML =
arti[index]?.text || "";



}






// =========================
// AUDIO
// =========================


if(audioAyat){

audioAyat.pause();

audioAyat.currentTime=0;

audioAyat.src=
`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayat.number}.mp3`;


audioAyat.onloadedmetadata=function(){

    applyAudioSpeed();

};

audioAyat.playbackRate =
parseFloat(speedAudio?.value || 1);

audioAyat.load();

audioAyat.play().catch(()=>{});

}






// =========================
// BUAT JAWABAN
// =========================


createAnswer();





}

catch(err){


console.log(
"ERROR API :",
err
);



ayatText.innerHTML =
"❌ API gagal dimuat";



}


}

// =========================
// QUIZ SURAH
// =========================


async function loadQuizSurah(nomorSurah){


try{


surahName.innerHTML =
"Loading...";


ayatText.innerHTML =
"⏳ Mengambil ayat...";


answerBox.innerHTML="";

result.innerHTML="";




// =========================
// ARAB
// =========================


const arabRes =
await fetch(

`https://api.alquran.cloud/v1/surah/${nomorSurah}/quran-uthmani`

);



const arabJson =
await arabRes.json();





// =========================
// LATIN
// =========================


const latinRes =
await fetch(

`https://api.alquran.cloud/v1/surah/${nomorSurah}/en.transliteration`

);



const latinJson =
await latinRes.json();





// =========================
// ARTI
// =========================


const artiRes =
await fetch(

`https://api.alquran.cloud/v1/surah/${nomorSurah}/id.indonesian`

);



const artiJson =
await artiRes.json();





let arab =
arabJson.data.ayahs;


let latin =
latinJson.data.ayahs;


let arti =
artiJson.data.ayahs;



if(!arab.length){

throw "Ayat kosong";

}



daftarAyat =
arab;











const index =
Math.floor(Math.random() * (arab.length - 1));

const ayat = arab[index];
const jawabanAyat = arab[index + 1];

currentAyat = ayat;
jawabanBenar = jawabanAyat.text;


surahName.innerHTML =

arabJson.data.englishName

+

" Ayat "

+

ayat.numberInSurah;





ayatText.innerHTML =
ayat.text;





// MODE BELAJAR

if(belajarArab){


belajarArab.innerHTML =
ayat.text;



belajarLatin.innerHTML =
latin[index]?.text || "";



belajarArti.innerHTML =
arti[index]?.text || "";



}






// AUDIO

if(audioAyat){

audioAyat.pause();
audioAyat.currentTime = 0;

audioAyat.src =

`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayat.number}.mp3`;

audioAyat.load();

audioAyat.play().catch(()=>{});

}





createAnswer();





}


catch(err){


console.log(
"ERROR QUIZ SURAH :",
err
);



ayatText.innerHTML =
"❌ Gagal mengambil surah";


}


}

// =========================
// QUIZ ARTI AYAT
// =========================


async function loadQuizArti(){


try{


surahName.innerHTML="🌎 Quiz Arti Ayat";

ayatText.innerHTML="⏳ Mengambil ayat...";

answerBox.innerHTML="";

result.innerHTML="";



let juz = data.currentJuz;



const arabRes =
await fetch(
`https://api.alquran.cloud/v1/juz/${juz}/quran-uthmani`
);


const artiRes =
await fetch(
`https://api.alquran.cloud/v1/juz/${juz}/id.indonesian`
);



const arabJson =
await arabRes.json();


const artiJson =
await artiRes.json();



let arab =
arabJson.data.ayahs;


let arti =
artiJson.data.ayahs;



let index =
Math.floor(
Math.random()*arab.length
);



let ayat =
arab[index];


let artiBenar =
arti[index].text;



currentAyat=ayat;


jawabanBenar=artiBenar;



ayatText.innerHTML =
ayat.text;



let pilihan=[artiBenar];



while(pilihan.length<4){

let random =
arti[
Math.floor(
Math.random()*arti.length
)
].text;


if(!pilihan.includes(random)){

pilihan.push(random);

}

}



pilihan.sort(
()=>Math.random()-0.5
);



pilihan.forEach(function(p){


let btn =
document.createElement("button");


btn.className="answer-btn";


btn.innerHTML=p;



btn.onclick=async function(){


if(p===jawabanBenar){


result.innerHTML =
"✅ MasyaAllah benar";


document.querySelectorAll(".answer-btn")
.forEach(b=>b.disabled=true);


await win();



setTimeout(function(){


loadQuizArti();


},1500);



}else{


result.innerHTML =
"❌ Belum tepat";


}


};



answerBox.appendChild(btn);



});



}

catch(err){

console.log(err);

}

}

// =========================
// QUIZ NOMOR AYAT
// =========================


async function loadQuizNomor(){


try{


surahName.innerHTML =
"🔢 Quiz Nomor Ayat";


ayatText.innerHTML =
"⏳ Mengambil ayat...";


answerBox.innerHTML="";
result.innerHTML="";



let juz =
data.currentJuz;



const res =
await fetch(

`https://api.alquran.cloud/v1/juz/${juz}/quran-uthmani`

);



const json =
await res.json();



let ayat =
json.data.ayahs;



let index =
Math.floor(
Math.random()*ayat.length
);



let soal =
ayat[index];



currentAyat = soal;



jawabanBenar =
String(soal.numberInSurah);



ayatText.innerHTML =
soal.text;



let nomor =
soal.numberInSurah;



let pilihan=[
String(nomor)
];



// buat pilihan angka lain

while(pilihan.length < 4){


let angka;


if(Math.random()>0.5){

angka =
nomor +
Math.floor(Math.random()*5)+1;


}else{


angka =
nomor -
Math.floor(Math.random()*5)+1;


}



if(
angka > 0 &&
!pilihan.includes(String(angka))
){

pilihan.push(
String(angka)
);

}


}



pilihan.sort(
()=>Math.random()-0.5
);



pilihan.forEach(function(p){


let btn =
document.createElement("button");


btn.className =
"answer-btn";


btn.innerHTML =
"Ayat ke-"+p;



btn.onclick=function(){



if(p===jawabanBenar){


result.innerHTML =
"✅ MasyaAllah benar";


document.querySelectorAll(".answer-btn")
.forEach(b=>b.disabled=true);


win();



setTimeout(()=>{

loadQuizNomor();

},1500);



}else{


result.innerHTML =
"❌ Coba perhatikan nomor ayatnya";


}



};



answerBox.appendChild(btn);



});



}

catch(err){


console.log(
"Quiz Nomor Error:",
err
);


}

}

// =========================
// QUIZ TEBAK SURAH
// =========================


async function loadQuizTebakSurah(){


try{


surahName.innerHTML =
"📖 Quiz Tebak Surah";


ayatText.innerHTML =
"⏳ Mengambil ayat...";


answerBox.innerHTML="";
result.innerHTML="";



const res =
await fetch(

"https://api.alquran.cloud/v1/surah"

);



const json =
await res.json();



let daftarSurah =
json.data;



let surah =
daftarSurah[
Math.floor(
Math.random()*daftarSurah.length
)
];



const ayatRes =
await fetch(

`https://api.alquran.cloud/v1/surah/${surah.number}/quran-uthmani`

);



const ayatJson =
await ayatRes.json();



let ayatList =
ayatJson.data.ayahs;



let ayat =
ayatList[
Math.floor(
Math.random()*ayatList.length
)
];



currentAyat =
ayat;



jawabanBenar =
surah.englishName;



ayatText.innerHTML =
ayat.text;



let pilihan=[
jawabanBenar
];



// ambil nama surah lain

while(pilihan.length < 4){


let randomSurah =
daftarSurah[
Math.floor(
Math.random()*daftarSurah.length
)
];


if(
!pilihan.includes(
randomSurah.englishName
)
){

pilihan.push(
randomSurah.englishName
);

}


}



pilihan.sort(
()=>Math.random()-0.5
);



pilihan.forEach(function(p){


let btn =
document.createElement("button");


btn.className =
"answer-btn";


btn.innerHTML =
p;



btn.onclick=function(){



if(p===jawabanBenar){


result.innerHTML =
"✅ Benar! Ayat ini dari "+p;


document.querySelectorAll(".answer-btn")
.forEach(b=>b.disabled=true);


win();



setTimeout(()=>{

loadQuizTebakSurah();

},1500);



}else{


result.innerHTML =
"❌ Salah, coba hafalkan nama surahnya";


}



};



answerBox.appendChild(btn);


});



}

catch(err){


console.log(
"Quiz Tebak Surah Error:",
err
);


}


}






// =========================
// BUAT JAWABAN QUIZ
// =========================


function createAnswer(){



if(!daftarAyat.length){

return;

}



answerBox.innerHTML="";



let pilihan =
[jawabanBenar];





let percobaan = 0;

while(pilihan.length < 4 && percobaan < 100){

    percobaan++;

    let randomAyat =
        daftarAyat[Math.floor(Math.random()*daftarAyat.length)].text;

    if(randomAyat!=jawabanBenar &&
       !pilihan.includes(randomAyat)){

        pilihan.push(randomAyat);

    }

}





// acak posisi jawaban

pilihan.sort(

()=>Math.random()-0.5

);





pilihan.forEach(function(item){



let btn =
document.createElement("button");



btn.className =
"answer-btn";



btn.innerHTML =
item;






btn.onclick = async function(){



if(item === jawabanBenar){



let acak =

pesanBenar[

Math.floor(

Math.random()*
pesanBenar.length

)

];




result.innerHTML =

"✅ "+
acak;



document.querySelectorAll(".answer-btn")
.forEach(btn=>btn.disabled=true);
await win();




setTimeout(function(){



if(quizMode=="juz"){


loadAyat(
data.currentJuz
);



}

else{


loadQuizSurah(
surahDipilih
);



}



},1500);






}

else{



let acak =

pesanSalah[

Math.floor(

Math.random()*
pesanSalah.length

)

];



result.innerHTML =

"❌ "+
acak;

document.querySelectorAll(".answer-btn")
.forEach(btn => btn.disabled = true);

setTimeout(createAnswer,1000);


}



};





answerBox.appendChild(btn);



});



}

// =========================
// DONASI HAFALAN HERO
// =========================


function openDonasi(){

    const modal =
    document.getElementById(
        "donasiModal"
    );


    if(modal){

        modal.style.display="flex";

    }

}



function closeDonasi(){

    const modal =
    document.getElementById(
        "donasiModal"
    );


    if(modal){

        modal.style.display="none";

    }

}



function copyDonasi(){

    let rekening =
    "2084225728";


    navigator.clipboard.writeText(
        rekening
    );


    const status =
    document.getElementById(
        "donasiStatus"
    );


    if(status){

        status.innerHTML =
        "✅ Rekening berhasil disalin";

    }

}

// =========================
// MENANG
// =========================


async function win(){

    data.xp += 10;


    data.level =
    Math.floor(data.xp / 100)+1;



    // setiap 100 XP buka 1 Juz

    let juzBaru =
    Math.floor(data.xp / 100);



    if(juzBaru > 30){

        juzBaru = 30;

    }



    if(juzBaru > data.juzDone){

        data.juzDone = juzBaru;


        addBadge(
        "📖 Juz "+juzBaru+" Terbuka"
        );

    }



    saveGame();

    updateUI();

    createMap();


    await updateLeaderboard();

}






// =========================
// BADGE
// =========================


function addBadge(text){


if(!data.badges.includes(text)){


data.badges.push(text);


}


}





function renderBadge(){



if(!badges){

return;

}



badges.innerHTML="";



data.badges.forEach(function(b){



let span =
document.createElement("span");



span.innerHTML =
b;



badges.appendChild(span);



});



}








// =========================
// NEXT BUTTON
// =========================


const nextBtn =
document.getElementById("nextBtn");



if(nextBtn){


nextBtn.onclick=function(){


loadAyat(
data.currentJuz
);


};


}








// =========================
// BUTTON BELAJAR
// =========================


const btnBelajar =
document.getElementById("btnBelajar");



if(btnBelajar){


btnBelajar.onclick=function(){


const panel =
document.getElementById("panelBelajar");



if(panel.style.display=="none"
|| panel.style.display==""){


panel.style.display="block";


}

else{


panel.style.display="none";


}



};


}








// =========================
// BUTTON TAMPIL SURAH
// =========================


const btnSurah =
document.getElementById("btnSurah");



if(btnSurah){



btnSurah.onclick=function(){


loadSurah();


};



}








// =========================
// CLOSE SURAH
// =========================


const btnCloseSurah =
document.getElementById("btnCloseSurah");



if(btnCloseSurah){



btnCloseSurah.onclick=function(){


hasilSurah.style.display="none";


};



}








// =========================
// QUIZ JUZ
// =========================


const btnQuizJuz =
document.getElementById("btnQuizJuz");



if(btnQuizJuz){


btnQuizJuz.onclick=function(){


quizMode="juz";


loadAyat(
data.currentJuz
);



};



}








// =========================
// QUIZ SURAH
// =========================


const btnQuizSurah =
document.getElementById("btnQuizSurah");

// =========================
// QUIZ TAMBAHAN
// =========================


const btnQuizArti =
document.getElementById("btnQuizArti");


const btnQuizNomor =
document.getElementById("btnQuizNomor");


const btnQuizTebakSurah =
document.getElementById("btnQuizTebakSurah");



if(btnQuizArti){

btnQuizArti.onclick=function(){

    quizTambahanMode="arti";

    loadQuizArti();

};

}



if(btnQuizNomor){

btnQuizNomor.onclick=function(){

    quizTambahanMode="nomor";

    loadQuizNomor();

};

}



if(btnQuizTebakSurah){

btnQuizTebakSurah.onclick=function(){

    quizTambahanMode="tebakSurah";

    loadQuizTebakSurah();

};

}


if(btnQuizSurah){


btnQuizSurah.onclick=function(){



if(!surahDipilih){


alert(
"Pilih surah terlebih dahulu."
);


return;


}



quizMode="surah";


loadQuizSurah(
surahDipilih
);



};



}

if(gantiNama){

    gantiNama.onclick = ubahNama;

}


async function kirimSkor(){

    try{

        await fetch("leaderboard.php",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                nama:data.nama,
                xp:data.xp,
                level:data.level

            })

        });

    }catch(err){

        console.log(err);

    }

}

async function ubahNama(){

    let namaBaru = prompt(
        "Masukkan nama baru:",
        data.nama
    );

    if(!namaBaru) return;

    namaBaru = namaBaru.trim();

    if(namaBaru=="") return;

    if(namaBaru===data.nama) return;

    try{

        const res = await fetch("gantiNama.php",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                lama:data.nama,
                baru:namaBaru

            })

        });

        const hasil = await res.json();

        if(hasil.status==="exists"){

            alert("Nama tersebut sudah digunakan.");

            return;

        }

        data.nama = namaBaru;

        saveGame();

        updateUI();

        await updateLeaderboard();

        alert("Nama berhasil diganti.");

    }catch(err){

        console.log(err);

        alert("Gagal mengganti nama.");

    }

}


// =========================
// PAPAN PERINGKAT
// =========================

async function updateLeaderboard(){

    const body=document.getElementById("leaderboardBody");

    if(!body) return;

    try{

        await kirimSkor();

       const res = await fetch("getLeaderboard.php");

        const ranking = await res.json();

        // Cek apakah data valid
        if(!Array.isArray(ranking)){
            console.log("Data leaderboard tidak valid:", ranking);
            return;
        }

        body.innerHTML="";

        ranking.forEach(function(player,index){

            body.innerHTML += `
            <tr>
                <td>${index+1}</td>
                <td>${player.nama}</td>
                <td>${player.level}</td>
                <td>${player.xp}</td>
            </tr>
            `;

        });

    }catch(err){

        console.log(err);

    }

}


// =========================
// START GAME
// =========================

async function startGame(){

    loadSpeedAudio();
    
    await loadGame();
    
    
    await loadSurahList();

    loadMurajaahJuz();
    await loadQariList();

    updateUI();

    createMap();

    await updateLeaderboard();

    await loadAyat(data.currentJuz);

}


startGame();