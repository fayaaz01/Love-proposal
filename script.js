document.addEventListener('DOMContentLoaded', () => {
    const btnNo = document.getElementById('btnNo');
    const stringStage = document.getElementById('stringStage');

    if (btnNo) {
        btnNo.addEventListener('mouseover', moveButton);
        btnNo.addEventListener('touchstart', moveButton);
    }

    if (stringStage) {
        setupStringChallenge(stringStage);
    }
});

function setupStringChallenge(stringStage) {
    const heartStart = document.getElementById('heartStart');
    const photoLeft = document.getElementById('photoCardLeft');
    const photoRight = document.getElementById('photoCardRight');
    const leftString = document.getElementById('loveStringLeft');
    const rightString = document.getElementById('loveStringRight');
    const seasonMessage = document.getElementById('seasonMessage');

    if (!heartStart || !photoLeft || !photoRight || !leftString || !rightString) {
        return;
    }

    function centerOf(element) {
        const rect = element.getBoundingClientRect();
        const stageRect = stringStage.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2 - stageRect.left,
            y: rect.top + rect.height / 2 - stageRect.top
        };
    }

    function buildCurve(start, end, lift) {
        const controlX = (start.x + end.x) / 2;
        const controlY = (start.y + end.y) / 2 + lift;
        return `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`;
    }

    function setConnectedState(isConnected) {
        stringStage.classList.toggle('is-connected', isConnected);
        if (seasonMessage) {
            seasonMessage.classList.toggle('is-unlocked', isConnected);
            seasonMessage.setAttribute('aria-hidden', String(!isConnected));
        }
    }

    function getHeartCenter() {
        const rect = heartStart.getBoundingClientRect();
        const stageRect = stringStage.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2 - stageRect.left,
            y: rect.top + rect.height / 2 - stageRect.top
        };
    }

    function connectHeart() {
        const heartCenter = getHeartCenter();
        const leftEnd = centerOf(photoLeft);
        const rightEnd = centerOf(photoRight);

        leftString.setAttribute('d', buildCurve(heartCenter, {
            x: leftEnd.x - 10,
            y: leftEnd.y + 12
        }, -72));

        rightString.setAttribute('d', buildCurve(heartCenter, {
            x: rightEnd.x + 10,
            y: rightEnd.y - 12
        }, 72));

        setConnectedState(true);
    }

    function resetHeart() {
        heartStart.style.left = '50%';
        heartStart.style.top = '50%';
        leftString.setAttribute('d', '');
        rightString.setAttribute('d', '');
        setConnectedState(false);
    }

    heartStart.addEventListener('click', () => {
        if (stringStage.classList.contains('is-connected')) {
            resetHeart();
            return;
        }

        connectHeart();
    });

    resetHeart();
}

function moveButton() {
    const btnNo = document.getElementById('btnNo');
    if (!btnNo) {
        return;
    }

    btnNo.style.position = 'fixed';

    const maxX = Math.max(0, window.innerWidth - btnNo.offsetWidth);
    const maxY = Math.max(0, window.innerHeight - btnNo.offsetHeight);
    const randomX = Math.floor(Math.random() * (maxX + 1));
    const randomY = Math.floor(Math.random() * (maxY + 1));

    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
}

function showSurprise() {
    const surprise = document.getElementById('surprise');
    const questionSection = document.getElementById('questionSection');

    if (questionSection) {
        questionSection.style.display = 'none';
    }

    if (!surprise.classList.contains('show')) {
        surprise.style.display = 'block';
        setTimeout(() => {
            surprise.classList.add('show');
        }, 10);

        createConfetti();
    }
}

function createConfetti() {
    const flowerItems = ['🌹', '🌸', '🌺', '🌷', '🌻'];
    const colors = ['#b4262d', '#c79b3f', '#8f5d1d', '#d4a574', '#c44569'];

    for (let i = 0; i < 180; i++) {
        const item = document.createElement('div');
        item.classList.add('confetti');

        const left     = Math.random() * 100;
        const delay    = Math.random() * 3.5;
        const duration = Math.random() * 2.5 + 2;
        const size     = Math.random() * 1.2 + 0.9;
        const flower   = flowerItems[Math.floor(Math.random() * flowerItems.length)];
        const color    = colors[Math.floor(Math.random() * colors.length)];

        item.style.left            = `${left}%`;
        item.style.position        = 'fixed';
        item.style.top             = '-50px';
        item.style.backgroundColor = 'transparent';
        item.style.width           = 'auto';
        item.style.height          = 'auto';
        item.style.fontSize        = `${size}rem`;
        item.style.color           = color;
        item.style.animation       = `fall ${duration}s linear ${delay}s forwards`;
        item.style.textShadow      = `0 0 8px ${color}`;
        item.style.pointerEvents   = 'none';
        item.style.zIndex          = '1000';

        item.innerText = flower;

        document.body.appendChild(item);

        setTimeout(() => {
            item.remove();
        }, (duration + delay) * 1000);
    }
}

