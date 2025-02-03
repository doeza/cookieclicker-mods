module.exports = {
  files: 'enhancedofflinelumps/src/**/*.js',
  from: [
    /console\.log\([^)]*\);?\n?/g,
    /console\.error\([^)]*\);?\n?/g,
    /console\.debug\([^)]*\);?\n?/g
  ],
  to: '',
  countMatches: true
}; 