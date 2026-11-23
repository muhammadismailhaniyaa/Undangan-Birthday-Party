// --- 1. NAMA TAMU DINAMIS DARI URL ---
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const namaTamu = urlParams.get('to');
    
    if (namaTamu) {
        const elemenNama = document.getElementById('nama');
        elemenNama.innerText = decodeURIComponent(namaTamu.replace(/\+/g, ' '));
    }
});

// --- 2. HITUNG MUNDUR (COUNTDOWN TIMER) ---
const targetDate = new Date("January 16, 2027 15:00:00").getTime();

const countdownTimer = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById("days")) {
        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    }
}, 1000);

// --- 3. SALIN NOMOR REKENING (AMPLOP DIGITAL) ---
function salinRekening() {
    const noRekening = "1234567890";
    navigator.clipboard.writeText(noRekening).then(() => {
        alert("Nomor rekening berhasil disalin: " + noRekening);
    }).catch(err => {
        console.error("Gagal menyalin: ", err);
    });
}

// --- 4. BUKU TAMU & LOCALSTORAGE ---
const formUcapan = document.getElementById('formUcapan');
const daftarUcapan = document.getElementById('daftarUcapan');

function muatUcapan() {
    if (!daftarUcapan) return;
    daftarUcapan.innerHTML = "";
    const dataUcapan = JSON.parse(localStorage.getItem('bukuTamu')) || [];
    
    dataUcapan.forEach(item => {
        const div = document.createElement('div');
        div.style.marginBottom = "10px";
        div.style.padding = "8px";
        div.style.background = "#fff";
        div.style.border = "1px solid #eee";
        div.style.borderRadius = "5px";
        div.innerHTML = `<strong style="color: #0087d6;">${item.nama}</strong><p style="font-size: 0.9rem; margin-top: 3px; color: #333;">${item.pesan}</p>`;
        daftarUcapan.appendChild(div);
    });
}

muatUcapan();

if (formUcapan) {
    formUcapan.addEventListener('submit', function(e) {
        e.preventDefault();
        const namaPesan = document.getElementById('namaPesan').value;
        const isiPesan = document.getElementById('isiPesan').value;
        
        const ucapanBaru = { nama: namaPesan, pesan: isiPesan };
        let dataUcapan = JSON.parse(localStorage.getItem('bukuTamu')) || [];
        dataUcapan.unshift(ucapanBaru);
        
        localStorage.setItem('bukuTamu', JSON.stringify(dataUcapan));
        muatUcapan();
        formUcapan.reset();
    });
}

// --- 5. FORMULIR RSVP & KONFIRMASI KEHADIRAN ---
const formRsvp = document.getElementById('formRsvp');
const pesanRsvp = document.getElementById('pesanRsvp');

if (formRsvp) {
    formRsvp.addEventListener('submit', function(e) {
        e.preventDefault();
        const nama = document.getElementById('rsvpNama').value;
        const kehadiran = document.getElementById('rsvpHadir').value;
        const jumlah = document.getElementById('rsvpJumlah').value;
        
        pesanRsvp.style.color = "#28a745";
        pesanRsvp.innerText = `Terima kasih, ${nama}! Kehadiran (${kehadiran} - ${jumlah} orang) telah TERKONFIRMASI.`;
        formRsvp.reset();
    });
}

function shareKeWhatsApp() {
  const urlUndangan = window.location.href;
  const pesan = `Halo! Teman-teman, yuk datang dan meriahkan acara ulang tahunku yang ke-17! 🎉\n\nCek detail acara, lokasi, dan konfirmasi kehadiran di sini ya:\n${urlUndangan}\n\nKehadiran kalian sangat dinantikan! Terima kasih. ✨`;
  
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(pesan)}`;
  window.open(whatsappUrl, '_blank');
}