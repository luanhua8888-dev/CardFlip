document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-screen');
    const gameScreen = document.getElementById('game-screen');
    const displayUser = document.getElementById('display-user');
    const loginMsg = document.getElementById('login-msg');
    const logoutBtn = document.getElementById('logout-btn');

    // Check existing session
    const savedUser = localStorage.getItem('cardflip_user');
    if (savedUser) {
        showGame(savedUser);
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // "Smart" validation: Simulate an encrypted handshake
        loginMsg.innerHTML = '<div class="loader"></div><p>Đang kết nối API Frost...</p>';
        loginForm.style.opacity = '0.5';
        loginForm.querySelectorAll('button, input').forEach(el => el.disabled = true);

        setTimeout(() => {
            if (username.length >= 3 && password.length >= 3) {
                localStorage.setItem('cardflip_user', username);
                showGame(username);
                loginMsg.innerHTML = '';
            } else {
                loginMsg.innerHTML = '<p style="color: #e63946; margin-top: 1rem;">Thông tin không hợp lệ (Min 3 ký tự)</p>';
                loginForm.style.opacity = '1';
                loginForm.querySelectorAll('button, input').forEach(el => el.disabled = false);
            }
        }, 1500);
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('cardflip_user');
        window.location.reload();
    });

    function showGame(user) {
        loginScreen.classList.remove('active');
        gameScreen.classList.add('active');
        displayUser.textContent = user;
        // Initialize game if defined in game.js
        if (window.initGame) window.initGame();
    }
});
