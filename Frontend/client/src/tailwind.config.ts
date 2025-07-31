import type { Config } from 'tailwindcss';


const config: Config = {
  darkMode: 'class', // Enables dark mode using a `.dark` class
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Include all component files
  ],
  theme: {
    extend: {
      colors: {
        // You can override or extend your theme here
        primary: {
          DEFAULT: '#2563eb',   // Blue
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f59e0b',   // Amber
          foreground: '#000000',
        },
        muted: {
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280',
        },
        accent: '#10b981',     // Emerald
        destructive: '#dc2626', // Red
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
        
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.3s ease-out',
        'accordion-up': 'accordion-up 0.3s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), // optional for shadcn transitions
  ],
};

export default config;
