import type { Config } from 'tailwindcss';


const config: Config = {
  darkMode: 'class', // Enables dark mode using a `.dark` class
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Include all component files
  ],
  theme: {
    extend: {
      
     
        
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
    
    
  ],
};

export default config;
