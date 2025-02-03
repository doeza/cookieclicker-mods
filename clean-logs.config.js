module.exports = {
  files: 'src/**/*.js',
  from: [
    /console\.log\([^)]*\);?\n?/g,
    /console\.error\([^)]*\);?\n?/g,
    /console\.debug\([^)]*\);?\n?/g
  ],
  to: '',
  allowEmptyPaths: true,
}; 