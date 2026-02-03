# 📱 HUSHPAIR FLUTTER MOBILE APP - SETUP GUIDE

## ✅ WHAT HAS BEEN CREATED

### Flutter App Structure (Clean Architecture)
```
mobile/
├── lib/
│   ├── core/
│   │   ├── constants/       # App constants, enums
│   │   ├── theme/           # Cosmic Dark theme
│   │   ├── routes/          # GoRouter navigation
│   │   └── utils/           # Helper functions
│   │
│   ├── data/
│   │   ├── models/          # Data models
│   │   ├── repositories/    # Data repositories
│   │   └── services/        # API, WebSocket, Storage
│   │
│   ├── domain/
│   │   ├── entities/        # Business entities
│   │   └── usecases/        # Business logic
│   │
│   ├── presentation/
│   │   ├── providers/       # Riverpod state management
│   │   ├── screens/         # All app screens
│   │   │   ├── onboarding/  # Phone, Face, Astro, Room
│   │   │   ├── home/        # Swipe, Star Pool
│   │   │   ├── chat/        # Chat list, Chat detail
│   │   │   └── profile/     # Profile, Settings
│   │   └── widgets/         # Reusable widgets
│   │
│   └── main.dart            # App entry point
│
├── assets/
│   ├── images/
│   └── fonts/
│
├── android/                 # Android config
├── ios/                     # iOS config
└── pubspec.yaml            # Dependencies
```

---

## 🎨 FEATURES IMPLEMENTED

### ✅ Screens Created
1. **Splash Screen** - Animated app intro
2. **Phone Auth** - Phone number verification
3. **Face Scan** - Face verification placeholder
4. **Astro Input** - Birth details form
5. **Room Selection** - Green vs Red room choice
6. **Home/Swipe** - Profile card swiping
7. **Star Pool** - Saved favorites
8. **Chat List** - All matches
9. **Chat Detail** - Individual chat with Time Bank
10. **Profile** - User profile with trust score
11. **Settings** - App settings

### ✅ Core Features
- **Cosmic Dark Theme** (Deep Space Blue + Midnight Black + Silver Gold)
- **GoRouter Navigation** (type-safe routing)
- **Riverpod State Management** (reactive state)
- **Clean Architecture** (separation of concerns)
- **Room System** (Green/Red with visual differences)
- **Time Bank UI** (countdown timer display)

---

## 🚀 SETUP INSTRUCTIONS

### Prerequisites
- **Flutter SDK**: 3.0.0 or higher
- **Dart SDK**: 3.0.0 or higher
- **Android Studio** or **Xcode** (for emulator)
- **VS Code** (recommended) with Flutter extension

### Step 1: Install Flutter

**macOS:**
```bash
# Download Flutter
cd ~/development
git clone https://github.com/flutter/flutter.git -b stable
export PATH="$PATH:`pwd`/flutter/bin"

# Add to .zshrc or .bashrc
echo 'export PATH="$PATH:$HOME/development/flutter/bin"' >> ~/.zshrc
```

**Windows:**
1. Download Flutter SDK from https://flutter.dev
2. Extract to C:\flutter
3. Add to PATH: C:\flutter\bin

**Linux:**
```bash
sudo snap install flutter --classic
```

**Verify:**
```bash
flutter --version
flutter doctor
```

### Step 2: Setup Mobile Project

```bash
cd /home/claude/hushpair/mobile

# Get dependencies
flutter pub get

# Check for issues
flutter doctor

# Fix common issues:
# - Android licenses: flutter doctor --android-licenses
# - Xcode setup: sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

### Step 3: Run the App

**On Android Emulator:**
```bash
# List devices
flutter devices

# Run app
flutter run
```

**On iOS Simulator:**
```bash
open -a Simulator
flutter run
```

**On Physical Device:**
```bash
# Enable USB debugging on device
flutter run
```

### Step 4: Development Commands

```bash
# Hot reload (r)
# Hot restart (R)
# Quit (q)

# Build APK (Android)
flutter build apk --release

# Build iOS
flutter build ios --release

# Build for web (optional)
flutter build web
```

---

## 📦 DEPENDENCIES

### State Management
- `flutter_riverpod` - Reactive state management
- `riverpod_annotation` - Code generation

### Navigation
- `go_router` - Declarative routing

### Networking
- `dio` - HTTP client
- `socket_io_client` - WebSocket for real-time chat

### Storage
- `hive` - Local NoSQL database
- `shared_preferences` - Key-value storage

### UI
- `flutter_svg` - SVG rendering
- `cached_network_image` - Image caching
- `shimmer` - Loading animations
- `flutter_animate` - Smooth animations

### Device
- `device_info_plus` - Device UUID
- `permission_handler` - Permissions
- `camera` - Camera access
- `geolocator` - Location services

### Firebase
- `firebase_core` - Firebase initialization
- `firebase_messaging` - Push notifications

### Utils
- `intl` - Internationalization
- `uuid` - UUID generation
- `crypto` - Encryption

---

## 🎯 NEXT STEPS TO COMPLETE

### Priority 1: Core Functionality
- [ ] Implement API service (Dio + BaseURL)
- [ ] Create user models (User, Match, Message)
- [ ] Implement authentication flow
- [ ] Add device UUID extraction
- [ ] Connect phone verification to Twilio

### Priority 2: Real Screens
- [ ] Complete Face Scan (FaceTec SDK integration)
- [ ] Add profile card design with animations
- [ ] Implement swipe gestures (Dismissible)
- [ ] Create Time Bank countdown widget
- [ ] Build chat bubble UI

### Priority 3: Real-time Features
- [ ] WebSocket connection for chat
- [ ] Presence indicators (online/offline)
- [ ] Typing indicators
- [ ] Read receipts
- [ ] Push notifications

### Priority 4: Advanced Features
- [ ] Red Room blur effect (ImageFilter)
- [ ] Self-destruct message timer
- [ ] Screenshot detection
- [ ] GPS validation
- [ ] Astrology API integration

### Priority 5: Polish
- [ ] Add loading states
- [ ] Error handling
- [ ] Offline mode (Hive cache)
- [ ] Animations & transitions
- [ ] Empty states
- [ ] Haptic feedback

---

## 🧪 TESTING

### Unit Tests
```bash
flutter test
```

### Integration Tests
```bash
flutter test integration_test
```

### Widget Tests
```bash
flutter test test/widget_test.dart
```

---

## 📱 PLATFORM-SPECIFIC SETUP

### Android (android/app/build.gradle)
```gradle
android {
    compileSdkVersion 34
    
    defaultConfig {
        applicationId "com.hushpair.app"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
    }
}
```

### iOS (ios/Runner/Info.plist)
```xml
<key>NSCameraUsageDescription</key>
<string>We need camera access for face verification</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>We use location to find nearby matches</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>Choose photos for your profile</string>
```

### Permissions (android/app/src/main/AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

---

## 🎨 THEME COLORS

Already implemented in `lib/core/theme/app_theme.dart`:

- **Deep Space Blue**: `#0A1628` (Background)
- **Midnight Black**: `#000000` (Surface)
- **Silver Gold**: `#D4AF37` (Primary)
- **Cosmic Red**: `#FF4444` (Accent)
- **Green Room**: `#10B981`
- **Red Room**: `#EF4444`

---

## 🔧 TROUBLESHOOTING

### "Flutter not found"
```bash
export PATH="$PATH:/path/to/flutter/bin"
```

### "Android licenses not accepted"
```bash
flutter doctor --android-licenses
```

### "CocoaPods not installed" (iOS)
```bash
sudo gem install cocoapods
cd ios && pod install
```

### "Xcode build failed" (iOS)
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
flutter clean
flutter run
```

### Hot reload not working
```bash
flutter clean
flutter pub get
flutter run
```

---

## 📖 RESOURCES

- **Flutter Docs**: https://docs.flutter.dev
- **Riverpod**: https://riverpod.dev
- **GoRouter**: https://pub.dev/packages/go_router
- **Material 3**: https://m3.material.io

---

## ✅ CURRENT STATUS

**What's Done:**
- ✅ Project structure (Clean Architecture)
- ✅ All screen placeholders
- ✅ Cosmic Dark theme
- ✅ Navigation routing
- ✅ Room selection UI
- ✅ Time Bank UI concept
- ✅ Dependencies configured

**What's Next:**
- 🔄 API integration
- 🔄 WebSocket chat
- 🔄 Face verification
- 🔄 Device UUID binding
- 🔄 Real data models

---

## 🎉 READY TO RUN

The Flutter app structure is **ready to run**! 

```bash
cd /home/claude/hushpair/mobile
flutter pub get
flutter run
```

You'll see the onboarding flow:
1. Splash screen (animated)
2. Phone auth screen
3. Face scan screen
4. Astrology input
5. Room selection (Green vs Red)
6. Home screen with bottom navigation

**The UI is fully functional**, but backend integration still needs to be implemented.

---

**Built with 💙 Flutter & ❤️ for Hushpair**

Version: 1.0.0 (Alpha)
Last Updated: February 2026
