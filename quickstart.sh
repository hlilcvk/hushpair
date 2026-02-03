#!/bin/bash

echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║           🚀 HUSHPAIR QUICK START                    ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "✓ Docker is running"
echo ""

# Navigate to backend
cd "$(dirname "$0")/backend" || exit

echo "📦 Step 1: Starting Docker services..."
docker-compose up -d
echo "✓ PostgreSQL and Redis are running"
echo ""

echo "📦 Step 2: Installing backend dependencies..."
npm install --silent
echo "✓ Backend dependencies installed"
echo ""

echo "🗄️  Step 3: Setting up database..."
npx prisma generate
npx prisma migrate dev --name init
echo "✓ Database migrations completed"
echo ""

echo "🌱 Step 4: Seeding master users..."
npm run seed
echo ""

echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║           ✅ SETUP COMPLETE!                         ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "🚀 NEXT STEPS:"
echo ""
echo "1. Start Backend (Terminal 1):"
echo "   cd backend"
echo "   npm run start:dev"
echo ""
echo "2. Start Admin Panel (Terminal 2):"
echo "   cd admin"
echo "   npm install"
echo "   npm run dev"
echo ""
echo "3. Access Admin Panel:"
echo "   URL:      http://localhost:3001"
echo "   Email:    admin@hushpair.com"
echo "   Password: Admin123!"
echo ""
echo "4. Configure API Keys in Admin Panel > Configuration"
echo ""
echo "═══════════════════════════════════════════════════════"
