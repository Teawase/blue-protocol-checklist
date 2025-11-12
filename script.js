(() => {
  // Daily Tasks
  const dailyTaskData = [
    { id: "daily_mystery_store", label: "Mystery Store (Starforge Crystals, Advanced Books & Moss/Burl Shards)", color: "grey", maxProgress: 1 },
    { id: "daily_guild_checkin", label: "Guild Check-In & Cargo (Guild & Cargo Administrators in Guild Center)", color: "orange", maxProgress: 1 },
    { id: "daily_unstable_space_dungeon", label: "Clear Unstable Space Dungeon", color: "purple", maxProgress: 2 },
    { id: "daily_commissions", label: "Bureau Commissions | Can skip up to 2 days", color: "green", maxProgress: 3 },
    { id: "daily_homestead_commissions", label: "Homestead Commissions | Can skip up to 2 days", color: "green", maxProgress: 3 },
    { id: "daily_world_boss_keys", label: "World Boss Keys | Can skip up to 2 days", color: "brown", maxProgress: 2 },
    { id: "daily_elite_boss_keys", label: "Elite Boss Keys | Can skip up to 2 days", color: "brown", maxProgress: 2 },
    { id: "daily_focus", label: "Life Skill Focus | Can skip up to 4 days", color: "yellow", maxProgress: 1 },
    { id: "daily_season_activity_goals", label: "Season Pass Activity (Earn 500 Activity Merits)", color: "yellow", maxProgress: 1 }
  ];

  // Weekly Tasks
  const weeklyTaskData = [
    { id: "weekly_pioneer_rewards", label: "Pioneer Awards (Pioneer NPC in town)", color: "yellow", maxProgress: 1 },
    { id: "weekly_reclaim_hub", label: "Reclaim Hub (If you missed a Daily/Weekly)", color: "grey", maxProgress: 1 },
    { id: "weekly_guild_activity_rewards", label: "Guild Activity Rewards (Reach 7000/7000 Points)", color: "orange", maxProgress: 1 },
    { id: "weekly_guild_hunt_extended", label: "Guild Hunt (Available on Fridays, Saturdays, Sundays)", color: "orange", maxProgress: 3 },
    { id: "weekly_guild_dance", label: "Guild Dance (Available on Friday)", color: "orange", maxProgress: 1 },
    { id: "weekly_world_boss_crusade_points", label: "World Boss Crusade (Earn 1200 Points)", color: "brown", maxProgress: 1 },
    { id: "weekly_clear_dungeons_normal", label: "Dungeons (Normal/Hard) | Clear for Reforge Stones", color: "purple", maxProgress: 20 },
    { id: "weekly_clear_dungeons_master_1_5", label: "Dungeonss (Master 1-5) | Clear for Reforge Stones", color: "purple", maxProgress: 20 },
    { id: "weekly_clear_dungeons_master_6_20", label: "Dungeons (Master 6-20) | Clear for Reforge Stones | Available: 24th Nov.", color: "purple", maxProgress: 20 },
    { id: "weekly_fight_bane_lord", label: "Fight the Bane Lord (Random Dungeon Encounter)", color: "brown", maxProgress: 5 },
    { id: "weekly_gear_exchange_store", label: "Gear Exchange Stores (Buy Luno Pouches, Alloy Shards & Reforge Stones)", color: "grey", maxProgress: 1 },
    { id: "weekly_honor_store", label: "Honor Store (Earn 10000 Honor Points)", color: "grey", maxProgress: 1 },
    { id: "weekly_friendship_store", label: "Friendship Store (Earn 2000 Friendship Points)", color: "grey", maxProgress: 1 },
    { id: "weekly_reputation_store", label: 'Reputation Store (Buy Will Wish Coin, "Revive" Candy & Healing Aromatic Lv.1)', color: "grey", maxProgress: 1 },
    { id: "weekly_guild_store", label: "Guild Store (Buy Focus Potions, Supply Chests & Burl Shards)", color: "grey", maxProgress: 1 },
    { id: "weekly_event_store", label: "Event Store (If available)", color: "grey", maxProgress: 1 },
    { id: "weekly_life_skill_quests", label: "Life Skill Exchange Quests", color: "green", maxProgress: 12 },
    { id: "weekly_stimen_vaults", label: "Stimen Vaults (Resets every 2 weeks) | Check Timer", color: "pearl", maxProgress: 1 },
    { id: "weekly_ice_dragon_normal", label: "Ice Dragon Raid - Easy (12710+ Ability Score)", color: "blue", maxProgress: 1 },
    { id: "weekly_ice_dragon_hard", label: "Ice Dragon Raid - Hard (16140+ Ability Score)", color: "blue", maxProgress: 1 },
    { id: "weekly_ice_dragon_nightmare", label: "Ice Dragon Raid - Nightmare (22300+ Ability Score) | Available: 24th Nov. 2025", color: "blue", maxProgress: 1 },
    { id: "weekly_dark_dragon_normal", label: "Bone Dragon Raid - Easy (15210+ Ability Score)", color: "dark_purple", maxProgress: 1 },
    { id: "weekly_dark_dragon_hard", label: "Bone Dragon Raid - Hard (19040+ Ability Score)", color: "dark_purple", maxProgress: 1 },
    { id: "weekly_dark_dragon_nightmare", label: "Bone Dragon Raid - Nightmare (24180+ Ability Score) | Available: 24th Nov. 2025", color: "dark_purple", maxProgress: 1 },
    { id: "weekly_light_dragon_normal", label: "Light Dragon Raid - Easy (16140+ Ability Score)", color: "gold", maxProgress: 1 },
    { id: "weekly_light_dragon_hard", label: "Light Dragon Raid - Hard (20670+ Ability Score)", color: "gold", maxProgress: 1 },
    { id: "weekly_light_dragon_nightmare", label: "Light Dragon Raid - Nightmare (27790+ Ability Score) | Available: 24th Nov. 2025", color: "gold", maxProgress: 1 }
  ];

  // DOM Helpers
  const $ = id => document.getElementById(id);

  // Profiles System
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

        const dailyStr = localStorage.getItem('daily_tasks');
        if (dailyStr) {
          const dailyOld = JSON.parse(dailyStr);
          const newDaily = { tasks: {} };
          dailyTaskData.forEach(t => {
            if (dailyOld.tasks && dailyOld.tasks[t.id]) {
              newDaily.tasks[t.id] = t.maxProgress || 1;
            }
          });
          newDaily.date = getCurrentDailyDate();
          def.daily_tasks = JSON.stringify(newDaily);
        }

        def.weekly_tasks = {};
        weeklyTaskData.forEach(t => {
          const v = localStorage.getItem(t.id);
          if (v === 'true') {
            def.weekly_tasks[t.id] = t.maxProgress || 1;
          }
        });
        def.weekly_reset_date = localStorage.getItem('weekly_reset_date');

        localStorage.removeItem('daily_tasks');
        localStorage.removeItem('weekly_reset_date');
        weeklyTaskData.forEach(t => localStorage.removeItem(t.id));
        saveProfiles();
      }
    }
    if (!profiles.data[profiles.current]) {
      profiles.data[profiles.current] = { weekly_tasks: {} };
    }
  };

  // DOM Elements
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

  // Incremental Progress on hold
  const HOLD_INTERVAL_MS = 250
  let holdInterval = null;

  const startHoldIncrement = (el, section) => {
    if (holdInterval) clearInterval(holdInterval);
    holdInterval = setInterval(() => {
      toggleTask(el, section, true);
    }, HOLD_INTERVAL_MS);
  };

  const stopHoldIncrement = () => {
    if (holdInterval) {
      clearInterval(holdInterval);
      holdInterval = null;
    }
  };

  const startHoldDecrement = (el, section) => {
    if (holdInterval) clearInterval(holdInterval);
    holdInterval = setInterval(() => {
      decrementTask(el, section);
    }, HOLD_INTERVAL_MS);
  };

  const stopHoldDecrement = () => {
    if (holdInterval) {
      clearInterval(holdInterval);
      holdInterval = null;
    }
  };

  // Profiles UI
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

  // Profiles Storage
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
    let stored = pd.daily_tasks ? JSON.parse(pd.daily_tasks) : { date: null, tasks: {} };
    if (stored.date !== date) {
      stored = { date, tasks: {} };
      pd.daily_tasks = JSON.stringify(stored);
      saveProfiles();
    }
    return stored;
  };

  const getCount = (id, section) => {
    if (section === 'daily') {
      const stored = getDailyStorage();
      return Number(stored.tasks[id] || 0);
    } else {
      return Number(getProfileData().weekly_tasks[id] || 0);
    }
  };

  const setDailyCount = (id, count) => {
    if (!isStorageAllowed) return;
    const stored = getDailyStorage();
    if (count === 0) {
      delete stored.tasks[id];
    } else {
      stored.tasks[id] = count;
    }
    getProfileData().daily_tasks = JSON.stringify(stored);
    saveProfiles();
  };

  const setWeeklyCount = (id, count) => {
    if (!isStorageAllowed) return;
    const pd = getProfileData();
    pd.weekly_tasks ||= {};
    if (count === 0) {
      delete pd.weekly_tasks[id];
    } else {
      pd.weekly_tasks[id] = count;
    }
    saveProfiles();
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

  // Task Rendering
  const updateTaskUI = (el, count, max) => {
    const completed = count === max;
    el.classList.toggle('completed', completed);
    const badge = el.querySelector('.progress-badge');
    if (max > 1) {
      if (!badge) {
        const span = document.createElement('span');
        span.className = 'progress-badge';
        el.querySelector('label').appendChild(span);
        badge = span;
      }
      badge.textContent = `${count}/${max}`;
    } else {
      if (badge) badge.remove();
    }
  };

  const createTaskElement = (task, section) => {
    const div = document.createElement('div');
    div.className = `task ${task.color}`;
    div.tabIndex = 0;
    div.dataset.id = task.id;

    const max = task.maxProgress || 1;
    const current = getCount(task.id, section);
    const completed = current === max;

    let innerHTML = `<label>${task.label}`;
    if (max > 1) {
      innerHTML += ` <span class="progress-badge">${current}/${max}</span>`;
    }
    innerHTML += '</label>';

    div.innerHTML = innerHTML;
    div.classList.toggle('completed', completed);

    // Hold shift and click for decrement
    let isPressed = false;
    let holdTimeout = null;
    let holdStarted = false;
    let holdMode = 'increment';

    const updateHoldMode = (e) => {
      holdMode = e.shiftKey ? 'decrement' : 'increment';
    };

    const handlePressStart = (e) => {
      e.preventDefault();
      updateHoldMode(e);
      isPressed = true;
      holdTimeout = setTimeout(() => {
        if (isPressed) {
          holdStarted = true;
          if (holdMode === 'decrement') {
            decrementTask(div, section);
            startHoldDecrement(div, section);
          } else {
            toggleTask(div, section, true);
            startHoldIncrement(div, section);
          }
          if (e.pointerId !== undefined) {
            e.currentTarget.setPointerCapture(e.pointerId);
          }
        }
      }, 300);  // Delay to distinguish quick tap from hold
    };

    const handlePressEnd = (e) => {
      e.preventDefault();
      updateHoldMode(e);
      isPressed = false;
      clearTimeout(holdTimeout);
      stopHoldIncrement();
      stopHoldDecrement(); 
      if (!holdStarted) {
        // Quick tap: decrement if shift, else increment
        if (holdMode === 'decrement') {
          decrementTask(div, section);
        } else {
          toggleTask(div, section);
        }
      }
      holdStarted = false;
    };

    const handlePressCancel = (e) => {
      e.preventDefault();
      isPressed = false;
      clearTimeout(holdTimeout);
      stopHoldIncrement();
      stopHoldDecrement();
      holdStarted = false;
    };

    // Global shift listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Shift') {
        updateHoldMode({ shiftKey: true });
      }
    });
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Shift') {
        updateHoldMode({ shiftKey: false });
      }
    });

    div.onmousedown = handlePressStart;
    div.onmouseup = handlePressEnd;
    div.onmouseleave = handlePressCancel;
    div.ontouchstart = handlePressStart;
    div.ontouchend = handlePressEnd;
    div.ontouchcancel = handlePressCancel;

    // Keyboard events
    div.onkeydown = e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTask(div, section);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (div.previousElementSibling) div.previousElementSibling.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (div.nextElementSibling) div.nextElementSibling.focus();
      }
    };

    return div;
  };

  const toggleTask = (el, section, isHold = false) => {
    const id = el.dataset.id;
    const taskData = section === 'daily' ? dailyTaskData : weeklyTaskData;
    const task = taskData.find(t => t.id === id);
    const max = task.maxProgress || 1;
    let current = getCount(id, section);
    let newCount;
    if (current < max) {
      if (isHold && max > 1 && current >= max - 1) {
        return;
      }
      newCount = current + 1;
    } else {
      if (isHold) {
        return;
      }
      newCount = 0;
    }

    if (section === 'daily') {
      setDailyCount(id, newCount);
    } else {
      setWeeklyCount(id, newCount);
    }

    updateTaskUI(el, newCount, max);
    updateCounter(section);
    applyCompletedFilter(section);
  };

  const decrementTask = (el, section) => {
    const id = el.dataset.id;
    const taskData = section === 'daily' ? dailyTaskData : weeklyTaskData;
    const task = taskData.find(t => t.id === id);
    const max = task.maxProgress || 1;
    let current = getCount(id, section);
    if (current > 0) {
      const newCount = current - 1;
      if (section === 'daily') {
        setDailyCount(id, newCount);
      } else {
        setWeeklyCount(id, newCount);
      }
      updateTaskUI(el, newCount, max);
      updateCounter(section);
      applyCompletedFilter(section);
    }
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

  // Counters & Progress
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

  // Filters & Select All
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
    const data = section === 'daily' ? dailyTaskData : weeklyTaskData;
    const container = section === 'daily' ? dailyContainer : weeklyContainer;
    container.querySelectorAll('.task').forEach(t => {
      const id = t.dataset.id;
      const task = data.find(tt => tt.id === id);
      const max = task.maxProgress || 1;
      if (section === 'daily') {
        setDailyCount(id, max);
      } else {
        setWeeklyCount(id, max);
      }
      updateTaskUI(t, max, max);
    });
    updateCounter(section);
    applyCompletedFilter(section);
  };

  const deselectAll = section => {
    const data = section === 'daily' ? dailyTaskData : weeklyTaskData;
    const container = section === 'daily' ? dailyContainer : weeklyContainer;
    container.querySelectorAll('.task').forEach(t => {
      const id = t.dataset.id;
      const task = data.find(tt => tt.id === id);
      const max = task.maxProgress || 1;
      if (section === 'daily') {
        setDailyCount(id, 0);
      } else {
        setWeeklyCount(id, 0);
      }
      updateTaskUI(t, 0, max);
    });
    updateCounter(section);
    applyCompletedFilter(section);
  };

  // Import/Export
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

  // Day Counter
  const updateTitle = () => {
    const launch = new Date('2025-10-09T05:00:00-02:00');
    const now = new Date();
    const day = Math.floor((now - launch) / 86400000) + 1;
    $('page-title').textContent = `Blue Protocol: Star Resonance Checklist (Day #${day})`;
  };

  // Timer Functions
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

  // GDPR
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

  // Init
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
