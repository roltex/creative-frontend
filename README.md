# Creative Georgia Frontend

A modern, multilingual Vue.js frontend application for Creative Georgia - supporting artists and creative industries in Georgia through competitions, grants, and partnerships.

## 🌟 Features

- **🌐 Multilingual Support** - Full Georgian and English language support with i18n
- **📱 Responsive Design** - Mobile-first design with Tailwind CSS
- **📝 Application Form** - Multi-step application form with validation and beautiful modal system
- **🎨 Modern UI/UX** - Beautiful, accessible interface with smooth animations
- **🔍 Search Functionality** - Comprehensive search across competitions, news, events, and more
- **📰 Content Management** - Dynamic content from Laravel backend CMS
- **🔐 Authentication** - User authentication and dashboard
- **📊 Dashboard** - User dashboard for managing applications
- **🎯 TypeScript** - Full TypeScript support for type safety
- **⚡ Performance** - Optimized with code splitting and lazy loading

## 🛠️ Tech Stack

- **Framework**: Vue 3.5.18 with Composition API
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 7.1.2
- **State Management**: Pinia 3.0.3
- **Routing**: Vue Router 4.5.1
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: Lucide Vue Next 0.544.0
- **HTTP Client**: Axios 1.12.2
- **Internationalization**: Vue I18n 11.1.12
- **Form Validation**: Vee-Validate 4.15.1 + Yup 1.7.0
- **Date Handling**: date-fns 4.1.0
- **UI Components**: Swiper 12.0.1

## 📋 Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x or **yarn** >= 1.22.x
- **Backend API** - Laravel backend running (see [backend repository](https://github.com/roltex/creative-backend))

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/roltex/creative-frontend.git
   cd creative-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
   
   For production:
   ```env
   VITE_API_BASE_URL=https://api.creative-georgia.ge/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:5173`

## ⚙️ Configuration

### API Configuration

The API base URL is configured in `src/api/axios.ts` and can be overridden with the `VITE_API_BASE_URL` environment variable.

Default: `http://localhost:8000/api`

### App Configuration

Main application settings are in `src/config/app.config.yaml`:
- Site name and version
- Available locales
- API settings
- Feature flags
- Social media links
- Contact information
- Theme colors

## 📜 Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production (skips type checking)
- **`npm run build:check`** - Build with TypeScript type checking
- **`npm run preview`** - Preview production build locally

## 🏗️ Project Structure

```
creative-georgia/
├── public/                 # Static assets
│   ├── favicon.png
│   └── favicon.svg
├── src/
│   ├── api/                # API configuration
│   │   └── axios.ts        # Axios instance with interceptors
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Vue components
│   │   ├── common/         # Shared components
│   │   ├── competitions/   # Competition-related components
│   │   ├── events/         # Event-related components
│   │   ├── home/           # Homepage components
│   │   ├── news/           # News components
│   │   └── press/          # Press components
│   ├── composables/        # Vue composables
│   ├── config/             # Configuration files
│   ├── layouts/            # Layout components
│   ├── locales/            # i18n translation files
│   │   ├── ka.json         # Georgian translations
│   │   └── en.json         # English translations
│   ├── router/             # Vue Router configuration
│   ├── stores/             # Pinia stores
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── views/              # Page components
│   │   ├── about/          # About pages
│   │   ├── applications/    # Application pages
│   │   ├── auth/           # Authentication pages
│   │   ├── competitions/   # Competition pages
│   │   ├── dashboard/      # Dashboard pages
│   │   ├── events/         # Event pages
│   │   ├── news/           # News pages
│   │   ├── press/          # Press pages
│   │   └── resources/      # Resource pages
│   ├── App.vue             # Root component
│   ├── main.ts             # Application entry point
│   └── style.css           # Global styles
├── dist/                   # Production build output
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md
```

## 🔌 API Integration

The frontend communicates with the Laravel backend API. All API calls are made through the configured Axios instance in `src/api/axios.ts`.

### API Endpoints Used

- **Competitions**: `/api/competitions`
- **News**: `/api/news`
- **Press**: `/api/press`
- **Events**: `/api/events`
- **Applications**: `/api/applications`
- **Auth**: `/api/auth/*`
- **User**: `/api/user`
- **Settings**: `/api/settings`
- **Menus**: `/api/menus`
- **FAQs**: `/api/faqs`
- **Success Stories**: `/api/success-stories`

### Authentication

The application uses Bearer token authentication. Tokens are stored in localStorage and automatically included in API requests via Axios interceptors.

## 🎨 Key Features

### Application Form

Multi-step application form (`src/views/ApplicationForm.vue`) with:
- 3-step wizard interface
- Form validation with Vee-Validate
- Budget calculation
- Expense categories management
- Repeatable fields (stages, cofounders, expenses)
- Electronic signature
- Beautiful modal system for notifications
- Progress indicator
- Auto-save to localStorage

### Internationalization

Full i18n support with:
- Georgian (ka) - default
- English (en)
- Language switcher component
- RTL support ready
- Date/time localization

### State Management

Pinia stores for:
- Competitions
- News & Press
- Events
- Applications
- Authentication
- Notifications
- Settings
- Menus
- FAQs

## 🚢 Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Output**
   - Production files are generated in the `dist/` folder
   - Optimized and minified
   - Code-split for optimal loading

3. **Preview production build**
   ```bash
   npm run preview
   ```

## 📦 Deployment

The `dist/` folder contains all production-ready files. Deploy to:

- **Vercel** - Automatic deployment from GitHub
- **Netlify** - Drag & drop `dist/` folder
- **Traditional Hosting** - Upload `dist/` contents to web server
- **Docker** - Use provided Dockerfile (if available)

### Environment Variables for Production

Set these in your hosting platform:
```env
VITE_API_BASE_URL=https://api.creative-georgia.ge/api
```

## 🧪 Development

### Adding New Pages

1. Create component in `src/views/`
2. Add route in `src/router/index.ts`
3. Add translations in `src/locales/ka.json` and `src/locales/en.json`

### Adding New Components

1. Create component in appropriate `src/components/` subdirectory
2. Import and use in parent components
3. Follow Vue 3 Composition API patterns

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Use custom colors from `tailwind.config.js`
- Maintain consistent spacing and typography

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 🔗 Related Repositories

- **Backend**: [creative-backend](https://github.com/roltex/creative-backend) - Laravel API and CMS

## 📞 Support

For issues and questions:
- Email: info@creative-georgia.ge
- Website: https://creative-georgia.ge

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All contributors and supporters

---

**Built with ❤️ for Creative Georgia**
