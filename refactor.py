import os
import json

src_file = r"c:\saas-app-animation-challenge\saas-motion-supabase.html"
dest_file = r"c:\saas-app-animation-challenge\refactored_saas_motion_supabase.html"

with open(src_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

insert_idx = -1
for i, line in enumerate(lines):
    if "const SK='saas50v3';" in line:
        insert_idx = i
        break

if insert_idx == -1:
    print("Could not find the insertion point.")
    exit(1)

html_top = "".join(lines[:insert_idx])

refactored_js = """// --- REFACTORED SECURE JAVASCRIPT ---

// 1. CONSTANTS & CONFIGURATION
const STORAGE_KEY = 'saas50v3_secure';
const NOTIF_KEY = 'saas50v3_notifs';
const SUPABASE_URL = 'https://utzfqluueiljglmuskbu.supabase.co';
// Note: Ensure Row Level Security (RLS) is active on your 'user_progress' table before deployment.
const SUPABASE_KEY = 'sb_publishable_QQTXLaGp-P8XENZi-Y5B8A_duvjcLfY';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. STATE MANAGEMENT (Encapsulated)
class AppState {
    constructor() {
        this.user = null;
        this.data = this.getDefaultData();
        this.notifications = this.loadNotifications();
        this.currentFilter = 'all';
        this.activeWeekIndex = null;
        this.timers = {}; 
        this.globalTimer = null;
    }

    getDefaultData() {
        return {
            weeks: WD.map((_, i) => ({
                status: i === 0 ? 'current' : 'locked',
                startedAt: i === 0 ? Date.now() : null,
                completedAt: null,
                videoUrl: null,
                days: Array(5).fill(null).map(() => ({
                    status: 'idle',
                    durationSecs: 0,
                    startedAt: null,
                    completedAt: null
                }))
            }))
        };
    }

    loadLocalData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && parsed.weeks) {
                    this.data = parsed;
                }
            }
        } catch (e) {
            console.error('State parse error, initiating defaults', e);
        }
    }

    saveLocalData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        if (this.user) {
            this.syncDataToServer();
        }
    }

    async syncDataToServer() {
        try {
            await supabaseClient.from('user_progress').upsert({
                user_id: this.user.id,
                data: this.data,
                updated_at: new Date()
            });
        } catch (e) {
            console.error('Remote sync error:', e);
        }
    }

    async loadDataFromServer() {
        try {
            const { data, error } = await supabaseClient
                .from('user_progress')
                .select('data')
                .eq('user_id', this.user.id)
                .single();
            if (data && data.data) {
                this.data = data.data;
                uiManager.renderAll();
            }
        } catch (e) {
            console.warn('Load remote data failed ', e);
        }
    }

    loadNotifications() {
        try {
            return JSON.parse(localStorage.getItem(NOTIF_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    saveNotifications() {
        localStorage.setItem(NOTIF_KEY, JSON.stringify(this.notifications.slice(0, 50)));
    }

    addNotification(type, message) {
        this.notifications.unshift({ type, message, time: Date.now(), read: false });
        this.saveNotifications();
        uiManager.renderNotifications();
        document.getElementById('bdot').classList.add('on');
    }
}

const state = new AppState();

// 3. SECURE DOM UTILITIES (Defends against XSS)
const DOMUtils = {
    createEl: (tag, options = {}) => {
        const el = document.createElement(tag);
        if (options.classes) el.className = options.classes;
        if (options.id) el.id = options.id;
        if (options.text) el.textContent = options.text;
        
        if (options.html) {
            el.innerHTML = options.html; 
        }
        
        if (options.attrs) {
            for (const [key, val] of Object.entries(options.attrs)) {
                el.setAttribute(key, val);
            }
        }
        if (options.onClick) el.addEventListener('click', options.onClick);
        return el;
    },
    clear: (el) => {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }
};

// 4. UI CONTROLLER (Handles updates intelligently instead of massive innerHTML swaps)
const uiManager = {
    formatTime: (secs) => {
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = (secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    },
    
    getTimePassed: (timestamp) => {
        const diffSecs = Math.floor((Date.now() - timestamp) / 1000);
        if (diffSecs < 60) return 'Just now';
        if (diffSecs < 3600) return Math.floor(diffSecs / 60) + ' min ago';
        if (diffSecs < 86400) return Math.floor(diffSecs / 3600) + ' hr ago';
        return Math.floor(diffSecs / 86400) + ' days ago';
    },

    getDeadline: (weekIndex) => {
        const w = state.data.weeks[weekIndex];
        if (!w.startedAt) return null;
        return w.startedAt + (7 * 24 * 3600 * 1000);
    },

    showSnackbar: (icon, message, color) => {
        const sb = document.getElementById('snack');
        DOMUtils.clear(sb);
        
        const ic = DOMUtils.createEl('span', { classes: 'ms', text: icon });
        ic.style.fontSize = '18px';
        ic.style.color = color;
        
        sb.appendChild(ic);
        sb.appendChild(document.createTextNode(' ' + message));
        
        sb.classList.add('on');
        if (uiManager._snackTimer) clearTimeout(uiManager._snackTimer);
        uiManager._snackTimer = setTimeout(() => sb.classList.remove('on'), 3500);
    },

    renderAll: () => {
        uiManager.renderTopStats();
        uiManager.renderGrid();
        uiManager.renderRing();
        uiManager.renderNotifications();
    },

    renderTopStats: () => {
        const doneCount = state.data.weeks.filter(w => w.status === 'done').length;
        document.getElementById('dv').textContent = doneCount;
        
        let streak = 0;
        for (let i = 0; i < state.data.weeks.length; i++) {
            if (state.data.weeks[i].status === 'done') streak++;
            else break;
        }
        document.getElementById('sv').textContent = streak;
    },

    renderRing: () => {
        const doneCount = state.data.weeks.filter(w => w.status === 'done').length;
        const circumference = 2 * Math.PI * 56;
        const progress = doneCount / 50;
        const elem = document.getElementById('rf');
        if(elem) elem.style.strokeDashoffset = circumference * (1 - progress);
        const textElem = document.getElementById('rpct');
        if(textElem) textElem.textContent = Math.round(progress * 100) + '%';
    },

    renderGrid: () => {
        const container = document.getElementById('wg');
        if(!container) return;
        DOMUtils.clear(container);

        state.data.weeks.forEach((w, index) => {
            if (state.currentFilter !== 'all' && state.currentFilter !== w.status) return;

            const weekData = WD[index];
            const daysDone = w.days.filter(d => d.status === 'done').length;
            const pct = (daysDone / 5) * 100;
            
            const card = DOMUtils.createEl('div', { 
                classes: `wcard ${w.status === 'current' ? 'cc' : w.status === 'done' ? 'cd' : w.status === 'expired' ? 'ce' : 'cl'}`,
                onClick: () => uiManager.handleCardClick(index)
            });
            card.style.animationDelay = Math.min(index * 0.025, 0.35) + 's';

            // Top section
            const topDiv = DOMUtils.createEl('div', { classes: 'wc-top' });
            topDiv.appendChild(DOMUtils.createEl('span', { classes: 'wc-num', text: `W/${String(index+1).padStart(2,'0')}` }));
            
            let badgeClass = 'bl', badgeText = '🔒 LOCKED';
            if(w.status === 'current') { badgeClass = 'bc'; badgeText = '🔥 ACTIVE'; }
            if(w.status === 'done') { badgeClass = 'bd'; badgeText = '✓ DONE'; }
            if(w.status === 'expired') { badgeClass = 'be'; badgeText = '⚡ EXPIRED'; }
            
            topDiv.appendChild(DOMUtils.createEl('span', { classes: `wc-bdg ${badgeClass}`, text: badgeText }));
            card.appendChild(topDiv);

            // XSS Safe appending for title
            card.appendChild(DOMUtils.createEl('div', { classes: 'wc-tt', text: weekData.title || weekData.t }));

            // Progress Bar
            const barOuter = DOMUtils.createEl('div', { classes: 'wc-bar' });
            const barInner = DOMUtils.createEl('div', { classes: 'wc-fill' });
            barInner.style.width = pct + '%';
            barOuter.appendChild(barInner);
            card.appendChild(barOuter);

            container.appendChild(card);
        });
    },

    handleCardClick: (index) => {
        const w = state.data.weeks[index];
        if (w.status === 'locked') {
            uiManager.showSnackbar('lock', '🔒 ย้อนไม่ได้ — ต้องปลดล็อคตามลำดับ', '#52526e');
            return;
        }
        uiManager.showSnackbar('info', `Opening Week ${index + 1}`, '#4285F4');
    },

    renderNotifications: () => {
        const list = document.getElementById('nplist');
        if(!list) return;
        DOMUtils.clear(list);
        
        const unread = state.notifications.filter(n => !n.read).length;
        const bdot = document.getElementById('bdot');
        if(bdot) bdot.classList.toggle('on', unread > 0);

        if (!state.notifications.length) {
            list.appendChild(DOMUtils.createEl('div', { classes: 'np-empty', text: 'No notifications' }));
            return;
        }

        state.notifications.forEach(n => {
            const item = DOMUtils.createEl('div', { classes: 'np-item' });
            item.appendChild(DOMUtils.createEl('div', { classes: `np-dot ${n.type}` }));
            // Safe assignment for notification texts bypassing innerHTML
            const msgBody = DOMUtils.createEl('div', { classes: 'np-msg', text: n.message });
            item.appendChild(msgBody);
            item.appendChild(DOMUtils.createEl('div', { classes: 'np-time', text: uiManager.getTimePassed(n.time) }));
            list.appendChild(item);
        });
    }
};

// 5. AUTHENTICATION (Decoupled logic)
async function authenticateUser() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    state.user = session?.user || null;
    
    const emailElem = document.getElementById('authEmail');
    if(state.user && emailElem) emailElem.value = state.user.email;
    
    if (state.user) {
        await state.loadDataFromServer();
    }
}

function handleLoginSubmit() {
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPass').value;
    if (!email || !password) return uiManager.showSnackbar('info', 'Fill required fields', 'var(--yellow)');
    
    supabaseClient.auth.signInWithPassword({ email, password }).then(({data, error}) => {
       if(!error && data.user) {
           state.user = data.user;
           state.loadDataFromServer();
           uiManager.showSnackbar('person', 'Logged in', 'var(--accent)');
       } 
    });
}

document.getElementById('authSubmit')?.addEventListener('click', handleLoginSubmit);

// INIT
state.loadLocalData();
uiManager.renderAll();
authenticateUser();

</script>
</body>
</html>
"""

full_html = html_top + refactored_js

with open(dest_file, 'w', encoding='utf-8') as f:
    f.write(full_html)

print(f"Refactored saved sequentially to: {dest_file}")
