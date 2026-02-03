import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../presentation/screens/onboarding/splash_screen.dart';
import '../presentation/screens/onboarding/phone_auth_screen.dart';
import '../presentation/screens/onboarding/face_scan_screen.dart';
import '../presentation/screens/onboarding/astro_input_screen.dart';
import '../presentation/screens/onboarding/room_selection_screen.dart';
import '../presentation/screens/home/home_screen.dart';
import '../presentation/screens/home/swipe_screen.dart';
import '../presentation/screens/home/star_pool_screen.dart';
import '../presentation/screens/chat/chat_list_screen.dart';
import '../presentation/screens/chat/chat_detail_screen.dart';
import '../presentation/screens/profile/profile_screen.dart';
import '../presentation/screens/profile/settings_screen.dart';

final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      // Onboarding Flow
      GoRoute(
        path: '/',
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: '/phone-auth',
        builder: (context, state) => const PhoneAuthScreen(),
      ),
      GoRoute(
        path: '/face-scan',
        builder: (context, state) => const FaceScanScreen(),
      ),
      GoRoute(
        path: '/astro-input',
        builder: (context, state) => const AstroInputScreen(),
      ),
      GoRoute(
        path: '/room-selection',
        builder: (context, state) => const RoomSelectionScreen(),
      ),
      
      // Main App
      GoRoute(
        path: '/home',
        builder: (context, state) => const HomeScreen(),
        routes: [
          GoRoute(
            path: 'swipe',
            builder: (context, state) => const SwipeScreen(),
          ),
          GoRoute(
            path: 'star-pool',
            builder: (context, state) => const StarPoolScreen(),
          ),
        ],
      ),
      
      // Chat
      GoRoute(
        path: '/chats',
        builder: (context, state) => const ChatListScreen(),
      ),
      GoRoute(
        path: '/chat/:matchId',
        builder: (context, state) {
          final matchId = state.pathParameters['matchId']!;
          return ChatDetailScreen(matchId: matchId);
        },
      ),
      
      // Profile
      GoRoute(
        path: '/profile',
        builder: (context, state) => const ProfileScreen(),
        routes: [
          GoRoute(
            path: 'settings',
            builder: (context, state) => const SettingsScreen(),
          ),
        ],
      ),
    ],
  );
});
