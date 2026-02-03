#!/bin/bash

echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║     🚀 HUSHPAIR - MOBİL APK BUILD SCRIPT            ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Coolify domain'ini sor
read -p "Backend API URL (örn: https://api.hushpair.com): " API_URL
read -p "WebSocket URL (örn: https://api.hushpair.com): " SOCKET_URL

echo ""
echo "📱 APK Build başlıyor..."
echo ""

cd mobile

# Clean build
echo "🧹 Temizlik yapılıyor..."
flutter clean
flutter pub get

# Build APK
echo "🔨 APK build ediliyor..."
flutter build apk --release \
  --dart-define=API_BASE_URL=$API_URL/api \
  --dart-define=SOCKET_URL=$SOCKET_URL \
  --dart-define=ENVIRONMENT=production

if [ $? -eq 0 ]; then
    echo ""
    echo "╔═══════════════════════════════════════════════════════╗"
    echo "║                                                       ║"
    echo "║           ✅ APK BAŞARIYLA OLUŞTURULDU!              ║"
    echo "║                                                       ║"
    echo "╚═══════════════════════════════════════════════════════╝"
    echo ""
    echo "📍 APK Konumu:"
    echo "   build/app/outputs/flutter-apk/app-release.apk"
    echo ""
    echo "📲 Telefonuna yüklemek için:"
    echo "   1. USB ile bağla ve 'adb install build/app/outputs/flutter-apk/app-release.apk' çalıştır"
    echo "   2. Veya APK'yı kendine gönder ve telefondan yükle"
    echo ""
else
    echo ""
    echo "❌ Build başarısız! Hataları kontrol et."
    exit 1
fi
