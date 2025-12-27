// --- Hệ thống âm thanh Pro (Web Audio API) ---
const SoundManager = {
    ctx: null,
    init() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    },
    play(type) {
        if (!this.ctx) this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        const now = this.ctx.currentTime;
        if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'match') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === 'success') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.setValueAtTime(900, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        }
    }
};

let ICONS = [
    { type: 'wine', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.2 3a2 2 0 0 1 1.6 3.14l-2.8 4.06a2 2 0 0 0-.4 1.2V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-5.6a2 2 0 0 0-.4-1.2l-2.8-4.06A2 2 0 0 1 6.4 3h8.8z"/><path d="M10 19v2"/><path d="M14 19v2"/><path d="M7 21h10"/></svg>` },
    { type: 'compass', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>` },
    { type: 'anchor', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v16"/><path d="M18 11h-2a4 4 0 0 0-4 4 4 4 0 0 0-4-4H6"/><path d="M12 22C6.477 22 2 17.523 2 12c0-3.314 2.686-6 6-6s6 2.686 6 6"/><path d="M12 18l-3-3"/><path d="M12 18l3-3"/></svg>` },
    { type: 'ship', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.2.6 4.3 1.62 6"/><path d="M12 12V2l4 2-4 2"/></svg>` },
    { type: 'music', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" r="3"/></svg>` },
    { type: 'star', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` },
    { type: 'gem', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 11L2 9l4-6z"/><path d="M11 3 8 9l4 11 4-11-3-6"/><path d="M2 9h20"/></svg>` },
    { type: 'clover', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-6a3 3 0 1 0-4.5-2.6 3 3 0 1 0-3 5.1 3 3 0 1 0 5.6 1.4A3 3 0 1 0 12 22z"/><path d="M12 22v-6a3 3 0 1 1 4.5-2.6 3 3 0 1 1 3 5.1 3 3 0 1 1-5.6 1.4A3 3 0 1 1 12 22z"/><path d="M12 7V2a3 3 0 1 0-4.5 2.6 3 3 0 1 0-3 5.1 3 3 0 1 0 5.6 1.4A3 3 0 1 0 12 2z"/><path d="M12 7V2a3 3 0 1 1 4.5-2.6 3 3 0 1 1 3 5.1 3 3 0 1 1-5.6 1.4A3 3 0 1 1 12 2z"/></svg>` },
    { type: 'wand', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 10-2.31-2.31"/><path d="m19 8.5 1.5 1.5"/><path d="m15 4 2 2"/><path d="m11.12 7.88 4.76 4.76"/><path d="m5 18 3.5 3.5"/><path d="M2 22 22 2"/><path d="M9 11 4.5 6.5"/><path d="M13 15 17.5 10.5"/></svg>` },
    { type: 'magnifier', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>` }
];

function loadIcons() {
    const saved = localStorage.getItem('custom_icons');
    if (saved) {
        ICONS = JSON.parse(saved);
    }
}

function saveIcons() {
    localStorage.setItem('custom_icons', JSON.stringify(ICONS));
}

function renderIconManager() {
    const container = document.getElementById('icon-list-container');
    container.innerHTML = ICONS.map((ic, index) => `
        <div class="manage-icon-item">
            ${ic.icon}
            <button class="delete-icon-btn" onclick="deleteIcon(${index})">×</button>
        </div>
    `).join('');
}

function addIcon() {
    const input = document.getElementById('new-icon-emoji');
    const val = input.value.trim();
    if (!val) return;

    // Check if SVG or Emoji
    let iconStr = val;
    if (!val.startsWith('<svg')) {
        // Wrap emoji or text in a simple container to act like an icon
        iconStr = `<span>${val}</span>`;
    }

    const newId = 'custom_' + Date.now();
    ICONS.push({ type: newId, icon: iconStr });
    saveIcons();
    renderIconManager();
    input.value = '';
    SoundManager.play('success');
}

function deleteIcon(index) {
    if (confirm("Xóa biểu tượng này?")) {
        ICONS.splice(index, 1);
        saveIcons();
        renderIconManager();
    }
}

let manualData = {}; // { index: type }
let currentRows = 2;
let currentCols = 5;
let pendingMatch = null; // [index1, index2]

function init() {
    loadIcons();
    setupBoard();
    setupEvents();
}

function setupBoard() {
    const rInput = document.getElementById('grid-rows');
    const cInput = document.getElementById('grid-cols');
    currentRows = parseInt(rInput.value) || 2;
    currentCols = parseInt(cInput.value) || 5;

    const board = document.getElementById('game-board');
    board.style.setProperty('--rows', currentRows);
    board.style.setProperty('--cols', currentCols);
    board.innerHTML = '';

    const total = currentRows * currentCols;
    for (let i = 0; i < total; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = i;

        const type = manualData[i];
        const iconHtml = type ? `<div class="card-icon" data-type="${type}">${ICONS.find(ic => ic.type === type).icon}</div>` : '';

        card.innerHTML = `
            <div class="card-num">${i + 1}</div>
            <div class="card-content">${iconHtml}</div>
        `;

        if (type) card.classList.add('recorded');

        // Cố định sự kiện click
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            SoundManager.play('click');
            openSelector(e, i);
        });

        board.appendChild(card);
    }
}

function openSelector(e, index) {
    const selector = document.getElementById('type-selector');

    // Tạo danh sách icon
    let optionsHtml = ICONS.map(ic => `
        <div class="type-option" onclick="setCardType(event, ${index}, '${ic.type}')">${ic.icon}</div>
    `).join('');

    // Thêm nút reset ô đó
    optionsHtml += `<div class="type-option" onclick="setCardType(event, ${index}, null)" title="Xóa ô này">🔄</div>`;

    selector.innerHTML = optionsHtml;
    selector.classList.remove('hidden');

    // Tính toán vị trí xuất hiện của popup
    let x = e.clientX;
    let y = e.clientY;

    const rect = selector.getBoundingClientRect();
    if (x + 250 > window.innerWidth) x = window.innerWidth - 260;
    if (y + 250 > window.innerHeight) y = window.innerHeight - 260;

    selector.style.left = `${x}px`;
    selector.style.top = `${y}px`;
}

function setCardType(event, index, type) {
    if (event) event.stopPropagation();
    SoundManager.play('click');
    document.getElementById('type-selector').classList.add('hidden');

    const cards = document.querySelectorAll('.card');
    const cardEl = cards[index];
    const content = cardEl.querySelector('.card-content');

    if (type) {
        manualData[index] = type;
        const icObj = ICONS.find(ic => ic.type === type);
        cardEl.classList.add('recorded');
        content.innerHTML = `<div class="card-icon" data-type="${type}">${icObj.icon}</div>`;

        // Check Match logic
        for (let otherIdx in manualData) {
            let oIdx = parseInt(otherIdx);
            if (oIdx !== index && manualData[oIdx] === type) {
                const otherEl = cards[oIdx];
                if (!otherEl.classList.contains('matched')) {
                    showMatchSequence(index, oIdx);
                    return;
                }
            }
        }
    } else {
        delete manualData[index];
        cardEl.classList.remove('recorded');
        content.innerHTML = '';
    }
}

function showMatchSequence(idx1, idx2) {
    const cards = document.querySelectorAll('.card');
    cards[idx1].classList.add('matched-animation');
    cards[idx2].classList.add('matched-animation');

    pendingMatch = [idx1, idx2];
    SoundManager.play('match');

    // Hiện overlay sau một chút để người dùng thấy hiệu ứng nháy
    setTimeout(() => {
        document.getElementById('match-info').textContent = `Ô ${idx1 + 1} & Ô ${idx2 + 1} TRÙNG NHOU!`;
        document.getElementById('match-overlay').classList.remove('hidden');
    }, 600);
}

function confirmMatch() {
    if (pendingMatch) {
        const [i1, i2] = pendingMatch;
        const cards = document.querySelectorAll('.card');

        cards[i1].classList.remove('matched-animation');
        cards[i2].classList.remove('matched-animation');
        cards[i1].classList.add('matched');
        cards[i2].classList.add('matched');

        // Xóa khỏi data để không bị match lại
        delete manualData[i1];
        delete manualData[i2];

        pendingMatch = null;
        SoundManager.play('success');
    }
    document.getElementById('match-overlay').classList.add('hidden');
}

function setupEvents() {
    const rInput = document.getElementById('grid-rows');
    const cInput = document.getElementById('grid-cols');

    rInput.onchange = () => { manualData = {}; setupBoard(); };
    cInput.onchange = () => { manualData = {}; setupBoard(); };

    document.getElementById('global-reset').onclick = () => {
        if (confirm("Bạn muốn xóa toàn bộ dữ liệu bàn bài?")) {
            manualData = {};
            setupBoard();
        }
    };

    document.getElementById('confirm-match').onclick = confirmMatch;

    // --- Guide Events ---
    const guideModal = document.getElementById('guide-modal');
    document.getElementById('help-btn').onclick = () => guideModal.classList.remove('hidden');
    document.getElementById('close-guide').onclick = () => guideModal.classList.add('hidden');

    // --- Icon Manager Events ---
    const iconModal = document.getElementById('icon-modal');
    document.getElementById('manage-icons-btn').onclick = () => {
        renderIconManager();
        iconModal.classList.remove('hidden');
    };
    document.getElementById('close-modal').onclick = () => iconModal.classList.add('hidden');
    document.getElementById('add-icon-confirm').onclick = addIcon;

    // --- Mini Mode Toggle ---
    document.getElementById('mini-mode-btn').onclick = () => {
        document.body.classList.toggle('mini-active');
        setupBoard(); // Redraw to adjust to tiny squares
    };

    // --- PiP Vision (Floating Bubble Hack) ---
    document.getElementById('pip-mode-btn').onclick = async () => {
        try {
            // Tạo canvas để vẽ trạng thái bàn bài
            const canvas = document.createElement('canvas');
            canvas.width = 400;
            canvas.height = 300;
            const ctx = canvas.getContext('2d');

            // Hàm vẽ bàn bài lên canvas
            const updateCanvas = () => {
                ctx.fillStyle = '#0b0f19';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const cards = document.querySelectorAll('.card');
                const gap = 10;
                const cardW = (canvas.width - (currentCols + 1) * gap) / currentCols;
                const cardH = (canvas.height - (currentRows + 1) * gap) / currentRows;

                cards.forEach((card, i) => {
                    const r = Math.floor(i / currentCols);
                    const c = i % currentCols;
                    const x = gap + c * (cardW + gap);
                    const y = gap + r * (cardH + gap);

                    // Vẽ khung thẻ
                    ctx.strokeStyle = card.classList.contains('recorded') ? '#00f2fe' : '#334155';
                    ctx.lineWidth = 2;
                    if (card.classList.contains('matched')) ctx.globalAlpha = 0.2;
                    else ctx.globalAlpha = 1;

                    ctx.strokeRect(x, y, cardW, cardH);

                    // Vẽ số thứ tự
                    ctx.fillStyle = '#4facfe';
                    ctx.font = '12px Outfit';
                    ctx.fillText(i + 1, x + 5, y + 15);

                    // Vẽ Icon nếu có
                    if (manualData[i]) {
                        ctx.fillStyle = '#fff';
                        ctx.font = '20px serif';
                        ctx.fillText('✅', x + cardW / 2 - 10, y + cardH / 2 + 10);
                    }
                });
            };

            updateCanvas();

            // Tạo luồng video từ canvas
            const video = document.createElement('video');
            video.muted = true;
            video.srcObject = canvas.captureStream();
            video.play();

            video.onloadedmetadata = () => {
                video.requestPictureInPicture().catch(err => {
                    alert("Trình duyệt của bạn chưa hỗ trợ bong bóng PiP. Hãy dùng tính năng 'Cửa sổ nổi' của điện thoại!");
                });
            };

            // Cập nhật canvas định kỳ
            const timer = setInterval(() => {
                if (document.pictureInPictureElement !== video) {
                    clearInterval(timer);
                    return;
                }
                updateCanvas();
            }, 500);

        } catch (e) {
            console.error(e);
            alert("Vui lòng dùng tính năng 'Cửa sổ nổi' (Floating Window) trên điện thoại để có hiệu quả tốt nhất!");
        }
    };

    // Click ra ngoài để đóng selector
    document.addEventListener('click', (e) => {
        const selector = document.getElementById('type-selector');
        if (!e.target.closest('.card') && !e.target.closest('.type-selector-panel')) {
            selector.classList.add('hidden');
        }
    });

    // Ngăn chặn menu ngữ cảnh trên di động để dễ click
    document.addEventListener('contextmenu', e => e.preventDefault());
}

// Khởi tạo ứng dụng
document.addEventListener('DOMContentLoaded', init);
