/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".cursor-custom": {
            cursor: 'url("/public/blue-pointer.svg"), auto',
          },
          ".cursor-custom2": {
            cursor: 'url("/public/blue-cursor.svg"), auto',
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
