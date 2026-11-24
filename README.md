# Pesanan Snack (APK)

Aplikasi Android untuk mencatat pesanan snack berbasis pre-order (tanpa stok barang jadi). Satu file HTML (`www/index.html`) dibungkus Capacitor.

## Fitur
- Beranda: kapasitas produksi hari ini, jadwal hari ini, piutang, pesanan yang belum masuk produksi.
- Pesanan: buat, cari, filter status, catat pembayaran, kirim WhatsApp, batalkan. DP opsional.
- Status naik bertahap: Baru > Dikonfirmasi > Terkunci > Diproduksi > Siap > Selesai (Selesai hanya jika lunas).
- Produksi: jumlah tiap produk yang harus dibuat per tanggal (pesanan Terkunci/Diproduksi), centang selesai, daftar kemas.
- Data: tambah/ubah/hapus pelanggan dan produk. Pengaturan: kapasitas harian, ongkos antar, minimal H- pemesanan (bawaan H-1).
- Laporan: omzet bulan ini, grafik 7 hari, produk terlaris.
- Nota PDF per pesanan (ukuran struk, bisa dibagikan ke WhatsApp). Nama usaha dan kontak diatur di Pengaturan.
- Notifikasi: ringkasan pesanan hari ini (06.00), pengingat pesanan besok (18.00), dan "Siapkan pesanan" 1 jam sebelum jam ambil. Bisa dimatikan per jenis di Pengaturan. Jadwal dibuat untuk 14 hari ke depan setiap data berubah atau aplikasi dibuka.
- Backup dan pulihkan data (file JSON).

Data tersimpan di HP (satu perangkat). Belum ada sinkronisasi antar HP, jadi lakukan **Backup** secara rutin (Data > Backup data).

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
