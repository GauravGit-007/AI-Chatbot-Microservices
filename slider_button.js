


document.addEventListener("DOMContentLoaded", function() {
    const slideButton = document.querySelector('.slide-button');
    const normalSpan = document.querySelector('.normal');
    const urgentSpan = document.querySelector('.urgent');

    // Set the initial state based on local storage
    if (localStorage.getItem('mode') === 'urgent') {
        slideButton.classList.add('active');
    } else {
        slideButton.classList.remove('active');
    }

    normalSpan.addEventListener('click', function() {
        slideButton.classList.remove('active');
        localStorage.setItem('mode', 'normal');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 300); // Wait for the transition to complete before redirecting
    });

    urgentSpan.addEventListener('click', function() {
        slideButton.classList.add('active');
        localStorage.setItem('mode', 'urgent');
        setTimeout(() => {
             window.location.href = 'urgent.html';
           
        }, 300); // Wait for the transition to complete before redirecting
    });

    // Background music logic for urgent.html
    if (window.location.pathname.endsWith('urgent.html')) {
        const backgroundMusic = document.getElementById('background-music');
        if (backgroundMusic) {
            backgroundMusic.play();

            // Stop the music when the user navigates away from the page
            window.addEventListener('beforeunload', function() {
                backgroundMusic.pause();
                backgroundMusic.currentTime = 0; // Reset the playback position
            });
        }
    }
});