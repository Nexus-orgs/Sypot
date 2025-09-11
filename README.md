# Sypot - Smart Social Event Discovery Platform

## 🎯 Overview

Sypot is a revolutionary event discovery and social networking platform that connects people with amazing experiences. It combines AI-powered recommendations, social crew matching, virtual event streaming, and comprehensive event management tools.

## ✨ Key Features

### For Event Attendees

### For Event Organizers

### For Businesses

## 🚀 Getting Started

### Prerequisites

### Installation

```bash
# Clone the repository
git clone https://github.com/Sanvella-lab/Sypot.git

# Navigate to the project directory
cd Sypot

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

<<<<<<< HEAD

**Use GitHub Codespaces**


## What technologies are used for this project?

This project is built with:


## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/8c18fc69-c3d6-4af7-8c2d-efcc5979c1cd) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/8c18fc69-c3d6-4af7-8c2d-efcc5979c1cd

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/8c18fc69-c3d6-4af7-8c2d-efcc5979c1cd) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.
=======
## 🛠️ Technology Stack
>>>>>>> 0e69e4f (feat: Complete Sypot social event discovery platform with all requested features)

- **Frontend**: React + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **State Management**: React Query + Context API
- **Routing**: React Router v6
- **Process Management**: PM2 (for production)
- **AI Features**: Custom recommendation engine
- **Maps**: Integration ready for Google Maps
- **Payments**: Stripe & M-Pesa integration

## 📱 Features in Detail

### AI Discovery Engine
- Personalized recommendations based on user behavior
- Three modes: Personalized, Trending, Surprise Me
- Weather-based suggestions
- Learning from user feedback

### Find Your Crew
- Smart matching based on interests and personality
- Group formation for events
- Language and availability matching
- Crew statistics and ratings

### Virtual Events Platform
- HD streaming with quality options
- Interactive chat and reactions
- Virtual gift economy
- Recording and replay access

### Gate Entry System
- QR code scanning with camera
- Real-time attendance tracking
- Export attendee lists
- Ticket validation

## 🏗️ Project Structure

<<<<<<< HEAD
Yes, you can!
=======
```
src/
├── components/     # Reusable UI components
├── pages/         # Page components (39+ screens)
├── lib/           # Utilities and configurations
├── hooks/         # Custom React hooks
├── styles/        # Global styles
└── types/         # TypeScript type definitions
```

## 🔐 Environment Variables
>>>>>>> 0e69e4f (feat: Complete Sypot social event discovery platform with all requested features)

Create a `.env` file with the following variables:

<<<<<<< HEAD
Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
>>>>>>> a4643e3 ([skip lovable] Use tech stack vite_react_shadcn_ts_20250728_minor)
=======
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key (optional)
VITE_GOOGLE_MAPS_API_KEY=your_maps_key (optional)
```

## 📦 Deployment

### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Build the application
npm run build

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
pm2 startup
```

### Using Docker

```bash
# Build Docker image
docker build -t sypot .

# Run container
docker run -p 8080:8080 sypot
```

### Deploy to Cloud Platforms

The project is configured for easy deployment to:
- Vercel
- Netlify
- AWS Amplify
- Google Cloud Run
- Digital Ocean App Platform

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Unique Features

- **AI that learns** from user behavior
- **Weather-based** event suggestions
- **Virtual gift economy** for online events
- **Personality matching** for crew formation
- **Multi-language support** for global reach
- **Gate-to-gift** complete event ecosystem
- **Hybrid events** support (physical + virtual)

## 📞 Support

For support, email hello@sypot.com or join our Discord community.

## 🙏 Acknowledgments

- Built with React and modern web technologies
- UI components from shadcn/ui
- Backend powered by Supabase
- Icons from Lucide React

---

**Sypot** - Discover Your Perfect Spot 📍
>>>>>>> 0e69e4f (feat: Complete Sypot social event discovery platform with all requested features)
