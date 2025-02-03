/***************************************************************************************
 * Enhanced Offline Lumps - A Cookie Clicker Mod
 * Version 1.0.0
 * By @doeza, with contributions by ChatGPT and Claude (CCSE integration improvements)
 * License: MIT
 ***************************************************************************************/
if (EnhancedOfflineLumps === undefined) var EnhancedOfflineLumps = {};

// Wait for CCSE to load if it's not already loaded
if (typeof CCSE == 'undefined') {
  Game.LoadMod('https://klattmose.github.io/CookieClicker/CCSE.js');
}

EnhancedOfflineLumps.name = 'Enhanced Offline Lumps';
EnhancedOfflineLumps.version = '1.0.0';
EnhancedOfflineLumps.GameVersion = '2.052';
EnhancedOfflineLumps.CCSEVersion = '2.035';
EnhancedOfflineLumps.isLoaded = 0;
EnhancedOfflineLumps.currentStreak = 0;

// Register the mod with CCSE
if (CCSE && CCSE.isLoaded) {
  Game.registerMod("enhancedofflinelumps", EnhancedOfflineLumps);
}

// Add lump type descriptions
EnhancedOfflineLumps.lumpTypes = {
  0: { name: 'Normal', description: 'Regular sugar lump (+1)', color: '#fff' },
  1: { name: 'Bifurcated', description: 'Splits in two (+2)', color: '#88ff88' },
  2: { name: 'Meaty', description: 'Large and swollen (+3)', color: '#ff0000' },
  3: { name: 'Caramelized', description: 'Worth a lot more (+1-3 hours of CpS)', color: '#ffb042' },
  4: { name: 'Golden', description: 'Extra special (+1-2 and counts towards streak!)', color: '#ffdd00' }
};

// Default configuration
EnhancedOfflineLumps.defaultConfig = {
  enabled: true,
  notifications: true,
  autoCollect: true,
  soundEnabled: true,
  notificationDuration: 10,
  statistics: {
    totalLumpsCollected: 0,
    optimalCollections: 0,
    bestLumpStreak: 0,
    lastCollection: 0,
    normalLumps: 0,
    bifurcatedLumps: 0,
    meatyLumps: 0,
    caramelizedLumps: 0,
    goldenLumps: 0
  },
  achievements: {
    lumpCollector: false,      // Collect 10 lumps
    lumpHoarder: false,        // Collect 100 lumps
    lumpMaster: false,         // Collect 1000 lumps
    goldenStreak3: false,      // Get a streak of 3 golden lumps
    goldenStreak5: false,      // Get a streak of 5 golden lumps
    goldenStreak10: false,     // Get a streak of 10 golden lumps
    goldenLumpFirst: false,    // Collect your first golden lump
    goldenLump10: false,       // Collect 10 golden lumps
    goldenLump50: false,       // Collect 50 golden lumps
    offlineMaster: false,       // Collect 10 lumps while offline
    normalLump10: false,       // Collect 10 normal lumps
    normalLump100: false,      // Collect 100 normal lumps
    bifurcatedLump5: false,    // Collect 5 bifurcated lumps
    bifurcatedLump25: false,   // Collect 25 bifurcated lumps
    meatyLump5: false,         // Collect 5 meaty lumps
    meatyLump25: false,        // Collect 25 meaty lumps
    caramelizedLump5: false,   // Collect 5 caramelized lumps
    caramelizedLump25: false,  // Collect 25 caramelized lumps
    varietyCollector: false,   // Collect at least one of each type
    lumpConnoisseur: false     // Collect at least 10 of each type
  }
};

// Ensure config is initialized early
EnhancedOfflineLumps.config = Object.assign({}, EnhancedOfflineLumps.defaultConfig);

// Add time formatting function
EnhancedOfflineLumps.formatTime = function (milliseconds) {
  if (milliseconds <= 0) return 'Ready!';

  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;

  let timeString = '';
  if (days > 0) timeString += days + ' day' + (days > 1 ? 's' : '') + ' ';
  if (remainingHours > 0) timeString += remainingHours + ' hour' + (remainingHours > 1 ? 's' : '') + ' ';
  if (remainingMinutes > 0) timeString += remainingMinutes + ' minute' + (remainingMinutes > 1 ? 's' : '');

  return timeString.trim() || 'less than a minute';
};

// UI Components: settings menu
EnhancedOfflineLumps.createSettingsMenu = function () {
  let m = CCSE.MenuHelper;
  var str = '';

  // Title and description with custom styling
  str += '<div style="padding: 10px 16px; margin-bottom: 8px; background: rgba(0,0,0,0.2); border-radius: 8px;">';
  str += '<div style="font-size: 1.3em; font-weight: bold; color: #fff; text-shadow: 0px 1px 2px #000;">Enhanced Offline Lumps</div>';
  str += '<div style="font-size: 0.9em; color: rgba(255,255,255,0.8); margin-top: 4px;">This mod helps you collect sugar lumps automatically and tracks your collection statistics. Golden lumps are special and will increase your collection streak!</div>';
  str += '</div>';

  // Current Lump Info Section
  if (typeof Game.lumpCurrentType !== 'undefined') {
    const currentType = EnhancedOfflineLumps.lumpTypes[Game.lumpCurrentType];
    const timeLeft = Game.lumpRipeAge - (Date.now() - Game.lumpT);
    const isRipe = timeLeft <= 0;

    str += '<div class="subsection" style="padding: 8px; margin: 8px 0; background: rgba(0,0,0,0.2); border-radius: 8px;">';
    str += '<div class="title" style="font-size: 1.2em; border-bottom: 1px solid rgba(255,255,255,0.2); margin-bottom: 8px;">Current Lump</div>';
    str += '<div style="color: ' + currentType.color + '; font-weight: bold;">' + currentType.name + ' Sugar Lump</div>';
    str += '<div style="color: rgba(255,255,255,0.8);">' + currentType.description + '</div>';
    str += '<div style="margin-top: 4px; color: ' + (isRipe ? '#90ff90' : '#ffffff') + ';">' +
      (isRipe ? 'Ready to harvest!' : 'Matures in: ' + EnhancedOfflineLumps.formatTime(timeLeft)) + '</div>';
    str += '</div>';
  }

  // Lump Types Guide
  str += '<div class="subsection" style="padding: 8px; margin: 8px 0; background: rgba(0,0,0,0.1); border-radius: 8px;">';
  str += '<div class="title" style="font-size: 1.2em; border-bottom: 1px solid rgba(255,255,255,0.2); margin-bottom: 8px;">Sugar Lump Types</div>';
  str += '<div style="color: rgba(255,255,255,0.8); line-height: 1.4em;">';
  Object.entries(EnhancedOfflineLumps.lumpTypes).forEach(([_type, info]) => {
    str += '<div style="margin: 4px 0;"><span style="color: ' + info.color + '; font-weight: bold;">' + info.name + ':</span> ' + info.description + '</div>';
  });
  str += '<div style="margin-top: 8px; font-style: italic;">Note: Lump type is random and determined when it starts growing.</div>';
  str += '</div></div>';

  // Offline Collection Info Section
  str += '<div class="subsection" style="padding: 8px; margin: 8px 0; background: rgba(0,0,0,0.1); border-radius: 8px;">';
  str += '<div class="title" style="font-size: 1.2em; border-bottom: 1px solid rgba(255,255,255,0.2); margin-bottom: 8px;">🕒 Offline Collection</div>';
  str += '<div style="color: rgba(255,255,255,0.8); line-height: 1.4em; padding: 4px 8px;">';
  str += '<div style="margin-bottom: 8px;">When <b>Auto Collect</b> is enabled, the mod will:</div>';
  str += '<div style="padding-left: 12px; margin-bottom: 4px;">&bull; Check how much time passed while you were away</div>';
  str += '<div style="padding-left: 12px; margin-bottom: 4px;">&bull; Calculate how many lumps matured during that time</div>';
  str += '<div style="padding-left: 12px; margin-bottom: 4px;">&bull; Automatically collect all matured lumps</div>';
  str += '<div style="padding-left: 12px; margin-bottom: 8px;">&bull; Show you a summary when you return</div>';
  str += '<div style="margin-top: 4px;"><b>Note:</b> Sugar lumps take about 24 hours to mature. The mod will collect them even if you\'re offline!</div>';
  str += '</div></div>';

  // Core Settings Section
  str += '<div class="subsection" style="padding: 8px; margin: 8px 0; background: rgba(0,0,0,0.1); border-radius: 8px;">';
  str += '<div class="title" style="font-size: 1.2em; border-bottom: 1px solid rgba(255,255,255,0.2); margin-bottom: 8px;">Core Settings</div>';

  // Enabled toggle with improved styling
  str += '<div style="display: flex; align-items: center; margin: 8px 0; padding: 4px; background: rgba(0,0,0,0.1); border-radius: 4px;">';
  str += '<div style="flex: 1;">';
  str += m.ToggleButton(EnhancedOfflineLumps.config, 'enabled', 'enabledButton',
    'Mod Enabled', 'Mod Disabled', 'EnhancedOfflineLumps.Toggle');
  str += '<div class="listing" style="margin-top: 2px; color: rgba(255,255,255,0.7);">&bull; When enabled, the mod will help manage your sugar lumps</div>';
  str += '</div></div>';

  // Auto collect toggle with enhanced description
  str += '<div style="display: flex; align-items: center; margin: 8px 0; padding: 4px; background: rgba(0,0,0,0.1); border-radius: 4px;">';
  str += '<div style="flex: 1;">';
  str += m.ToggleButton(EnhancedOfflineLumps.config, 'autoCollect', 'autoCollectButton',
    'Auto Collect On', 'Auto Collect Off', 'EnhancedOfflineLumps.Toggle');
  str += '<div class="listing" style="margin-top: 2px; color: rgba(255,255,255,0.7);">&bull; Automatically collect ripe sugar lumps (works both online and offline!)</div>';
  str += '</div></div>';
  str += '</div>';

  // Notification Settings Section
  str += '<div class="subsection" style="padding: 8px; margin: 8px 0; background: rgba(0,0,0,0.1); border-radius: 8px;">';
  str += '<div class="title" style="font-size: 1.2em; border-bottom: 1px solid rgba(255,255,255,0.2); margin-bottom: 8px;">Notification Settings</div>';

  // Notifications toggle with enhanced description
  str += '<div style="display: flex; align-items: center; margin: 8px 0; padding: 4px; background: rgba(0,0,0,0.1); border-radius: 4px;">';
  str += '<div style="flex: 1;">';
  str += m.ToggleButton(EnhancedOfflineLumps.config, 'notifications', 'notificationsButton',
    'Notifications On', 'Notifications Off', 'EnhancedOfflineLumps.Toggle');
  str += '<div class="listing" style="margin-top: 2px; color: rgba(255,255,255,0.7);">&bull; Get notified about collections, including offline collection summaries</div>';
  str += '</div></div>';

  // Sound toggle
  str += '<div style="display: flex; align-items: center; margin: 8px 0; padding: 4px; background: rgba(0,0,0,0.1); border-radius: 4px;">';
  str += '<div style="flex: 1;">';
  str += m.ToggleButton(EnhancedOfflineLumps.config, 'soundEnabled', 'soundButton',
    'Sound On', 'Sound Off', 'EnhancedOfflineLumps.Toggle');
  str += '<div class="listing" style="margin-top: 2px; color: rgba(255,255,255,0.7);">&bull; Play a sound when sugar lumps are collected</div>';
  str += '</div></div>';

  // Notification duration slider with custom styling
  str += '<div style="margin: 8px 0; padding: 8px; background: rgba(0,0,0,0.1); border-radius: 4px;">';
  str += m.Slider('notificationDuration', 'Notification Duration', '[$]s',
    function () { return EnhancedOfflineLumps.config.notificationDuration; },
    "EnhancedOfflineLumps.UpdateSlider('notificationDuration', Math.round(l('notificationDuration').value))",
    5, 30, 1);
  str += '<div class="listing" style="margin-top: 2px; color: rgba(255,255,255,0.7);">&bull; How long notifications stay on screen (5-30 seconds)</div>';
  str += '</div>';
  str += '</div>';

  // Help Section
  str += '<div class="subsection" style="padding: 8px; margin: 8px 0; background: rgba(0,0,0,0.1); border-radius: 8px;">';
  str += '<div class="title" style="font-size: 1.2em; border-bottom: 1px solid rgba(255,255,255,0.2); margin-bottom: 8px;">Statistics & Achievements</div>';
  str += '<div style="color: rgba(255,255,255,0.8); line-height: 1.4em; text-align: center;">' +
    '<div style="margin: 8px 0;">View your lump collection statistics and achievements in the <b>Stats</b> page!</div>' +
    '<div style="margin: 4px 0; font-style: italic;">Click the <b>Stats</b> button at the bottom of the screen</div>' +
    '</div>';
  str += '</div>';

  return str;
};

// Toggle function for buttons (based on FortuneCookie's implementation)
EnhancedOfflineLumps.Toggle = function (prefName, button, on, off, invert) {
  if (EnhancedOfflineLumps.config[prefName]) {
    l(button).innerHTML = off;
    EnhancedOfflineLumps.config[prefName] = 0;
  } else {
    l(button).innerHTML = on;
    EnhancedOfflineLumps.config[prefName] = 1;
  }
  l(button).className = 'option' + ((EnhancedOfflineLumps.config[prefName] ^ invert) ? '' : ' off');
  Game.UpdateMenu();
};

// Update slider function (based on FortuneCookie's implementation)
EnhancedOfflineLumps.UpdateSlider = function (prefName, value) {
  EnhancedOfflineLumps.config[prefName] = parseInt(value);
  if (l(prefName + 'RightText')) l(prefName + 'RightText').innerHTML = value + 's';
  Game.UpdateMenu();
};

// Add mod settings to the options menu
EnhancedOfflineLumps.addMenuHooks = function () {

  // Remove any existing hooks first to prevent duplicates
  Game.customOptionsMenu = Game.customOptionsMenu.filter(func =>
    !func.toString().includes('Enhanced Offline Lumps Settings')
  );
  Game.customStatsMenu = Game.customStatsMenu.filter(func =>
    !func.toString().includes('===Enhanced Offline Lumps Statistics===')
  );

  // Add options menu hook
  Game.customOptionsMenu.push(function () {
    CCSE.AppendCollapsibleOptionsMenu(
      'Enhanced Offline Lumps Settings',
      EnhancedOfflineLumps.createSettingsMenu()
    );
  });

  // Add stats menu hook
  Game.customStatsMenu.push(function () {

    // Add version number and description
    CCSE.AppendStatsVersionNumber(EnhancedOfflineLumps.name, EnhancedOfflineLumps.version);

    // Add section header
    CCSE.AppendStatsGeneral('<div class="listing"><b>===Enhanced Offline Lumps Statistics===</b></div>');

    // Add mod description
    CCSE.AppendStatsGeneral(
      '<div class="listing" style="padding: 5px 16px;"><b>Enhanced Offline Lumps</b> helps you collect sugar lumps efficiently and tracks your progress!</div>'
    );

    // Always show total lumps collected
    CCSE.AppendStatsGeneral(
      '<div class="listing"><b>Sugar Lumps Collected</b>: ' +
      Beautify(EnhancedOfflineLumps.config.statistics.totalLumpsCollected) +
      ' <small>(Total lumps collected while mod is active)</small></div>'
    );

    // Always show golden lumps
    CCSE.AppendStatsGeneral(
      '<div class="listing"><b>Golden Lumps Collected</b>: ' +
      Beautify(EnhancedOfflineLumps.config.statistics.optimalCollections) +
      ' <small>(Special lumps that increase your streak)</small></div>'
    );

    // Always show best streak
    CCSE.AppendStatsGeneral(
      '<div class="listing"><b>Best Collection Streak</b>: ' +
      Beautify(EnhancedOfflineLumps.config.statistics.bestLumpStreak) +
      ' <small>(Your highest streak of golden lump collections)</small></div>'
    );

    // Always show current streak
    CCSE.AppendStatsSpecial(
      '<div class="listing"><b>Current Collection Streak</b>: ' +
      Beautify(EnhancedOfflineLumps.currentStreak) +
      ' <small>(Current streak of golden lump collections)</small></div>'
    );

    // Show last collection time if exists, otherwise show "No collections yet"
    CCSE.AppendStatsGeneral(
      '<div class="listing"><b>Last Collection</b>: ' +
      (EnhancedOfflineLumps.config.statistics.lastCollection ?
        new Date(EnhancedOfflineLumps.config.statistics.lastCollection).toLocaleString() :
        'No collections yet') +
      ' <small>(Time of your most recent lump collection)</small></div>'
    );

    // Add mod status
    CCSE.AppendStatsGeneral(
      '<div class="listing"><b>Mod Status</b>: ' +
      (EnhancedOfflineLumps.config.enabled ? 'Active' : 'Disabled') +
      ' <small>(Auto-collection is ' + (EnhancedOfflineLumps.config.autoCollect ? 'enabled' : 'disabled') + ')</small></div>'
    );

    // Add achievements section
    CCSE.AppendStatsGeneral('<div class="listing"><b>===Achievements===</b></div>');
    CCSE.AppendStatsGeneral(EnhancedOfflineLumps.addAchievementsToStats());

  });

};

// Automation system: auto-collection logic
EnhancedOfflineLumps.AutomationSystem = {
  lastCheck: Date.now(),
  check: function () {
    if (!EnhancedOfflineLumps.config.autoCollect) return;
    const now = Date.now();
    if (now - this.lastCheck < 1000) return;
    this.lastCheck = now;

    if (typeof Game.lumpCurrentType !== 'undefined' && now - Game.lumpT >= Game.lumpRipeAge) {
      this.collectLump();
    }
  },
  checkOfflineProgress: function () {
    if (!EnhancedOfflineLumps.config.autoCollect) return;

    const now = Date.now();
    const timeDiff = now - Game.lastDate;

    if (timeDiff <= 0) return;

    // Calculate how many lumps would have matured during offline time
    const lumpTime = now - Game.lumpT;
    const lumpMatureTime = Game.lumpRipeAge;
    const possibleLumps = Math.floor(lumpTime / lumpMatureTime);

    if (possibleLumps > 0) {

      // Collect the lumps
      for (let i = 0; i < possibleLumps; i++) {
        this.collectLump();
      }

      // Show a summary notification
      if (EnhancedOfflineLumps.config.notifications) {
        Game.Notify(
          'Offline lumps collected!',
          'Collected ' + possibleLumps + ' sugar lumps while you were away',
          [29, 16],
          EnhancedOfflineLumps.config.notificationDuration
        );
      }
    }
  },
  collectLump: function () {
    const oldType = Game.lumpCurrentType;
    const oldLumps = Game.lumps;  // Store lumps before collection

    Game.clickLump();

    // Verify if collection was successful by checking if lumps increased
    if (Game.lumps > oldLumps) {
      EnhancedOfflineLumps.config.statistics.totalLumpsCollected++;

      // Track lump type
      switch (oldType) {
        case 0:
          EnhancedOfflineLumps.config.statistics.normalLumps++;
          break;
        case 1:
          EnhancedOfflineLumps.config.statistics.bifurcatedLumps++;
          break;
        case 2:
          EnhancedOfflineLumps.config.statistics.meatyLumps++;
          break;
        case 3:
          EnhancedOfflineLumps.config.statistics.caramelizedLumps++;
          break;
        case 4:
          EnhancedOfflineLumps.config.statistics.goldenLumps++;
          EnhancedOfflineLumps.config.statistics.optimalCollections++;
          EnhancedOfflineLumps.currentStreak++;
          if (EnhancedOfflineLumps.currentStreak > EnhancedOfflineLumps.config.statistics.bestLumpStreak) {
            EnhancedOfflineLumps.config.statistics.bestLumpStreak = EnhancedOfflineLumps.currentStreak;
          }
          break;
      }

      // Show notification based on type
      if (EnhancedOfflineLumps.config.notifications) {
        const lumpInfo = EnhancedOfflineLumps.lumpTypes[oldType];
        Game.Notify(
          lumpInfo.name + ' sugar lump collected!',
          oldType === 4 ? 'Streak: ' + EnhancedOfflineLumps.currentStreak :
            'Total ' + lumpInfo.name + ' lumps: ' + EnhancedOfflineLumps[`${lumpInfo.name.toLowerCase()}Lumps`],
          [29, 16],
          EnhancedOfflineLumps.config.notificationDuration
        );
      }

      EnhancedOfflineLumps.config.statistics.lastCollection = Date.now();

      // Save statistics
      if (CCSE.config.OtherMods.EnhancedOfflineLumps) {
        CCSE.config.OtherMods.EnhancedOfflineLumps.statistics = EnhancedOfflineLumps.config.statistics;
        CCSE.config.OtherMods.EnhancedOfflineLumps.achievements = EnhancedOfflineLumps.config.achievements;
      }

      // Check for achievements
      EnhancedOfflineLumps.checkAchievements();

      // Update UI
      Game.UpdateMenu();
    }
  }
};

// Save/Load system with proper merging
EnhancedOfflineLumps.save = function () {
  return JSON.stringify({ config: EnhancedOfflineLumps.config });
};

EnhancedOfflineLumps.load = function (str) {
  try {
    const save = JSON.parse(str);
    EnhancedOfflineLumps.config = Object.assign({}, EnhancedOfflineLumps.defaultConfig, save.config || {});
    EnhancedOfflineLumps.config.statistics = Object.assign({}, EnhancedOfflineLumps.defaultConfig.statistics, save.config.statistics || {});
  } catch (e) {
    EnhancedOfflineLumps.config = Object.assign({}, EnhancedOfflineLumps.defaultConfig);
  }
};

// Add CCSE save hooks
CCSE.customSave.push(function () {
  if (!CCSE.config.OtherMods) CCSE.config.OtherMods = {};
  CCSE.config.OtherMods.EnhancedOfflineLumps = EnhancedOfflineLumps.config;
});

CCSE.customLoad.push(function () {
  if (CCSE.config.OtherMods && CCSE.config.OtherMods.EnhancedOfflineLumps) {
    EnhancedOfflineLumps.config = Object.assign({},
      EnhancedOfflineLumps.defaultConfig,
      CCSE.config.OtherMods.EnhancedOfflineLumps);
    // Ensure statistics object exists with all properties
    EnhancedOfflineLumps.config.statistics = Object.assign({},
      EnhancedOfflineLumps.defaultConfig.statistics,
      CCSE.config.OtherMods.EnhancedOfflineLumps.statistics || {});
  }
});

// Cleanup function for mod unloading
EnhancedOfflineLumps.clean = function () {
  // Remove hooks and cleanup
  Game.customOptionsMenu = Game.customOptionsMenu.filter(func =>
    func.toString().indexOf('EnhancedOfflineLumps') === -1
  );
  Game.customStatsMenu = Game.customStatsMenu.filter(func =>
    func.toString().indexOf('EnhancedOfflineLumps') === -1
  );
  // Remove logic hook
  Game.removeHook('logic', EnhancedOfflineLumps.AutomationSystem.check);
};

// Statistics tracking functions
EnhancedOfflineLumps.updateStreak = function (isOptimal) {

  if (isOptimal) {
    EnhancedOfflineLumps.currentStreak++;
    if (EnhancedOfflineLumps.currentStreak > EnhancedOfflineLumps.config.statistics.bestLumpStreak) {
      EnhancedOfflineLumps.config.statistics.bestLumpStreak = EnhancedOfflineLumps.currentStreak;
    }
    EnhancedOfflineLumps.config.statistics.optimalCollections++;
  } else {
    EnhancedOfflineLumps.currentStreak = 0;
  }

  EnhancedOfflineLumps.config.statistics.totalLumpsCollected++;
  EnhancedOfflineLumps.config.statistics.lastCollection = Date.now();

  Game.UpdateMenu();
};

// Update achievements check function
EnhancedOfflineLumps.checkAchievements = function () {
  const stats = EnhancedOfflineLumps.config.statistics;
  const achievements = EnhancedOfflineLumps.config.achievements;
  let earned = false;

  // Total lumps achievements
  if (!achievements.lumpCollector && stats.totalLumpsCollected >= 10) {
    achievements.lumpCollector = true;
    earned = 'Lump Collector';
  }
  if (!achievements.lumpHoarder && stats.totalLumpsCollected >= 100) {
    achievements.lumpHoarder = true;
    earned = 'Lump Hoarder';
  }
  if (!achievements.lumpMaster && stats.totalLumpsCollected >= 1000) {
    achievements.lumpMaster = true;
    earned = 'Lump Master';
  }

  // Golden lump achievements
  if (!achievements.goldenLumpFirst && stats.optimalCollections >= 1) {
    achievements.goldenLumpFirst = true;
    earned = 'First Gold!';
  }
  if (!achievements.goldenLump10 && stats.optimalCollections >= 10) {
    achievements.goldenLump10 = true;
    earned = 'Golden Decade';
  }
  if (!achievements.goldenLump50 && stats.optimalCollections >= 50) {
    achievements.goldenLump50 = true;
    earned = 'Golden Age';
  }

  // Streak achievements
  if (!achievements.goldenStreak3 && EnhancedOfflineLumps.currentStreak >= 3) {
    achievements.goldenStreak3 = true;
    earned = 'Triple Gold';
  }
  if (!achievements.goldenStreak5 && EnhancedOfflineLumps.currentStreak >= 5) {
    achievements.goldenStreak5 = true;
    earned = 'Golden Streak';
  }
  if (!achievements.goldenStreak10 && EnhancedOfflineLumps.currentStreak >= 10) {
    achievements.goldenStreak10 = true;
    earned = 'Golden Master';
  }

  // Normal lump achievements
  if (!achievements.normalLump10 && stats.normalLumps >= 10) {
    achievements.normalLump10 = true;
    earned = 'Regular Collector';
  }
  if (!achievements.normalLump100 && stats.normalLumps >= 100) {
    achievements.normalLump100 = true;
    earned = 'Lump Enthusiast';
  }

  // Bifurcated lump achievements
  if (!achievements.bifurcatedLump5 && stats.bifurcatedLumps >= 5) {
    achievements.bifurcatedLump5 = true;
    earned = 'Double Trouble';
  }
  if (!achievements.bifurcatedLump25 && stats.bifurcatedLumps >= 25) {
    achievements.bifurcatedLump25 = true;
    earned = 'Split Master';
  }

  // Meaty lump achievements
  if (!achievements.meatyLump5 && stats.meatyLumps >= 5) {
    achievements.meatyLump5 = true;
    earned = 'Meat Lover';
  }
  if (!achievements.meatyLump25 && stats.meatyLumps >= 25) {
    achievements.meatyLump25 = true;
    earned = 'Beefy Collector';
  }

  // Caramelized lump achievements
  if (!achievements.caramelizedLump5 && stats.caramelizedLumps >= 5) {
    achievements.caramelizedLump5 = true;
    earned = 'Sweet Tooth';
  }
  if (!achievements.caramelizedLump25 && stats.caramelizedLumps >= 25) {
    achievements.caramelizedLump25 = true;
    earned = 'Caramel Connoisseur';
  }

  // Special collection achievements
  if (!achievements.varietyCollector &&
    stats.normalLumps > 0 &&
    stats.bifurcatedLumps > 0 &&
    stats.meatyLumps > 0 &&
    stats.caramelizedLumps > 0 &&
    stats.goldenLumps > 0) {
    achievements.varietyCollector = true;
    earned = 'Variety Collector';
  }

  if (!achievements.lumpConnoisseur &&
    stats.normalLumps >= 10 &&
    stats.bifurcatedLumps >= 10 &&
    stats.meatyLumps >= 10 &&
    stats.caramelizedLumps >= 10 &&
    stats.goldenLumps >= 10) {
    achievements.lumpConnoisseur = true;
    earned = 'Lump Connoisseur';
  }

  // Show notification if achievement earned
  if (earned && EnhancedOfflineLumps.config.notifications) {
    Game.Notify(
      'Achievement Unlocked: ' + earned + '!',
      'Check the stats menu to see all achievements',
      [29, 16],
      EnhancedOfflineLumps.config.notificationDuration
    );
  }

  Game.UpdateMenu();
};

// Add achievements to stats display
EnhancedOfflineLumps.addAchievementsToStats = function () {
  let str = '';
  const achievements = EnhancedOfflineLumps.config.achievements;

  str += '<div class="listing"><b>Achievements</b></div>';

  // Collection achievements
  str += '<div class="listing">' +
    (achievements.lumpCollector ? '★' : '☆') + ' Lump Collector (Collect 10 lumps)<br>' +
    (achievements.lumpHoarder ? '★' : '☆') + ' Lump Hoarder (Collect 100 lumps)<br>' +
    (achievements.lumpMaster ? '★' : '☆') + ' Lump Master (Collect 1000 lumps)<br>' +
    '</div>';

  // Golden lump achievements
  str += '<div class="listing">' +
    (achievements.goldenLumpFirst ? '★' : '☆') + ' First Gold! (Collect your first golden lump)<br>' +
    (achievements.goldenLump10 ? '★' : '☆') + ' Golden Decade (Collect 10 golden lumps)<br>' +
    (achievements.goldenLump50 ? '★' : '☆') + ' Golden Age (Collect 50 golden lumps)<br>' +
    '</div>';

  // Streak achievements
  str += '<div class="listing">' +
    (achievements.goldenStreak3 ? '★' : '☆') + ' Triple Gold (Get a streak of 3 golden lumps)<br>' +
    (achievements.goldenStreak5 ? '★' : '☆') + ' Golden Streak (Get a streak of 5 golden lumps)<br>' +
    (achievements.goldenStreak10 ? '★' : '☆') + ' Golden Master (Get a streak of 10 golden lumps)<br>' +
    '</div>';

  // Normal lump achievements
  str += '<div class="listing">' +
    (achievements.normalLump10 ? '★' : '☆') + ' Regular Collector (Collect 10 normal lumps)<br>' +
    (achievements.normalLump100 ? '★' : '☆') + ' Lump Enthusiast (Collect 100 normal lumps)<br>' +
    '</div>';

  // Bifurcated lump achievements
  str += '<div class="listing">' +
    (achievements.bifurcatedLump5 ? '★' : '☆') + ' Double Trouble (Collect 5 bifurcated lumps)<br>' +
    (achievements.bifurcatedLump25 ? '★' : '☆') + ' Split Master (Collect 25 bifurcated lumps)<br>' +
    '</div>';

  // Meaty lump achievements
  str += '<div class="listing">' +
    (achievements.meatyLump5 ? '★' : '☆') + ' Meat Lover (Collect 5 meaty lumps)<br>' +
    (achievements.meatyLump25 ? '★' : '☆') + ' Beefy Collector (Collect 25 meaty lumps)<br>' +
    '</div>';

  // Caramelized lump achievements
  str += '<div class="listing">' +
    (achievements.caramelizedLump5 ? '★' : '☆') + ' Sweet Tooth (Collect 5 caramelized lumps)<br>' +
    (achievements.caramelizedLump25 ? '★' : '☆') + ' Caramel Connoisseur (Collect 25 caramelized lumps)<br>' +
    '</div>';

  // Special collection achievements
  str += '<div class="listing">' +
    (achievements.varietyCollector ? '★' : '☆') + ' Variety Collector (Collect at least one of each type)<br>' +
    (achievements.lumpConnoisseur ? '★' : '☆') + ' Lump Connoisseur (Collect at least 10 of each type)<br>' +
    '</div>';

  return str;
};

// Mod initialization
EnhancedOfflineLumps.init = function () {

  // Initialize config if needed
  if (!EnhancedOfflineLumps.config) {
    EnhancedOfflineLumps.config = Object.assign({}, EnhancedOfflineLumps.defaultConfig);
  }

  // Add menu hooks first
  EnhancedOfflineLumps.addMenuHooks();

  // Register game logic hook
  Game.registerHook('logic', function () {
    EnhancedOfflineLumps.AutomationSystem.check();
  });

  // Check for offline progress
  EnhancedOfflineLumps.AutomationSystem.checkOfflineProgress();

  EnhancedOfflineLumps.isLoaded = 1;

  // Force menu update and ensure stats are shown
  Game.UpdateMenu();
  if (Game.onMenu === 'stats') {
    setTimeout(function () {
      Game.UpdateMenu();
    }, 100);
  }

  Game.Notify(EnhancedOfflineLumps.name + ' v' + EnhancedOfflineLumps.version, 'Mod loaded successfully!', [29, 16], 6);
};

EnhancedOfflineLumps.launch = function () {
  // Prevent multiple launches
  if (EnhancedOfflineLumps.isLoaded) {
    return;
  }

  // Register the mod
  Game.registerMod("enhancedofflinelumps", EnhancedOfflineLumps);

  // Initialize CCSE config
  if (!CCSE.config.OtherMods) CCSE.config.OtherMods = {};

  // Set up save/load hooks
  CCSE.customSave.push(function () {
    CCSE.config.OtherMods.EnhancedOfflineLumps = EnhancedOfflineLumps.config;
  });

  CCSE.customLoad.push(function () {
    if (CCSE.config.OtherMods.EnhancedOfflineLumps) {
      EnhancedOfflineLumps.config = Object.assign({},
        EnhancedOfflineLumps.defaultConfig,
        CCSE.config.OtherMods.EnhancedOfflineLumps
      );
    }
  });

  // Then initialize the mod
  EnhancedOfflineLumps.init();
};

// Auto-launch mod with version checking when CCSE is ready
if (!EnhancedOfflineLumps.isLoaded) {
  if (CCSE && CCSE.isLoaded) {
    if (CCSE.ConfirmGameCCSEVersion(EnhancedOfflineLumps.name, EnhancedOfflineLumps.version, EnhancedOfflineLumps.GameVersion, EnhancedOfflineLumps.CCSEVersion)) {
      EnhancedOfflineLumps.launch();
    }
  } else {
    if (!CCSE) var CCSE = {};
    if (!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
    CCSE.postLoadHooks.push(function () {
      if (CCSE.ConfirmGameCCSEVersion(EnhancedOfflineLumps.name, EnhancedOfflineLumps.version, EnhancedOfflineLumps.GameVersion, EnhancedOfflineLumps.CCSEVersion)) {
        EnhancedOfflineLumps.launch();
      }
    });
  }
}