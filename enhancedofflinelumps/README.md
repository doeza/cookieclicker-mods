# Cookie Clicker Mods Collection

A collection of quality-of-life mods for Cookie Clicker, developed by Eric with contributions from ChatGPT and Claude.

## Current Mods

### Enhanced Offline Lumps (Beta)

A sophisticated mod that enhances the sugar lump collection experience with features like:

- Automatic lump collection (online and offline)
- Golden lump streak system with multipliers
- Detailed statistics and achievements
- Sound effects for different lump types
- Beautiful UI with graphs and analytics

**Beta Testing:**
Currently in beta testing phase (v1.0.0-beta.1). Please report any issues on GitHub.

**Installation:**

```javascript
Game.LoadMod(
  "https://raw.githubusercontent.com/doeza/cookieclicker-mods/main/enhancedofflinelumps/dist/EnhancedOfflineLumps.js"
);
```

## Development

### Project Structure

```
cookieclicker-mods/
├── enhancedofflinelumps/     # Enhanced Offline Lumps mod
│   ├── src/                  # Source files
│   ├── dist/                 # Distribution files
│   └── README.md            # Mod-specific documentation
├── src/                      # Future mods source directory
└── README.md                 # This file
```

### Testing

Before installing mods, please note:

1. Back up your save file
2. Test in a separate browser profile
3. Report any issues through GitHub Issues
4. Include your browser and Cookie Clicker version in reports

### Contributing

1. Fork the repository
2. Create a new branch for your mod
3. Add your mod in its own directory under the root
4. Follow the existing structure:
   - `src/` for source files
   - `dist/` for distribution files
   - Include a README.md with mod-specific documentation
5. Submit a pull request

### Building

Each mod may have its own build process. Check the respective mod's README for specific instructions.

## License

MIT License - See LICENSE file for details

## Acknowledgments

- Cookie Clicker by Orteil
- CCSE by Klattmose
- ChatGPT and Claude for code assistance and improvements
