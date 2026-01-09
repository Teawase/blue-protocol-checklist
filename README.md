[![Version](https://img.shields.io/github/v/release/Teawase/blue-protocol-checklist?color=ef4444&style=flat-square&label=Version)](https://github.com/Teawase/blue-protocol-checklist/releases)
[![Last update](https://img.shields.io/github/last-commit/Teawase/blue-protocol-checklist?color=f59e0b&style=flat-square&label=Last%20update)](https://github.com/Teawase/blue-protocol-checklist/commits/main)
[![Stars](https://img.shields.io/github/stars/Teawase/blue-protocol-checklist?color=a855f7&style=flat-square&label=Stars&logo=github)](https://github.com/Teawase/blue-protocol-checklist/stargazers)
[![Watchers](https://img.shields.io/github/watchers/Teawase/blue-protocol-checklist?color=3b82f6&style=flat-square&label=Watchers&logo=github)](https://github.com/Teawase/blue-protocol-checklist/watchers)
[![Forks](https://img.shields.io/github/forks/Teawase/blue-protocol-checklist?color=22c55e&style=flat-square&label=Forks&logo=github)](https://github.com/Teawase/blue-protocol-checklist/network/members)
[![Issues](https://img.shields.io/github/issues/Teawase/blue-protocol-checklist?color=ef4444&style=flat-square&label=Issues&logo=github)](https://github.com/Teawase/blue-protocol-checklist/issues)
[![Commits](https://img.shields.io/github/commit-activity/m/Teawase/blue-protocol-checklist?color=10b981&style=flat-square&label=Commits&logo=github)](https://github.com/Teawase/blue-protocol-checklist/commits/main)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Teawase/blue-protocol-checklist/blob/main/LICENSE)

# ✔️ Blue Protocol: Star Resonance Checklist (Global/SEA)
A simple, responsive web-based checklist for tracking daily and weekly tasks in Blue Protocol: Star Resonance, built with HTML, CSS, and JavaScript, using only confetti.js for celebrations and marked.js for markdown rendering. **The progress is saved locally in your browser (localStorage) and supports import/export functionality for easy backup and transfer. Installable as a Progressive Web App (PWA) for desktop/mobile.**
## 🔗✨ https://teawase.github.io/blue-protocol-checklist/ ✨🔗
| Feature                                | Description                                                                                         |
|----------------------------------------|-----------------------------------------------------------------------------------------------------|
| 🎯 Dynamic Title + Event Timers        | Switch between “Global” & “SEA” server day count on the page title · Timers switch automatically.  |
| 🕰️ Automatic Daily/Weekly Reset        | Region-specific resets: Global & SEA.                                                              |
| 🌐 Dual Timezone Display               | Click the server time to switch between Global and SEA timezone.                                   |
| 👤 Multiple Profiles                   | Up to 5 independent profiles with custom names and avatars.                                        |
| 🎨 Custom Categories & Tasks           | Up to 10 categories per profile, each with 20 tasks + colors, max progress, and reset rules.       |
| 🖼️ Custom Backgrounds                  | Use your own images as website backgrounds (direct URL with validation and preview).               |
| 🔍 Live Search                         | Real-time filtering of daily/weekly tasks.                                                         |
| ⚡ Rapid Increment/Decrement Counters  | Left-click (or hold) to add increments · Right-click (or hold) to undo — fast and forgiving.       |
| 💾 Fully Offline & Data Portability    | Works offline and in incognito mode · One-click export/import and backup/restore.                  |
| 📱 Mobile UI Support                   | Responsive design with perfectly functioning timers and counters on every device.                  |
| ⚡ Lightweight & Future-Proof          | Built with vanilla JavaScript and only two tiny dependencies.                                      |

<p align="center">
  <table>
    <tr>
      <td align="center"><img src="https://raw.githubusercontent.com/Teawase/blue-protocol-checklist/main/Previews/mainpage.png" alt="Main Page View" width="473" style="border-radius:14px; box-shadow:0 8px 25px rgba(0,0,0,0.22); margin:14px auto;" /></td>
      <td align="center"><img src="https://raw.githubusercontent.com/Teawase/blue-protocol-checklist/main/Previews/custombackground.png" alt="Custom Backgrounds" width="473" style="border-radius:14px; box-shadow:0 8px 25px rgba(0,0,0,0.22); margin:14px auto;" /></td>
    </tr>
    <tr>
      <td align="center"><img src="https://raw.githubusercontent.com/Teawase/blue-protocol-checklist/main/Previews/customcategory.png" width="473" alt="Custom Categories" style="border-radius:12px; box-shadow:0 7px 22px rgba(0,0,0,0.2); margin:14px auto;" /></td>
      <td align="center"><img src="https://raw.githubusercontent.com/Teawase/blue-protocol-checklist/main/Previews/customtask.png" width="473" alt="Custom Tasks" style="border-radius:12px; box-shadow:0 7px 22px rgba(0,0,0,0.2); margin:14px auto;" /></td>
    </tr>
    <tr>
      <td align="center"><img src="https://raw.githubusercontent.com/Teawase/blue-protocol-checklist/main/Previews/profiles.png" width="473" alt="Custom Profiles" style="border-radius:12px; box-shadow:0 7px 22px rgba(0,0,0,0.2); margin:14px auto;" /></td>
      <td align="center"><img src="https://raw.githubusercontent.com/Teawase/blue-protocol-checklist/main/Previews/backup.png" width="473"  alt="Backup (Import/Export)" style="border-radius:12px; box-shadow:0 7px 22px rgba(0,0,0,0.2); margin:14px auto;" /></td>
    </tr>
  </table>
</p>

## Core Functionality
- **Daily Tasks:** Track your daily activities with color-coded categories.
- **Weekly Tasks:** Track your weekly activities with similar color-coding and organization.
- **Custom Categories + Tasks:** Create your own categories and tasks with customizable colors, tracking, and reset options (daily, weekly, or permanent). You can also reorder them however you like.
- **Multiple Profiles:** Save your progress between multiple profiles/characters with independent progress tracking. You can also add an avatar to each and rename them whenever you want.
- **Custom Background:** Change the website background with your own images to match your style or mood.
- **Completion Toggling:** Click or Keyboard (Enter/Space) functionality to mark tasks as complete/incomplete; with line-through styling and opacity fade for completed items.
- **Incremental Progress:** Keep track of how many dungeon runs you've completed, how many times you've fought the bane lord or others.
> **Left Click (MB1):** Increase by 1<br/>
> **Hold Left Click (MB1):** Increase quickly (continuous increment) | Mobile: Hold Tap<br/>
> **Right Click (MB2):** Decrease by 1<br/>
> **Hold Right Click (MB2):** Decrease quickly (continuous decrement) | Mobile: Double Tap + Hold<br/>
- **Batch Actions:** "Select All" and "Deselect All" buttons for quick completion resets or bulk marking.
- **Show/Hide Completed:** Toggle button to filter out finished tasks, improving focus on remaining work.
- **Real-time counters** (e.g., "6 / 9 complete").
- **Progress bars** with percentage display and gradient fills.
- **Confetti Celebrations:** Confetti animation triggers when all daily or weekly tasks are completed.
- **Import/export:** Backup and restore daily/weekly checklist progress via a JSON file with instant UI updates.
- **News/Changelogs:** View the latest updates and release notes in a dedicated modal.
- **Welcome Tips:** One-time modal explaining desktop and mobile controls for new users.
- **Clear Data Button:** One-click option to completely reset all site data (irreversible).

## Search & Navigation
- **Live Search:** Text input filters tasks by label in daily and weekly sections, switching to a vertical list for easier reading.
- **Keyboard Navigation:** Use Tab then Arrow keys (Up/Down) to move focus between tasks; Enter/Space for toggling.
- **Back to Top Button:** Smooth-scroll button appears after scrolling for quick navigation to the top.

## History Tracking
- **Persistent Storage:** Uses localStorage to save task states across sessions. Daily progress resets at (5:00 AM Noronha timezone); Weekly progress resets every Monday at (5:00 AM Noronha timezone).

## Event Timers
- **Real-Time Countdowns:** Dynamic timers for key game events, all timezone-aware (Global/SEA):
  - Daily Reset
  - World Boss Crusade
  - Weekly Reset
  - Guild Hunt
  - Guild Dance
  - Stimen Vaults
- **Smart Updates:** Refreshes every second when visible, every 5 seconds when tabbed away.
- **Clickable Refresh:** Click any timer name to force-update all of them.

## User Experience & Accessibility
- **Responsive Design:** Flexbox layout stacks sections vertically on mobile (<900px); tasks reflow from 2-column grid to full-width.
- **Color-Coded UI:** Tasks use distinct backgrounds for quick visual grouping.
- **Animations & Feedback:** Smooth transitions for task hovers, counter updates (fade/slide), and progress fills.
- **Dynamic Page Title:** Updates to "Blue Protocol: Star Resonance Checklist (Day #X)" based on how many days have been since launch with a toggle for Global or SEA region; also shows progress percentages (e.g., "Daily 50% | Weekly 75%").
- **Current Server Time:** Toggles between Global (Noronha) and SEA (Bangkok) time by clicking the server time display.
- **Version Display:** Shows current version with a clickable link to releases and tooltip for last updated time.
- **Accessibility Features:**
  - ARIA labels/roles for screen readers.
  - Keyboard-focusable tasks with outline rings.

## Privacy & Edge Cases
- **Data Privacy:** Auto-detects EU visitors via IP API; shows a modal for consent. Opting out deletes all data and closes the tab.
- **Incognito Mode Support:** Detects private browsing and prompts to clear unsaved progress on unload; auto-clears if confirmed.
- **Error Handling:** Fallback for storage failures, timezone parsing, or API errors.
- **Backup reminder:** A '!' badge appears if you haven't backed up in 7+ days.

## Resources & Extras
- **Footer Links:** Quick access to community resources.
- **No Internet Required:** Fully offline after initial load; timers use browser Date API.

## Tech Stack
- **HTML5:** Semantic structure with modals and live regions.
- **CSS3:** Flexbox, gradients, animations, dark theme.
- **JavaScript (ES6+):** Vanilla JS with async/await, debouncing, and timezone handling. No frameworks.
- **External:** Only **canvas-confetti** for celebrations and **marked** for markdown rendering.
> Note: Some code in this project was generated with AI assistance and subsequently reviewed and refined by the developer.

## Contact
- **Discord:** [@Teawase](https://discordredirect.discordsafe.com/users/96620826689822720)
- **Guild Name/ID:** Mooncake (ID: 2048)
- **In-game UID (Global):** #225964
<img width="1920" height="1080" alt="ProfilePhoto" src="https://github.com/user-attachments/assets/68100abc-2938-446f-9c2e-bf3a9f40f6c6" />

<div align="center">
  
**Made with ❤️ by Teawase**
</div>

## Contributing
Contributions welcome! See [CONTRIBUTING.md](https://github.com/Teawase/blue-protocol-checklist/blob/main/CONTRIBUTING.md) for guidelines.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/Teawase/blue-protocol-checklist/blob/main/LICENSE) file for details.
