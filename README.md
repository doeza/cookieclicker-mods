# Enhanced Offline Lumps

A Cookie Clicker mod that enhances sugar lump collection with automatic harvesting, offline progress, and detailed statistics.

## Features

### Automatic Collection

- Automatically collects ripe sugar lumps
- Works both online and offline
- Tracks different lump types (Normal, Bifurcated, Meaty, Caramelized, Golden)
- Shows current lump type and time until maturity

### Offline Progress

- Calculates sugar lumps matured while you were away
- Automatically collects offline lumps when you return
- Shows a summary of what you collected during your absence
- Maintains proper tracking of special lump types

### Statistics Tracking

- Total lumps collected
- Breakdown by lump type
- Golden lump streaks
- Best streak records
- Last collection time

### Achievements System

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

### Customization Options

- Enable/Disable mod functionality
- Toggle automatic collection
- Customize notifications
- Enable/Disable sound effects
- Adjust notification duration

## Installation

1. Load [CCSE](https://klattmose.github.io/CookieClicker/CCSE.js) (required mod)
2. Load [Enhanced Offline Lumps](https://github.com/doeza/cookieclicker-mods/raw/main/enhancedofflinelumps/dist/EnhancedOfflineLumps.js)
3. Refresh your game

You can also add the mod using these bookmarklet URLs:

```javascript
javascript: (function () {
  Game.LoadMod("https://klattmose.github.io/CookieClicker/CCSE.js");
})();
javascript: (function () {
  Game.LoadMod(
    "https://github.com/doeza/cookieclicker-mods/raw/main/enhancedofflinelumps/dist/EnhancedOfflineLumps.js"
  );
})();
```

## Quick Start

1. After installation, the mod will automatically start collecting ripe sugar lumps
2. Open Options menu to configure notifications and auto-collection settings
3. Check Stats menu to view your progress and achievements
4. Golden lumps are special - try to collect them to build your streak!

## File Structure

```
enhancedofflinelumps/
├── src/
│   └── EnhancedOfflineLumps.js    # Source code
├── dist/
│   └── EnhancedOfflineLumps.js    # Distribution version
├── README.md                       # This file
└── LICENSE                         # MIT License
```

## Version History

### v1.0.0 (2025-02-03)

Major update with new features:

- Added comprehensive achievement system
- Added detailed statistics for each lump type
- Added current lump info display
- Added golden lump streak system
- Added offline collection summary
- Improved UI with better organization
- Added prevention for duplicate menu entries
- Added proper CCSE integration
- Added save/load functionality
- Added customizable notifications
- Added sound effects option

### v0.1.0 (Original)

Initial release:

- Basic automatic lump collection
- Simple offline progress tracking
- Basic statistics

## Compatibility

- Game Version: 2.052
- CCSE Version: 2.035

## Development

To contribute to the development:

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Submit a pull request

## Credits

- Original mod by @doeza
- CCSE integration improvements by ChatGPT and Claude
- License: MIT

## Support

If you encounter any issues or have suggestions, please open an issue on the GitHub repository.
