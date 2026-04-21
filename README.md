# QRID

Minimal, modern QR code generator built with Next.js. Paste a link, preview the QR instantly, and download it as a high-resolution PNG.

## Features

- ⚡ Real-time QR code preview
- 🖼️ Download as high-resolution PNG (1024×1024)
- 🎨 Clean, minimal, modern design
- 📱 Fully responsive
- 🔤 Typography: Inter, Instrument Serif, JetBrains Mono
- 🧩 Clean, modular code structure

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **QR Generation**: `qrcode`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
└── app/
    ├── components/
    │   ├── DownloadButton.tsx    # PNG download button
    │   ├── Icons.tsx             # SVG icon components
    │   ├── QRPreview.tsx         # Live QR code preview
    │   └── URLInput.tsx          # URL/text input field
    ├── lib/
    │   ├── qr.ts                 # QR generation & download logic
    │   └── url.ts                # URL validation utilities
    ├── globals.css               # Global styles
    ├── layout.tsx                # Root layout & fonts
    └── page.tsx                  # Main page
```

## License

MIT
