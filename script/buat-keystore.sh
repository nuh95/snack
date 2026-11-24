#!/usr/bin/env bash
# Membuat keystore penandatangan APK (sekali saja) dan menyiapkan isi GitHub Secrets.
# Butuh Java (keytool). SIMPAN reservasi.jks dan sandinya: bila hilang, APK tidak bisa di-update.
set -e
keytool -genkeypair -v -keystore reservasi.jks -alias reservasi -keyalg RSA -keysize 2048 -validity 10000
base64 < reservasi.jks | tr -d '\n' > reservasi.jks.base64.txt
echo
echo "Selesai. Buka GitHub > Settings > Secrets and variables > Actions, buat 4 secret:"
echo "  KEYSTORE_BASE64   = isi file reservasi.jks.base64.txt"
echo "  KEYSTORE_PASSWORD = sandi keystore yang tadi Anda ketik"
echo "  KEY_ALIAS         = reservasi"
echo "  KEY_PASSWORD      = sandi key (sama dengan sandi keystore bila tidak ditanya terpisah)"
echo "Jangan upload reservasi.jks atau file .base64.txt ke repo."
