# Esperance FC Academy Frontend

A modern, responsive React frontend for Esperance FC Academy, a premier sports training institution empowering young athletes through football, basketball, volleyball, table tennis, and German language classes.

## 🏆 Features

- **Multi-Sport Programs**: Football Academy, Women's Football, Basketball, Volleyball, Table Tennis, and German Language Classes
- **Dynamic Content Management**: News, Gallery, and Staff management through admin panel
- **Responsive Design**: Mobile-first approach with beautiful animations using Framer Motion
- **Modern UI/UX**: Built with Tailwind CSS v4 for a polished, professional appearance
- **Admin Dashboard**: Complete CMS for managing content (News, Gallery, Staff)
- **Contact Integration**: WhatsApp button, contact forms, and location mapping
- **Performance Optimized**: Built for fast development and production builds with Vite

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite 8** - Build tool and local development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router 7** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Icons** - Icon library

## 📦 Installation

```bash
# Install dependencies
npm install
```

## 🚀 Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

## 🏗️ Build

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
│   ├── favicon.svg
│   ├── icons.svg
│   └── logo.PNG
├── src/
│   ├── components/
│   │   ├── cards/         # Reusable card components
│   │   │   ├── ActivityCard.jsx
│   │   │   ├── GalleryCard.jsx
│   │   │   ├── NewsCard.jsx
│   │   │   ├── StaffCard.jsx
│   │   │   ├── StudentCard.jsx
│   │   │   └── TestimonialCard.jsx
│   │   └── common/        # Shared UI components
│   │       ├── ContactForm.jsx
│   │       ├── Footer.jsx
│   │       ├── HeroSection.jsx
│   │       ├── SearchBar.jsx
│   │       ├── SectionTitle.jsx
│   │       └── WhatsAppButton.jsx
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Gallery.jsx
│   │   ├── News.jsx
│   │   ├── Football.jsx
│   │   ├── WomenFootball.jsx
│   │   ├── Basketball.jsx
│   │   ├── Volleyball.jsx
│   │   ├── TableTennis.jsx
│   │   ├── GermanClasses.jsx
│   │   ├── NotFound.jsx
│   │   └── admin/         # Admin panel pages
│   │       ├── AdminLogin.jsx
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminStaff.jsx
│   │       ├── AdminNews.jsx
│   │       └── AdminGallery.jsx
│   ├── data/
│   │   └── sampleData.js  # Sample/fallback data
│   ├── services/
│   │   └── api.js         # Axios configuration
│   ├── routes/
│   │   └── index.jsx      # Route definitions
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep navy/black (`#111111`)
- **Accent**: Gold (`#D4AF37`)
- **Background**: White and light grays
- **Text**: Dark grays for readability

### Typography
- Modern sans-serif fonts
- Responsive font sizes
- Clear hierarchy with bold headings

### Components
- Consistent spacing and padding
- Smooth animations and transitions
- Hover effects for better UX
- Mobile-responsive navigation

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### API Integration

The app connects to a backend API for dynamic content:
- News articles
- Gallery images
- Staff information
- Contact form submissions

## 📱 Pages Overview

### Public Pages
- **Home** - Hero carousel, stats, programs preview, gallery, news, testimonials
- **About** - Academy story, timeline, mission/vision, values, leadership team
- **Programs** - Individual pages for each sport/academic program
- **Gallery** - Filterable image gallery with masonry layout
- **News** - Searchable and filterable news articles with pagination
- **Contact** - Contact information, map, and social media links

### Admin Pages (Protected)
- **Dashboard** - Overview stats and quick actions
- **Staff Management** - Add/edit/delete staff members
- **News Management** - Create, edit, publish, and delete articles
- **Gallery Management** - Upload and organize images

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to Vercel or any other static hosting service.

### Recommended Hosting
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔒 Admin Access

The admin panel is protected by authentication. Contact the development team for admin credentials.

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Team

Esperance FC Academy Development Team

---

**Esperance FC Academy** - Where Champions Are Made 🏆