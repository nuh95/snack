# Pesanan Snack (APK)

Aplikasi Android untuk mencatat pesanan snack berbasis pre-order (tanpa stok barang jadi). Satu file HTML (`www/index.html`) dibungkus Capacitor.

## Fitur
- Beranda: kapasitas produksi hari ini, jadwal hari ini, piutang, pesanan yang belum masuk produksi.
- Tombol + : pilih Tambah Pesanan atau Tambah Pelanggan.
- Pesanan: buat, cari, filter status, catat pembayaran (atau Lunasi sisa), kirim WhatsApp, batalkan. DP opsional. Di form pesanan baru, pelanggan dan produk dipilih lewat kolom pencarian; produk yang ditambahkan masuk ke daftar pesanan.
- Piutang: nota yang belum lunas, per nota atau per pelanggan, bisa dicari, dan ada tombol tagih lewat WhatsApp.
- Status naik bertahap: Baru > Dikonfirmasi > Terkunci > Diproduksi > Siap > Selesai (Selesai hanya jika lunas).
- Produksi: jumlah tiap produk yang harus dibuat per tanggal (pesanan Terkunci/Diproduksi), centang selesai, daftar kemas.
- Data: cari, ubah, hapus pelanggan dan produk (tambah pelanggan lewat tombol +). Pengaturan: kapasitas harian, ongkos antar, minimal H- pemesanan (bawaan H-1).
- Laporan: omzet bulan ini, grafik 7 hari, produk terlaris.
- Nota PDF per pesanan (ukuran struk, bisa dibagikan ke WhatsApp). Nama usaha dan kontak diatur di Pengaturan.
- Notifikasi: ringkasan pesanan hari ini (06.00), pengingat pesanan besok (18.00), dan "Siapkan pesanan" 1 jam sebelum jam ambil. Bisa dimatikan per jenis di Pengaturan. Jadwal dibuat untuk 14 hari ke depan setiap data berubah atau aplikasi dibuka.
- Pengaturan (Data > Pengaturan) memuat: Backup dan pulihkan data (file JSON), Sinkronisasi online, dan Update aplikasi.

Data tersimpan di HP. Untuk berbagi antar HP atau cadangan online, pakai **Sinkronisasi online**; tetap lakukan **Backup** secara rutin (Data > Pengaturan > Backup data).

## Sinkronisasi online
Data disimpan di GitHub Gist **privat** milik Anda, tanpa server tambahan.
1. Buat token di GitHub: *Settings* > *Developer settings* > *Personal access tokens*, beri izin **gist**.
2. Di aplikasi: Data > Pengaturan > Sinkronisasi online, isi token, tekan **Sinkronkan sekarang**. ID Gist terisi otomatis.
3. Di HP lain, isi token dan ID Gist yang sama, lalu Sinkronkan.
Sinkronkan membandingkan waktu ubah: hanya HP yang berubah dikirim, hanya online yang berubah diambil. Bila keduanya berubah, Anda diminta memilih; tombol *Kirim ke online* dan *Ambil dari online* menimpa satu sisi. Data digabung per seluruh isi, bukan per pesanan, jadi hindari mengubah di dua HP sekaligus sebelum sinkron.

## Update aplikasi
Di Pengaturan > Update aplikasi, isi repo (`pemilik/nama`, harus publik) lalu **Cek update**. Aplikasi membandingkan versi terpasang dengan rilis terbaru di halaman Releases dan menyediakan tautan unduh APK. Backup dulu, lalu buka APK untuk memasang di atas versi lama (keystore harus sama).

## Membuat APK di GitHub
1. Buat repository baru, unggah seluruh isi folder ini (termasuk `.github`).
2. **Uji cepat:** tab *Actions* > *Build APK (debug)* > *Run workflow*, unduh artifact `snack-debug-apk`. Tanda tangan debug berubah tiap build, jadi tidak bisa menimpa versi lama.
3. **Untuk dipakai sehari-hari:** ikuti bagian Rilis APK.

## Rilis APK
1. Siapkan keystore (sekali saja). File `ISI_GITHUB_SECRETS.txt` dan `pesanan-snack.jks` sudah disediakan terpisah. **Simpan keduanya**; bila hilang, aplikasi tidak bisa diperbarui tanpa uninstall.
2. Di GitHub: *Settings* > *Secrets and variables* > *Actions*, buat 4 secret: `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`.
3. *Actions* > *Release APK (signed)* > *Run workflow*, isi versi (mis. `1.0.0`). APK muncul di halaman *Releases*.
4. Update berikutnya: rilis versi lebih besar dengan keystore yang sama, lalu pasang APK baru di atas yang lama.

## Catatan
- Package ID: `com.snack.pesanan`.
- Jangan unggah `*.jks` atau file `*.base64.txt` ke repo (sudah ada di `.gitignore`).
