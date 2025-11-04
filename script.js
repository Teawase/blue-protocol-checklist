(() => {
  const dailyTaskData = [
    { id: "daily_guild_checkin", label: "Guild Check-In & Cargo (Guild Administrator & Cargo Administrator in Guild Center)", color: "orange" },
    { id: "daily_unstable_space_dungeon", label: "Clear Unstable Space Dungeon (2x Daily)", color: "purple" },
    { id: "daily_season_activity_goals", label: "Season Pass Activity (Earn 500 Activity Merits in the Season Pass)", color: "yellow" },
    { id: "daily_commissions", label: "Bureau Commissions (3x Daily | You can skip this daily for up to 2 days | Commissions Cap: 9)", color: "green" },
    { id: "daily_mystery_shop", label: "Mystery Shop (Buy Starforge Crystals & Advanced Books & Moss/Burl Shards if available)", color: "grey" },
    { id: "daily_world_boss_keys", label: "World Boss Keys (2x Daily | You can skip this daily for up to 2 days | Keys Cap: 6)", color: "red" },
    { id: "daily_elite_boss_keys", label: "Elite Boss Keys (2x Daily | You can skip this daily for up to 2 days | Keys Cap: 6)", color: "red" },
    { id: "daily_focus", label: "Life Skill Focus (Spend 400 Focus Daily | This daily can be skipped for up to 4 days | Focus Cap: 2000)", color: "yellow" },
    { id: "daily_homestead_commissions", label: "Homestead Commissions (You can skip this daily for up to 2 days)", color: "green" }
  ];

  const weeklyTaskData = [
    { id: "weekly_pioneer_rewards", label: "Pioneer Awards (Pioneer NPC in town)", color: "yellow" },
    { id: "weekly_reclaim_hub", label: "Reclaim Hub (If missed a daily/weekly)", color: "grey" },
    { id: "weekly_guild_activity_rewards", label: "Guild Activity Rewards (7000/7000 Points)", color: "orange" },
    { id: "weekly_guild_hunt_extended", label: "Guild Hunt (Available only on Friday, Saturday, Sunday)", color: "orange" },
    { id: "weekly_guild_dance", label: "Guild Dance (Available only on Friday)", color: "orange" },
    { id: "weekly_world_boss_crusade_points", label: "World Boss Crusade (Available Daily | Earn 1200 Points)", color: "red" },
    { id: "weekly_clear_dungeons_normal", label: "Clear Dungeons (Normal/Difficult - 20 runs for weekly cap of Reforge Stones)", color: "purple" },
    { id: "weekly_clear_dungeons_master_1_5", label: "Clear Dungeons (Master 1-5 - 20 runs for weekly cap of Reforge Stones)", color: "purple" },
    { id: "weekly_clear_dungeons_master_6_20", label: "Clear Dungeons (Master 6-20 - 20 runs for weekly cap of Reforge Stones)", color: "purple" },
    { id: "weekly_fight_bane_lord", label: "Fight the Bane Lord (Random Encounter when clearing dungeons | Max 5 times a week for Legendary Select Boxes)", color: "red" },
    { id: "weekly_gear_exchange_store", label: "Gear Exchange Store (Buy Luno Pouches & Allow Shards from all the gear exchange stores)", color: "grey" },
    { id: "weekly_honor_shop", label: "Honor Shop (10000 Honor Points weekly)", color: "grey" },
    { id: "weekly_friendship_shop", label: "Friendship Shop (2000 Friendship Points weekly)", color: "grey" },
    { id: "weekly_reputation_shop", label: 'Reputation Shop (Buy Will Wish Coin & "Revive" Candy & Healing Aromatic Lv.1)', color: "grey" },
    { id: "weekly_event_shop", label: "Event Shop (if its available)", color: "grey" },
    { id: "weekly_life_skill_quests", label: "Life Skill Quests (12 Exchange Quests)", color: "green" },
    { id: "weekly_stimen_vaults", label: "Stimen Vaults (Resets every 2 weeks)", color: "silver" },
    { id: "weekly_ice_dragon_normal", label: "Ice Dragon Raid - Normal (12710+ Ability Score)", color: "blue" },
    { id: "weekly_ice_dragon_hard", label: "Ice Dragon Raid - Hard (16140+ Ability Score)", color: "blue" },
    { id: "weekly_ice_dragon_nightmare", label: "Ice Dragon Raid - Nightmare (22300+ Ability Score)", color: "blue" },
    { id: "weekly_dark_dragon_normal", label: "Dark Dragon Raid - Normal (15210+ Ability Score)", color: "dark_purple" },
    { id: "weekly_dark_dragon_hard", label: "Dark Dragon Raid - Hard (19040+ Ability Score)", color: "dark_purple" },
    { id: "weekly_dark_dragon_nightmare", label: "Dark Dragon Raid - Nightmare (24180+ Ability Score)", color: "dark_purple" },
    { id: "weekly_light_dragon_normal", label: "Light Dragon Raid - Normal (UNKNOWN Ability Score)", color: "yellow" },
    { id: "weekly_light_dragon_hard", label: "Light Dragon Raid - Hard (UNKNOWN Ability Score)", color: "yellow" },
    { id: "weekly_light_dragon_nightmare", label: "Light Dragon Raid - Nightmare (UNKNOWN Ability Score)", color: "yellow" }
  ];

  const $ = (id) => document.getElementById(id);

  // Cache DOM elements
  const dailyContainer = $('daily_tasks_container');
  const weeklyContainer = $('weekly_tasks_container');
  const dailyCounter = $('daily_counter');
  const weeklyCounter = $('weekly_counter');
  const dailyProgress = $('daily_progress');
  const weeklyProgress = $('weekly_progress');
  const dailyProgressBar = $('daily_progress_bar');
  const weeklyProgressBar = $('weekly_progress_bar');
  const dailyCompletionMsg = $('daily_completion_message');
  const weeklyCompletionMsg = $('weekly_completion_message');
  const toggleDailyBtn = $('toggleDaily');
  const toggleWeeklyBtn = $('toggleWeekly');
  const dailyFilterInput = $('daily_filter');
  const weeklyFilterInput = $('weekly_filter');
  const btnSelectAllDaily = $('btnSelectAllDaily');
  const btnDeselectAllDaily = $('btnDeselectAllDaily');
  const btnSelectAllWeekly = $('btnSelectAllWeekly');
  const btnDeselectAllWeekly = $('btnDeselectAllWeekly');
  const dailyStreakEl = $('daily_streak');
  const gdprModal = $('gdpr-modal');
  const acceptBtn = $('accept-gdpr');
  const rejectBtn = $('reject-gdpr');

  let hideCompletedState = { daily: false, weekly: false };
  const TOTAL_DAILIES = 9;
  let isStorageAllowed = localStorage.getItem('gdpr_optout') !== 'true';

  // GDPR functions
  async function checkGDPR() {
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (!res.ok) return;
      const data = await res.json();
      if (data.continent_code === 'EU' && !localStorage.getItem('gdpr_consent')) {
        gdprModal.style.display = 'flex';
      }
    } catch (e) {
      console.log('GDPR check skipped:', e);
    }
  }

  function hideGDPRModal() {
    gdprModal.style.display = 'none';
  }

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('gdpr_consent', 'true');
    isStorageAllowed = true;
    hideGDPRModal();
  });

  rejectBtn.addEventListener('click', () => {
    localStorage.setItem('gdpr_optout', 'true');
    localStorage.clear();
    isStorageAllowed = false;
    hideGDPRModal();
    setTimeout(() => {
      if (!document.hidden) {
        document.body.innerHTML = `
          <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; color: #fff; display: flex; align-items: center; justify-content: center; flex-direction: column; font-family: sans-serif; text-align: center; z-index: 9999;">
            <h1>Session Closed</h1>
            <p>Due to privacy opt-out, this session has ended. Please enable cookies/localStorage to use the checklist.</p>
            <button onclick="window.close()" style="margin-top: 20px; padding: 10px 20px; background: #506aff; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Close Tab</button>
          </div>
        `;
        document.documentElement.style.overflow = 'hidden';
      }
    }, 100);
  });

  // Incognito detection
  async function isIncognito() {
    try {
      const fs = window.webkitRequestFileSystem || window.RequestFileSystem;
      if (!fs) return false;
      return new Promise((resolve) => {
        fs(window.TEMPORARY, 1, () => resolve(false), () => resolve(true));
      });
    } catch {
      return false;
    }
  }

  function clearAllProgress() {
    if (!isStorageAllowed) return;
    localStorage.removeItem('daily_tasks');
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('weekly_')) localStorage.removeItem(key);
    });
    location.reload();
  }

  // Daily date key (Noronha TZ)
  const getCurrentDailyDate = (now = parseNoronha()) => {
    const nextReset = getDailyReset(now);
    const dailyStart = new Date(nextReset.getTime() - 86400000);
    return dailyStart.toISOString().split('T')[0];
  };

  // Get current weekly reset date key (Monday 5 AM Noronha)
  const getCurrentWeeklyDate = (now = parseNoronha()) => {
    const reset = getWeeklyReset(now);
    return reset.toISOString().split('T')[0]; // e.g., "2025-11-03"
  };

  // Clear all weekly tasks on weekly reset if needed
  const resetWeeklyStorageIfNeeded = () => {
    if (!isStorageAllowed) return;

    const currentWeeklyDate = getCurrentWeeklyDate();
    const storedWeeklyDate = localStorage.getItem('weekly_reset_date');

    if (storedWeeklyDate !== currentWeeklyDate) {
      // Clear ALL weekly task progress
      weeklyTaskData.forEach(task => {
        localStorage.removeItem(task.id);
      });
      localStorage.setItem('weekly_reset_date', currentWeeklyDate);

      // Optional: Visual feedback for weekly reset
      if (storedWeeklyDate) {
        setTimeout(() => {
          alert("Weekly reset! All weekly tasks have been cleared.");
        }, 500);
      }
    }
  };

  // getDailyStorage resets tasks exactly at 5 AM Noronha and preserves history
  const getDailyStorage = () => {
    if (!isStorageAllowed) {
      return { date: getCurrentDailyDate(), tasks: {}, history: [], currentCompleted: 0 };
    }
    const currentDate = getCurrentDailyDate();
    let stored = JSON.parse(localStorage.getItem('daily_tasks') || '{}');
    if (stored.date !== currentDate) {
      // DAILY RESET: New day → clear tasks, log history
      if (stored.currentCompleted !== undefined) {
        const prevDate = new Date(stored.date || currentDate);
        prevDate.setDate(prevDate.getDate() - 1);
        const prevDateStr = prevDate.toISOString().split('T')[0];
        if (!stored.history) stored.history = [];
        stored.history.push({ date: prevDateStr, completed: stored.currentCompleted });
        if (stored.history.length > 3650) stored.history = stored.history.slice(-3650);
      }
      stored = { date: currentDate, tasks: {}, history: stored.history || [], currentCompleted: 0 };
      localStorage.setItem('daily_tasks', JSON.stringify(stored));
    }
    return stored;
  };

  const updateDailyStorage = (taskId, completed) => {
    if (!isStorageAllowed) return;
    const stored = getDailyStorage();
    const prevState = !!stored.tasks[taskId];
    if (prevState !== completed) {
      stored.tasks[taskId] = completed;
      stored.currentCompleted = Object.values(stored.tasks).filter(Boolean).length;
      localStorage.setItem('daily_tasks', JSON.stringify(stored));
    }
  };

  const calculateDailyStreak = () => {
    if (!isStorageAllowed) return 0;
    const stored = getDailyStorage();
    const history = stored.history || [];
    let streak = 0;
    const today = new Date(getCurrentDailyDate());
    const isTodayFull = stored.currentCompleted === TOTAL_DAILIES;
    for (let i = history.length - 1; i >= 0; i--) {
      const histDate = new Date(history[i].date);
      const daysAgo = Math.floor((today - histDate) / 86400000);
      if (daysAgo === 0) continue;
      if (daysAgo > 3650) break;
      if (history[i].completed === TOTAL_DAILIES) {
        streak++;
      } else {
        break;
      }
    }
    return streak + (isTodayFull ? 1 : 0);
  };

  // Task creation and toggling logic remains unchanged
  function createTaskElement(task, section) {
    const div = document.createElement('div');
    div.className = `task ${task.color}`;
    div.tabIndex = 0;
    div.setAttribute('data-id', task.id);
    div.setAttribute('role', 'listitem');
    const lbl = document.createElement('label');
    lbl.textContent = task.label;
    div.appendChild(lbl);

    if (section === 'weekly') {
      if (isStorageAllowed && localStorage.getItem(task.id) === 'true') {
        div.classList.add('completed');
      }
    } else if (section === 'daily') {
      const stored = getDailyStorage();
      if (stored.tasks && stored.tasks[task.id]) {
        div.classList.add('completed');
      }
    }

    div.addEventListener('click', () => toggleTask(div, section));
    div.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTask(div, section);
      }
    });
    return div;
  }

  function toggleTask(element, section) {
    const completed = element.classList.toggle('completed');
    const taskId = element.getAttribute('data-id');
    if (section === 'weekly') {
      if (isStorageAllowed) localStorage.setItem(taskId, completed);
    } else if (section === 'daily') {
      updateDailyStorage(taskId, completed);
    }
    updateCounter(section);
    applyCompletedFilter(section);
  }

  function renderTasks(container, tasks, section) {
    const fragment = document.createDocumentFragment();
    tasks.forEach(task => fragment.appendChild(createTaskElement(task, section)));
    container.innerHTML = '';
    container.appendChild(fragment);
    const renderedTasks = container.querySelectorAll('.task');
    renderedTasks.forEach((task, index) => {
      task.dataset.index = index;
    });
    updateCounter(section);
  }

  function updateCounter(section) {
    const container = section === 'daily' ? dailyContainer : weeklyContainer;
    const counter = section === 'daily' ? dailyCounter : weeklyCounter;
    const progress = section === 'daily' ? dailyProgress : weeklyProgress;
    const progressBar = section === 'daily' ? dailyProgressBar : weeklyProgressBar;
    const completionMsg = section === 'daily' ? dailyCompletionMsg : weeklyCompletionMsg;

    const tasks = container.querySelectorAll('.task');
    let done = 0;
    tasks.forEach(t => { if (t.classList.contains('completed')) done++; });
    const total = tasks.length;
    const pct = total ? (done / total) * 100 : 0;

    counter.textContent = `${done} / ${total} complete`;
    counter.classList.remove('animate');
    void counter.offsetWidth;
    counter.classList.add('animate');

    progress.style.width = `${pct}%`;
    progress.textContent = `${pct.toFixed(0)}%`;
    progressBar.dataset.tooltip = `${done} of ${total} (${pct.toFixed(1)}%)`;

    const blue = [80, 106, 255];
    const gold = [255, 184, 0];
    const lerpedRGB = blue.map((b, i) => Math.round(b + (gold[i] - b) * (pct / 100)));
    progress.style.background = `linear-gradient(90deg, rgb(${lerpedRGB.join(',')}), rgb(${lerpedRGB.join(',')}))`;

    if (done === total && total > 0) {
      completionMsg.style.display = 'block';
      if (!progress.dataset.confettiDone) {
        progress.dataset.confettiDone = 'true';
        confetti({
          particleCount: 500,
          angle: 180,
          spread: 360,
          origin: { x: 0.5, y: -0.5 },
          ticks: 100,
        });

        confetti({
          particleCount: 500,
          angle: 180,
          spread: 360,
          origin: { x: 0.5, y: 1 },
        });

        confetti({
          particleCount: 500,
          angle: 180,
          spread: 360,
          origin: { x: 1, y: 0.5 },
        });

        confetti({
          particleCount: 500,
          angle: 180,
          spread: 360,
          origin: { x: 0, y: 0.5 },
        });
      }
    } else {
      completionMsg.style.display = 'none';
      progress.dataset.confettiDone = '';
    }

    if (section === 'daily') {
      const streak = calculateDailyStreak();
      if (dailyStreakEl) {
        dailyStreakEl.textContent = streak > 0 ? ` (🔥 ${streak}-day streak)` : ' (No streak yet)';
        dailyStreakEl.style.display = isStorageAllowed ? 'inline' : 'none';
      }
    }
  }

  function toggleCompleted(section) {
    hideCompletedState[section] = !hideCompletedState[section];
    const button = section === 'daily' ? toggleDailyBtn : toggleWeeklyBtn;
    button.textContent = hideCompletedState[section] ? 'Show Completed' : 'Hide Completed';
    button.setAttribute('aria-pressed', hideCompletedState[section]);
    applyCompletedFilter(section);
  }

  function applyCompletedFilter(section) {
    const container = section === 'daily' ? dailyContainer : weeklyContainer;
    const filterInput = section === 'daily' ? dailyFilterInput : weeklyFilterInput;
    const tasks = container.querySelectorAll('.task');
    const hideCompleted = hideCompletedState[section];
    const filterText = filterInput.value.toLowerCase();

    tasks.forEach(t => {
      const isCompleted = t.classList.contains('completed');
      const matchesFilter = t.textContent.toLowerCase().includes(filterText);
      if (!matchesFilter || (isCompleted && hideCompleted)) {
        t.style.display = 'none';
      } else {
        t.style.display = '';
      }
    });
  }

  function selectAll(section) {
    const container = section === 'daily' ? dailyContainer : weeklyContainer;
    const tasks = container.querySelectorAll('.task');
    tasks.forEach(t => {
      t.classList.add('completed');
      const taskId = t.getAttribute('data-id');
      if (section === 'weekly' && isStorageAllowed) {
        localStorage.setItem(taskId, 'true');
      } else if (section === 'daily') {
        updateDailyStorage(taskId, true);
      }
    });
    updateCounter(section);
    applyCompletedFilter(section);
  }

  function deselectAll(section) {
    const container = section === 'daily' ? dailyContainer : weeklyContainer;
    const tasks = container.querySelectorAll('.task');
    tasks.forEach(t => {
      t.classList.remove('completed');
      const taskId = t.getAttribute('data-id');
      if (section === 'weekly' && isStorageAllowed) {
        localStorage.setItem(taskId, 'false');
      } else if (section === 'daily') {
        updateDailyStorage(taskId, false);
      }
    });
    updateCounter(section);
    applyCompletedFilter(section);
  }

  // Keyboard navigation unchanged
  document.addEventListener('keydown', (e) => {
    if (!e.target.classList?.contains('task')) return;
    const section = e.target.closest('.section').id === 'daily_section' ? 'daily' : 'weekly';
    const container = section === 'daily' ? dailyContainer : weeklyContainer;
    const allTasks = Array.from(container.querySelectorAll('.task:not([style*="display: none"])'));
    if (allTasks.length < 2) return;
    const currentIndex = allTasks.findIndex(task => task === e.target);
    if (currentIndex === -1) return;
    let newIndex = currentIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      newIndex = Math.min(allTasks.length - 1, currentIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      newIndex = Math.max(0, currentIndex - 1);
    } else {
      return;
    }
    e.preventDefault();
    allTasks[newIndex].focus();
  });

  function debounce(fn, delay) {
    let timeout;
    return function (...args) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function setupFilter(section) {
    const input = section === 'daily' ? dailyFilterInput : weeklyFilterInput;
    input.addEventListener('input', debounce(() => applyCompletedFilter(section), 150));
  }

  function updateTitle() {
    const start = new Date('2025-10-09');
    const now = new Date();
    const day = Math.floor((now - start) / 864e5) + 1;
    $('page-title').textContent = `Blue Protocol: Star Resonance Checklist (Day #${day})`;
  }

  // Timer functions unchanged
  const noronhaNow = () => new Date().toLocaleString('en-US', { timeZone: 'America/Noronha' });
  const parseNoronha = () => new Date(noronhaNow());

  const diffSec = (future, now = parseNoronha()) => Math.max(0, Math.floor((future - now) / 1000));
  const format = ({ d, h, m, s }) => {
    const parts = [];
    if (d) parts.push(`${d}d`);
    if (h || parts.length) parts.push(`${h}h`);
    if (m || parts.length) parts.push(`${m}m`);
    if (!parts.length) parts.push(`${s}s`);
    return parts.join(' ');
  };

  const cloneSet = (base, day, h, m) => {
    const d = new Date(base);
    d.setHours(0, 0, 0, 0);
    while (d.getDay() !== day) d.setDate(d.getDate() + 1);
    d.setHours(h, m, 0, 0);
    return d;
  };

  const getDailyReset = now => {
    const r = new Date(now);
    r.setHours(5, 0, 0, 0);
    return now >= r ? new Date(r.getTime() + 864e5) : r;
  };

  const getWeeklyReset = now => {
    const r = new Date(now);
    r.setHours(5, 0, 0, 0);
    // Calculate days until next Monday 5 AM Noronha
    const diff = ((1 - r.getDay() + 7) % 7) || (now.getHours() >= 5 ? 7 : 0);
    r.setDate(r.getDate() + diff);
    return r;
  };

  const getStimenVaults = now => {
    let r = new Date('2025-11-03T02:00:00');
    while (r < now) r.setDate(r.getDate() + 14);
    return r;
  };

  const getGuildHuntPeriod = now => {
    const days = [5, 6, 0];
    for (const day of days) {
      const start = cloneSet(now, day, 14, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      end.setHours(4, 0, 0, 0);
      if (now >= start && now < end) return { start, end };
    }
    const next = days
      .map(d => cloneSet(now, d, 14, 0))
      .map(dt => (dt <= now ? new Date(dt.getTime() + 7 * 864e5) : dt))
      .sort((a, b) => a - b)[0];
    const end = new Date(next);
    end.setDate(end.getDate() + 1);
    end.setHours(4, 0, 0, 0);
    return { start: next, end };
  };

  const getGuildDancePeriod = now => {
    const start = cloneSet(now, 5, 15, 30);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    end.setHours(3, 30, 0, 0);
    if (now >= start && now < end) return { start, end };
    const next = new Date(start.getTime() + (start <= now ? 7 * 864e5 : 0));
    const nextEnd = new Date(next);
    nextEnd.setDate(nextEnd.getDate() + 1);
    nextEnd.setHours(3, 30, 0, 0);
    return { start: next, end: nextEnd };
  };

  const getWorldBossCrusadePeriod = now => {
    const start = new Date(now);
    start.setHours(16, 0, 0, 0);
    const end = new Date(now);
    end.setHours(22, 0, 0, 0);
    if (now >= start && now < end) return { start, end };
    if (now < start) return { start, end };
    start.setDate(start.getDate() + 1);
    end.setDate(end.getDate() + 1);
    return { start, end };
  };

  class EventTimer {
    constructor(id, getPeriod, label) {
      this.el = $(id);
      this.getPeriod = getPeriod;
      this.label = label;
      this.name = this.el.querySelector('.name');
      this.cnt = this.el.querySelector('.countdown');
      this.name.onclick = () => timers.forEach(t => t.update());
    }
    update(now = parseNoronha()) {
      let period;
      try {
        period = this.getPeriod(now);
      } catch {
        this.cnt.textContent = 'Error';
        return;
      }
      const { start, end } = period.start === undefined ? { start: null, end: period } : period;
      const target = now >= start && now < end ? end : start || end;
      if (!target) return;
      const diff = diffSec(target, now);
      const d = Math.floor(diff / 86400),
        h = Math.floor((diff % 86400) / 3600),
        m = Math.floor((diff % 3600) / 60),
        s = diff % 60;
      const active = now >= start && now < end;
      const txt = active
        ? `${format({ d, h, m, s })} left`
        : `${format({ d, h, m, s })} until ${this.label.includes('Reset') || this.label.includes('Vaults') ? 'reset' : 'start'}`;
      this.cnt.textContent = txt;

      this.el.classList.toggle('active', active);
    }
  }

  const timers = [
    new EventTimer('daily_reset_timer', getDailyReset, 'Daily Reset'),
    new EventTimer('wb_crusade_timer', getWorldBossCrusadePeriod, 'World Boss Crusade'),
    new EventTimer('weekly_reset_timer', getWeeklyReset, 'Weekly Reset'),
    new EventTimer('guild_hunt_timer', getGuildHuntPeriod, 'Guild Hunt'),
    new EventTimer('guild_dance_timer', getGuildDancePeriod, 'Guild Dance'),
    new EventTimer('stimen_vaults_timer', getStimenVaults, 'Stimen Vaults'),
  ];

  let updateInterval;
  function startTimerUpdates() {
    function updateAll() {
      timers.forEach(t => t.update());
    }
    updateAll();
    let isVisible = !document.hidden;
    function handleVisibility() {
      const nowVisible = !document.hidden;
      if (nowVisible !== isVisible) {
        isVisible = nowVisible;
        clearInterval(updateInterval);
        const delay = isVisible ? 1000 : 5000;
        updateInterval = setInterval(updateAll, delay);
      }
    }
    updateInterval = setInterval(updateAll, 1000);
    document.addEventListener('visibilitychange', handleVisibility);
    handleVisibility();
  }

  async function init() {
    updateTitle();
    await checkGDPR();

    renderTasks(dailyContainer, dailyTaskData, 'daily');

    resetWeeklyStorageIfNeeded();  // Add this line BEFORE rendering weeklies
    renderTasks(weeklyContainer, weeklyTaskData, 'weekly');

    setupFilter('daily');
    setupFilter('weekly');
    startTimerUpdates();
    updateCounter('daily');
    updateCounter('weekly');

    const isIncog = await isIncognito();
    window.addEventListener('beforeunload', (e) => {
      if (isIncog) {
        clearAllProgress();
        return;
      }
      if (confirm('Clear unsaved progress? (Otherwise, it will be saved automatically.)')) {
        clearAllProgress();
      }
    });
  }

  toggleDailyBtn.addEventListener('click', () => toggleCompleted('daily'));
  toggleWeeklyBtn.addEventListener('click', () => toggleCompleted('weekly'));
  btnSelectAllDaily.addEventListener('click', () => selectAll('daily'));
  btnDeselectAllDaily.addEventListener('click', () => deselectAll('daily'));
  btnSelectAllWeekly.addEventListener('click', () => selectAll('weekly'));
  btnDeselectAllWeekly.addEventListener('click', () => deselectAll('weekly'));

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

