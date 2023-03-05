module.exports = {
  singleQuote: true,
  overrides: [
    {
      files: ['angular/src/**/*.{ts,tsx,json,md,js,less,css,html}'],
      options: {
        tabWidth: 4,
        singleQuote: true,
        trailingComma: 'none',
      },
    },
  ],
};
