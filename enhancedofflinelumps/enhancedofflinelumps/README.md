# Enhanced Offline Lumps (Beta)

A sophisticated Cookie Clicker mod that enhances sugar lump collection with automatic harvesting, offline progress, and detailed statistics. Currently in beta testing.

## Beta Testing Notice

This mod is currently in beta testing (v1.0.0-beta.1). Please:

1. Back up your save file before testing
2. Test in a separate browser profile if possible
3. Report any issues on GitHub
4. Include your browser and Cookie Clicker version in reports

## Features

### Automatic Collection

- Automatically collects ripe sugar lumps
- Works both online and offline
- Tracks different lump types (Normal, Bifurcated, Meaty, Caramelized, Golden)
- Shows current lump type and time until maturity

### Streak System

- Special golden lump streak tracking
- Streak multiplier system (up to 3x bonus)
- Streak protection window (5 minutes)
- Visual streak progress indicators

### Analytics

- Daily collection graphs
- Lump type distribution charts
- Time-of-day collection heatmaps
- Detailed statistics tracking

### Sound System

- Unique sound effects for each lump type
- Volume control
- Configurable audio feedback

### Achievement System

Collection Achievements:

- Lump Collector (10 lumps)
- Lump Hoarder (100 lumps)
- Lump Master (1000 lumps)

Golden Lump Achievements:

- First Gold! (First golden lump)
- Golden Decade (10 golden lumps)
- Golden Age (50 golden lumps)

Streak Achievements:

- Triple Gold (3 golden lumps streak)
- Golden Streak (5 golden lumps streak)
- Golden Master (10 golden lumps streak)

Type-Specific Achievements:

- Regular Collector & Lump Enthusiast (Normal lumps)
- Double Trouble & Split Master (Bifurcated lumps)
- Meat Lover & Beefy Collector (Meaty lumps)
- Sweet Tooth & Caramel Connoisseur (Caramelized lumps)

Special Achievements:

- Variety Collector (One of each type)
- Lump Connoisseur (10 of each type)

### Customization

- Enable/Disable mod functionality
- Toggle automatic collection
- Customize notifications
- Enable/Disable sound effects
- Adjust notification duration
- Debug mode (hold Ctrl to show)

## Installation

1. First, load CCSE (required):

```javascript
Game.LoadMod("https://klattmose.github.io/CookieClicker/CCSE.js");
```

2. Then, load Enhanced Offline Lumps:

```javascript
Game.LoadMod(
  "https://raw.githubusercontent.com/doeza/cookieclicker-mods/main/enhancedofflinelumps/dist/EnhancedOfflineLumps.js"
);
```

## Quick Start

1. After installation, the mod will automatically start collecting ripe sugar lumps
2. Open Options menu to configure notifications and auto-collection settings
3. Check Stats menu to view your progress, achievements, and analytics
4. Golden lumps are special - try to collect them to build your streak!

## Known Issues

Please check the GitHub Issues page for known issues and their status.

## Version History

### v1.0.0-beta.1 (2024-02-03)

- Initial beta release
- Full feature implementation for testing
- Comprehensive achievement system
- Advanced analytics and graphs
- Golden lump streak system
- Sound effects system
- Offline collection capabilities

## Compatibility

- Game Version: 2.052
- CCSE Version: 2.035
- Browser Support: All major browsers (Chrome, Firefox, Safari, Edge)

## Development

The mod is structured as follows:

```
enhancedofflinelumps/
├── src/
│   └── EnhancedOfflineLumps.js    # Source code
├── dist/
│   └── EnhancedOfflineLumps.js    # Distribution version
├── README.md                       # This file
└── LICENSE                         # MIT License
```

## Reporting Issues

When reporting issues, please include:

1. Your browser and version
2. Cookie Clicker version
3. Steps to reproduce the issue
4. Expected vs actual behavior
5. Any error messages from the console

## Credits

- Developed by Eric
- CCSE integration improvements by ChatGPT and Claude
- License: MIT
