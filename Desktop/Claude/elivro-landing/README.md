# Elivro Landing Page

A modern, responsive landing page for Elivro - an AI-powered recruiting tool for the Swedish assistant care industry (assistansbranschen).

## Features

- **Hero Section**: Eye-catching hero with animated text and call-to-action button
- **Features Section**: Showcase of 4 key features with hover effects
- **CTA Section**: Email signup form with demo booking and benefits grid
- **Glass Morphism Design**: Modern glass effect with dark theme
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Smooth Animations**: Fade-in, slide-up, and word-by-word text animations

## Tech Stack

- **Next.js 16** - React framework for production
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **React 19** - UI library

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Elivro/landing-page.git
cd landing-page
```

2. Install dependencies:
```bash
npm install
```

### Running Locally

Start the development server:
```bash
npm run dev
```

The application will be available at **http://localhost:3000** (or the next available port if 3000 is in use).

The page will automatically reload when you make changes to the code.

### Building for Production

Create an optimized production build:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

```
elivro-landing/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and animations
├── components/
│   ├── Hero.tsx            # Hero section component
│   ├── Features.tsx        # Features grid component
│   ├── CTA.tsx             # Call-to-action section component
│   └── AnimatedText.tsx    # Word-by-word animation component
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Customization

### Colors

Edit `app/globals.css` to change the color theme:
```css
@theme {
  --color-primary: rgb(168, 85, 247);  /* Violet accent */
  --color-dark: rgb(24, 24, 27);       /* Dark background */
  --color-slate: rgb(71, 85, 105);     /* Border color */
}
```

### Content

- **Hero Section**: Edit text in `components/Hero.tsx`
- **Features**: Modify the features array in `components/Features.tsx`
- **CTA Form**: Update form content in `components/CTA.tsx`

### Fonts

Fonts are imported from Google Fonts in `app/globals.css`:
- **IBM Plex Serif** - Headings
- **Inter** - Body text

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

## Contact

For questions or support, reach out to the Elivro team.
