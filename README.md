# Reservasi Ruangan Meeting (APK)

Aplikasi Android (Capacitor, satu file HTML) untuk reservasi ruangan meeting tim marketing.

## Fitur
- Cek ketersediaan ruangan: sekarang, harian (grid per 30 menit), dan rentang tanggal.
- Reservasi dengan deteksi bentrok (jeda antar kegiatan ikut dikunci di server), jam operasional, kapasitas, jeda antar kegiatan, tamu, dan paket konsumsi.
- Ubah/jadwal ulang reservasi, reservasi berulang (setiap hari berurutan atau setiap minggu, 2 sampai 12 kali) dan batalkan seri.
- Pengingat 15 menit sebelum kegiatan (notifikasi lokal di HP pemesan).
- Alur persetujuan, check-in, selesai lebih awal; status otomatis (tidak hadir, dibatalkan, selesai).
- Role: `admin`, `approver`, `staf`, `manajer` (manajer hanya melihat).
- Data master (ruangan, tamu, user, kategori, tipe kegiatan, paket), riwayat tamu, laporan bulanan dengan ekspor CSV.
- Backup dan restore data (JSON), tombol Back Android.
- Mode online opsional (Firebase Realtime Database): banyak HP berbagi data real-time dan slot jam dikunci di server.

## Membuat APK di GitHub
1. Buat repository baru, unggah seluruh isi folder ini (termasuk folder `.github`).
2. **Uji cepat:** tab *Actions* > *Build APK (debug)* > *Run workflow*, lalu unduh artifact `reservasi-ruangan-debug-apk`.
   APK debug berganti tanda tangan di tiap build, jadi tidak bisa menimpa versi sebelumnya.
3. **Untuk dibagikan:** ikuti bagian Rilis APK di bawah.

## Rilis APK (bertanda tangan, bisa di-update)
1. Di komputer yang punya Java, jalankan `bash scripts/buat-keystore.sh`. **Simpan file `reservasi.jks` dan sandinya** di tempat aman. Bila hilang, pengguna harus uninstall dulu untuk memasang versi berikutnya.
2. Di GitHub: *Settings > Secrets and variables > Actions*, buat 4 secret: `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD` (nilainya dicetak oleh skrip).
3. Beri tag: `git tag v1.0.0 && git push origin v1.0.0`. Atau *Actions > Release APK (signed) > Run workflow* dan isi nomor versi.
4. APK muncul di halaman **Releases**, tinggal dibagikan tautannya. Repository publik: siapa pun bisa mengunduh. Repository privat: hanya anggota.

## Memasang di HP
Unduh APK dari Releases, buka, izinkan "Instal dari sumber tidak dikenal" bila diminta. Untuk update, pasang APK versi baru di atas yang lama (data tetap, selama tanda tangan sama).

## Multi user dan real-time
Lihat [SETUP_SINKRONISASI.md](SETUP_SINKRONISASI.md). Tanpa langkah ini, data hanya ada di HP masing-masing (localStorage) dan hilang bila aplikasi di-uninstall. Gunakan Backup secara rutin.

## Pengembangan
Seluruh aplikasi ada di `www/index.html`. Untuk mencoba di komputer: `cd www && python3 -m http.server 8000`, buka `http://localhost:8000`.
Folder `android/` dibuat otomatis oleh workflow (`npx cap add android`) dan tidak disimpan di repo.

## Batasan yang diketahui
- Role dicek di aplikasi, bukan di server; Firebase dengan kode rahasia cocok untuk tim kecil yang saling percaya.
- Pengingat berupa notifikasi lokal (tanpa internet). Belum ada notifikasi push saat aplikasi tertutup, misalnya "pengajuan baru" untuk approver; itu butuh Firebase Cloud Messaging dan server.
- Reservasi hanya dalam satu hari (jam operasional tidak melewati tengah malam). Kegiatan multi-hari dibuat lewat reservasi berulang "setiap hari".
- Jam aplikasi disamakan dengan jam server Firebase bila rules mengizinkan `_ts`; zona waktu tetap zona HP.
- Target Android SDK mengikuti Capacitor 6 (SDK 34): cocok untuk dibagikan langsung, belum memenuhi syarat terbaru Google Play.

Lisensi: MIT.
