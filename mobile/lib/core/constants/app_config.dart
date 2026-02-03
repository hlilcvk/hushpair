class AppConfig {
  // API Configuration
  static const String environment = String.fromEnvironment(
    'ENVIRONMENT',
    defaultValue: 'production',
  );

  static const String baseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'https://api.hushpair.com/api', // Coolify domain'ini buraya yaz
  );

  static const String socketUrl = String.fromEnvironment(
    'SOCKET_URL',
    defaultValue: 'https://api.hushpair.com', // Coolify domain'ini buraya yaz
  );

  // Build info
  static const bool isProduction = environment == 'production';
  static const bool isDevelopment = environment == 'development';

  // Timeouts
  static const Duration connectTimeout = Duration(seconds: 30);
  static const Duration receiveTimeout = Duration(seconds: 30);

  // App Info
  static const String appName = 'Hushpair';
  static const String appVersion = '1.0.0';
  static const int buildNumber = 1;
}
