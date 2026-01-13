#!/bin/bash

echo "🚀 Starting Product Explorer Deployment"
echo "========================================"

# Check if docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "📦 Building and starting services..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

echo "⏳ Waiting for services to start..."
sleep 10

echo "🔍 Checking service status..."
docker-compose ps

echo "🧪 Testing backend API..."
curl -f http://localhost:3001/scraping/navigation || echo "❌ Backend not responding"
curl -f http://localhost:3001/products || echo "❌ Products endpoint not working"

echo "🌐 Testing frontend..."
curl -f http://localhost:3000 || echo "❌ Frontend not responding"

echo ""
echo "✅ Deployment Complete!"
echo "======================="
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:3001"
echo "🗄️  Database: http://localhost:5555 (Prisma Studio)"
echo ""
echo "📋 To view logs: docker-compose logs -f"
echo "🛑 To stop: docker-compose down"
