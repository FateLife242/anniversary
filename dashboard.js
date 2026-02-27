document.addEventListener('DOMContentLoaded', () => {
    // Heart Storm Animation
    const spawnHeart = () => {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');

        const size = Math.random() * 20 + 10;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`;

        const duration = Math.random() * 3 + 2;
        heart.style.animation = `floatUp ${duration}s linear forwards`;

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    };

    const startHeartStorm = () => {
        const interval = setInterval(spawnHeart, 100);
        setTimeout(() => {
            clearInterval(interval);
        }, 5000);
    };

    startHeartStorm();

    const lockAgainBtn = document.getElementById('lock-again');
    const letterModal = document.getElementById('letter-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    // Modal Logic
    const openModal = () => {
        letterModal.classList.add('active');
    };

    const closeModal = () => {
        letterModal.classList.remove('active');
        // Notify envelope to close
        const envelopeIframe = document.querySelector('.envelope-iframe');
        if (envelopeIframe && envelopeIframe.contentWindow) {
            envelopeIframe.contentWindow.postMessage('close-envelope', '*');
        }
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Listen for message from envelope iframe
    window.addEventListener('message', (event) => {
        if (event.data === 'open-letter') {
            setTimeout(openModal, 600); // Wait for envelope flap to open
        }
    });

    lockAgainBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
