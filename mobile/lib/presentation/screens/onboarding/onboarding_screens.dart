import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

// Phone Authentication Screen
class PhoneAuthScreen extends StatelessWidget {
  const PhoneAuthScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Phone Verification')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Enter Your Phone Number',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
              const SizedBox(height: 32),
              TextField(
                decoration: const InputDecoration(
                  labelText: 'Phone Number',
                  prefixText: '+90 ',
                  hintText: '5XX XXX XX XX',
                ),
                keyboardType: TextInputType.phone,
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: () => context.go('/face-scan'),
                child: const Text('Send Code'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// Face Scan Screen
class FaceScanScreen extends StatelessWidget {
  const FaceScanScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Face Verification')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.face, size: 120, color: Theme.of(context).colorScheme.primary),
            const SizedBox(height: 32),
            Text(
              'Verify Your Identity',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 16),
            Text(
              'We use face verification to ensure\nreal humans and prevent bots',
              style: Theme.of(context).textTheme.bodyMedium,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 48),
            ElevatedButton(
              onPressed: () => context.go('/astro-input'),
              child: const Text('Start Scan'),
            ),
          ],
        ),
      ),
    );
  }
}

// Astrology Input Screen
class AstroInputScreen extends StatelessWidget {
  const AstroInputScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Birth Details')),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              'Your Cosmic Blueprint',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 8),
            Text(
              'We use astrology to calculate compatibility',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 32),
            const TextField(
              decoration: InputDecoration(
                labelText: 'Birth Date',
                hintText: 'DD/MM/YYYY',
                suffixIcon: Icon(Icons.calendar_today),
              ),
            ),
            const SizedBox(height: 16),
            const TextField(
              decoration: InputDecoration(
                labelText: 'Birth Time',
                hintText: 'HH:MM',
                suffixIcon: Icon(Icons.access_time),
              ),
            ),
            const SizedBox(height: 16),
            const TextField(
              decoration: InputDecoration(
                labelText: 'Birth Place',
                hintText: 'City, Country',
                suffixIcon: Icon(Icons.location_on),
              ),
            ),
            const Spacer(),
            ElevatedButton(
              onPressed: () => context.go('/room-selection'),
              child: const Text('Continue'),
            ),
          ],
        ),
      ),
    );
  }
}
