(() => {
  // --- Daily Tasks ---
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

  // --- Weekly Tasks ---
  const weeklyTaskData = [
    { id: "weekly_pioneer_rewards", label: "Pioneer Awards (Pioneer NPC in town)", color: "yellow", maxProgress: 1 },
    { id: "weekly_reclaim_hub", label: "Reclaim Hub (If you missed a Daily/Weekly)", color: "grey", maxProgress: 1 },
    { id: "weekly_guild_activity_rewards", label: "Guild Activity Rewards (Reach 7000/7000 Points)", color: "orange", maxProgress: 1 },
    { id: "weekly_guild_hunt_extended", label: "Guild Hunt (Available on Fridays, Saturdays, Sundays)", color: "orange", maxProgress: 3 },
    { id: "weekly_guild_dance", label: "Guild Dance (Available on Friday)", color: "orange", maxProgress: 1 },
    { id: "weekly_world_boss_crusade_points", label: "World Boss Crusade (Earn 1200 Points)", color: "brown", maxProgress: 1 },
    { id: "weekly_clear_dungeons_normal", label: "Dungeons (Normal/Hard) | Clear for Reforge Stones", color: "purple", maxProgress: 20 },
    { id: "weekly_clear_dungeons_master_1_5", label: "Dungeons (Master 1-5) | Clear for Reforge Stones", color: "purple", maxProgress: 20 },
    { id: "weekly_clear_dungeons_master_6_20", label: "Dungeons (Master 6-20) | Clear for Reforge Stones", color: "purple", maxProgress: 20 },
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
    { id: "weekly_ice_dragon_nightmare", label: "Ice Dragon Raid - Nightmare (22300+ Ability Score)", color: "blue", maxProgress: 1 },
    { id: "weekly_dark_dragon_normal", label: "Bone Dragon Raid - Easy (15210+ Ability Score)", color: "dark_purple", maxProgress: 1 },
    { id: "weekly_dark_dragon_hard", label: "Bone Dragon Raid - Hard (19040+ Ability Score)", color: "dark_purple", maxProgress: 1 },
    { id: "weekly_dark_dragon_nightmare", label: "Bone Dragon Raid - Nightmare (24180+ Ability Score)", color: "dark_purple", maxProgress: 1 },
    { id: "weekly_light_dragon_normal", label: "Light Dragon Raid - Easy (16140+ Ability Score)", color: "gold", maxProgress: 1 },
    { id: "weekly_light_dragon_hard", label: "Light Dragon Raid - Hard (20670+ Ability Score)", color: "gold", maxProgress: 1 },
    { id: "weekly_light_dragon_nightmare", label: "Light Dragon Raid - Nightmare (27790+ Ability Score)", color: "gold", maxProgress: 1 }
  ];

  // --- DOM ---
  const $ = id => document.getElementById(id);

  // --- Profiles ---
  let profiles = {
    current: "default",
    list: ["default"],
    data: { default: { weekly_tasks: {} } }
  };

  let isStorageAllowed = localStorage.getItem('gdpr_optout') !== 'true';

  // --- Custom Categories ---
  let customCategories = {};

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
  };

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
    const task = {
      id: `task_${Date.now()}`,
      label,
      color,
      maxProgress: Math.max(1, Math.min(1000, maxProgress)),
      resetType, // 'permanent' | 'daily' | 'weekly'
      createdAt: new Date().toISOString()
    };
    customCategories[categoryId].tasks.push(task);
    saveCustomCategories();
    return task;
  };

  const deleteTaskFromCategory = (categoryId, taskId) => {
    if (!customCategories[categoryId]) return;
    customCategories[categoryId].tasks = customCategories[categoryId].tasks.filter(t => t.id !== taskId);
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

  // --- DOM elements ---
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

  // --- Category modal elements ---
  const addCategoryBtn = $('addCategoryBtn');
  const addCategoryModal = $('add-category-modal');
  const newCategoryNameInput = $('new-category-name');
  const createCategoryBtn = $('create-category-btn');
  const closeCategoryModal = $('close-category-modal');

  // --- Custom task modal elements ---
  const addCustomTaskModal = $('add-custom-task-modal');
  const customTaskLabel = $('custom-task-label');
  const customTaskColor = $('custom-task-color');
  const customTaskMaxProgress = $('custom-task-maxProgress');
  const customTaskReset = $('custom-task-reset');
  const categoryNameDisplay = $('category-name-display');
  const addCustomTaskBtn = $('add-custom-task-btn');
  const closeCustomTaskModal = $('close-custom-task-modal');

  // --- News modal ---
  const newsBtn = $('newsBtn');
  const newsModal = $('news-modal');
  const changelogsContent = $('changelogs-content');
  const closeNewsModal = $('close-news-modal');

  // --- Version ---
  const versionEl = $('version');

  // --- Reset button ---
  const resetSiteDataBtn = $('resetSiteDataBtn');

  let hideCompletedState = { daily: true, weekly: true };
  let currentCategoryId = null;

  // --- Hold increment/decrement ---
  const HOLD_INTERVAL_MS = 150;
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

  // --- UI: profiles ---
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

      if (profiles.list.length > 1) {
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => {
          if (profiles.list.length === 1) { alert('You cannot delete your only profile!'); return; }
          if (confirm(`Delete "${name}" and all its progress? This cannot be undone.`)) {
            delete profiles.data[name];
            profiles.list = profiles.list.filter(n => n !== name);
            if (profiles.current === name) profiles.current = profiles.list[0] || 'default';
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

  profilesBtn && (profilesBtn.onclick = () => {
    currentProfileNameEl.textContent = profiles.current;
    renderProfilesList();
    profilesModal.style.display = 'flex';
  });
  closeProfilesModal && (closeProfilesModal.onclick = () => profilesModal.style.display = 'none');
  createProfileBtn && (createProfileBtn.onclick = () => {
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
  });

  // --- Profile storage helpers ---
  const getProfileData = () => profiles.data[profiles.current] || (profiles.data[profiles.current] = { weekly_tasks: {} });

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
      resetDailyCustomTasks();
      saveProfiles();
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
      pd.weekly_tasks = {};
      resetWeeklyCustomTasks();
      pd.weekly_reset_date = date;
      saveProfiles();
      if (pd.weekly_reset_date) setTimeout(() => alert('Weekly reset!'), 500);
    }
  };

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

  const createTaskElement = (task, section) => {
    const div = document.createElement('div');
    div.className = `task ${task.color}`;
    div.tabIndex = 0;
    div.dataset.id = task.id;
    const max = task.maxProgress || 1;
    const current = getCount(task.id, section);
    const completed = current === max;

    let innerHTML = `<label>${task.label}`;
    if (max > 1) innerHTML += ` <span class="progress-badge">${current}/${max}</span>`;
    innerHTML += '</label>';
    div.innerHTML = innerHTML;
    div.classList.toggle('completed', completed);

    // --- Input and hold ---
    let isPressedLeft = false, holdTimeoutLeft = null, holdStartedLeft = false;
    let isPressedRight = false, holdTimeoutRight = null, holdStartedRight = false;
    let lastTap = 0, isDecrementHoldMode = false, decrementHoldTimeout = null;
    const DOUBLE_TAP_THRESHOLD = 300;

    const handleDoubleTap = (e) => {
      const now = Date.now();
      if (now - lastTap < DOUBLE_TAP_THRESHOLD) {
        e.preventDefault();
        isDecrementHoldMode = true;
        decrementHoldTimeout = setTimeout(() => {
          if (isDecrementHoldMode) {
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
          if (isPressedLeft) {
            holdStartedLeft = true;
            toggleTask(div, section, true);
            startHoldIncrement(div, section);
            if (e.pointerId !== undefined) div.setPointerCapture(e.pointerId);
          }
        }, 300);
      } else if (e.button === 2) {
        isPressedRight = true;
        holdTimeoutRight = setTimeout(() => {
          if (isPressedRight) {
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
        if (!holdStartedLeft) toggleTask(div, section);
        holdStartedLeft = false;
      } else if (e.button === 2) {
        isPressedRight = false;
        clearTimeout(holdTimeoutRight);
        stopHoldDecrement();
        if (!holdStartedRight) decrementTask(div, section);
        holdStartedRight = false;
      }
    };

    const handleMouseLeave = (e) => {
      e.preventDefault();
      isPressedLeft = isPressedRight = false;
      clearTimeout(holdTimeoutLeft);
      clearTimeout(holdTimeoutRight);
      stopHoldIncrement(); stopHoldDecrement();
      holdStartedLeft = holdStartedRight = false;
    };

    const handleTouchStart = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMouseDown(new MouseEvent('mousedown', { clientX: touch.clientX, clientY: touch.clientY, button: 0 }));
      handleDoubleTap(e);
    };

    const handleTouchEnd = (e) => {
      const touch = e.changedTouches[0];
      handleMouseUp(new MouseEvent('mouseup', { clientX: touch.clientX, clientY: touch.clientY, button: 0 }));
      if (isDecrementHoldMode) {
        clearTimeout(decrementHoldTimeout); stopHoldDecrement();
        if (!holdStartedRight) decrementTask(div, section);
        isDecrementHoldMode = false;
      }
    };

    div.onmousedown = handleMouseDown;
    div.onmouseup = handleMouseUp;
    div.onmouseleave = handleMouseLeave;
    div.oncontextmenu = (e) => { e.preventDefault(); return false; };
    div.ontouchstart = handleTouchStart;
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

  // --- Custom task element (category tasks) ---
  const createCustomTaskElement = (categoryId, task) => {
    const div = document.createElement('div');
    div.className = `task ${task.color}`;
    div.tabIndex = 0;
    div.dataset.id = task.id;
    div.dataset.categoryId = categoryId;
    const max = task.maxProgress || 1;
    const current = getCustomTaskCount(categoryId, task.id);
    div.innerHTML = `<label>${task.label}${max>1?` <span class="progress-badge">${current}/${max}</span>`:''}</label>`;
    div.classList.toggle('completed', current === max);

    let isPressedLeft = false, holdTimeoutLeft = null, holdStartedLeft = false;
    let isPressedRight = false, holdTimeoutRight = null, holdStartedRight = false;
    let lastTap = 0, isDecrementHoldMode = false, decrementHoldTimeout = null;
    const DOUBLE_TAP_THRESHOLD = 300;

    const handleDoubleTap = (e) => {
      const now = Date.now();
      if (now - lastTap < DOUBLE_TAP_THRESHOLD) {
        e.preventDefault();
        isDecrementHoldMode = true;
        decrementHoldTimeout = setTimeout(() => {
          if (isDecrementHoldMode) { decrementCustomTask(div, categoryId); startHoldDecrementCustom(div, categoryId); }
        }, 300);
      }
      lastTap = now;
    };

    const handleMouseDown = (e) => {
      e.preventDefault();
      if (e.button === 0) {
        isPressedLeft = true;
        holdTimeoutLeft = setTimeout(() => {
          if (isPressedLeft) { holdStartedLeft = true; toggleCustomTask(div, categoryId, true); startHoldIncrementCustom(div, categoryId); }
        }, 300);
      } else if (e.button === 2) {
        isPressedRight = true;
        holdTimeoutRight = setTimeout(() => {
          if (isPressedRight) { holdStartedRight = true; decrementCustomTask(div, categoryId); startHoldDecrementCustom(div, categoryId); }
        }, 300);
      }
    };
    const handleMouseUp = (e) => {
      e.preventDefault();
      if (e.button === 0) {
        isPressedLeft = false; clearTimeout(holdTimeoutLeft); stopHoldIncrement(); if (!holdStartedLeft) toggleCustomTask(div, categoryId); holdStartedLeft = false;
      } else if (e.button === 2) {
        isPressedRight = false; clearTimeout(holdTimeoutRight); stopHoldDecrement(); if (!holdStartedRight) decrementCustomTask(div, categoryId); holdStartedRight = false;
      }
    };
    const handleMouseLeave = (e) => {
      e.preventDefault(); isPressedLeft = false; isPressedRight = false; clearTimeout(holdTimeoutLeft); clearTimeout(holdTimeoutRight); stopHoldIncrement(); stopHoldDecrement(); holdStartedLeft = holdStartedRight = false;
    };
    const handleTouchStart = (e) => { e.preventDefault(); const t = e.touches[0]; handleMouseDown(new MouseEvent('mousedown', {clientX:t.clientX, clientY:t.clientY, button:0})); handleDoubleTap(e); };
    const handleTouchEnd = (e) => { const t = e.changedTouches[0]; handleMouseUp(new MouseEvent('mouseup', {clientX:t.clientX, clientY:t.clientY, button:0})); if (isDecrementHoldMode) { clearTimeout(decrementHoldTimeout); stopHoldDecrement(); if (!holdStartedRight) decrementCustomTask(div, categoryId); isDecrementHoldMode = false; } };

    div.onmousedown = handleMouseDown;
    div.onmouseup = handleMouseUp;
    div.onmouseleave = handleMouseLeave;
    div.ontouchstart = handleTouchStart;
    div.ontouchend = handleTouchEnd;
    div.ontouchcancel = handleTouchEnd;
    div.oncontextmenu = (e) => { e.preventDefault(); return false; };

    div.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCustomTask(div, categoryId); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (div.previousElementSibling) div.previousElementSibling.focus(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); if (div.nextElementSibling) div.nextElementSibling.focus(); }
    };

    // --- Custom tasks controls ---
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

  const startHoldIncrementCustom = (el, categoryId) => {
    if (holdInterval) clearInterval(holdInterval);
    holdInterval = setInterval(() => toggleCustomTask(el, categoryId, true), HOLD_INTERVAL_MS);
  };
  const startHoldDecrementCustom = (el, categoryId) => {
    if (holdInterval) clearInterval(holdInterval);
    holdInterval = setInterval(() => decrementCustomTask(el, categoryId), HOLD_INTERVAL_MS);
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

  // --- Tasks toggle/decrement ---
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

  // --- Renderers ---
  const renderTasks = (container, data, section) => {
    container.innerHTML = '';
    data.forEach(t => container.appendChild(createTaskElement(t, section)));
    updateCounter(section);
  };

  const renderCategories = () => {
    customCategoriesContainer.innerHTML = '';
    const ids = Object.keys(customCategories);

    // --- Apply layout class: odd => single-column, even => two-column ---
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

  // --- Counters & progress UI ---
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
        confetti({ particleCount: 500, spread: 360, origin: { x: 0.5, y: -0.5 } });
      }
    } else {
      if (msg) msg.style.display = 'none';
      if (progress) progress.dataset.confettiDone = '';
    }
  };

  // --- Filters & select all ---
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
    const data = section === 'daily' ? dailyTaskData : weeklyTaskData;
    const container = section === 'daily' ? dailyContainer : weeklyContainer;
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
    const data = section === 'daily' ? dailyTaskData : weeklyTaskData;
    const container = section === 'daily' ? dailyContainer : weeklyContainer;
    container.querySelectorAll('.task').forEach(t => {
      const id = t.dataset.id;
      const task = data.find(tt => tt.id === id);
      if (!task) return;
      if (section === 'daily') setDailyCount(id, 0); else setWeeklyCount(id, 0);
      updateTaskUI(t, 0, task.maxProgress || 1);
    });
    updateCounter(section); applyCompletedFilter(section);
  };

  // --- Import/Export ---
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

  // --- Category modal ---
  if (addCategoryBtn) addCategoryBtn.onclick = () => { newCategoryNameInput.value = ''; addCategoryModal.style.display = 'flex'; setTimeout(()=>newCategoryNameInput.focus(),100); };
  if (createCategoryBtn) createCategoryBtn.onclick = () => {
    const name = newCategoryNameInput.value.trim(); if (!name) return alert('Please enter a category name'); createCategory(name); addCategoryModal.style.display = 'none'; renderCategories();
  };
  if (closeCategoryModal) closeCategoryModal.onclick = () => addCategoryModal.style.display = 'none';

  // --- Custom task modal handlers ---
  if (addCustomTaskBtn) addCustomTaskBtn.onclick = () => {
    if (!currentCategoryId) return;
    const label = customTaskLabel.value.trim();
    const color = customTaskColor.value;
    const maxProgress = Math.max(1, Math.min(1000, parseInt(customTaskMaxProgress.value) || 1));
    const resetType = customTaskReset.value;
    if (!label) return alert('Please enter a task label');
    addTaskToCategory(currentCategoryId, label, color, maxProgress, resetType);
    addCustomTaskModal.style.display = 'none';
    renderCategories();
  };
  if (closeCustomTaskModal) closeCustomTaskModal.onclick = () => addCustomTaskModal.style.display = 'none';

  // --- Title and version ---
  const updateTitle = () => {
    const launch = new Date('2025-10-09T05:00:00-02:00');
    const now = new Date();
    const day = Math.floor((now - launch) / 86400000) + 1;
    $('page-title').textContent = `Blue Protocol: Star Resonance Checklist (Day #${day})`;
  };

  const getLatestVersion = async () => {
    try {
      const res = await fetch('https://api.github.com/repos/Teawase/blue-protocol-checklist/releases/latest');
      if (!res.ok) throw new Error('Failed');
      const latest = await res.json();
      versionEl.textContent = `v${latest.tag_name}`;
    } catch (err) {
      console.error('Failed to fetch latest version:', err);
      versionEl.textContent = 'v?.?.?';
    }
  };

  // --- Time helpers and event timers ---
  const parseNoronha = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Noronha' }));
  const diffSec = (future, now = parseNoronha()) => Math.max(0, Math.floor((future - now) / 1000));
  const format = o => `${o.d?o.d+'d ':''}${o.h||o.d?o.h+'h ':''}${o.m||o.h||o.d?o.m+'m ':''}${o.s}s`;

  const cloneSet = (base, day, h, m) => {
    const d = new Date(base); d.setHours(0,0,0,0);
    while (d.getDay() !== day) d.setDate(d.getDate() + 1);
    d.setHours(h,m,0,0); return d;
  };

  const getDailyReset = now => { const r = new Date(now); r.setHours(5,0,0,0); return now >= r ? new Date(r.getTime()+864e5) : r; };
  const getWeeklyReset = now => { const r = new Date(now); r.setHours(5,0,0,0); const diff = ((1 - r.getDay() + 7) % 7) || (now.getHours() >= 5 ? 7 : 0); r.setDate(r.getDate()+diff); return r; };
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

  class EventTimer {
    constructor(id, getPeriod, label) { this.el = $(id); this.getPeriod = getPeriod; this.label = label; this.cnt = this.el.querySelector('.countdown'); }
    update(now = parseNoronha()) {
      let period;
      try { period = this.getPeriod(now); } catch { this.cnt.textContent = 'Error'; return; }
      const { start, end } = period.start === undefined ? { start: null, end: period } : period;
      const target = now >= start && now < end ? end : start || end;
      const diff = diffSec(target, now);
      const d = Math.floor(diff/86400), h = Math.floor(diff%86400/3600), m = Math.floor(diff%3600/60), s = diff%60;
      const active = now >= start && now < end;
      this.cnt.textContent = active ? `${format({d,h,m,s})} left` : `${format({d,h,m,s})} until ${this.label.includes('Reset')||this.label.includes('Vaults') ? 'reset' : 'start'}`;
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

  // --- GDPR + IPAPI caching ---
  const IPAPI_CACHE_KEY = 'ipapi_cache';
  const IPAPI_CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000;

  const checkGDPR = async () => {
    try {
      const cached = localStorage.getItem(IPAPI_CACHE_KEY);
      if (cached) {
        const data = JSON.parse(cached);
        if (Date.now() - data.timestamp < IPAPI_CACHE_EXPIRY_MS) {
          if (data.continent_code === 'EU' && !localStorage.getItem('gdpr_consent')) gdprModal && (gdprModal.style.display = 'flex');
          return;
        }
      }
      const res = await fetch('https://ipapi.co/json/');
      if (res.status === 429) {
        console.warn('Rate limit hit for ipapi.co');
        if (cached) {
          const data = JSON.parse(cached);
          if (data.continent_code === 'EU' && !localStorage.getItem('gdpr_consent')) gdprModal && (gdprModal.style.display = 'flex');
        }
        return;
      } else if (!res.ok) { console.error('IPAPI error', res.status); return; }
      const json = await res.json();
      localStorage.setItem(IPAPI_CACHE_KEY, JSON.stringify({ timestamp: Date.now(), continent_code: json.continent_code }));
      if (json.continent_code === 'EU' && !localStorage.getItem('gdpr_consent')) gdprModal && (gdprModal.style.display = 'flex');
    } catch (err) { console.error('Failed to check GDPR via IPAPI:', err); }
  };

  if (acceptBtn) acceptBtn.onclick = () => { localStorage.setItem('gdpr_consent', 'true'); isStorageAllowed = true; gdprModal.style.display = 'none'; };
  if (rejectBtn) rejectBtn.onclick = () => {
    localStorage.setItem('gdpr_optout', 'true'); localStorage.clear(); isStorageAllowed = false; gdprModal.style.display = 'none';
    setTimeout(() => { document.body.innerHTML = `<div style="position:fixed;inset:0;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:sans-serif;text-align:center;z-index:9999"><h1>Session Closed</h1><p>Privacy opt-out. Enable localStorage to use.</p><button onclick="window.close()" style="margin-top:20px;padding:10px 20px;background:#506aff;color:#fff;border:none;border-radius:5px;cursor:pointer">Close Tab</button></div>`; }, 100);
  };

  // --- News modal ---
  const loadChangelogs = async () => {
    if (!changelogsContent) return;
    changelogsContent.textContent = 'Loading changelogs...';
    try {
      const res = await fetch('https://api.github.com/repos/Teawase/blue-protocol-checklist/releases');
      const releases = await res.json();
      let html = '';
      (releases || []).slice(0,10).forEach(r => {
        const date = new Date(r.published_at || r.created_at).toLocaleDateString();
        html += `<h4>${r.tag_name} (${date})</h4><div class="release-body">${marked.parse(r.body || 'No details')}</div>`;
      });
      changelogsContent.innerHTML = html || '<p>No updates found.</p>';
    } catch (err) {
      changelogsContent.textContent = 'Failed to load. Check console.';
      console.error(err);
    }
  };

  newsBtn && (newsBtn.onclick = () => { loadChangelogs(); newsModal.style.display = 'flex'; });
  closeNewsModal && (closeNewsModal.onclick = () => newsModal.style.display = 'none');
  newsModal && (newsModal.onclick = (e) => { if (e.target === newsModal) newsModal.style.display = 'none'; });

  // --- Reset data ---
  resetSiteDataBtn && (resetSiteDataBtn.onclick = () => {
    const sure = confirm('Are you sure you want to reset ALL site data? (localStorage)\nThis action is irreversible.');
    if (!sure) return;
    localStorage.clear();
    alert('All site data has been cleared!\nThe page will now reload.');
    location.reload();
  });

  // --- Init ---
  const init = async () => {
    document.addEventListener('contextmenu', e => e.preventDefault());
    updateTitle();
    await checkGDPR();
    await getLatestVersion();
    if (versionEl) { versionEl.style.cursor = 'pointer'; versionEl.onclick = () => window.open('https://github.com/Teawase/blue-protocol-checklist/releases', '_blank'); }

    loadProfiles();
    reloadCurrentProfileData();
    startTimerUpdates();

    importExportBtn && (importExportBtn.onclick = () => importExportModal && (importExportModal.style.display = 'flex'));
    importProgressBtn && (importProgressBtn.onclick = () => { importExportModal && (importExportModal.style.display = 'none'); importFile && importFile.click(); });
    exportProgressBtn && (exportProgressBtn.onclick = () => { importExportModal && (importExportModal.style.display = 'none'); exportProgress(); });
    cancelImportExport && (cancelImportExport.onclick = () => importExportModal && (importExportModal.style.display = 'none'));
    importFile && (importFile.onchange = handleImport);

    toggleDailyBtn && (toggleDailyBtn.onclick = () => {
      hideCompletedState.daily = !hideCompletedState.daily;
      toggleDailyBtn.textContent = hideCompletedState.daily ? 'Show Completed' : 'Hide Completed';
      applyCompletedFilter('daily');
    });

    toggleWeeklyBtn && (toggleWeeklyBtn.onclick = () => {
      hideCompletedState.weekly = !hideCompletedState.weekly;
      toggleWeeklyBtn.textContent = hideCompletedState.weekly ? 'Show Completed' : 'Hide Completed';
      applyCompletedFilter('weekly');
    });

    btnSelectAllDaily && (btnSelectAllDaily.onclick = () => selectAll('daily'));
    btnDeselectAllDaily && (btnDeselectAllDaily.onclick = () => deselectAll('daily'));
    btnSelectAllWeekly && (btnSelectAllWeekly.onclick = () => selectAll('weekly'));
    btnDeselectAllWeekly && (btnDeselectAllWeekly.onclick = () => deselectAll('weekly'));

    if (dailyFilterInput) dailyFilterInput.oninput = () => applyCompletedFilter('daily');
    if (weeklyFilterInput) weeklyFilterInput.oninput = () => applyCompletedFilter('weekly');
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
