(() => {
  // --- Main Tasks Data ---
  const dailyTaskData = [
    { id: "daily_mystery_store", label: "🎁 Mystery Store (Starforge Crystals, Advanced Books & Moss/Burl Shards)", color: "grey", maxProgress: 1 },
    { id: "daily_guild_checkin", label: "🏛️ Guild Check-In & Cargo (Guild & Cargo Administrators in Guild Center)", color: "orange", maxProgress: 1 },
    { id: "daily_unstable_space_dungeon", label: "🌀 Unstable Space Dungeon | Clear", color: "purple", maxProgress: 2 },
    { id: "daily_commissions", label: "📋 Bureau Commissions | Can skip up to 2 days", color: "green", maxProgress: 3 },
    { id: "daily_homestead_commissions", label: "🏡 Homestead Commissions | Can skip up to 2 days", color: "green", maxProgress: 3 },
    { id: "daily_world_boss_keys", label: "🔑 World Boss Keys | Can skip up to 2 days", color: "brown", maxProgress: 2 },
    { id: "daily_elite_boss_keys", label: "🗝️ Elite Boss Keys | Can skip up to 2 days", color: "brown", maxProgress: 2 },
    { id: "daily_focus", label: "⭐ Life Skill Focus | Can skip up to 4 days", color: "yellow", maxProgress: 1 },
    { id: "daily_season_activity_goals", label: "🏆 Season Pass Activity (Earn 500 Activity Merits)", color: "yellow", maxProgress: 1 }
  ];

  const weeklyTaskData = [
    { id: "weekly_pioneer_rewards", label: "🏅 Pioneer Awards (Pioneer NPC in town)", color: "yellow", maxProgress: 1 },
    { id: "weekly_reclaim_hub", label: "⏰ Reclaim Hub (If you missed something last week)", color: "grey", maxProgress: 1 },
    { id: "weekly_guild_activity_rewards", label: "👑 Guild Activity Rewards (Reach 7000/7000 Points)", color: "orange", maxProgress: 1 },
    { id: "weekly_guild_hunt_extended", label: "🏹 Guild Hunt (-Friday- | -Saturday- | -Sunday-)", color: "orange", maxProgress: 3 },
    { id: "weekly_guild_dance", label: "💃 Guild Dance (-Friday-)", color: "orange", maxProgress: 1 },
    { id: "weekly_world_boss_crusade_points", label: "⚔️ World Boss Crusade (Earn 1200 Points)", color: "brown", maxProgress: 3 },
    { id: "weekly_clear_dungeons_normal", label: "🗡️ Dungeons (Normal/Hard) | Clear for lv. 40 Reforge Stones", color: "purple", maxProgress: 20 },
    { id: "weekly_clear_dungeons_master_1_5", label: "🗡️ Dungeons (Master 1-5) | Clear for lv. 60 Reforge Stones", color: "purple", maxProgress: 20 },
    { id: "weekly_clear_dungeons_master_6_20", label: "🗡️ Dungeons (Master 6-20) | Clear for lv. 80 Reforge Stones", color: "purple", maxProgress: 20 },
    { id: "weekly_fight_bane_lord", label: "😈 Fight the Bane Lord | -Random Dungeon Encounter-", color: "brown", maxProgress: 5 },
    { id: "weekly_gear_exchange_store", label: "🔄 Gear Exchange Stores (Luno Pouches, Alloy Shards & Reforge Stones)", color: "grey", maxProgress: 1 },
    { id: "weekly_honor_store", label: "⚜️ Honor Store (Spend 10000 Honor Points)", color: "grey", maxProgress: 1 },
    { id: "weekly_friendship_store", label: "🤝 Friendship Store (Earn 2000 Friendship Points)", color: "grey", maxProgress: 1 },
    { id: "weekly_reputation_store", label: '📈 Reputation Store (Will Wish Coin, "Revive" Candy and/or Healing Aromatics)', color: "grey", maxProgress: 1 },
    { id: "weekly_guild_store", label: "🔰 Guild Store (Focus Potions, Supply Chests & Burl Shards)", color: "grey", maxProgress: 1 },
    { id: "weekly_event_store", label: "🎉 Event Store (If available)", color: "grey", maxProgress: 1 },
    { id: "weekly_life_skill_quests", label: "🌾 Life Skill Exchange Quests", color: "green", maxProgress: 12 },
    { id: "weekly_stimen_vaults", label: "💎 Stimen Vaults (Resets every 2 weeks) > Check Timer ^", color: "pearl", maxProgress: 1 },
    { id: "weekly_ice_dragon_normal", label: "❄️ Ice Dragon Raid - Easy (12710+ Ability Score)", color: "blue", maxProgress: 1 },
    { id: "weekly_ice_dragon_hard", label: "❄️ Ice Dragon Raid - Hard (16140+ Ability Score)", color: "blue", maxProgress: 1 },
    { id: "weekly_ice_dragon_nightmare", label: "❄️ Ice Dragon Raid - Nightmare (22300+ Ability Score)", color: "blue", maxProgress: 1 },
    { id: "weekly_dark_dragon_normal", label: "🦴 Bone Dragon Raid - Easy (15210+ Ability Score)", color: "dark_purple", maxProgress: 1 },
    { id: "weekly_dark_dragon_hard", label: "🦴 Bone Dragon Raid - Hard (19040+ Ability Score)", color: "dark_purple", maxProgress: 1 },
    { id: "weekly_dark_dragon_nightmare", label: "🦴 Bone Dragon Raid - Nightmare (24180+ Ability Score)", color: "dark_purple", maxProgress: 1 },
    { id: "weekly_light_dragon_normal", label: "✨ Light Dragon Raid - Easy (16140+ Ability Score)", color: "gold", maxProgress: 1 },
    { id: "weekly_light_dragon_hard", label: "✨ Light Dragon Raid - Hard (20670+ Ability Score)", color: "gold", maxProgress: 1 },
    { id: "weekly_light_dragon_nightmare", label: "✨ Light Dragon Raid - Nightmare (27790+ Ability Score)", color: "gold", maxProgress: 1 }
  ];

  const HOLD_INTERVAL_MS = 150;
  const MAX_CATEGORIES = 10;
  const MAX_TASKS_PER_CATEGORY = 20;

  // --- Utility ---
  const $ = id => document.getElementById(id);

  const diffSec = (future, now = parseNoronha()) => Math.max(0, Math.floor((future - now) / 1000));
  const format = o => `${o.d?o.d+'d ':''}${o.h||o.d?o.h+'h ':''}${o.m||o.h||o.d?o.m+'m ':''}${o.s}s`;

  const cloneSet = (base, day, h, m) => {
    const d = new Date(base); d.setHours(0,0,0,0);
    while (d.getDay() !== day) d.setDate(d.getDate() + 1);
    d.setHours(h,m,0,0); return d;
  };

  const getDailyReset = (now = new Date()) => {
    const r = new Date(now);
    r.setUTCHours(getDailyResetHour(), 0, 0, 0);
    return now >= r ? new Date(r.getTime() + 86400000) : r;
  };
  
  const getWeeklyReset = (now = new Date()) => {
    const r = new Date(now);
    r.setUTCHours(getWeeklyResetHour(), 0, 0, 0);
    const currentDay = r.getUTCDay();
    const targetDay = getWeeklyResetDay();
    let diff = (targetDay - currentDay + 7) % 7;
    if (diff === 0 && now.getUTCHours() >= getWeeklyResetHour()) diff = 7;
    r.setUTCDate(r.getUTCDate() + diff);
    return r;
  };
  
  const getStimenVaults = now => { let r = new Date('2025-11-03T02:00:00'); while (r < now) r.setDate(r.getDate()+14); return r; };

  const getGuildHuntPeriod = now => {
    const days = [5,6,0];
    for (const day of days) {
      const start = cloneSet(now, day, 14, 0);
      const end = new Date(start); end.setDate(end.getDate()+1); end.setHours(4,0,0,0);
      if (now >= start && now < end) return { start, end };
    }
    const next = days.map(d => cloneSet(now, d, 14, 0)).map(dt => (dt <= now ? new Date(dt.getTime()+7*864e5) : dt)).sort((a,b)=>a-b)[0];
    const end = new Date(next); end.setDate(end.getDate()+1); end.setHours(4,0,0,0);
    return { start: next, end };
  };

  const getGuildDancePeriod = now => {
    const start = cloneSet(now, 5, 15, 30);
    const end = new Date(start); end.setDate(end.getDate()+1); end.setHours(3,30,0,0);
    if (now >= start && now < end) return { start, end };
    const next = new Date(start.getTime() + (start <= now ? 7*864e5 : 0));
    const nextEnd = new Date(next); nextEnd.setDate(nextEnd.getDate()+1); nextEnd.setHours(3,30,0,0);
    return { start: next, end: nextEnd };
  };

  const getWorldBossCrusadePeriod = now => {
    const start = new Date(now); start.setHours(16,0,0,0);
    const end = new Date(now); end.setHours(22,0,0,0);
    if (now >= start && now < end) return { start, end };
    if (now < start) return { start, end };
    start.setDate(start.getDate()+1); end.setDate(end.getDate()+1); return { start, end };
  };

  const getCurrentDailyDate = () => {
    const nextReset = getDailyReset();
    const dailyStart = new Date(nextReset.getTime() - 86400000);
    return dailyStart.toISOString().split('T')[0];
  };

  const getCurrentWeeklyDate = () => getWeeklyReset().toISOString().split('T')[0];
  
  const scrollModalIntoView = (modalElement) => {
  setTimeout(() => {
    modalElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
      });
    }, 100);
  };

  // --- Profile System ---
  let profiles = {
    current: "default",
    list: ["default"],
    data: { default: { weekly_tasks: {} } }
  };

  let isStorageAllowed = localStorage.getItem('gdpr_optout') !== 'true';

  const saveProfiles = () => {
    if (isStorageAllowed) localStorage.setItem('checklist_profiles', JSON.stringify(profiles));
  };

  const loadProfiles = () => {
    const stored = localStorage.getItem('checklist_profiles');
    if (stored) {
      try { profiles = JSON.parse(stored); } catch { /* ignore */ }
    } else if (localStorage.getItem('daily_tasks') || weeklyTaskData.some(t => localStorage.getItem(t.id))) {
      if (confirm('Migrate old progress to "default" profile?')) {
        const def = profiles.data.default;
        const dailyStr = localStorage.getItem('daily_tasks');
        if (dailyStr) {
          const dailyOld = JSON.parse(dailyStr);
          const newDaily = { tasks: {} };
          dailyTaskData.forEach(t => {
            if (dailyOld.tasks && dailyOld.tasks[t.id]) newDaily.tasks[t.id] = t.maxProgress || 1;
          });
          newDaily.date = getCurrentDailyDate();
          def.daily_tasks = JSON.stringify(newDaily);
        }
        def.weekly_tasks = {};
        weeklyTaskData.forEach(t => {
          const v = localStorage.getItem(t.id);
          if (v === 'true') def.weekly_tasks[t.id] = t.maxProgress || 1;
        });
        def.weekly_reset_date = localStorage.getItem('weekly_reset_date');
        localStorage.removeItem('daily_tasks');
        localStorage.removeItem('weekly_reset_date');
        weeklyTaskData.forEach(t => localStorage.removeItem(t.id));
        saveProfiles();
      }
    }
    if (!profiles.data[profiles.current]) profiles.data[profiles.current] = { weekly_tasks: {} };

    Object.keys(localStorage)
      .filter(key => key.startsWith('bp_portrait_'))
      .forEach(key => {
        const profileName = key.slice(12);
        if (!profiles.list.includes(profileName)) {
          localStorage.removeItem(key);
          console.log('Cleaned old portrait:', key);
        }
      });
  };

  const getProfileData = () => profiles.data[profiles.current] || (profiles.data[profiles.current] = { weekly_tasks: {} });

  // --- Custom Categories ---
  let customCategories = {};
  let currentCategoryId = null;

  const loadCustomCategories = () => {
    const pd = getProfileData();
    if (pd && pd.custom_categories) {
      try { customCategories = JSON.parse(pd.custom_categories); } catch { customCategories = {}; }
    } else customCategories = {};
  };

  const saveCustomCategories = () => {
    if (!isStorageAllowed) return;
    const pd = getProfileData();
    if (!pd) return;
    pd.custom_categories = JSON.stringify(customCategories);
    saveProfiles();
  };

  const createCategory = (name) => {
    if (Object.keys(customCategories).length >= MAX_CATEGORIES) {
      alert(`You can only have up to ${MAX_CATEGORIES} custom categories on this profile.`);
      return null;
    }

    const categoryId = `cat_${Date.now()}`;
    customCategories[categoryId] = { id: categoryId, name: name, tasks: [] };
    saveCustomCategories();
    return categoryId;
  };

  const deleteCategory = (categoryId) => {
    delete customCategories[categoryId];
    saveCustomCategories();
  };

  const renameCategory = (categoryId, newName) => {
    if (customCategories[categoryId]) {
      customCategories[categoryId].name = newName;
      saveCustomCategories();
    }
  };

  const addTaskToCategory = (categoryId, label, color, maxProgress, resetType) => {
    if (!customCategories[categoryId]) return;

    if (customCategories[categoryId].tasks.length >= MAX_TASKS_PER_CATEGORY) {
      alert(`You can only have up to ${MAX_TASKS_PER_CATEGORY} tasks in this category.`);
      return null;
    }

    const task = {
      id: `task_${Date.now()}`,
      label,
      color,
      maxProgress: Math.max(1, Math.min(1000, maxProgress)),
      resetType,
      createdAt: new Date().toISOString()
    };

    customCategories[categoryId].tasks.push(task);
    saveCustomCategories();
    return task;
  };

  const deleteTaskFromCategory = (categoryId, taskId) => {
    if (!customCategories[categoryId]) return;
    customCategories[categoryId].tasks = customCategories[categoryId].tasks.filter(t => t.id !== taskId);

    if (isStorageAllowed) {
      const pd = getProfileData();
      const key = `custom_${categoryId}_${taskId}`;
      delete pd[key];
      saveProfiles();
    }

    saveCustomCategories();
  };

  const moveTaskInCategory = (categoryId, taskId, direction) => {
    if (!customCategories[categoryId]) return;
    const tasks = customCategories[categoryId].tasks;
    const i = tasks.findIndex(t => t.id === taskId);
    if (i === -1) return;
    if (direction === 'up' && i > 0) [tasks[i-1], tasks[i]] = [tasks[i], tasks[i-1]];
    else if (direction === 'down' && i < tasks.length - 1) [tasks[i+1], tasks[i]] = [tasks[i], tasks[i+1]];
    saveCustomCategories();
  };

  const getCategoryTaskCount = (categoryId) => {
    if (!customCategories[categoryId]) return { total: 0, completed: 0 };
    const tasks = customCategories[categoryId].tasks;
    let completed = 0;
    tasks.forEach(t => {
      const c = getCustomTaskCount(categoryId, t.id);
      if (c === t.maxProgress) completed++;
    });
    return { total: tasks.length, completed };
  };

  const getCustomTaskCountKey = (categoryId, taskId) => `custom_${categoryId}_${taskId}`;

  const getCustomTaskCount = (categoryId, taskId) => {
    const pd = getProfileData();
    if (!pd) return 0;
    const cat = customCategories[categoryId];
    if (!cat) return 0;
    const task = cat.tasks.find(t => t.id === taskId);
    if (!task) return 0;
    if (task.resetType === 'daily') {
      getDailyStorage();
    } else if (task.resetType === 'weekly') {
      resetWeeklyStorageIfNeeded();
    }
    const key = getCustomTaskCountKey(categoryId, taskId);
    return Number(pd[key] || 0);
  };

  const setCustomTaskCount = (categoryId, taskId, count) => {
    if (!isStorageAllowed) return;
    const pd = getProfileData();
    const key = getCustomTaskCountKey(categoryId, taskId);
    if (count === 0) delete pd[key];
    else pd[key] = count;
    saveProfiles();
  };

  const resetDailyCustomTasks = () => {
    if (!isStorageAllowed) return;
    const pd = getProfileData();
    if (!pd) return;
    Object.keys(customCategories).forEach(catId => {
      const cat = customCategories[catId];
      cat.tasks.forEach(t => {
        if (t.resetType === 'daily') {
          const key = getCustomTaskCountKey(catId, t.id);
          delete pd[key];
        }
      });
    });
    saveProfiles();
  };

  const resetWeeklyCustomTasks = () => {
    if (!isStorageAllowed) return;
    const pd = getProfileData();
    if (!pd) return;
    Object.keys(customCategories).forEach(catId => {
      const cat = customCategories[catId];
      cat.tasks.forEach(t => {
        if (t.resetType === 'weekly') {
          const key = getCustomTaskCountKey(catId, t.id);
          delete pd[key];
        }
      });
    });
    saveProfiles();
  };

  // --- Storage ---
  const getDailyStorage = () => {
    const pd = getProfileData();
    const date = getCurrentDailyDate();
    let stored = pd.daily_tasks ? JSON.parse(pd.daily_tasks) : { date: null, tasks: {} };
  
    if (stored.date !== date) {
      stored = { date, tasks: {} };
      pd.daily_tasks = JSON.stringify(stored);
      resetDailyCustomTasks();
      saveProfiles();
      location.reload();
    }
    return stored;
  };

  const getCount = (id, section) => {
    if (section === 'daily') {
      const stored = getDailyStorage();
      return Number(stored.tasks[id] || 0);
    } else {
      resetWeeklyStorageIfNeeded();
      return Number(getProfileData().weekly_tasks[id] || 0);
    }
  };

  const setDailyCount = (id, count) => {
    if (!isStorageAllowed) return;
    const stored = getDailyStorage();
    if (count === 0) delete stored.tasks[id];
    else stored.tasks[id] = count;
    getProfileData().daily_tasks = JSON.stringify(stored);
    saveProfiles();
  };

  const setWeeklyCount = (id, count) => {
    if (!isStorageAllowed) return;
    const pd = getProfileData();
    pd.weekly_tasks ||= {};
    if (count === 0) delete pd.weekly_tasks[id];
    else pd.weekly_tasks[id] = count;
    saveProfiles();
  };

  const resetWeeklyStorageIfNeeded = () => {
    if (!isStorageAllowed) return;
    const date = getCurrentWeeklyDate();
    const pd = getProfileData();
    pd.weekly_tasks ||= {};
  
    if (pd.weekly_reset_date !== date) {
      resetWeeklyCustomTasks();
      pd.weekly_tasks = {};
      pd.weekly_reset_date = date;
      saveProfiles();
      location.reload();
    }
  };

  const cleanupOrphanedKeys = () => {
    if (!isStorageAllowed) return;
    const pd = getProfileData();

    if (pd.daily_tasks) {
      try {
        const daily = JSON.parse(pd.daily_tasks);
        const validDailyIds = dailyTaskData.map(t => t.id);
        let changed = false;
        for (const key in daily.tasks) {
          if (!validDailyIds.includes(key)) {
            delete daily.tasks[key];
            changed = true;
          }
        }
        if (changed) pd.daily_tasks = JSON.stringify(daily);
      } catch (e) {
        console.warn("Corrupted daily_tasks, skipping cleanup");
      }
    }

    const validWeeklyIds = weeklyTaskData.map(t => t.id);
    let changed = false;
    for (const key in pd.weekly_tasks) {
      if (!validWeeklyIds.includes(key)) {
        delete pd.weekly_tasks[key];
        changed = true;
      }
    }
    if (changed) saveProfiles();
  };

  // --- Task Interaction Logic ---
  let holdInterval = null;

  const startHoldIncrement = (el, section) => {
    if (holdInterval) clearInterval(holdInterval);
    holdInterval = setInterval(() => toggleTask(el, section, true), HOLD_INTERVAL_MS);
  };
  const stopHoldIncrement = () => { if (holdInterval) { clearInterval(holdInterval); holdInterval = null; } };
  const startHoldDecrement = (el, section) => {
    if (holdInterval) clearInterval(holdInterval);
    holdInterval = setInterval(() => decrementTask(el, section), HOLD_INTERVAL_MS);
  };
  const stopHoldDecrement = () => { if (holdInterval) { clearInterval(holdInterval); holdInterval = null; } };

  const startHoldIncrementCustom = (el, categoryId) => {
    if (holdInterval) clearInterval(holdInterval);
    holdInterval = setInterval(() => toggleCustomTask(el, categoryId, true), HOLD_INTERVAL_MS);
  };
  const stopHoldIncrementCustom = () => { if (holdInterval) { clearInterval(holdInterval); holdInterval = null; } };
  const startHoldDecrementCustom = (el, categoryId) => {
    if (holdInterval) clearInterval(holdInterval);
    holdInterval = setInterval(() => decrementCustomTask(el, categoryId), HOLD_INTERVAL_MS);
  };
  const stopHoldDecrementCustom = () => { if (holdInterval) { clearInterval(holdInterval); holdInterval = null; } };

  const updateTaskUI = (el, count, max) => {
    const completed = count === max;
    el.classList.toggle('completed', completed);
    const badge = el.querySelector('.progress-badge');
    if (max > 1) {
      if (!badge) {
        const span = document.createElement('span');
        span.className = 'progress-badge';
        el.querySelector('label').appendChild(span);
      }
      el.querySelector('.progress-badge').textContent = `${count}/${max}`;
    } else if (badge) {
      badge.remove();
    }
  };

  const toggleTask = (el, section, isHold = false) => {
    const id = el.dataset.id;
    const taskData = section === 'daily' ? dailyTaskData : weeklyTaskData;
    const task = taskData.find(t => t.id === id);
    if (!task) return;
    const max = task.maxProgress || 1;
    const current = getCount(id, section);
    let newCount;
    if (current < max) {
      if (isHold && max > 1 && current >= max - 1) return;
      newCount = current + 1;
    } else {
      if (isHold) return;
      newCount = 0;
    }
    if (section === 'daily') setDailyCount(id, newCount); else setWeeklyCount(id, newCount);
    updateTaskUI(el, newCount, max);
    updateCounter(section);
    applyCompletedFilter(section);
  };

  const decrementTask = (el, section) => {
    const id = el.dataset.id;
    const taskData = section === 'daily' ? dailyTaskData : weeklyTaskData;
    const task = taskData.find(t => t.id === id);
    if (!task) return;
    const current = getCount(id, section);
    if (current > 0) {
      const newCount = current - 1;
      if (section === 'daily') setDailyCount(id, newCount); else setWeeklyCount(id, newCount);
      updateTaskUI(el, newCount, task.maxProgress || 1);
      updateCounter(section);
      applyCompletedFilter(section);
    }
  };

  const toggleCustomTask = (el, categoryId, isHold = false) => {
    const taskId = el.dataset.id;
    const category = customCategories[categoryId];
    if (!category) return;
    const task = category.tasks.find(t => t.id === taskId);
    if (!task) return;
    const max = task.maxProgress || 1;
    const current = getCustomTaskCount(categoryId, taskId);
    let newCount;
    if (current < max) {
      if (isHold && max > 1 && current >= max - 2) return;
      newCount = current + 1;
    } else {
      if (isHold) return;
      newCount = 0;
    }
    setCustomTaskCount(categoryId, taskId, newCount);
    updateTaskUI(el, newCount, max);
    renderCategories();
  };

  const decrementCustomTask = (el, categoryId) => {
    const taskId = el.dataset.id;
    const category = customCategories[categoryId];
    if (!category) return;
    const task = category.tasks.find(t => t.id === taskId);
    if (!task) return;
    const current = getCustomTaskCount(categoryId, taskId);
    if (current > 0) {
      const newCount = current - 1;
      setCustomTaskCount(categoryId, taskId, newCount);
      updateTaskUI(el, newCount, task.maxProgress || 1);
      renderCategories();
    }
  };

  // --- Task Element Creation ---
  const createTaskElement = (task, section) => {
    const div = document.createElement('div');
    div.className = `task ${task.color}`;
    div.tabIndex = 0;
    div.dataset.id = task.id;
    div.role = "listitem";
    div.setAttribute("aria-label", task.label);
    const max = task.maxProgress || 1;
    const current = getCount(task.id, section);
    const completed = current === max;

    let innerHTML = `<label>${task.label}`;
    if (max > 1) innerHTML += ` <span class="progress-badge">${current}/${max}</span>`;
    innerHTML += '</label>';
    div.innerHTML = innerHTML;
    div.classList.toggle('completed', completed);

    let isPressedLeft = false, holdTimeoutLeft = null, holdStartedLeft = false;
    let isPressedRight = false, holdTimeoutRight = null, holdStartedRight = false;
    let lastTap = 0, isDecrementHoldMode = false, decrementHoldTimeout = null;
    let startX = null, startY = null;
    let dragDetected = false;
    const DOUBLE_TAP_THRESHOLD = 400;
    const DRAG_THRESHOLD = 10;

    const cancelPendingActions = () => {
      isPressedLeft = false;
      isPressedRight = false;
      clearTimeout(holdTimeoutLeft);
      clearTimeout(holdTimeoutRight);
      clearTimeout(decrementHoldTimeout);
      stopHoldIncrement();
      stopHoldDecrement();
      holdStartedLeft = false;
      holdStartedRight = false;
      isDecrementHoldMode = false;
      startX = null;
      startY = null;
      dragDetected = false;
    };

    const handleDoubleTap = (e) => {
      const now = Date.now();
      if (now - lastTap < DOUBLE_TAP_THRESHOLD && !dragDetected) {
        e.preventDefault();
        isDecrementHoldMode = true;
        decrementHoldTimeout = setTimeout(() => {
          if (isDecrementHoldMode && !dragDetected) {
            decrementTask(div, section);
            startHoldDecrement(div, section);
          }
        }, 300);
      }
      lastTap = now;
    };

    const handleMouseDown = (e) => {
      e.preventDefault();
      if (e.button === 0) {
        isPressedLeft = true;
        holdTimeoutLeft = setTimeout(() => {
          if (isPressedLeft && !dragDetected) {
            holdStartedLeft = true;
            toggleTask(div, section, true);
            startHoldIncrement(div, section);
            if (e.pointerId !== undefined) div.setPointerCapture(e.pointerId);
          }
        }, 300);
      } else if (e.button === 2) {
        isPressedRight = true;
        holdTimeoutRight = setTimeout(() => {
          if (isPressedRight && !dragDetected) {
            holdStartedRight = true;
            decrementTask(div, section);
            startHoldDecrement(div, section);
            if (e.pointerId !== undefined) div.setPointerCapture(e.pointerId);
          }
        }, 300);
      }
    };

    const handleMouseUp = (e) => {
      e.preventDefault();
      if (e.button === 0) {
        isPressedLeft = false;
        clearTimeout(holdTimeoutLeft);
        stopHoldIncrement();
        if (!holdStartedLeft && !dragDetected) toggleTask(div, section);
        holdStartedLeft = false;
      } else if (e.button === 2) {
        isPressedRight = false;
        clearTimeout(holdTimeoutRight);
        stopHoldDecrement();
        if (!holdStartedRight && !dragDetected) decrementTask(div, section);
        holdStartedRight = false;
      }
    };

    const handleMouseLeave = (e) => {
      e.preventDefault();
      cancelPendingActions();
    };

    const handleTouchStart = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      dragDetected = false;
      const mouseEvent = new MouseEvent('mousedown', { clientX: touch.clientX, clientY: touch.clientY, button: 0 });
      handleMouseDown(mouseEvent);
      handleDoubleTap(e);
    };

    const handleTouchMove = (e) => {
      if (startX === null || startY === null) return;
      e.preventDefault();
      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - startX);
      const deltaY = Math.abs(touch.clientY - startY);
      if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
        if (!dragDetected) {
          dragDetected = true;
          cancelPendingActions();
        }
      }
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();
      const touch = e.changedTouches[0];
      const mouseEvent = new MouseEvent('mouseup', { clientX: touch.clientX, clientY: touch.clientY, button: 0 });
      handleMouseUp(mouseEvent);
      if (isDecrementHoldMode) {
        clearTimeout(decrementHoldTimeout);
        stopHoldDecrement();
        if (!holdStartedRight && !dragDetected) decrementTask(div, section);
        isDecrementHoldMode = false;
      }
      startX = null;
      startY = null;
    };

    div.onmousedown = handleMouseDown;
    div.onmouseup = handleMouseUp;
    div.onmouseleave = handleMouseLeave;
    div.oncontextmenu = (e) => { e.preventDefault(); return false; };
    div.ontouchstart = handleTouchStart;
    div.ontouchmove = handleTouchMove;
    div.ontouchend = handleTouchEnd;
    div.ontouchcancel = handleTouchEnd;

    div.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); toggleTask(div, section);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault(); if (div.previousElementSibling) div.previousElementSibling.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault(); if (div.nextElementSibling) div.nextElementSibling.focus();
      }
    };

    return div;
  };

  const createCustomTaskElement = (categoryId, task) => {
    const div = document.createElement('div');
    div.className = `task ${task.color}`;
    div.tabIndex = 0;
    div.dataset.id = task.id;
    div.dataset.categoryId = categoryId;
    div.role = "listitem";
    div.setAttribute("aria-label", task.label);
    const max = task.maxProgress || 1;
    const current = getCustomTaskCount(categoryId, task.id);
    div.innerHTML = `<label>${task.label}${max>1?` <span class="progress-badge">${current}/${max}</span>`:''}</label>`;
    div.classList.toggle('completed', current === max);

    let isPressedLeft = false, holdTimeoutLeft = null, holdStartedLeft = false;
    let isPressedRight = false, holdTimeoutRight = null, holdStartedRight = false;
    let lastTap = 0, isDecrementHoldMode = false, decrementHoldTimeout = null;
    let startX = null, startY = null;
    let dragDetected = false;
    const DOUBLE_TAP_THRESHOLD = 400;
    const DRAG_THRESHOLD = 10;

    const cancelPendingActions = () => {
      isPressedLeft = false;
      isPressedRight = false;
      clearTimeout(holdTimeoutLeft);
      clearTimeout(holdTimeoutRight);
      clearTimeout(decrementHoldTimeout);
      stopHoldIncrementCustom();
      stopHoldDecrementCustom();
      holdStartedLeft = false;
      holdStartedRight = false;
      isDecrementHoldMode = false;
      startX = null;
      startY = null;
      dragDetected = false;
    };

    const handleDoubleTap = (e) => {
      const now = Date.now();
      if (now - lastTap < DOUBLE_TAP_THRESHOLD && !dragDetected) {
        e.preventDefault();
        isDecrementHoldMode = true;
        decrementHoldTimeout = setTimeout(() => {
          if (isDecrementHoldMode && !dragDetected) { decrementCustomTask(div, categoryId); startHoldDecrementCustom(div, categoryId); }
        }, 300);
      }
      lastTap = now;
    };

    const handleMouseDown = (e) => {
      e.preventDefault();
      if (e.button === 0) {
        isPressedLeft = true;
        holdTimeoutLeft = setTimeout(() => {
          if (isPressedLeft && !dragDetected) { holdStartedLeft = true; toggleCustomTask(div, categoryId, true); startHoldIncrementCustom(div, categoryId); }
        }, 300);
      } else if (e.button === 2) {
        isPressedRight = true;
        holdTimeoutRight = setTimeout(() => {
          if (isPressedRight && !dragDetected) { holdStartedRight = true; decrementCustomTask(div, categoryId); startHoldDecrementCustom(div, categoryId); }
        }, 300);
      }
    };
    const handleMouseUp = (e) => {
      e.preventDefault();
      if (e.button === 0) {
        isPressedLeft = false; clearTimeout(holdTimeoutLeft); stopHoldIncrementCustom(); if (!holdStartedLeft && !dragDetected) toggleCustomTask(div, categoryId); holdStartedLeft = false;
      } else if (e.button === 2) {
        isPressedRight = false; clearTimeout(holdTimeoutRight); stopHoldDecrementCustom(); if (!holdStartedRight && !dragDetected) decrementCustomTask(div, categoryId); holdStartedRight = false;
      }
    };
    const handleMouseLeave = (e) => {
      e.preventDefault(); cancelPendingActions();
    };
    const handleTouchStart = (e) => { 
      e.preventDefault(); 
      const t = e.touches[0]; 
      startX = t.clientX; 
      startY = t.clientY; 
      dragDetected = false;
      const mouseEvent = new MouseEvent('mousedown', {clientX:t.clientX, clientY:t.clientY, button:0});
      handleMouseDown(mouseEvent); 
      handleDoubleTap(e); 
    };
    const handleTouchMove = (e) => {
      if (startX === null || startY === null) return;
      const t = e.touches[0];
      const deltaX = Math.abs(t.clientX - startX);
      const deltaY = Math.abs(t.clientY - startY);
      if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
        if (!dragDetected) {
          dragDetected = true;
          cancelPendingActions();
        }
      }
    };
    const handleTouchEnd = (e) => { 
      e.preventDefault(); 
      const t = e.changedTouches[0]; 
      const mouseEvent = new MouseEvent('mouseup', {clientX:t.clientX, clientY:t.clientY, button:0});
      handleMouseUp(mouseEvent); 
      if (isDecrementHoldMode) { 
        clearTimeout(decrementHoldTimeout); 
        stopHoldDecrementCustom(); 
        if (!holdStartedRight && !dragDetected) decrementCustomTask(div, categoryId); 
        isDecrementHoldMode = false; 
      } 
      startX = null; 
      startY = null; 
    };

    div.onmousedown = handleMouseDown;
    div.onmouseup = handleMouseUp;
    div.onmouseleave = handleMouseLeave;
    div.ontouchstart = handleTouchStart;
    div.ontouchmove = handleTouchMove;
    div.ontouchend = handleTouchEnd;
    div.ontouchcancel = handleTouchEnd;
    div.oncontextmenu = (e) => { e.preventDefault(); return false; };

    div.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCustomTask(div, categoryId); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (div.previousElementSibling) div.previousElementSibling.focus(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); if (div.nextElementSibling) div.nextElementSibling.focus(); }
    };

    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'task-controls';
    const upBtn = document.createElement('button');
    upBtn.textContent = '↑'; upBtn.className = 'reorder-btn'; upBtn.title = 'Move up';
    upBtn.onclick = (e) => { e.stopPropagation(); e.preventDefault(); e.stopImmediatePropagation(); moveTaskInCategory(categoryId, task.id, 'up'); renderCategories(); };
    upBtn.onmousedown = (e) => { e.stopPropagation(); e.preventDefault(); };
    upBtn.onmouseup = (e) => { e.stopPropagation(); e.preventDefault(); };
    const downBtn = document.createElement('button');
    downBtn.textContent = '↓'; downBtn.className = 'reorder-btn'; downBtn.title = 'Move down';
    downBtn.onclick = (e) => { e.stopPropagation(); e.preventDefault(); e.stopImmediatePropagation(); moveTaskInCategory(categoryId, task.id, 'down'); renderCategories(); };
    downBtn.onmousedown = (e) => { e.stopPropagation(); e.preventDefault(); };
    downBtn.onmouseup = (e) => { e.stopPropagation(); e.preventDefault(); };
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕'; deleteBtn.className = 'delete-btn'; deleteBtn.title = 'Delete task';
    deleteBtn.onclick = (e) => { e.stopPropagation(); e.preventDefault(); e.stopImmediatePropagation(); if (confirm(`Delete "${task.label}"?`)) { deleteTaskFromCategory(categoryId, task.id); renderCategories(); } };
    deleteBtn.onmousedown = (e) => { e.stopPropagation(); e.preventDefault(); };
    deleteBtn.onmouseup = (e) => { e.stopPropagation(); e.preventDefault(); };

    controlsDiv.appendChild(upBtn);
    controlsDiv.appendChild(downBtn);
    controlsDiv.appendChild(deleteBtn);
    div.appendChild(controlsDiv);

    return div;
  };

  // --- Rendering & UI Updates ---
  const dailyContainer = $('daily_tasks_container');
  const weeklyContainer = $('weekly_tasks_container');
  const customCategoriesContainer = $('custom_categories_container');
  const dailyCounter = $('daily_counter');
  const weeklyCounter = $('weekly_counter');
  const dailyProgress = $('daily_progress');
  const weeklyProgress = $('weekly_progress');
  const dailyProgressBar = $('daily_progress_bar');
  const weeklyProgressBar = $('weekly_progress_bar');
  const dailyCompletionMsg = $('daily_completion_message');
  const weeklyCompletionMsg = $('weekly_completion_message');

  let hideCompletedState = { daily: true, weekly: true };

  const renderTasks = (container, data, section) => {
    container.innerHTML = '';
    data.forEach(t => container.appendChild(createTaskElement(t, section)));
    updateCounter(section);
  };

  const renderCategories = () => {
    customCategoriesContainer.innerHTML = '';
    const ids = Object.keys(customCategories);

    if (ids.length === 0) {
      customCategoriesContainer.classList.remove('columns-1', 'columns-2');
    } else if (ids.length % 2 === 1) {
      customCategoriesContainer.classList.add('columns-1');
      customCategoriesContainer.classList.remove('columns-2');
    } else {
      customCategoriesContainer.classList.add('columns-2');
      customCategoriesContainer.classList.remove('columns-1');
    }

    ids.forEach(catId => {
      const cat = customCategories[catId];
      const catDiv = document.createElement('div');
      catDiv.className = 'custom-category';

      const header = document.createElement('div');
      header.className = 'category-header';
      const title = document.createElement('h3');
      title.textContent = cat.name;
      const actions = document.createElement('div');
      actions.className = 'header-actions';

      const renameBtn = document.createElement('button');
      renameBtn.textContent = '✏️'; renameBtn.className = 'icon-btn';
      renameBtn.title = 'Rename category';
      renameBtn.onclick = () => {
        const newName = prompt('New category name:', cat.name);
        if (newName && newName.trim()) { renameCategory(catId, newName.trim()); renderCategories(); }
      };

      const addTaskBtn = document.createElement('button');
      addTaskBtn.textContent = '➕'; addTaskBtn.className = 'icon-btn';
      addTaskBtn.title = 'Add task';
      addTaskBtn.onclick = () => {
        currentCategoryId = catId;
        categoryNameDisplay.textContent = cat.name;
        customTaskLabel.value = '';
        customTaskColor.value = 'grey';
        customTaskMaxProgress.value = '1';
        customTaskReset.value = 'permanent';
        addCustomTaskModal.style.display = 'flex';
        setTimeout(() => customTaskLabel.focus(), 100);
        scrollModalIntoView(addCustomTaskModal);
      };

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '🗑️'; deleteBtn.className = 'icon-btn delete-icon-btn';
      deleteBtn.title = 'Delete category';
      deleteBtn.onclick = () => { if (confirm(`Delete category "${cat.name}" and all its tasks?`)) { deleteCategory(catId); renderCategories(); } };

      const { total, completed } = getCategoryTaskCount(catId);
      const counter = document.createElement('span');
      counter.className = 'category-counter';
      counter.textContent = `${completed}/${total}`;

      actions.appendChild(renameBtn);
      actions.appendChild(addTaskBtn);
      actions.appendChild(deleteBtn);
      actions.appendChild(counter);
      header.appendChild(title);
      header.appendChild(actions);
      catDiv.appendChild(header);

      const tasksDiv = document.createElement('div');
      tasksDiv.className = 'category-tasks';
      if (cat.tasks.length === 0) {
        const p = document.createElement('p'); p.className = 'empty-category'; p.textContent = 'No tasks yet. Add one to get started!';
        tasksDiv.appendChild(p);
      } else {
        cat.tasks.forEach(t => tasksDiv.appendChild(createCustomTaskElement(catId, t)));
      }
      catDiv.appendChild(tasksDiv);
      customCategoriesContainer.appendChild(catDiv);
    });
  };

  const reloadCurrentProfileData = () => {
    loadCustomCategories();
    resetWeeklyStorageIfNeeded();
    renderTasks(dailyContainer, dailyTaskData, 'daily');
    renderTasks(weeklyContainer, weeklyTaskData, 'weekly');
    renderCategories();
    updateCounter('daily');
    updateCounter('weekly');
    applyCompletedFilter('daily');
    applyCompletedFilter('weekly');
    if (dailyFilterInput) dailyFilterInput.value = '';
    if (weeklyFilterInput) weeklyFilterInput.value = '';
  };

  const updateCounter = (section) => {
    const container = section === 'daily' ? dailyContainer : weeklyContainer;
    const counter = section === 'daily' ? dailyCounter : weeklyCounter;
    const progress = section === 'daily' ? dailyProgress : weeklyProgress;
    const bar = section === 'daily' ? dailyProgressBar : weeklyProgressBar;
    const msg = section === 'daily' ? dailyCompletionMsg : weeklyCompletionMsg;
    const done = container.querySelectorAll('.task.completed').length;
    const total = container.querySelectorAll('.task').length;
    const pct = total ? (done / total * 100) : 0;
    if (counter) {
      counter.textContent = `${done} / ${total} complete`;
      counter.classList.add('animate');
      setTimeout(() => counter.classList.remove('animate'), 800);
    }
    if (progress) {
      progress.style.width = `${pct}%`;
      progress.textContent = `${pct.toFixed(0)}%`;
    }
    if (bar) bar.dataset.tooltip = `${done}/${total} (${pct.toFixed(1)}%)`;
    const lerp = (a,b,t) => a + (b-a)*t;
    const blue=[80,106,255], gold=[255,184,0];
    const rgb = blue.map((v,i)=>Math.round(lerp(v,gold[i],pct/100)));
    if (progress) progress.style.background = `linear-gradient(90deg, rgb(${rgb}), rgb(${rgb}))`;
    if (done === total && total) {
      if (msg) msg.style.display = 'block';
      if (progress && !progress.dataset.confettiDone) {
        progress.dataset.confettiDone = 'true';
        if (typeof confetti === 'function') {
          confetti({ particleCount: 250, spread: 360, origin: { x: 0.5, y: -0.5 } });
        } else {
          console.warn('Confetti not loaded yet - skipping animation');
        }
      }
    } else {
      if (msg) msg.style.display = 'none';
      if (progress) progress.dataset.confettiDone = '';
    }
  };

  const applyCompletedFilter = (section) => {
    const container = section === 'daily' ? dailyContainer : weeklyContainer;
    const input = section === 'daily' ? dailyFilterInput : weeklyFilterInput;
    const hide = hideCompletedState[section];
    const text = input ? input.value.toLowerCase() : '';
    container.querySelectorAll('.task').forEach(t => {
      const match = t.textContent.toLowerCase().includes(text);
      const completed = t.classList.contains('completed');
      t.style.display = match && (!completed || !hide) ? '' : 'none';
    });
  };

  const selectAll = (section) => {
    const container = section === 'daily' ? dailyContainer : weeklyContainer;
    if (container.children.length === 0) return;

    const data = section === 'daily' ? dailyTaskData : weeklyTaskData;
    container.querySelectorAll('.task').forEach(t => {
      const id = t.dataset.id;
      const task = data.find(tt => tt.id === id);
      if (!task) return;
      const max = task.maxProgress || 1;
      if (section === 'daily') setDailyCount(id, max); else setWeeklyCount(id, max);
      updateTaskUI(t, max, max);
    });
    updateCounter(section); applyCompletedFilter(section);
  };

  const deselectAll = (section) => {
    const container = section === 'daily' ? dailyContainer : weeklyContainer;
    if (container.children.length === 0) return;

    const data = section === 'daily' ? dailyTaskData : weeklyTaskData;
    container.querySelectorAll('.task').forEach(t => {
      const id = t.dataset.id;
      const task = data.find(tt => tt.id === id);
      if (!task) return;
      if (section === 'daily') setDailyCount(id, 0); else setWeeklyCount(id, 0);
      updateTaskUI(t, 0, task.maxProgress || 1);
    });
    updateCounter(section); applyCompletedFilter(section);
  };

  // --- DOM Elements & Event Listeners ---
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
  const addCategoryBtn = $('addCategoryBtn');
  const addCategoryModal = $('add-category-modal');
  const newCategoryNameInput = $('new-category-name');
  const createCategoryBtn = $('create-category-btn');
  const closeCategoryModal = $('close-category-modal');
  const addCustomTaskModal = $('add-custom-task-modal');
  const customTaskLabel = $('custom-task-label');
  const customTaskColor = $('custom-task-color');
  const customTaskMaxProgress = $('custom-task-maxProgress');
  const customTaskReset = $('custom-task-reset');
  const categoryNameDisplay = $('category-name-display');
  const addCustomTaskBtn = $('add-custom-task-btn');
  const closeCustomTaskModal = $('close-custom-task-modal');
  const newsBtn = $('newsBtn');
  const newsModal = $('news-modal');
  const changelogsContent = $('changelogs-content');
  const closeNewsModal = $('close-news-modal');
  const versionEl = $('version');
  const resetSiteDataBtn = $('resetSiteDataBtn');

  // --- Profile UI ---
  const renderProfilesList = () => {
    profilesListEl.innerHTML = '';
    profiles.list.sort().forEach(name => {
      const li = document.createElement('li');

      const nameSpan = document.createElement('span');
      nameSpan.textContent = name;
      nameSpan.className = 'profile-name';
      if (name === profiles.current) nameSpan.style.fontWeight = 'bold';

      nameSpan.addEventListener('click', function(e) {
        e.stopPropagation();
        const oldName = name;
        const input = prompt('New profile name (max 20 characters):', oldName);
        if (!input || input.trim() === '' || input.trim() === oldName) return;
        if (input.length > 20) return alert('Maximum 20 characters.');
        if (profiles.list.includes(input.trim())) return alert('Name already exists');

        const newName = input.trim();

        profiles.list = profiles.list.map(n => n === oldName ? newName : n);
        profiles.data[newName] = profiles.data[oldName];
        delete profiles.data[oldName];
        if (profiles.current === oldName) profiles.current = newName;

        const avatar = localStorage.getItem('bp_portrait_' + oldName);
        if (avatar) {
          localStorage.setItem('bp_portrait_' + newName, avatar);
          localStorage.removeItem('bp_portrait_' + oldName);
        }

        saveProfiles();
        profilesBtn.click();
      });

      li.appendChild(nameSpan);

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

      if (profiles.list.length > 1) {
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => {
          if (!confirm(`Delete "${name}" and all its progress?`)) return;

          delete profiles.data[name];
          localStorage.removeItem('bp_portrait_' + name);
          profiles.list = profiles.list.filter(n => n !== name);
          if (profiles.current === name) profiles.current = profiles.list[0] || 'default';

          saveProfiles();
          reloadCurrentProfileData();

          profilesBtn.click(); 
        };
        li.appendChild(delBtn);
      }

      profilesListEl.appendChild(li);
    });
  };

  profilesBtn && (profilesBtn.onclick = () => {
    currentProfileNameEl.textContent = profiles.current;
    renderProfilesList();
    profilesModal.style.display = 'flex';
	scrollModalIntoView(profilesModal);
  });
  
  closeProfilesModal && (closeProfilesModal.onclick = () => profilesModal.style.display = 'none');

  createProfileBtn && (createProfileBtn.onclick = () => {
    if (profiles.list.length >= 5) {
      alert('Maximum of 5 profiles allowed.');
      return;
    }
    let name = newProfileNameInput.value.trim();

    if (!name || name.length === 0) {
      alert('Please enter a valid profile name');
      return;
    }

    if (name.length > 20) {
      alert('Profile name must be 20 characters or less');
      newProfileNameInput.value = name.substring(0, 20);
      newProfileNameInput.focus();
      return;
    }

    if (profiles.list.includes(name)) {
      alert('A profile with this name already exists');
      newProfileNameInput.select();
      return;
    }

    profiles.list.push(name);
    profiles.data[name] = { weekly_tasks: {} };
    profiles.current = name;
    saveProfiles();
    newProfileNameInput.value = '';
    renderProfilesList();
    reloadCurrentProfileData();
  });

  // --- Backup System ---
  const exportProgress = () => {
    if (!isStorageAllowed) return alert('Storage disabled');
    const pd = getProfileData();
    const data = {
      profile: profiles.current,
      daily_tasks: pd.daily_tasks || null,
      weekly_reset_date: pd.weekly_reset_date || null,
      weekly_tasks: pd.weekly_tasks || {},
      custom_categories: pd.custom_categories || null
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bp_${profiles.current}_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imp = JSON.parse(ev.target.result);
        const pd = getProfileData();
        pd.daily_tasks = imp.daily_tasks || null;
        pd.weekly_reset_date = imp.weekly_reset_date || null;
        pd.weekly_tasks = imp.weekly_tasks || {};
        pd.custom_categories = imp.custom_categories || null;
        saveProfiles();
        reloadCurrentProfileData();
        alert('Imported!');
      } catch {
        alert('Invalid file');
      }
    };
    reader.readAsText(file);
  };

  importExportBtn && (importExportBtn.onclick = () => {
  if (importExportModal) {
    importExportModal.style.display = 'flex';
    scrollModalIntoView(importExportModal);
    }
  });
  
  importProgressBtn && (importProgressBtn.onclick = () => { importExportModal && (importExportModal.style.display = 'none'); importFile && importFile.click(); });
  exportProgressBtn && (exportProgressBtn.onclick = () => { importExportModal && (importExportModal.style.display = 'none'); exportProgress(); });
  cancelImportExport && (cancelImportExport.onclick = () => importExportModal && (importExportModal.style.display = 'none'));
  importFile && (importFile.onchange = handleImport);
  
  (() => {
    const REMIND_DAYS = 7;
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const BACKUP_BTN_ID = 'importExportBtn';
    const WRAP_CHECK_INTERVAL_MS = 300;
    const WRAP_CHECK_TIMEOUT_MS = 5000;

    const addBadge = (btn) => {
      if (!btn) return;
      if (btn.querySelector('.backup-exclaim')) return;
      const span = document.createElement('span');
      span.className = 'backup-exclaim';
      span.setAttribute('aria-hidden', 'true');
      span.textContent = '!';
      btn.appendChild(span);
    };

    const removeBadge = (btn) => {
      if (!btn) return;
      const b = btn.querySelector('.backup-exclaim');
      if (b) b.remove();
    };

    const shouldShowBadgeForCurrentProfile = () => {
      try {
        if (!isStorageAllowed) return false;
        const pd = getProfileData();
        if (!pd) return false;
        pd.backup_meta ||= {};
        const last = Number(pd.backup_meta.last_backup_ts || 0);
        if (!last) return true;
        const days = (Date.now() - last) / MS_PER_DAY;
        return days >= REMIND_DAYS;
      } catch (e) {
        console.error('shouldShowBadgeForCurrentProfile error', e);
        return false;
      }
    };

    const updateBadgeForCurrentProfile = () => {
      try {
        const btn = document.getElementById(BACKUP_BTN_ID) || document.getElementById('importExportBtn');
        if (!btn) return;
        if (shouldShowBadgeForCurrentProfile()) addBadge(btn);
        else removeBadge(btn);
      } catch (e) {
        console.error('updateBadgeForCurrentProfile error', e);
      }
    };

    const tryWrapExport = () => {
      try {
        if (window.__backupBadgeWrapped) return true;
        const orig = window.exportProgress;
        if (typeof orig !== 'function') return false;

        window.exportProgress = function wrappedExportProgress(...args) {
          try {
            if (isStorageAllowed) {
              const pd = getProfileData();
              pd.backup_meta ||= {};
              pd.backup_meta.last_backup_ts = Date.now();
              saveProfiles();
            }
          } catch (err) {
            console.warn('Failed to mark backup timestamp before export', err);
          }
          const res = orig.apply(this, args);
          setTimeout(updateBadgeForCurrentProfile, 200);
          return res;
        };

        window.__backupBadgeWrapped = true;
        return true;
      } catch (e) {
        console.error('tryWrapExport error', e);
        return false;
      }
    };

    const waitAndWrapExportIfNeeded = () => {
      if (tryWrapExport()) return;
      const start = Date.now();
      const int = setInterval(() => {
        if (tryWrapExport() || Date.now() - start > WRAP_CHECK_TIMEOUT_MS) {
          clearInterval(int);
        }
      }, WRAP_CHECK_INTERVAL_MS);
    };

    const attachFallbackButtonHook = () => {
      const btn = document.getElementById(BACKUP_BTN_ID) || document.getElementById('importExportBtn');
      if (!btn) return;
      if (btn.__backupFallbackAttached) return;
      btn.addEventListener('click', () => {
        try {
          if (isStorageAllowed) {
            const pd = getProfileData();
            pd.backup_meta ||= {};
            pd.backup_meta.last_backup_ts = Date.now();
            saveProfiles();
          }
        } catch (e) { /* ignore */ }
        setTimeout(updateBadgeForCurrentProfile, 200);
      });
      btn.__backupFallbackAttached = true;
    };

    const onReady = () => {
      waitAndWrapExportIfNeeded();
      attachFallbackButtonHook();
      setTimeout(updateBadgeForCurrentProfile, 200);
      setInterval(updateBadgeForCurrentProfile, 60 * 60 * 1000);
      window.addEventListener('storage', (e) => {
        if (e.key === 'checklist_profiles') {
          setTimeout(updateBadgeForCurrentProfile, 200);
        }
      });
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady);
    else onReady();

    window.updateBackupBadge = updateBadgeForCurrentProfile;
  })();  

  // --- Filters & Buttons --- 
  toggleDailyBtn && (toggleDailyBtn.onclick = () => {
    hideCompletedState.daily = !hideCompletedState.daily;
    toggleDailyBtn.textContent = hideCompletedState.daily ? 'Show Completed' : 'Hide Completed';
    toggleDailyBtn.setAttribute('aria-pressed', (!hideCompletedState.daily).toString());
    applyCompletedFilter('daily');
  });

  toggleWeeklyBtn && (toggleWeeklyBtn.onclick = () => {
    hideCompletedState.weekly = !hideCompletedState.weekly;
    toggleWeeklyBtn.textContent = hideCompletedState.weekly ? 'Show Completed' : 'Hide Completed';
    toggleWeeklyBtn.setAttribute('aria-pressed', (!hideCompletedState.weekly).toString());
    applyCompletedFilter('weekly');
  });

  btnSelectAllDaily && (btnSelectAllDaily.onclick = () => selectAll('daily'));
  btnDeselectAllDaily && (btnDeselectAllDaily.onclick = () => deselectAll('daily'));
  btnSelectAllWeekly && (btnSelectAllWeekly.onclick = () => selectAll('weekly'));
  btnDeselectAllWeekly && (btnDeselectAllWeekly.onclick = () => deselectAll('weekly'));

  if (dailyFilterInput) dailyFilterInput.oninput = () => applyCompletedFilter('daily');
  if (weeklyFilterInput) weeklyFilterInput.oninput = () => applyCompletedFilter('weekly');

  // --- Custom Category Modals ---
  if (addCategoryBtn) addCategoryBtn.onclick = () => {
    newCategoryNameInput.value = '';
    addCategoryModal.style.display = 'flex';
    setTimeout(() => newCategoryNameInput.focus(), 100);
    scrollModalIntoView(addCategoryModal);
  };
  
  if (createCategoryBtn) createCategoryBtn.onclick = () => {
    let name = newCategoryNameInput.value.trim();
    if (!name) return alert('Please enter a category name');

    if (name.length > 25) {
      alert('Category name must be 25 characters or less.');
      name = name.substring(0, 25);
      newCategoryNameInput.value = name;
      newCategoryNameInput.focus();
      return;
    }

    const id = createCategory(name);
    if (!id) return;

    addCategoryModal.style.display = 'none';
    renderCategories();
  };

  if (addCustomTaskBtn) addCustomTaskBtn.onclick = () => {
    if (!currentCategoryId) return;

    let label = customTaskLabel.value.trim();
    const color = customTaskColor.value;
    const maxProgress = Math.max(1, Math.min(1000, parseInt(customTaskMaxProgress.value) || 1));
    const resetType = customTaskReset.value;

    if (!label) return alert('Please enter a task label');

    if (label.length > 50) {
      alert('Task label must be 50 characters or less.');
      label = label.substring(0, 50);
      customTaskLabel.value = label;
      customTaskLabel.focus();
      return;
    }

    const task = addTaskToCategory(currentCategoryId, label, color, maxProgress, resetType);
    if (!task) return;

    addCustomTaskModal.style.display = 'none';
    renderCategories();
  };
  if (closeCustomTaskModal) closeCustomTaskModal.onclick = () => addCustomTaskModal.style.display = 'none';
  
  if (closeCategoryModal) {
    closeCategoryModal.onclick = () => {
      addCategoryModal.style.display = 'none';
      newCategoryNameInput.value = '';
    };
  }
  if (addCategoryModal) {
    addCategoryModal.onclick = (e) => {
      if (e.target === addCategoryModal) {
        addCategoryModal.style.display = 'none';
        newCategoryNameInput.value = '';
      }
    };
  }

  // --- Reset Data ---
  resetSiteDataBtn && (resetSiteDataBtn.onclick = () => {
    const sure = confirm('Are you sure you want to reset ALL site data? (localStorage)\nThis action is irreversible.');
    if (!sure) return;
    localStorage.clear();
    alert('All site data has been cleared!\nThe page will now reload.');
    location.reload();
  });

  // --- Switching (Global/SEA) ---
  const pageTitle = document.getElementById('page-title');
  let dayCountMode = localStorage.getItem('dayCountMode') || 'global';
  const getRegion = () => dayCountMode === 'sea' ? 'SEA' : 'NA';
  
  const getDailyResetHour = () => getRegion() === 'SEA' ? 22 : 7;

  const getWeeklyResetDay = () => getRegion() === 'SEA' ? 0 : 1;

  const getWeeklyResetHour = () => getRegion() === 'SEA' ? 22 : 7;

  const updateTitle = () => {
    const now = new Date();

    let day;
    let prefix;

    if (dayCountMode === 'sea') {
      const seaRelease = new Date('2025-12-17T22:00:00Z');
      day = Math.floor((now - seaRelease) / 86400000) + 1;
      prefix = 'SEA';
    } else {
      const globalLaunch = new Date('2025-10-09T07:00:00Z');
      day = Math.floor((now - globalLaunch) / 86400000) + 1;
      prefix = 'Global';
    }
    pageTitle.textContent = `Blue Protocol: Star Resonance Checklist (${prefix} Day #${day})`;
  };

  const saveDayCountMode = () => {
    localStorage.setItem('dayCountMode', dayCountMode);
  };

  updateTitle();

  const toggleMode = () => {
    dayCountMode = dayCountMode === 'sea' ? 'global' : 'sea';
    saveDayCountMode();
    updateTitle();
    currentTZ = dayCountMode === 'sea' ? 'Asia/Bangkok' : 'America/Noronha';
    localStorage.setItem(TZ_STORAGE_KEY, currentTZ);
    updateServerTime();
    timers.forEach(t => t.update());

    const showToast = (message) => {
      const toast = document.createElement('div');
      toast.textContent = message;
      toast.style.position = 'fixed';
      toast.style.bottom = '30px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%) scale(0.9)';
      toast.style.padding = '14px 28px';
      toast.style.borderRadius = '16px';
      toast.style.color = '#fff';
      toast.style.fontWeight = '700';
      toast.style.fontSize = '1rem';
      toast.style.zIndex = '10000';
      toast.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.6)';
      toast.style.opacity = '0';
      toast.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      toast.style.pointerEvents = 'none';

      const isSEA = message.includes('SEA');
      toast.style.background = isSEA
        ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)'
        : 'linear-gradient(135deg, #506aff, #7b9fff)';

      document.body.appendChild(toast);

      requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) scale(1)';
      });

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) scale(0.95)';
        toast.addEventListener('transitionend', () => toast.remove());
      }, 2200);
    };

    showToast(`✅ Switched to ${dayCountMode === 'sea' ? 'SEA' : 'Global'}!`);
  };

  pageTitle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMode();
  });

  pageTitle.addEventListener('touchstart', (e) => {
    e.preventDefault();
    toggleMode();
  });

  class EventTimer {
    constructor(id, configId, baseLabel) {
      this.el = $(id);
      this.cfg = EVENT_CONFIGS.find(c => c.id === configId);
      this.baseLabel = baseLabel;
      this.nameEl = this.el.querySelector('.name');
      this.cnt = this.el.querySelector('.countdown');
    }

    update(now = new Date()) {
      if (!this.cfg) {
        this.cnt.textContent = 'Error';
        return;
      }

      const region = getRegion();
      const regionLabel = region === 'NA' ? 'Global' : 'SEA';
      this.nameEl.textContent = `${this.baseLabel} (${regionLabel})`;

      const nextStart = calculateNextEventTime(this.cfg, region);
      const currentEnd = calculateCurrentEventEnd(this.cfg, region);
      const active = isEventActive(this.cfg, region);

      const target = active && currentEnd ? currentEnd : nextStart;
      const diff = Math.max(0, target - now);

      const o = {
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000)
      };

      const formatted = o.d > 0 ? `${o.d}d ${o.h}h ${o.m}m` :
                        o.h > 0 ? `${o.h}h ${o.m}m ${o.s}s` :
                        o.m > 0 ? `${o.m}m ${o.s}s` : `${o.s}s`;

      this.cnt.textContent = active ? `${formatted} left` : `${formatted} until ${this.baseLabel.includes('Reset') || this.baseLabel.includes('Vaults') ? 'reset' : 'start'}`;
      this.el.classList.toggle('active', active);
    }
  }

  const DEFAULT_REGION = 'NA';

  const EVENT_CONFIGS = [
    {
      id: 'daily-reset',
      schedule: {
        NA: { days: [0,1,2,3,4,5,6], hour: 7, minute: 0 },
        SEA: { days: [0,1,2,3,4,5,6], hour: 22, minute: 0 }
      }
    },
    {
      id: 'weekly-reset',
      schedule: {
        NA: { days: [1], hour: 7, minute: 0 },
        SEA: { days: [0], hour: 22, minute: 0 }
      }
    },
    {
      id: 'world-boss',
      schedule: {
        NA: { days: [0,1,2,3,4,5,6], hour: 18, minute: 0, durationHours: 6 },
        SEA: { days: [0,1,2,3,4,5,6], hour: 13, minute: 30, durationHours: 1, durationMinutes: 30 }
      }
    },
    {
      id: 'guild-hunt',
      schedule: {
        NA: { days: [5,6,0], hour: 16, minute: 0, durationHours: 14 },
        SEA: { days: [5,6,0], hour: 3, minute: 0, durationHours: 14 }
      }
    },
    {
      id: 'guild-dance',
      schedule: {
        NA: { days: [5], hour: 17, minute: 30, durationHours: 12 },
        SEA: { days: [5], hour: 12, minute: 30, durationHours: 0, durationMinutes: 25 }
      }
    },
    {
      id: 'stimen-vaults',
      schedule: {
        NA: { days: [1], hour: 4, minute: 0, durationHours: 3, intervalWeeks: 2, referenceDate: '2025-10-20', inverted: true },
        SEA: { days: [0], hour: 19, minute: 0, durationHours: 3, intervalWeeks: 2, referenceDate: '2025-12-08', inverted: true }
      }
    }
  ];

  const getWeeksSinceReference = (referenceDate, targetDate) => {
    const ref = new Date(referenceDate + 'T00:00:00Z');
    const diff = targetDate.getTime() - ref.getTime();
    return Math.floor(diff / (7 * 24 * 60 * 60 * 1000));
  };

  const isValidIntervalWeek = (cfg, date, region) => {
    const sch = cfg.schedule[region] || cfg.schedule.NA;
    if (!sch.intervalWeeks || sch.intervalWeeks <= 1 || !sch.referenceDate) return true;
    const weeks = getWeeksSinceReference(sch.referenceDate, date);
    return weeks % sch.intervalWeeks === 0;
  };

  const addDurationToDate = (date, sch) => {
    const res = new Date(date);
    res.setUTCHours(res.getUTCHours() + (sch.durationHours || 0));
    res.setUTCMinutes(res.getUTCMinutes() + (sch.durationMinutes || 0));
    res.setUTCSeconds(0, 0);
    return res;
  };

  const checkEventActiveForDay = (cfg, sch, now, dayOffset, region) => {
    const currentDay = now.getUTCDay();
    const targetDay = (currentDay + dayOffset + 7) % 7;
    if (!sch.days.includes(targetDay)) return null;

    const start = new Date(now);
    start.setUTCDate(start.getUTCDate() + dayOffset);
    start.setUTCHours(sch.hour, sch.minute, 0, 0);

    const end = addDurationToDate(start, sch);

    if (isValidIntervalWeek(cfg, start, region) && now >= start && now < end) {
      return { isActive: true, start, end };
    }
    return null;
  };

  const calculateNextEventTime = (cfg, region = 'NA') => {
    const sch = cfg.schedule[region] || cfg.schedule.NA;
    const now = new Date();
    const currentDay = now.getUTCDay();

    let target = new Date(now);
    target.setUTCHours(sch.hour, sch.minute, 0, 0);

    const passed = now.getUTCHours() > sch.hour || (now.getUTCHours() === sch.hour && now.getUTCMinutes() >= sch.minute);

    let daysToAdd = 0;
    if (!sch.days.includes(currentDay) || passed) {
      for (let i = 1; i <= 7; i++) {
        if (sch.days.includes((currentDay + i) % 7)) {
          daysToAdd = i;
          break;
        }
      }
    }

    target.setUTCDate(target.getUTCDate() + daysToAdd);

    if (sch.intervalWeeks && sch.intervalWeeks > 1 && sch.referenceDate) {
      const weeks = getWeeksSinceReference(sch.referenceDate, target);
      const rem = weeks % sch.intervalWeeks;
      if (rem !== 0) {
        target.setUTCDate(target.getUTCDate() + (sch.intervalWeeks - rem) * 7);
      }
    }

    return target;
  };

  const calculateCurrentEventEnd = (cfg, region = 'NA') => {
    const sch = cfg.schedule[region] || cfg.schedule.NA;
    if (!sch.durationHours && !sch.durationMinutes) return null;
    const now = new Date();
    let check = checkEventActiveForDay(cfg, sch, now, 0, region);
    if (check?.isActive) return check.end;
    check = checkEventActiveForDay(cfg, sch, now, -1, region);
    if (check?.isActive) return check.end;
    return null;
  };

  const isEventActive = (cfg, region = 'NA') => {
    const sch = cfg.schedule[region] || cfg.schedule.NA;
    if (!sch.durationHours && !sch.durationMinutes) return false;
    const now = new Date();
    const today = checkEventActiveForDay(cfg, sch, now, 0, region);
    const yesterday = checkEventActiveForDay(cfg, sch, now, -1, region);
    let active = today?.isActive || yesterday?.isActive;
    if (sch.inverted) active = !active;
    return active;
  };

  const timers = [
    new EventTimer('daily_reset_timer', 'daily-reset', '🔆 Daily Reset'),
    new EventTimer('wb_crusade_timer', 'world-boss', '⚔️ World Boss'),
    new EventTimer('weekly_reset_timer', 'weekly-reset', '⏳ Weekly Reset'),
    new EventTimer('guild_hunt_timer', 'guild-hunt', '🏹 Guild Hunt'),
    new EventTimer('guild_dance_timer', 'guild-dance', '🎉 Guild Dance'),
    new EventTimer('stimen_vaults_timer', 'stimen-vaults', '💎 Stimen Vaults')
  ];

  const startTimerUpdates = () => {
    const updateAll = () => timers.forEach(t => t.update());
    updateAll();
    setInterval(updateAll, 1000);
  };

  const timeDisplay = document.getElementById('timeDisplay');
  const serverTimeEl = document.getElementById('serverTime');

  const TZ_STORAGE_KEY = 'serverTimeTZ';
  const DEFAULT_TZ = 'America/Noronha';
  let currentTZ = localStorage.getItem(TZ_STORAGE_KEY) || DEFAULT_TZ;

  const formatTimeInTZ = (tz) => {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const TZ_LABELS = {
    'America/Noronha': 'Global Time:',
    'Asia/Bangkok': 'SEA Time:'
  };

  const updateServerTime = () => {
    const label = TZ_LABELS[currentTZ] || 'Time:';
    timeDisplay.textContent = `${label} ${formatTimeInTZ(currentTZ)}`;
  };

  serverTimeEl?.addEventListener('click', () => {
    currentTZ = currentTZ === 'Asia/Bangkok' ? 'America/Noronha' : 'Asia/Bangkok';
    localStorage.setItem(TZ_STORAGE_KEY, currentTZ);
    updateServerTime();
  });

  updateServerTime();

  const now = new Date();
  const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

  setTimeout(() => {
    updateServerTime();
    setInterval(updateServerTime, 60000);
  }, msUntilNextMinute);

  setInterval(() => {
    const dailyDone = dailyContainer.querySelectorAll('.task.completed').length;
    const dailyTotal = dailyTaskData.length || 1;
    const weeklyDone = weeklyContainer.querySelectorAll('.task.completed').length;
    const weeklyTotal = weeklyTaskData.length || 1;

    const dailyPct = Math.round((dailyDone / dailyTotal) * 100);
    const weeklyPct = Math.round((weeklyDone / weeklyTotal) * 100);

    document.title = `Daily ${dailyPct}% | Weekly ${weeklyPct}% • BPSR Checklist ✔️`;
  }, 5000);

  // --- GDPR & Version Check ---
  const IPAPI_CACHE_KEY = 'ipapi_cache';
  const IPAPI_CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000;
  const gdprBlocker = document.getElementById('gdpr-blocker');

  const showGdprModal = () => {
    if (gdprModal) {
      gdprModal.style.display = 'flex';
      if (gdprBlocker) {
        gdprBlocker.style.display = 'block';
        setTimeout(() => gdprBlocker.classList.add('visible'), 10);
      }
    }
  };

  const hideGdprModalAndBlocker = () => {
    if (gdprModal) gdprModal.style.display = 'none';
    if (gdprBlocker) {
      gdprBlocker.classList.remove('visible');
      gdprBlocker.style.display = 'none';
    }
  };

  const checkGDPR = async () => {
    try {
      const cached = localStorage.getItem(IPAPI_CACHE_KEY);
      if (cached) {
        const data = JSON.parse(cached);
        if (Date.now() - data.timestamp < IPAPI_CACHE_EXPIRY_MS) {
          if (data.continent_code === 'EU' && !localStorage.getItem('gdpr_consent')) {
            showGdprModal();
          }
          return;
        }
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.status === 429) {
        console.warn('ipapi.co rate limited - skipping GDPR check');
        return;
      }
      if (!res.ok) throw new Error('Failed');

      const json = await res.json();
      localStorage.setItem(IPAPI_CACHE_KEY, JSON.stringify({ timestamp: Date.now(), continent_code: json.continent_code }));

      if (json.continent_code === 'EU' && !localStorage.getItem('gdpr_consent')) {
        showGdprModal();
      }
    } catch (err) {
      console.warn('GDPR check failed or timed out (safe to ignore):', err);
    }
  };

  if (acceptBtn) {
    acceptBtn.onclick = () => {
      localStorage.setItem('gdpr_consent', 'true');
      isStorageAllowed = true;
      hideGdprModalAndBlocker();
    };
  }

  if (rejectBtn) {
    rejectBtn.onclick = () => {
      localStorage.setItem('gdpr_optout', 'true');
      localStorage.clear();
      isStorageAllowed = false;
      hideGdprModalAndBlocker();
      setTimeout(() => {
        document.body.innerHTML = `<div style="position:fixed;inset:0;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:sans-serif;text-align:center;z-index:9999"><h1>Session Closed</h1><p>Privacy opt-out. Enable localStorage to use.</p><button onclick="window.close()" style="margin-top:20px;padding:10px 20px;background:#506aff;color:#fff;border:none;border-radius:5px;cursor:pointer">Close Tab</button></div>`;
      }, 100);
    };
  }

  const getLatestVersion = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch('https://api.github.com/repos/Teawase/blue-protocol-checklist/releases/latest', { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) {
        if (res.status === 403 || res.status === 429) {
          console.warn('GitHub rate limited');
          versionEl.textContent = 'v?.?.?';
          return;
        }
        throw new Error('Failed');
      }
      const latest = await res.json();
      versionEl.textContent = `v${latest.tag_name}`;
    } catch (err) {
      console.warn('Version check failed:', err);
      versionEl.textContent = 'v?.?.?';
    }
  };

  // --- News Modal ---
  const loadChangelogs = async () => {
    if (!changelogsContent) return;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch('https://api.github.com/repos/Teawase/blue-protocol-checklist/releases', { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) {
        if (res.status === 403 || res.status === 429) {
          changelogsContent.textContent = 'Changelogs unavailable (rate limited)';
          return;
        }
        changelogsContent.textContent = 'Failed to load changelogs';
        return;
      }

      const releases = await res.json();
      let html = '';
      (releases || []).slice(0,10).forEach(r => {
        const date = new Date(r.published_at || r.created_at).toLocaleDateString();
        html += `
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin:25px 0 15px">
            <h1 style="margin:0;color:#ffb800;font-size:1.5rem">${r.tag_name}</h1>
            <span style="color:#888;font-size:1.1rem;white-space:nowrap">${date}</span>
          </div>
          <div class="release-body" style="margin-bottom:35px">${marked.parse(r.body || 'No details')}</div>
        `;
      });
      changelogsContent.innerHTML = html || '<p>No updates found.</p>';
    } catch (err) {
      changelogsContent.textContent = 'Changelogs unavailable';
      console.warn('Changelogs load failed:', err);
    }
  };

   newsBtn && (newsBtn.onclick = () => {
    loadChangelogs();
    newsModal.style.display = 'flex';
    scrollModalIntoView(newsModal);
  });
  closeNewsModal && (closeNewsModal.onclick = () => newsModal.style.display = 'none');
  newsModal && (newsModal.onclick = (e) => { if (e.target === newsModal) newsModal.style.display = 'none'; });
  importExportModal && (importExportModal.onclick = (e) => { if (e.target === importExportModal) importExportModal.style.display = 'none'; });
  profilesModal && (profilesModal.onclick = (e) => { if (e.target === profilesModal) profilesModal.style.display = 'none'; });

  // --- Custom Backgrounds ---
  {
    const modal = document.getElementById('wallpaper-modal');
    const btn = document.getElementById('wallpaperBtn');
    const input = document.getElementById('wallpaper-url');
    const previewImg = document.getElementById('preview-img');
    const apply = document.getElementById('apply-wallpaper');
    const reset = document.getElementById('reset-wallpaper');
    const close = document.getElementById('close-wallpaper-modal');

    const KEY = 'custom_wallpaper';
    let url = localStorage.getItem(KEY);

    const applyWallpaper = (newUrl) => {
      document.body.style.backgroundImage = newUrl ? `url("${newUrl}")` : '';
      document.body.classList.toggle('custom-wallpaper', !!newUrl);
      if (newUrl) {
        localStorage.setItem(KEY, newUrl);
      } else {
        localStorage.removeItem(KEY);
      }
      url = newUrl;
    };

    if (url) {
      applyWallpaper(url);
    }

    const updatePreview = (imageUrl) => {
      if (imageUrl) {
        previewImg.src = imageUrl;
        previewImg.style.display = 'block';
      } else {
        previewImg.style.display = 'none';
        previewImg.src = '';
      }
    };

    input.addEventListener('input', () => {
      const val = input.value.trim();
      updatePreview(val);
    });

    previewImg.onerror = () => {
      previewImg.style.display = 'none';
      previewImg.src = '';
    };

    btn.onclick = () => {
      input.value = url || '';
      updatePreview(url || '');
      modal.style.display = 'flex';
      setTimeout(() => input.focus(), 50);
    };

    modal.onclick = (e) => {
      if (e.target === modal || e.target === close) {
        modal.style.display = 'none';
      }
    };

    apply.onclick = () => {
      const val = input.value.trim();

      if (!val) {
        alert('Enter an image/gif URL');
        return;
      }

      try {
        const urlObj = new URL(val);
        const pathname = urlObj.pathname.toLowerCase();
        const hasImageExt = /\.(jpe?g|png|gif|webp|bmp|avif|svg)$/i.test(pathname);

        if (!hasImageExt) {
          alert('Please provide a direct link (.jpg, .png, .gif, .webp, .bpm, .avif, .svg)');
          return;
        }

        const blockedHosts = ['imgur.com', 'flickr.com', 'deviantart.com'];
        const isBlockedHost = blockedHosts.some(host => urlObj.hostname.includes(host));

        if (isBlockedHost && !hasImageExt) {
          alert('This appears to be a gallery/page link, not a direct link. Please use the direct URL.');
          return;
        }
      } catch (e) {
        alert('Invalid URL. Please enter a valid direct link.');
        return;
      }
  
      applyWallpaper(val);
      modal.style.display = 'none';
    };

    reset.onclick = () => {
      applyWallpaper(null);
      input.value = '';
      updatePreview('');
      modal.style.display = 'none';
    };
  }

  // --- Profile Portraits ---
  (() => {
    const PORTRAIT_KEY = 'bp_portrait_';

    const injectPortraits = () => {
      const list = document.getElementById('profiles-list');
      if (!list) return;

      list.querySelectorAll('li').forEach(li => {
        if (li.querySelector('.profile-portrait')) return;

        const nameSpan = li.querySelector('span');
        if (!nameSpan) return;
        const profileName = nameSpan.textContent.trim();

        const portrait = document.createElement('div');
        portrait.className = 'profile-portrait';

        const saved = localStorage.getItem(PORTRAIT_KEY + profileName);
        if (saved) {
          portrait.style.backgroundImage = `url(${saved})`;
        } else {
          portrait.classList.add('default');
        }

        portrait.onclick = (e) => {
          e.stopPropagation();
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.onchange = ev => {
            const file = ev.target.files[0];
            if (!file) return;
            if (file.size > 150 * 1024) {
              alert('File too large! Maximum allowed size is 150KB.');
              return;
            }
            const reader = new FileReader();
            reader.onload = e => {
              const url = e.target.result;
              portrait.style.backgroundImage = `url(${url})`;
              portrait.classList.remove('default');
              localStorage.setItem(PORTRAIT_KEY + profileName, url);
            };
            reader.readAsDataURL(file);
          };
          input.click();
        };

        li.insertBefore(portrait, li.firstChild);
      });
    };

    const originalProfilesBtn = profilesBtn.onclick;
    profilesBtn.onclick = () => {
      originalProfilesBtn();
      setTimeout(injectPortraits, 50);
    };

    const originalCreateProfileBtn = createProfileBtn.onclick;
    createProfileBtn.onclick = () => {
      originalCreateProfileBtn();
      setTimeout(injectPortraits, 100);
    };

    setTimeout(injectPortraits, 100);
  })();

  // --- Back to Top Button ---
  const backToTopBtn = $('backToTop');

  const toggleBackToTop = () => {
    if (window.scrollY > 600) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  if (backToTopBtn) {
    backToTopBtn.onclick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();
  }

  // --- WelcomeTips ---
  const showWelcomeTips = () => {
    if (!isStorageAllowed || localStorage.getItem('seenTips')) return;

    const gdprModal = $('gdpr-modal');
    if (gdprModal && gdprModal.style.display !== 'none') {
      const checkInterval = setInterval(() => {
        if (gdprModal.style.display === 'none') {
          clearInterval(checkInterval);
          startWelcomeTimer();
        }
      }, 500);
    } else {
      startWelcomeTimer();
    }
  };

  const startWelcomeTimer = () => {
    setTimeout(() => {
      document.body.insertAdjacentHTML('beforeend', `
        <div id="welcomeTip" role="dialog" aria-labelledby="welcomeTitle" aria-modal="true">
          <div class="welcome-content">
            <center><h3 id="welcomeTitle">Welcome to BPSR Checklist...</h3></center>
            <p>
              <center><h3>Desktop Controls:</h3></center>
              <center><h2>• Left-Click or Hold → add (+1)</h2></center>
              <center><h2>• Right-Click or Hold → remove (-1)</h2></center>
              <center><h3>Mobile Controls:</h3></center>
              <center><h2>• Tap or Hold → add (+1)</h2></center>
              <center><h2>• Double Tap + Hold → remove (-1)</h2></center>
            </p>
            <button id="welcomeClose" aria-label="Close welcome tips">Got it!</button>
          </div>
        </div>
      `);

      const tip = document.getElementById('welcomeTip');
      const closeBtn = document.getElementById('welcomeClose');

      const closeTip = () => {
        if (window.innerWidth >= 640) {
          tip.classList.add('closing-desktop');
        } else {
          tip.classList.add('closing-mobile');
        }

        tip.addEventListener('animationend', () => {
          tip.remove();
          localStorage.setItem('seenTips', 'true');
        }, { once: true });
      };

      closeBtn.onclick = closeTip;

      tip.onclick = (e) => { if (e.target === tip) closeTip(); };

      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          closeTip();
          document.removeEventListener('keydown', escHandler);
        }
      });
    }, 2500);
  };

  // --- Init ---
  const init = async () => {
    document.addEventListener('contextmenu', e => e.preventDefault());
    updateTitle();
    await checkGDPR();
    setTimeout(getLatestVersion, 3000);
    if (versionEl) {
      versionEl.style.cursor = 'pointer';
      versionEl.title = 'Open releases on GitHub';
      versionEl.onclick = () => window.open('https://github.com/Teawase/blue-protocol-checklist/releases', '_blank');
    }

    (() => {
      const checkNewVersion = async () => {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);

          const r = await fetch('https://api.github.com/repos/Teawase/blue-protocol-checklist/releases/latest?t=' + Date.now(), {
            cache: "no-store",
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (!r.ok) return;

          const d = await r.json();
          if (d.tag_name && d.tag_name !== current) location.reload(true);
        } catch (e) {
        }
      };

      setInterval(checkNewVersion, 60 * 60 * 1000);

      window.checkNewVersion = checkNewVersion;
    })();

    loadProfiles();
    cleanupOrphanedKeys();
    reloadCurrentProfileData();
    startTimerUpdates();
    showWelcomeTips();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();

// Season 2 countdown
document.addEventListener('DOMContentLoaded', () => {
  const season2Date = new Date('2026-01-15T00:00:00Z');

  const countdownEl = document.getElementById('season2_countdown');
  if (!countdownEl) return;

  const updateCountdown = (now = new Date()) => {
    const diffMs = season2Date - now;
    if (diffMs <= 0) {
      countdownEl.textContent = 'Season 2 is live!';
      countdownEl.style.color = '#00ff00';
      return;
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    countdownEl.textContent = `Season 2 starts in ${days} day${days === 1 ? '' : 's'}`;
  };

  updateCountdown();

  setInterval(updateCountdown, 3600000);
});

