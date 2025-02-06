export default {
  '*.{js,jsx,mjs,ts,tsx,vue}': (filenames) => {
    const onOneLine = filenames.join(' ');
    return `npm run lint ${onOneLine}`;
  },
};
