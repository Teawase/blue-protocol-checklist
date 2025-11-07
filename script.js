(() => {
  // ========================================
  // Task Data
  // ========================================
  const dailyTaskData = [
    { id: "daily_guild_checkin", label: "Guild Check-In & Cargo (Guild Administrator & Cargo Administrator in Guild Center)", color: "orange" },
    { id: "daily_unstable_space_dungeon", label: "Clear Unstable Space Dungeon (2x Daily)", color: "purple" },
    { id: "daily_season_activity_goals", label: "Season Pass Activity (Earn 500 Activity Merits in the Season Pass)", color: "yellow" },
    { id: "daily_commissions", label: "Bureau Commissions (3x Daily | You can skip this daily for up to 2 days | Commissions Cap: 9)", color: "green" },
    { id: "daily_mystery_store", label: "Mystery Store (Buy Starforge Crystals & Advanced Books & Moss/Burl Shards if available)", color: "grey" },
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
    { id: "weekly_honor_store", label: "Honor Store (10000 Honor Points weekly)", color: "grey" },
    { id: "weekly_friendship_store", label: "Friendship Store (2000 Friendship Points weekly)", color: "grey" },
    { id: "weekly_reputation_store", label: 'Reputation Store (Buy Will Wish Coin & "Revive" Candy & Healing Aromatic Lv.1)', color: "grey" },
    { id: "weekly_guild_store", label: "Guild Store (Buy Focus Potions & Guild Supply Chests & Burl Shards)", color: "grey" },
    { id: "weekly_event_store", label: "Event Store (if its available)", color: "grey" },
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

  // ========================================
  // DOM Helpers
  // ========================================
  const $ = id => document.getElementById(id);

  // ========================================
  // Profiles System
  // ========================================
  let profiles = {
    current: "default",
    list: ["default"],
    data: { default: { weekly_tasks: {} } }
  };

  let isStorageAllowed = localStorage.getItem('gdpr_optout') !== 'true';

  const saveProfiles = () => {
    if (isStorageAllowed) {
      localStorage.setItem('checklist_profiles', JSON.stringify(profiles));
    }
  };

  const loadProfiles = () => {
    const stored = localStorage.getItem('checklist_profiles');
    if (stored) {
      profiles = JSON.parse(stored);
    } else if (localStorage.getItem('daily_tasks') || weeklyTaskData.some(t => localStorage.getItem(t.id))) {
      if (confirm('Migrate old progress to "default" profile?')) {
        const def = profiles.data.default;
        def.daily_tasks = localStorage.getItem('daily_tasks');
        def.weekly_reset_date = localStorage.getItem('weekly_reset_date');
        def.weekly_tasks = {};
        weeklyTaskData.forEach(t => {
          const v = localStorage.getItem(t.id);
          if (v) def.weekly_tasks[t.id] = v;
          localStorage.removeItem(t.id);
        });
        localStorage.removeItem('daily_tasks');
        localStorage.removeItem('weekly_reset_date');
        saveProfiles();
      }
    }
    if (!profiles.data[profiles.current]) {
      profiles.data[profiles.current] = { weekly_tasks: {} };
    }
  };

  // ========================================
  // DOM Elements
  // ========================================
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
  const gdprModal = $('gdpr-modal');
  const acceptBtn = $('accept-gdpr');
  const rejectBtn = $('reject-gdpr');
  const importExportBtn = $('importExportBtn');
  const importFile = $('importFile');
  const importExportModal = $('import-export-modal');
  const importProgressBtn = $('importProgressBtn');
  const exportProgressBtn = $('exportProgressBtn');
  const cancelImportExport = $('cancelImportExport');
  const profilesModal = $('profiles-modal');
  const profilesBtn = $('profilesBtn');
  const currentProfileNameEl = $('current-profile-name');
  const profilesListEl = $('profiles-list');
  const newProfileNameInput = $('new-profile-name');
  const createProfileBtn = $('create-profile-btn');
  const closeProfilesModal = $('close-profiles-modal');

  let hideCompletedState = { daily: true, weekly: true };

  // ========================================
  // Profiles UI
  // ========================================
  const renderProfilesList = () => {
    profilesListEl.innerHTML = '';
    profiles.list.sort().forEach(name => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = name;
      if (name === profiles.current) span.style.fontWeight = 'bold';
      li.appendChild(span);

      const switchBtn = document.createElement('button');
      switchBtn.textContent = name === profiles.current ? 'Current' : 'Switch';
      switchBtn.disabled = name === profiles.current;
      switchBtn.onclick = () => {
        profiles.current = name;
        saveProfiles();
        reloadCurrentProfileData();
        profilesModal.style.display = 'none';
      };
      li.appendChild(switchBtn);

      // Only show Delete if there are 2+ profiles
      if (profiles.list.length > 1) {
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => {
          // Never allow deleting the very last profile
          if (profiles.list.length === 1) {
            alert('You cannot delete your only profile!');
            return;
          }
          if (confirm(`Delete "${name}" and all its progress? This cannot be undone.`)) {
            delete profiles.data[name];
            profiles.list = profiles.list.filter(n => n !== name);
            if (profiles.current === name) {
              profiles.current = profiles.list[0] || 'default';
            }
            saveProfiles();
            renderProfilesList();
            reloadCurrentProfileData();
          }
        };
        li.appendChild(delBtn);
      }

      profilesListEl.appendChild(li);
    });
  };

  profilesBtn.onclick = () => {
    currentProfileNameEl.textContent = profiles.current;
    renderProfilesList();
    profilesModal.style.display = 'flex';
  };

  closeProfilesModal.onclick = () => profilesModal.style.display = 'none';

  createProfileBtn.onclick = () => {
    const name = newProfileNameInput.value.trim();
    if (!name) return alert('Enter name');
    if (profiles.list.includes(name)) return alert('Exists');
    profiles.list.push(name);
    profiles.data[name] = { weekly_tasks: {} };
    profiles.current = name;
    saveProfiles();
    newProfileNameInput.value = '';
    renderProfilesList();
    reloadCurrentProfileData();
  };

  // ========================================
  // Profile Storage
  // ========================================
  const getProfileData = () => profiles.data[profiles.current];

  const getCurrentDailyDate = (now = parseNoronha()) => {
    const nextReset = getDailyReset(now);
    const dailyStart = new Date(nextReset.getTime() - 86400000);
    return dailyStart.toISOString().split('T')[0];
  };

  const getCurrentWeeklyDate = (now = parseNoronha()) => getWeeklyReset(now).toISOString().split('T')[0];

  const getDailyStorage = () => {
    const pd = getProfileData();
    const date = getCurrentDailyDate();
    let stored = pd.daily_tasks ? JSON.parse(pd.daily_tasks) : { date: null, tasks: {}, currentCompleted: 0 };
    if (stored.date !== date) {
      stored = { date, tasks: {}, currentCompleted: 0 };
      pd.daily_tasks = JSON.stringify(stored);
      saveProfiles();
    }
    return stored;
  };

  const updateDailyStorage = (id, completed) => {
    if (!isStorageAllowed) return;
    const stored = getDailyStorage();
    const was = !!stored.tasks[id];
    if (was !== completed) {
      completed ? stored.tasks[id] = true : delete stored.tasks[id];
      stored.currentCompleted = Object.keys(stored.tasks).length;
      getProfileData().daily_tasks = JSON.stringify(stored);
      saveProfiles();
    }
  };

  const resetWeeklyStorageIfNeeded = () => {
    if (!isStorageAllowed) return;
    const date = getCurrentWeeklyDate();
    const pd = getProfileData();
    pd.weekly_tasks ||= {};
    if (pd.weekly_reset_date !== date) {
      pd.weekly_tasks = {};
      pd.weekly_reset_date = date;
      saveProfiles();
      if (pd.weekly_reset_date) setTimeout(() => alert('Weekly reset!'), 500);
    }
  };

  // ========================================
  // Task Rendering
  // ========================================
  const createTaskElement = (task, section) => {
    const div = document.createElement('div');
    div.className = `task ${task.color}`;
    div.tabIndex = 0;
    div.dataset.id = task.id;
    div.innerHTML = `<label>${task.label}</label>`;

    if (section === 'daily') {
      getDailyStorage().tasks[task.id] && div.classList.add('completed');
    } else {
      getProfileData().weekly_tasks[task.id] === 'true' && div.classList.add('completed');
    }

    div.onclick = () => toggleTask(div, section);
    div.onkeydown = e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggleTask(div, section));
    return div;
  };

  const toggleTask = (el, section) => {
    const completed = el.classList.toggle('completed');
    const id = el.dataset.id;

    if (section === 'weekly') {
      const pd = getProfileData();
      pd.weekly_tasks[id] = completed ? 'true' : undefined;
      if (!completed) delete pd.weekly_tasks[id];
      saveProfiles();
    } else {
      updateDailyStorage(id, completed);
    }

    updateCounter(section);
    applyCompletedFilter(section);
  };

  const renderTasks = (container, data, section) => {
    container.innerHTML = '';
    data.forEach(t => container.appendChild(createTaskElement(t, section)));
    updateCounter(section);
  };

  const reloadCurrentProfileData = () => {
    resetWeeklyStorageIfNeeded();
    renderTasks(dailyContainer, dailyTaskData, 'daily');
    renderTasks(weeklyContainer, weeklyTaskData, 'weekly');
    updateCounter('daily');
    updateCounter('weekly');
    applyCompletedFilter('daily');
    applyCompletedFilter('weekly');
    dailyFilterInput.value = weeklyFilterInput.value = '';
  };

  // ========================================
  // Counters & Progress
  // ========================================
  const updateCounter = section => {
    const container = section === 'daily' ? dailyContainer : weeklyContainer;
    const counter = section === 'daily' ? dailyCounter : weeklyCounter;
    const progress = section === 'daily' ? dailyProgress : weeklyProgress;
    const bar = section === 'daily' ? dailyProgressBar : weeklyProgressBar;
    const msg = section === 'daily' ? dailyCompletionMsg : weeklyCompletionMsg;

    const done = container.querySelectorAll('.task.completed').length;
    const total = container.querySelectorAll('.task').length;
    const pct = total ? done / total * 100 : 0;

    counter.textContent = `${done} / ${total} complete`;
    counter.classList.add('animate');
    setTimeout(() => counter.classList.remove('animate'), 800);

    progress.style.width = `${pct}%`;
    progress.textContent = `${pct.toFixed(0)}%`;
    bar.dataset.tooltip = `${done}/${total} (${pct.toFixed(1)}%)`;

    const lerp = (a, b, t) => a + (b - a) * t;
    const blue = [80, 106, 255], gold = [255, 184, 0];
    const rgb = blue.map((v, i) => Math.round(lerp(v, gold[i], pct / 100)));
    progress.style.background = `linear-gradient(90deg, rgb(${rgb}), rgb(${rgb}))`;

    if (done === total && total) {
      msg.style.display = 'block';
      if (!progress.dataset.confettiDone) {
        progress.dataset.confettiDone = 'true';
        confetti({ particleCount: 500, spread: 360, origin: { x: 0.5, y: -0.5 } });
      }
    } else {
      msg.style.display = 'none';
      progress.dataset.confettiDone = '';
    }
  };

  // ========================================
  // Filters & Select All
  // ========================================
  const applyCompletedFilter = section => {
    const container = section === 'daily' ? dailyContainer : weeklyContainer;
    const input = section === 'daily' ? dailyFilterInput : weeklyFilterInput;
    const hide = hideCompletedState[section];
    const text = input.value.toLowerCase();

    container.querySelectorAll('.task').forEach(t => {
      const match = t.textContent.toLowerCase().includes(text);
      const completed = t.classList.contains('completed');
      t.style.display = match && (!completed || !hide) ? '' : 'none';
    });
  };

  const selectAll = section => {
    const container = section === 'daily' ? dailyContainer : weeklyContainer;
    container.querySelectorAll('.task').forEach(t => {
      t.classList.add('completed');
      const id = t.dataset.id;
      if (section === 'weekly') getProfileData().weekly_tasks[id] = 'true';
      else updateDailyStorage(id, true);
    });
    saveProfiles();
    updateCounter(section);
    applyCompletedFilter(section);
  };

  const deselectAll = section => {
    const container = section === 'daily' ? dailyContainer : weeklyContainer;
    container.querySelectorAll('.task').forEach(t => {
      t.classList.remove('completed');
      const id = t.dataset.id;
      if (section === 'weekly') delete getProfileData().weekly_tasks[id];
      else updateDailyStorage(id, false);
    });
    saveProfiles();
    updateCounter(section);
    applyCompletedFilter(section);
  };

  // ========================================
  // Import/Export
  // ========================================
  const exportProgress = () => {
    if (!isStorageAllowed) return alert('Storage disabled');
    const pd = getProfileData();
    const data = {
      profile: profiles.current,
      daily_tasks: pd.daily_tasks || null,
      weekly_reset_date: pd.weekly_reset_date || null,
      weekly_tasks: pd.weekly_tasks || {}
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bp_${profiles.current}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const imp = JSON.parse(ev.target.result);
        const pd = getProfileData();
        pd.daily_tasks = imp.daily_tasks || null;
        pd.weekly_reset_date = imp.weekly_reset_date || null;
        pd.weekly_tasks = imp.weekly_tasks || {};
        saveProfiles();
        reloadCurrentProfileData();
        alert('Imported!');
      } catch {
        alert('Invalid file');
      }
    };
    reader.readAsText(file);
  };

  // ========================================
  // Day Counter
  // ========================================
  const updateTitle = () => {
  const launch = new Date('2025-10-09T05:00:00-02:00');
  const now = new Date();
  const day = Math.floor((now - launch) / 86400000) + 1;
     $('page-title').textContent = `Blue Protocol: Star Resonance Checklist (Day #${day})`;
};

  // ========================================
  // Timer Functions
  // ========================================
  const parseNoronha = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Noronha' }));
  const diffSec = (future, now = parseNoronha()) => Math.max(0, Math.floor((future - now) / 1000));
  const format = o => `${o.d ? o.d + 'd ' : ''}${o.h || o.d ? o.h + 'h ' : ''}${o.m || o.h || o.d ? o.m + 'm ' : ''}${o.s}s`;

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
    const days = [5, 6, 0]; // Fri, Sat, Sun
    for (const day of days) {
      const start = cloneSet(now, day, 14, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      end.setHours(4, 0, 0, 0);
      if (now >= start && now < end) return { start, end };
    }
    const next = days.map(d => cloneSet(now, d, 14, 0))
      .map(dt => (dt <= now ? new Date(dt.getTime() + 7 * 864e5) : dt))
      .sort((a, b) => a - b)[0];
    const end = new Date(next);
    end.setDate(end.getDate() + 1);
    end.setHours(4, 0, 0, 0);
    return { start: next, end };
  };

  const getGuildDancePeriod = now => {
    const start = cloneSet(now, 5, 15, 30); // Friday
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
      this.cnt = this.el.querySelector('.countdown');
    }
    update(now = parseNoronha()) {
      let period;
      try { period = this.getPeriod(now); } catch { this.cnt.textContent = 'Error'; return; }
      const { start, end } = period.start === undefined ? { start: null, end: period } : period;
      const target = now >= start && now < end ? end : start || end;
      const diff = diffSec(target, now);
      const d = Math.floor(diff / 86400);
      const h = Math.floor(diff % 86400 / 3600);
      const m = Math.floor(diff % 3600 / 60);
      const s = diff % 60;
      const active = now >= start && now < end;
      this.cnt.textContent = active
        ? `${format({ d, h, m, s })} left`
        : `${format({ d, h, m, s })} until ${this.label.includes('Reset') || this.label.includes('Vaults') ? 'reset' : 'start'}`;
      this.el.classList.toggle('active', active);
    }
  }

  const timers = [
    new EventTimer('daily_reset_timer', getDailyReset, 'Daily Reset'),
    new EventTimer('wb_crusade_timer', getWorldBossCrusadePeriod, 'World Boss Crusade'),
    new EventTimer('weekly_reset_timer', getWeeklyReset, 'Weekly Reset'),
    new EventTimer('guild_hunt_timer', getGuildHuntPeriod, 'Guild Hunt'),
    new EventTimer('guild_dance_timer', getGuildDancePeriod, 'Guild Dance'),
    new EventTimer('stimen_vaults_timer', getStimenVaults, 'Stimen Vaults')
  ];

  const startTimerUpdates = () => {
    const updateAll = () => timers.forEach(t => t.update());
    updateAll();
    setInterval(updateAll, 1000);
  };

  // ========================================
  // GDPR
  // ========================================
  const checkGDPR = async () => {
    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      if (data.continent_code === 'EU' && !localStorage.getItem('gdpr_consent')) {
        gdprModal.style.display = 'flex';
      }
    } catch {}
  };

  acceptBtn.onclick = () => {
    localStorage.setItem('gdpr_consent', 'true');
    isStorageAllowed = true;
    gdprModal.style.display = 'none';
  };

  rejectBtn.onclick = () => {
    localStorage.setItem('gdpr_optout', 'true');
    localStorage.clear();
    isStorageAllowed = false;
    gdprModal.style.display = 'none';
    setTimeout(() => {
      document.body.innerHTML = `
        <div style="position:fixed;inset:0;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:sans-serif;text-align:center;z-index:9999">
          <h1>Session Closed</h1>
          <p>Privacy opt-out. Enable localStorage to use.</p>
          <button onclick="window.close()" style="margin-top:20px;padding:10px 20px;background:#506aff;color:#fff;border:none;border-radius:5px;cursor:pointer">Close Tab</button>
        </div>`;
    }, 100);
  };

  // ========================================
  // Init
  // ========================================
  const init = async () => {
    updateTitle();
    await checkGDPR();
    loadProfiles();
    reloadCurrentProfileData();
    startTimerUpdates();

    importExportBtn.onclick = () => importExportModal.style.display = 'flex';
    importProgressBtn.onclick = () => { importExportModal.style.display = 'none'; importFile.click(); };
    exportProgressBtn.onclick = () => { importExportModal.style.display = 'none'; exportProgress(); };
    cancelImportExport.onclick = () => importExportModal.style.display = 'none';
    importFile.onchange = handleImport;

    toggleDailyBtn.onclick = () => {
      hideCompletedState.daily = !hideCompletedState.daily;
      toggleDailyBtn.textContent = hideCompletedState.daily ? 'Show Completed' : 'Hide Completed';
      applyCompletedFilter('daily');
    };

    toggleWeeklyBtn.onclick = () => {
      hideCompletedState.weekly = !hideCompletedState.weekly;
      toggleWeeklyBtn.textContent = hideCompletedState.weekly ? 'Show Completed' : 'Hide Completed';
      applyCompletedFilter('weekly');
    };

    btnSelectAllDaily.onclick = () => selectAll('daily');
    btnDeselectAllDaily.onclick = () => deselectAll('daily');
    btnSelectAllWeekly.onclick = () => selectAll('weekly');
    btnDeselectAllWeekly.onclick = () => deselectAll('weekly');

    dailyFilterInput.oninput = weeklyFilterInput.oninput = () => {
      applyCompletedFilter('daily');
      applyCompletedFilter('weekly');
    };
  };

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
