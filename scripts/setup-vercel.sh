#!/bin/bash

# ChainInfra Vercel Setup Script
# Chạy script này để setup Vercel deployment

echo "🚀 ChainInfra Vercel Setup Script"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel
    if [ $? -eq 0 ]; then
        print_status "Vercel CLI installed successfully"
    else
        print_error "Failed to install Vercel CLI"
        exit 1
    fi
else
    print_status "Vercel CLI is already installed"
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    print_warning "Please log in to Vercel first:"
    echo "Run: vercel login"
    echo "Then run this script again"
    exit 1
else
    print_status "Logged in to Vercel"
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    print_warning ".env.local not found. Creating from template..."
    if [ -f "env.example" ]; then
        cp env.example .env.local
        print_status ".env.local created from template"
        print_warning "Please update .env.local with your actual values"
    else
        print_error "env.example not found. Please create .env.local manually"
        exit 1
    fi
else
    print_status ".env.local found"
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Are you in the correct directory?"
    exit 1
fi

# Install dependencies
print_status "Installing dependencies..."
npm install
if [ $? -eq 0 ]; then
    print_status "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Build project
print_status "Building project..."
npm run build
if [ $? -eq 0 ]; then
    print_status "Build successful"
else
    print_error "Build failed. Please fix errors and try again"
    exit 1
fi

# Deploy to Vercel
print_status "Deploying to Vercel..."
vercel --prod
if [ $? -eq 0 ]; then
    print_status "Deployment successful!"
    echo ""
    echo "🎉 Your website is now live on Vercel!"
    echo ""
    echo "Next steps:"
    echo "1. Update Supabase URLs with your Vercel domain"
    echo "2. Configure custom domain (optional)"
    echo "3. Test all functionality"
    echo ""
    echo "For detailed instructions, see:"
    echo "- VERCEL_SETUP_GUIDE.md (detailed guide)"
    echo "- QUICK_VERCEL_SETUP.md (quick reference)"
else
    print_error "Deployment failed"
    exit 1
fi
