import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/constants/app_constants.dart';
import '../../../core/theme/app_theme.dart';

class RoomSelectionScreen extends StatefulWidget {
  const RoomSelectionScreen({super.key});

  @override
  State<RoomSelectionScreen> createState() => _RoomSelectionScreenState();
}

class _RoomSelectionScreenState extends State<RoomSelectionScreen> {
  IntentRoom? _selectedRoom;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Choose Your Intent'),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                'How do you want to connect?',
                style: Theme.of(context).textTheme.headlineMedium,
                textAlign: TextAlign.center,
              ),
              
              const SizedBox(height: 8),
              
              Text(
                'Choose your room. You can switch anytime.',
                style: Theme.of(context).textTheme.bodyMedium,
                textAlign: TextAlign.center,
              ),
              
              const SizedBox(height: 48),
              
              // Green Room Card
              _RoomCard(
                room: IntentRoom.green,
                isSelected: _selectedRoom == IntentRoom.green,
                onTap: () => setState(() => _selectedRoom = IntentRoom.green),
              ),
              
              const SizedBox(height: 24),
              
              // Red Room Card
              _RoomCard(
                room: IntentRoom.red,
                isSelected: _selectedRoom == IntentRoom.red,
                onTap: () => setState(() => _selectedRoom = IntentRoom.red),
              ),
              
              const Spacer(),
              
              // Continue Button
              ElevatedButton(
                onPressed: _selectedRoom != null ? _handleContinue : null,
                child: const Text('Continue'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _handleContinue() {
    // TODO: Save selected room to backend
    context.go('/home');
  }
}

class _RoomCard extends StatelessWidget {
  final IntentRoom room;
  final bool isSelected;
  final VoidCallback onTap;

  const _RoomCard({
    required this.room,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final color = room == IntentRoom.green ? AppColors.greenRoom : AppColors.redRoom;
    
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: isSelected ? color.withOpacity(0.2) : AppColors.gray800,
          border: Border.all(
            color: isSelected ? color : AppColors.gray700,
            width: 2,
          ),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    color: color.withOpacity(0.2),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    room == IntentRoom.green ? Icons.eco_rounded : Icons.whatshot_rounded,
                    color: color,
                    size: 24,
                  ),
                ),
                
                const SizedBox(width: 16),
                
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Text(
                            '${room == IntentRoom.green ? 'Green' : 'Red'} Room',
                            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                              color: color,
                            ),
                          ),
                          const Spacer(),
                          if (isSelected)
                            Icon(Icons.check_circle, color: color, size: 24),
                        ],
                      ),
                      
                      Text(
                        room.displayName,
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ),
                ),
              ],
            ),
            
            const SizedBox(height: 16),
            
            Text(
              room.description,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            
            const SizedBox(height: 16),
            
            // Features
            if (room == IntentRoom.green) ...[
              _FeatureRow(icon: Icons.person, text: 'Real names & photos'),
              _FeatureRow(icon: Icons.access_time, text: '48-hour Time Bank'),
              _FeatureRow(icon: Icons.favorite, text: 'Long-term connections'),
            ] else ...[
              _FeatureRow(icon: Icons.visibility_off, text: 'Mystery profiles'),
              _FeatureRow(icon: Icons.auto_delete, text: '5-hour self-destruct'),
              _FeatureRow(icon: Icons.flash_on, text: 'Spontaneous encounters'),
            ],
          ],
        ),
      ),
    );
  }
}

class _FeatureRow extends StatelessWidget {
  final IconData icon;
  final String text;

  const _FeatureRow({
    required this.icon,
    required this.text,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          Icon(icon, size: 16, color: AppColors.gray400),
          const SizedBox(width: 8),
          Text(
            text,
            style: Theme.of(context).textTheme.bodySmall,
          ),
        ],
      ),
    );
  }
}
