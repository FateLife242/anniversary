document.addEventListener('DOMContentLoaded', () => {
    // Heart Storm Animation
    const spawnHeart = () => {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');

        const size = Math.random() * 20 + 10; // 10px to 30px
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`;

        const duration = Math.random() * 3 + 2; // 2s to 5s
        heart.style.animation = `floatUp ${duration}s linear forwards`;

        document.body.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    };

    const startHeartStorm = () => {
        const interval = setInterval(spawnHeart, 100);
        setTimeout(() => {
            clearInterval(interval);
        }, 5000); // 5 seconds duration
    };

    startHeartStorm();

    const CORRECT_PASSCODE = '0228';
    let currentInput = '';

    // Elements
    const dots = document.querySelectorAll('.dot');
    const numButtons = document.querySelectorAll('.num-btn');
    const clearBtn = document.getElementById('clear-btn');
    const backBtn = document.getElementById('back-btn');
    const errorMsg = document.getElementById('error-msg');
    const glassIsland = document.querySelector('.glass-island');

    const lockedScreen = document.getElementById('locked-state');
    const unlockedScreen = document.getElementById('unlocked-state');
    const lockAgainBtn = document.getElementById('lock-again');

    // Update Dots
    const updateDots = () => {
        dots.forEach((dot, index) => {
            if (index < currentInput.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
        });
    };

    // Handle Input
    const handleInput = (char) => {
        if (currentInput.length < 4) {
            currentInput += char;
            updateDots();
            if (errorMsg) errorMsg.classList.remove('visible');

            if (currentInput.length === 4) {
                validatePasscode();
            }
        }
    };

    const validatePasscode = () => {
        if (currentInput === CORRECT_PASSCODE) {
            // Success
            window.location.href = 'dashboard.html';
        } else {
            // Failure
            if (glassIsland) glassIsland.classList.add('shake');
            if (errorMsg) errorMsg.classList.add('visible');

            setTimeout(() => {
                if (glassIsland) glassIsland.classList.remove('shake');
                currentInput = '';
                updateDots();
            }, 600);
        }
    };

    // Event Listeners
    numButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            handleInput(btn.getAttribute('data-value'));
        });
    });

    lockAgainBtn.addEventListener('click', () => {
        currentInput = '';
        updateDots();
        unlockedScreen.classList.remove('active');
        lockedScreen.classList.add('active');
    });

    // Keyboard Support
    document.addEventListener('keydown', (e) => {
        if (lockedScreen.classList.contains('active')) {
            if (e.key >= '0' && e.key <= '9') {
                handleInput(e.key);
            } else if (e.key === 'Backspace') {
                if (currentInput.length > 0) {
                    currentInput = currentInput.slice(0, -1);
                    updateDots();
                }
            } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
                currentInput = '';
                updateDots();
            }
        }
    });
});
