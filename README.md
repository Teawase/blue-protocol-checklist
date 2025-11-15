# Blue Protocol: Star Resonance Checklist
A simple, responsive web-based checklist for tracking daily and weekly tasks in Blue Protocol: Star Resonance, built with HTML, CSS, and JavaScript, using only confetti.js for celebrations and marked.js for markdown rendering. **The progress is saved locally in your browser (localStorage) and supports import/export functionality for easy backup and transfer.**

### https://teawase.github.io/blue-protocol-checklist/

>  Note: Some code in this project was generated with AI assistance and subsequently reviewed and refined by the developer.

# Features
## Core Functionality
- **Daily Tasks:** Track your daily activities with color-coded categories.
- **Weekly Tasks:** Track your weekly activities with similar color-coding and organization.
- **Completion Toggling:** Click or Keyboard (Enter/Space) functionality to mark tasks as complete/incomplete; with line-through styling and opacity fade for completed items.
- **Multiple Profiles:** Save your progress between multiple profiles/characters with independent progress tracking.
- **Incremental Progress:** Keep track of how many dungeon runs you've completed, how many times you've fought the bane lord or others.
  - Left Click (MB1): increase by 1 
  - Hold Left Click (MB1): increase quickly (continuous increment) | Mobile: Hold Tap
  - Right Click (MB2): decrease by 1
  - Hold Right Click (MB2): decrease quickly (continuous decrement) | Mobile: Double Tap + Hold
- **Real-time counters** (e.g., "6 / 9 complete").
- **Progress bars** with percentage display and gradient fills.
- **Batch Actions:** "Select All" and "Deselect All" buttons for quick completion resets or bulk marking.
- **Show/Hide Completed:** Toggle button to filter out finished tasks, improving focus on remaining work.
- **Import/export:** Backup and restore daily/weekly checklist progress via a JSON file with instant UI updates.

## Search & Navigation
- **Live Search:** Text input filters tasks by label in daily and weekly sections, switching to a vertical list for easier reading.
- **Keyboard Navigation:** Use Tab then Arrow keys (Up/Down) to move focus between tasks; Enter/Space for toggling.

## History Tracking
- **Persistent Storage:** Uses localStorage to save task states across sessions. Daily progress resets at (5:00 AM Noronha timezone); Weekly progress resets every Monday at (5:00 AM Noronha timezone).

## Event Timers
- **Real-Time Countdowns:** Dynamic timers for key game events, all timezone-aware (America/Noronha):
  - Daily Reset (5:00 AM).
  - World Boss Crusade (4:00 PM - 10:00 PM daily).
  - Weekly Reset (Monday 5:00 AM).
  - Guild Hunt (Fri-Sun 2:00 PM - 4:00 AM next day).
  - Guild Dance (Fri 3:30 PM - 3:30 AM next day).
  - Stimen Vaults (Bi-weekly reset).
- **Smart Updates:** Refreshes every second when visible, every 5 seconds when tabbed away.
- **Timer pulse:** Active timers have a glowing effect.
- **Clickable Refresh:** Click any timer name to force-update all of them.

## User Experience & Accessibility
- **Responsive Design:** Flexbox layout stacks sections vertically on mobile (<900px); tasks reflow from 2-column grid to full-width.
- **Color-Coded UI:** Tasks use distinct backgrounds for quick visual grouping.
- **Animations & Feedback:** Smooth transitions for task hovers, counter updates (fade/slide), and progress fills.
- **Accessibility Features:**
  - ARIA labels/roles for screen readers.
  - Keyboard-focusable tasks with outline rings.
- **Dynamic Page Title:** Updates to "Blue Protocol: Star Resonance Checklist (Day #X)" based on days since Oct 9, 2025 launch.

## Privacy & Edge Cases
- **Data Privacy:** Auto-detects EU visitors via IP API; shows a modal for consent. Opting out deletes all data and closes the tab.
- **Incognito Mode Support:** Detects private browsing and prompts to clear unsaved progress on unload; auto-clears if confirmed.
- **Error Handling:** Fallback for storage failures, timezone parsing, or API errors.

## Resources & Extras
- **Footer Links:** Quick access to community resources.
- **No Internet Required:** Fully offline after initial load; timers use browser Date API.

## Tech Stack
- **HTML5:** Semantic structure with modals and live regions.
- **CSS3:** Flexbox, gradients, animations, dark theme.
- **JavaScript (ES6+):** Vanilla JS with async/await, debouncing, and timezone handling. No frameworks.
- **External:** Only canvas-confetti for celebrations.

## Contact
- **Discord:** [Teawase](https://discordredirect.discordsafe.com/users/96620826689822720)
- **In-game UID:** #225964
![20251107104850_011_011418](https://github.com/user-attachments/assets/fb69811f-76b2-40cf-a495-ab34a1e95ee7)
