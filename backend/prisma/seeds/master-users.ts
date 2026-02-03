import { PrismaClient, IntentRoom, AccountStatus, AdminRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Seeding database...\n');

  // ============================================
  // 1. CREATE ADMIN USERS
  // ============================================
  console.log('👤 Creating admin users...');
  
  const adminPassword = await bcrypt.hash('Admin123!', 10);
  
  const superAdmin = await prisma.adminUser.upsert({
    where: { email: 'admin@hushpair.com' },
    update: {},
    create: {
      email: 'admin@hushpair.com',
      passwordHash: adminPassword,
      name: 'Super Admin',
      role: AdminRole.SUPERADMIN,
      isActive: true,
    },
  });
  
  const moderator = await prisma.adminUser.upsert({
    where: { email: 'moderator@hushpair.com' },
    update: {},
    create: {
      email: 'moderator@hushpair.com',
      passwordHash: adminPassword,
      name: 'Moderator',
      role: AdminRole.ADMIN,
      isActive: true,
    },
  });
  
  console.log('✅ Admin users created!\n');

  // ============================================
  // 2. INITIALIZE SYSTEM CONFIG
  // ============================================
  console.log('⚙️  Initializing system configuration...');
  
  await prisma.systemConfig.upsert({
    where: { id: 'system' },
    update: {},
    create: {
      id: 'system',
      faceVerificationEnabled: true,
      astrologyEnabled: true,
      redRoomEnabled: true,
      paymentEnabled: false,
      v2HapticEnabled: false,
      dailyConnectionLimit: 5,
      dailyViewLimit: 15,
      timeBankHours: 48,
      redRoomDestructHours: 5,
      starPoolExpiryDays: 7,
      maxDistanceKm: 50,
    },
  });
  
  console.log('✅ System config initialized!\n');

  // ============================================
  // 3. CREATE TEST USER 1 - GREEN ROOM (High Trust)
  // ============================================
  console.log('👤 Creating test users...');
  
  const user1 = await prisma.user.upsert({
    where: { phoneNumber: '+905551234567' },
    update: {},
    create: {
      uuidHash: 'test_uuid_001_green_verified',
      phoneNumber: '+905551234567',
      realName: 'Ayşe Yılmaz',
      profilePhoto: 'https://i.pravatar.cc/300?img=1',
      currentRoom: IntentRoom.GREEN,
      isVerified: true,
      trustScore: 95,
      accountStatus: AccountStatus.ACTIVE,
      birthDate: new Date('1995-06-15'),
      birthTime: '14:30',
      birthPlace: 'Istanbul, Turkey',
      birthLat: 41.0082,
      birthLon: 28.9784,
      latitude: 41.0082,
      longitude: 28.9784,
      lastLocationUpdate: new Date(),
      lastActiveAt: new Date(),
    },
  });
  
  console.log('✅ User 1: Ayşe Yılmaz (Green Room, Verified, Trust: 95)');

  // ============================================
  // 4. CREATE TEST USER 2 - RED ROOM (Mystery)
  // ============================================
  
  const user2 = await prisma.user.upsert({
    where: { phoneNumber: '+905559876543' },
    update: {},
    create: {
      uuidHash: 'test_uuid_002_red_mystery',
      phoneNumber: '+905559876543',
      redAlias: 'ScorpioMoon_4729',
      redBlurredPhoto: 'https://i.pravatar.cc/300?img=2&blur=10',
      currentRoom: IntentRoom.RED,
      isVerified: true,
      trustScore: 88,
      accountStatus: AccountStatus.ACTIVE,
      birthDate: new Date('1992-11-08'),
      birthTime: '22:15',
      birthPlace: 'Ankara, Turkey',
      birthLat: 39.9334,
      birthLon: 32.8597,
      latitude: 39.9334,
      longitude: 32.8597,
      lastLocationUpdate: new Date(),
      lastActiveAt: new Date(),
    },
  });
  
  console.log('✅ User 2: ScorpioMoon_4729 (Red Room, Mystery, Trust: 88)');

  // ============================================
  // 5. CREATE TEST USER 3 - GREEN ROOM (Low Trust)
  // ============================================
  
  const user3 = await prisma.user.upsert({
    where: { phoneNumber: '+905554567890' },
    update: {},
    create: {
      uuidHash: 'test_uuid_003_green_low_trust',
      phoneNumber: '+905554567890',
      realName: 'Mehmet Kaya',
      profilePhoto: 'https://i.pravatar.cc/300?img=3',
      currentRoom: IntentRoom.GREEN,
      isVerified: true,
      trustScore: 45,
      accountStatus: AccountStatus.ACTIVE,
      birthDate: new Date('1998-03-22'),
      birthTime: '09:00',
      birthPlace: 'Izmir, Turkey',
      birthLat: 38.4237,
      birthLon: 27.1428,
      latitude: 38.4237,
      longitude: 27.1428,
      lastLocationUpdate: new Date(),
      lastActiveAt: new Date(),
    },
  });
  
  console.log('✅ User 3: Mehmet Kaya (Green Room, Low Trust: 45)\n');

  // ============================================
  // 6. CREATE SAMPLE MATCHES
  // ============================================
  console.log('🤝 Creating sample matches...');
  
  // Match 1: User 1 <-> User 3 (Green Room, Validated)
  const match1 = await prisma.match.create({
    data: {
      userOneId: user1.id,
      userTwoId: user3.id,
      roomType: IntentRoom.GREEN,
      isValidated: true,
      expiresAt: null,
    },
  });
  
  // Add some messages
  await prisma.message.createMany({
    data: [
      {
        matchId: match1.id,
        senderId: user1.id,
        content: 'Merhaba! Nasılsın?',
        sentAt: new Date(Date.now() - 3600000),
        readAt: new Date(Date.now() - 3500000),
      },
      {
        matchId: match1.id,
        senderId: user3.id,
        content: 'İyiyim, teşekkürler! Sen nasılsın?',
        sentAt: new Date(Date.now() - 3400000),
        readAt: new Date(Date.now() - 3300000),
      },
      {
        matchId: match1.id,
        senderId: user1.id,
        content: 'Çok iyiyim 😊 Bursa\'da mısın hala?',
        sentAt: new Date(Date.now() - 3200000),
        readAt: new Date(Date.now() - 3100000),
      },
    ],
  });
  
  console.log('✅ Match created: Ayşe <-> Mehmet (Green, Validated)');

  // Match 2: Create unvalidated match (Time Bank active)
  const match2 = await prisma.match.create({
    data: {
      userOneId: user1.id,
      userTwoId: user2.id,
      roomType: IntentRoom.GREEN, // Cross-room match for testing
      isValidated: false,
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48h from now
    },
  });
  
  console.log('✅ Match created: Ayşe <-> ScorpioMoon (Unvalidated, Time Bank: 48h)\n');

  // ============================================
  // 7. INITIALIZE DAILY LIMITS
  // ============================================
  console.log('📊 Setting up daily limits...');
  
  await prisma.dailyLimit.createMany({
    data: [
      {
        userId: user1.id,
        connectionRequestsUsed: 2,
        profileViewsUsed: 8,
        resetAt: new Date(new Date().setHours(24, 0, 0, 0)),
      },
      {
        userId: user2.id,
        connectionRequestsUsed: 0,
        profileViewsUsed: 3,
        resetAt: new Date(new Date().setHours(24, 0, 0, 0)),
      },
      {
        userId: user3.id,
        connectionRequestsUsed: 5, // Maxed out
        profileViewsUsed: 15, // Maxed out
        resetAt: new Date(new Date().setHours(24, 0, 0, 0)),
      },
    ],
  });
  
  console.log('✅ Daily limits initialized!\n');

  // ============================================
  // FINAL SUMMARY
  // ============================================
  console.log('═══════════════════════════════════════════════════════');
  console.log('✨ SEED COMPLETED SUCCESSFULLY!');
  console.log('═══════════════════════════════════════════════════════\n');
  
  console.log('🔐 ADMIN CREDENTIALS:');
  console.log('   Email:    admin@hushpair.com');
  console.log('   Password: Admin123!');
  console.log('   Role:     SUPERADMIN\n');
  
  console.log('   Email:    moderator@hushpair.com');
  console.log('   Password: Admin123!');
  console.log('   Role:     ADMIN\n');
  
  console.log('👥 TEST USERS:');
  console.log('   1. Ayşe Yılmaz');
  console.log('      Phone:      +905551234567');
  console.log('      Room:       GREEN');
  console.log('      Trust:      95 (High)');
  console.log('      Verified:   ✅\n');
  
  console.log('   2. ScorpioMoon_4729');
  console.log('      Phone:      +905559876543');
  console.log('      Room:       RED (Mystery Mode)');
  console.log('      Trust:      88');
  console.log('      Verified:   ✅\n');
  
  console.log('   3. Mehmet Kaya');
  console.log('      Phone:      +905554567890');
  console.log('      Room:       GREEN');
  console.log('      Trust:      45 (Low)');
  console.log('      Verified:   ✅\n');
  
  console.log('🤝 MATCHES:');
  console.log('   • Ayşe <-> Mehmet (Green, Validated, 3 messages)');
  console.log('   • Ayşe <-> ScorpioMoon (Unvalidated, Time Bank active)\n');
  
  console.log('🌐 NEXT STEPS:');
  console.log('   1. Start backend: npm run start:dev');
  console.log('   2. Access admin panel: http://localhost:3001');
  console.log('   3. Configure API keys in Admin Panel -> Config tab');
  console.log('   4. Build Flutter mobile app\n');
  
  console.log('═══════════════════════════════════════════════════════\n');
}

seed()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
