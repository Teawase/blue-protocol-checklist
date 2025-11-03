# Blue Protocol: Star Resonance Checklist
A simple, responsive web-based checklist for tracking daily and weekly tasks for Blue Protocol: Star Resonance. Built with HTML, CSS, and JavaScript. No external dependencies beyond confetti.js for celebrations. Progress is saved locally in your browser.

# Features
## Core Functionality
- **Daily Tasks:** Track your daily activities with color-coded categories.
- **Weekly Tasks:** Track your weekly activities with similar color-coding and organization.
- **Completion Toggling:** Click or Keyboard (Enter/Space) functionality to mark tasks as complete/incomplete; supports line-through styling and opacity fade for completed items.
- **Progress Tracking:**
  - Real-time counters (e.g., "6/ 9 complete").
  - Animated progress bars with percentage display and gradient fills.
- **Batch Actions:** "Select All" and "Deselect All" buttons for quick completion resets or bulk marking.
- **Hide Completed:** Toggle button to filter out finished tasks, improving focus on remaining work.

## Search & Navigation
- **Live Search:** Text input filters tasks by label in daily and weekly sections, switching to a vertical list for easier reading.
- **Keyboard Navigation:** Arrow keys (Up/Down/Left/Right) to move focus between visible tasks; Enter/Space for toggling.

## Streak & History Tracking
- **Daily Streak Counter:** Automatically calculates and displays consecutive days of full daily completion.
- **Persistent Storage:** Uses localStorage to save task states across sessions. Daily progress resets at (5:00 AM Noronha timezone); Weekly persists until weekly reset.

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
- **Error Handling:** Graceful fallbacks for storage failures, timezone parsing, or API errors.

## Resources & Extras
- **Footer Links:** Quick access to community resources.
- **No Internet Required:** Fully offline after initial load; timers use browser Date API.

## Tech Stack
- **HTML5:** Semantic structure with modals and live regions.
- **CSS3:** Flexbox, gradients, animations, dark theme.
- **JavaScript (ES6+):** Vanilla JS with async/await, debouncing, and timezone handling. No frameworks.
- **External:** Only canvas-confetti for celebrations.

## Contributing
We welcome contributions! Whether it's fixing a bug, adding new tasks, improving timers, or enhancing the UI — your help makes the checklist better for everyone.

### How to Contribute

1. **Fork the repository**
   - Click the "Fork" button at the top-right of the GitHub page.

2. **Clone your fork**
   ```bash
   git clone https://github.com/Teawase/blue-protocol-checklist.git
   cd blue-protocol-checklist
   ```
3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
- Use descriptive names:
  - feature/add-new-weekly-task
  - fix/timer-reset-bug
  - enhance/mobile-layout
4. Make your changes
- Edit index.html, styles.css, or script.js
- Keep changes focused on one feature/fix
5. Test locally
- Open index.html in your browser
- Test on desktop and mobile
- Check:
  - Task toggling
  - Progress bars & counters
  - Timers (use browser timezone override if needed)
  - localStorage persistence
6. Commit your changes
   ```bash
   git add .
   git commit -m "Add: New weekly raid task for Light Dragon"
7. Push and open a Pull Request
   ```bash
   git push origin feature/your-feature-name
- Go to the original repo and click "Compare & pull request"
- Describe:
   - What you changed
   - Why it’s useful
   - Screenshots (optional but helpful)

### Testing Tips
- **Simulate daily reset:** Change your system clock or override parseNoronha() temporarily
- **Clear progress:** DevTools → Application → localStorage → Clear

## License
MIT – Feel free to fork and adapt for other games! 
