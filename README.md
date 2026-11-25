# Cici Snack (APK)

Aplikasi Android untuk mencatat pesanan snack berbasis pre-order (tanpa stok barang jadi). Satu file HTML (`www/index.html`) dibungkus Capacitor.

## Fitur
- Beranda: kapasitas produksi hari ini, jadwal hari ini, omzet hari ini, pesanan yang menunggu konfirmasi.
- Tombol + : pilih Tambah Pesanan atau Tambah Pelanggan.
- Pesanan: buat, cari, filter status, catat pembayaran (atau Lunasi sisa), kirim WhatsApp, batalkan. DP opsional. Di form pesanan baru, ketuk kolom Pelanggan atau Produk sekali untuk langsung membuka daftar dan pencarian; produk bisa ditambah beberapa sekaligus. Harga tiap baris di Daftar pesanan bisa disesuaikan khusus untuk pesanan itu (harga produk di Data tidak berubah; kosongkan kolom untuk kembali ke harga normal). Pesanan masih bisa diubah (tombol Ubah pesanan di detail) selama belum berstatus Siap. Tombol Bayar dan Lunasi sisa meminta konfirmasi dulu.
- Keuangan: dua daftar untuk pesanan yang sudah Selesai. *Pesanan Piutang* (belum lunas, per nota atau per pelanggan, ada tombol tagih lewat WhatsApp) dan *Pesanan Lunas*. Bisa dicari dan dilihat per Bulanan atau Tahunan (berdasarkan tanggal pesanan; piutang di periode lain diberi catatan).
- Status naik bertahap: Baru > Dikonfirmasi > Diproduksi > Siap > Selesai (diantar atau diambil) > Lunas / Piutang. Lunas atau Piutang ditentukan otomatis dari pembayaran setelah pesanan Selesai; pembayaran masih bisa dicatat setelah Selesai. Data lama berstatus Terkunci otomatis menjadi Dikonfirmasi.
- Produksi: jumlah tiap produk yang harus dibuat per tanggal (pesanan Dikonfirmasi/Diproduksi), centang selesai, daftar kemas.
- Data: cari, ubah, hapus pelanggan dan produk (tambah pelanggan lewat tombol +). Pengaturan: kapasitas harian, ongkos antar, minimal H- pemesanan (bawaan H-1).
- Laporan: pilihan Bulanan atau Tahunan, berisi omzet, jumlah pesanan, grafik per tanggal (bulanan) atau per bulan (tahunan), rincian Total Omzet Berdasarkan Status PO (Baru sampai Lunas/Piutang, pesanan Dibatalkan tidak dihitung), dan produk terlaris.
- Nota PDF per pesanan (ukuran struk, bisa dibagikan ke WhatsApp). Nama usaha dan kontak diatur di Pengaturan.
- Notifikasi: ringkasan pesanan hari ini (06.00), pengingat pesanan besok (18.00), dan "Siapkan pesanan" 1 jam sebelum jam ambil. Bisa dimatikan per jenis di Pengaturan. Jadwal dibuat untuk 14 hari ke depan setiap data berubah atau aplikasi dibuka.
- Pengaturan (Data > Pengaturan) memuat: Backup dan pulihkan data (file JSON), Sinkronisasi realtime, dan Update aplikasi.

Data tersimpan di HP. Untuk berbagi antar HP atau cadangan online, pakai **Sinkronisasi realtime**; tetap lakukan **Backup** secara rutin (Data > Pengaturan > Backup data).

## Sinkronisasi realtime (Firebase)
Perubahan di satu HP langsung muncul di HP lain dan di Cici Snack TV, tanpa tombol Sinkronkan. Memakai Firebase Realtime Database (paket gratis Spark cukup).
1. Buka console.firebase.google.com, buat proyek, lalu **Build > Realtime Database > Create Database** (pilih lokasi Singapore, mulai dengan Locked mode).
2. Tab **Rules**, tempel aturan berikut lalu **Publish**:
```
{
  "rules": {
    ".read": false,
    ".write": false,
    "snack": {
      "$room": {
        ".read": true,
        ".write": true,
        ".validate": "newData.hasChildren(['mod','json'])"
      }
    }
  }
}
```
3. Salin URL database (mis. `https://nama-proyek-default-rtdb.firebaseio.com`).
4. Di aplikasi: Data > Pengaturan > Sinkronisasi realtime. Isi URL, tekan **Buat kode acak**, lalu **Aktifkan realtime**.
5. Di HP lain, isi URL dan Kode ruang yang sama, lalu aktifkan.
Kode ruang berfungsi seperti kata sandi: siapa pun yang tahu URL dan kodenya bisa membaca dan mengubah data, jadi jangan dibagikan. Bila berubah di dua HP sekaligus, perubahan terbaru yang dipakai. Tetap lakukan Backup rutin.

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
