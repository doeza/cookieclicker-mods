# Contributing to Enhanced Offline Lumps

Thank you for your interest in contributing to Enhanced Offline Lumps! This document provides guidelines and instructions for development.

## Development Setup

1. Clone the repository:

```bash
git clone https://github.com/doeza/cookieclicker-mods.git
cd cookieclicker-mods/enhancedofflinelumps
```

2. Install dependencies:

```bash
npm install
```

3. Available scripts:

- `npm run build` - Minify and build the mod
- `npm run watch` - Watch for changes and rebuild automatically
- `npm run clean-logs` - Remove console.log statements

## Development Workflow

1. Make changes in `src/EnhancedOfflineLumps.js`
2. Run `npm run clean-logs` to remove debug statements
3. Run `npm run build` to create the distribution file
4. Test the mod in Cookie Clicker

## Testing

To test the mod:

1. Load CCSE in Cookie Clicker
2. Load your local copy of the mod
3. Verify all features work as expected:
   - Automatic collection
   - Offline progress
   - Statistics tracking
   - Achievements
   - Settings menu
   - Notifications

## Code Style Guidelines

1. Use clear, descriptive variable names
2. Add comments for complex logic
3. Follow existing code formatting
4. Remove console.log statements before committing
5. Update version number if making significant changes

## Pull Request Process

1. Create a feature branch
2. Make your changes
3. Clean up console.logs
4. Build the distribution file
5. Test thoroughly
6. Submit a pull request with:
   - Description of changes
   - Screenshots (if UI changes)
   - Any breaking changes
   - Verification that tests pass

## Documentation

When adding features, please update:

1. README.md with feature description
2. Version history if significant
3. Any relevant comments in the code

## Questions?

If you have questions, please:

1. Check existing issues
2. Create a new issue for discussion
3. Tag it appropriately
