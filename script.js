document.addEventListener('DOMContentLoaded', () => {
    const btnNo = document.getElementById('btnNo');
    
    // Make the "No" button run away!
    if (btnNo) {
        btnNo.addEventListener('mouseover', moveButton);
        btnNo.addEventListener('touchstart', moveButton);
    }
});

function moveButton() {
    const btnNo = document.getElementById('btnNo');
    const container = document.querySelector('.birthday-container');
    
    // Add position absolute if not already present
    if (btnNo.style.position !== 'absolute') {
        btnNo.style.position = 'absolute';
    }
    
    const maxX = container.clientWidth - btnNo.clientWidth - 40;
    const maxY = container.clientHeight - btnNo.clientHeight - 40;
    
    const randomX = Math.floor(Math.random() * maxX) + 20;
    const randomY = Math.floor(Math.random() * maxY) + 20;
    
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
}

function showSurprise() {
    const surprise = document.getElementById('surprise');
    const questionSection = document.getElementById('questionSection');
    
    if (questionSection) {
        questionSection.style.display = 'none';
    }
    
    // Toggle surprise visibility
    if (!surprise.classList.contains('show')) {
        surprise.style.display = 'block';
        setTimeout(() => {
            surprise.classList.add('show');
        }, 10);
        
        // Trigger Spider-Man confetti effect
        createConfetti();
    }
}

function createConfetti() {
    const container = document.querySelector('.birthday-container');
    // Spider-Man themed elements
    const spiderItems = ['🕸️', '🕷️', '❤️', '🕸️', '🕷️', '⭐', '🕸️'];
    
    // Create 90 falling spider items
    for (let i = 0; i < 90; i++) {
        const item = document.createElement('div');
        item.classList.add('confetti');
        
        const left     = Math.random() * 100;
        const delay    = Math.random() * 2.5;
        const duration = Math.random() * 2 + 1.5;
        const size     = Math.random() * 1 + 0.8; // 0.8rem to 1.8rem
        
        item.style.left            = `${left}%`;
        item.style.backgroundColor = 'transparent';
        item.style.width           = 'auto';
        item.style.height          = 'auto';
        item.style.fontSize        = `${size}rem`;
        item.style.animation       = `fall ${duration}s linear ${delay}s forwards`;
        
        item.innerText = spiderItems[Math.floor(Math.random() * spiderItems.length)];
        
        container.appendChild(item);
        
        // Cleanup
        setTimeout(() => {
            item.remove();
        }, (duration + delay) * 1000);
    }
}

