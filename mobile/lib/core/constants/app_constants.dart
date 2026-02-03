class AppConstants {
  // API
  static const String baseUrl = 'http://localhost:3000/api';
  static const String socketUrl = 'http://localhost:3000';
  
  // Timeouts
  static const Duration connectTimeout = Duration(seconds: 30);
  static const Duration receiveTimeout = Duration(seconds: 30);
  
  // Storage Keys
  static const String keyAuthToken = 'auth_token';
  static const String keyUserId = 'user_id';
  static const String keyDeviceUUID = 'device_uuid';
  static const String keyCurrentRoom = 'current_room';
  
  // Pagination
  static const int pageSize = 20;
  
  // Limits (synced with backend)
  static const int dailyConnectionLimit = 5;
  static const int dailyViewLimit = 15;
  static const int starPoolMaxSize = 10;
  
  // Time Bank
  static const Duration timeBankDuration = Duration(hours: 48);
  
  // Red Room
  static const Duration redRoomDestructDuration = Duration(hours: 5);
  
  // Location
  static const double minDistanceKm = 5;
  static const double maxDistanceKm = 50;
  
  // Images
  static const int maxImageSizeBytes = 5 * 1024 * 1024; // 5MB
  static const double imageQuality = 0.8;
}

enum IntentRoom {
  green,
  red;

  String get displayName {
    switch (this) {
      case IntentRoom.green:
        return 'Steady';
      case IntentRoom.red:
        return 'Ephemeral';
    }
  }

  String get description {
    switch (this) {
      case IntentRoom.green:
        return 'Long-term, values-based connections';
      case IntentRoom.red:
        return 'Spontaneous, ephemeral encounters';
    }
  }
}

enum AccountStatus {
  active,
  frozen,
  suspended,
  banned;
}
