import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import animate from 'tailwindcss-animate';

const config: Config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
    	extend: {
    		gridTemplateColumns: {
    			'13': 'repeat(13, minmax(0, 1fr))'
    		},
    		colors: {
    			blue: {
    				'400': '#2589FE',
    				'500': '#0070F3',
    				'600': '#2F6FEB'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	},
    	keyframes: {
    		shimmer: {
    			'100%': {
    				transform: 'translateX(100%)'
    			}
    		}
    	}
    },
	plugins: [
		forms,
		animate
	],
};
export default config;
