/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    // 버튼 관련 클래스
    'bg-button-abled',
    'bg-button-disabled',
    'bg-white',
    'border-border-line',
    'text-white',
    'text-text-primary',
    // 경험 타입 관련 클래스
    'bg-text-secondary',
    'text-white',
    'border-text-secondary',
    'bg-white',
    'text-text-secondary',
    'border-border-line',
  ],
  theme: {
    extend: {
      colors: {
        // 커스텀 색상 변수 추가
        'text-primary': '#222222',
        'text-secondary': '#5f5f5f',
        'text-placeholder': '#a9a9a9',
        'border-chip': '#e3e3e3',
        'border-line': '#ededed',
        'button-abled': '#0b0b0b',
        'button-disabled': '#a9a9a9',
        'background-card': '#ffffff',
        'background-screen': '#f1f3fa',
        'background-field': '#f8f9fc',
        dropdown: '#f8f8f8',
        input: '#2e7cf6',
        warning: '#f44141',
      },
      fontFamily: {
        pretendard: ['"Pretendard"', 'sans-serif'],
      },
      boxShadow: {
        alarmShadow: '0px 4px 16px rgba(0, 0, 0, 0.04)',
        cardShadow: '0px 0px 1px rgba(0, 0, 0, 0.08)',
        emphasizeShadow:
          '0px 2px 8px 0px rgba(0, 0, 0, 0.12), 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)',
        bottomSheetShadow: '0px -4px 24px rgba(3.67, 21.75, 48.87, 0.25)',
        yellowShadow:
          '0px 218px 61px 0px rgba(152, 147, 81, 0.00), 0px 139px 56px 0px rgba(152, 147, 81, 0.01), 0px 78px 47px 0px rgba(152, 147, 81, 0.05), 0px 35px 35px 0px rgba(152, 147, 81, 0.09), 0px 9px 19px 0px rgba(152, 147, 81, 0.10)',
        subHeaderShadow:
          '0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)',
        languageCardShadow:
          '0px 218px 61px 0px rgba(152, 147, 81, 0.00), 0px 139px 56px 0px rgba(152, 147, 81, 0.01), 0px 78px 47px 0px rgba(152, 147, 81, 0.05), 0px 35px 35px 0px rgba(152, 147, 81, 0.09), 0px 9px 19px 0px rgba(152, 147, 81, 0.10)',
        inputFieldShadow: '0px 1px 2px 0px rgba(107, 110, 116, 0.04)',
      },
    },
  },
};
