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
