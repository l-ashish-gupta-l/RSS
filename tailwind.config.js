module.exports = {
  content: ["./*.html", "./assets/Js/**/*.js", "./assets/css/**/*.css"],
  theme: {
    extend: {
      keyframes: {
        "up-down": {
          "0%": { transform: "translateY(30px)" },
          "50%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(30px)" },
        },
        "left-right": {
          "0%": { transform: "translateX(30px)" },
          "50%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(30px)" },
        },
      },
      animation: {
        "up-down": "up-down 2s ease-in-out infinite",
        "left-right": "left-right 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
