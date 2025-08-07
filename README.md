# Portfolio Website

A clean and modern portfolio website built with [Hono](https://hono.dev/) and Tailwind CSS, designed to showcase professional experience and education in a minimalist style.

## Features

- 🎨 Clean, minimalist design inspired by modern portfolio layouts
- 📱 Fully responsive design
- ⚡ Built with Hono for fast performance
- 🎯 Deployed on Cloudflare Workers
- 🔧 TypeScript support
- 💨 Tailwind CSS for styling

## Tech Stack

- **Framework**: Hono (Web framework for Cloudflare Workers)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Cloudflare Workers
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Portfolio-hono
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to Cloudflare Workers
- `npm run cf-typegen` - Generate Cloudflare types

### Project Structure

```
Portfolio-hono/
├── public/
│   └── images/
│       └── profile.jpg
├── src/
│   ├── index.tsx          # Main application component
│   ├── renderer.tsx       # HTML renderer
│   └── style.css          # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── wrangler.jsonc         # Cloudflare Workers configuration
```

## Deployment

This project is configured to deploy on Cloudflare Workers:

```bash
npm run deploy
```

Make sure you have:
1. A Cloudflare account
2. Wrangler CLI configured with your account

## Customization

### Profile Information

Edit the profile information in `src/index.tsx`:
- Update the name, title, and profile image
- Modify education and experience sections
- Add or remove social media links

### Styling

The design uses Tailwind CSS. Customize the appearance by:
- Modifying classes in the JSX components
- Adding custom styles in `src/style.css`
- Updating the color scheme and typography

### Profile Image

Replace `public/images/profile.jpg` with your own profile photo.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).