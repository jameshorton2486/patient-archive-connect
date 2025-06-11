
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        /* Healthcare Design System Colors */
        
        /* Primary Healthcare Colors */
        'medical-charcoal': 'hsl(var(--medical-charcoal))',
        'clean-white': 'hsl(var(--clean-white))',
        'healthcare-blue': 'hsl(var(--healthcare-blue))',
        'sage-green': 'hsl(var(--sage-green))',
        'clinical-gray': 'hsl(var(--clinical-gray))',
        'light-background': 'hsl(var(--light-background))',
        
        /* Support Colors */
        'warning-amber': 'hsl(var(--warning-amber))',
        'error-red': 'hsl(var(--error-red))',
        'info-blue': 'hsl(var(--info-blue))',
        'neutral-light': 'hsl(var(--neutral-light))',
        'text-secondary': 'hsl(var(--text-secondary))',
        
        /* Semantic Colors */
        success: {
          DEFAULT: 'hsl(var(--success-primary))',
          hover: 'hsl(var(--success-hover))',
          background: 'hsl(var(--success-background))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning-primary))',
          hover: 'hsl(var(--warning-hover))',
          background: 'hsl(var(--warning-background))',
        },
        error: {
          DEFAULT: 'hsl(var(--error-primary))',
          hover: 'hsl(var(--error-hover))',
          background: 'hsl(var(--error-background))',
        },
        info: {
          DEFAULT: 'hsl(var(--info-primary))',
          hover: 'hsl(var(--info-hover))',
          background: 'hsl(var(--info-background))',
        },

        /* Shadcn/UI color mapping to healthcare system */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'large-body': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'small-body': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.6' }],
      },
      spacing: {
        '18': '4.5rem', /* 72px for header height */
      },
      boxShadow: {
        'healthcare': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'healthcare-hover': '0 6px 16px rgba(0, 0, 0, 0.12)',
        'healthcare-primary': '0 2px 4px rgba(52, 152, 219, 0.2)',
        'healthcare-success': '0 2px 4px rgba(39, 174, 96, 0.2)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
