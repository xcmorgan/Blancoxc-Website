
document.addEventListener('DOMContentLoaded', () => {

    /* MOBILE NAVIGATION */

    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
            });
        });
    }


    /* FOOTER YEAR */

    document.querySelectorAll('.current-year').forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* CUSTOM AUDIO PLAYERS */

    const players = document.querySelectorAll('[data-player]');

    function formatTime(seconds) {
        if (!Number.isFinite(seconds)) return '0:00';

        const minutes = Math.floor(seconds / 60);
        const remaining = Math.floor(seconds % 60);

        return minutes + ':' + String(remaining).padStart(2, '0');
    }

    players.forEach(player => {

        const audio = player.querySelector('audio');
        const playButton = player.querySelector('.player-play');
        const playIcon = player.querySelector('.play-icon');
        const seek = player.querySelector('.player-seek');
        const current = player.querySelector('.player-current');
        const duration = player.querySelector('.player-duration');
        const status = player.querySelector('.player-status');
        const volume = player.querySelector('.player-volume-slider');

        if (!audio || !playButton || !seek) return;

        function updatePlayerState() {
            if (audio.paused) {
                player.classList.remove('playing');
                playIcon.textContent = '▶';
                playButton.setAttribute('aria-label', 'Play');
                status.textContent = audio.ended ? 'FINISHED' : 'PAUSED';
            } else {
                player.classList.add('playing');
                playIcon.textContent = 'Ⅱ';
                playButton.setAttribute('aria-label', 'Pause');
                status.textContent = 'NOW PLAYING';
            }
        }

        playButton.addEventListener('click', () => {

            if (audio.paused) {

                players.forEach(otherPlayer => {
                    const otherAudio = otherPlayer.querySelector('audio');

                    if (otherAudio && otherAudio !== audio) {
                        otherAudio.pause();
                    }
                });

                audio.play().catch(() => {
                    status.textContent = 'UNABLE TO PLAY';
                });

            } else {
                audio.pause();
            }
        });

        audio.addEventListener('play', updatePlayerState);
        audio.addEventListener('pause', updatePlayerState);

        audio.addEventListener('loadedmetadata', () => {
            duration.textContent = formatTime(audio.duration);
        });

        audio.addEventListener('timeupdate', () => {

            current.textContent = formatTime(audio.currentTime);

            if (Number.isFinite(audio.duration) && audio.duration > 0) {
                seek.value = (audio.currentTime / audio.duration) * 100;
            }
        });

        audio.addEventListener('ended', () => {
            seek.value = 0;
            current.textContent = '0:00';
            updatePlayerState();
        });

        seek.addEventListener('input', () => {

            if (Number.isFinite(audio.duration) && audio.duration > 0) {
                audio.currentTime = (Number(seek.value) / 100) * audio.duration;
            }
        });

        if (volume) {
            volume.addEventListener('input', () => {
                audio.volume = Number(volume.value);
            });

            audio.volume = Number(volume.value);
        }

        audio.addEventListener('error', () => {
            status.textContent = 'AUDIO UNAVAILABLE';
        });

    });


    /* COOKIE CONSENT */

    const cookieBanner = document.getElementById('cookie');
    const acceptButton = document.getElementById('accept');
    const rejectButton = document.getElementById('reject');

    if (cookieBanner) {

        let consent = null;

        try {
            consent = localStorage.getItem('blanco_cookie_consent');
        } catch (error) {}

        if (!consent) {
            cookieBanner.classList.add('show');
        }

        function saveConsent(value) {
            try {
                localStorage.setItem('blanco_cookie_consent', value);
            } catch (error) {}

            cookieBanner.classList.remove('show');
        }

        if (acceptButton) {
            acceptButton.addEventListener('click', () => {
                saveConsent('all');
            });
        }

        if (rejectButton) {
            rejectButton.addEventListener('click', () => {
                saveConsent('essential');
            });
        }
    }


    /* PRIVACY MODAL */

    const privacyModal = document.getElementById('privacyModal');
    const privacyOpen = document.getElementById('privacyOpen');
    const privacyClose = document.getElementById('privacyClose');

    if (privacyModal && privacyOpen) {

        privacyOpen.addEventListener('click', event => {
            event.preventDefault();
            privacyModal.classList.add('show');
        });

        if (privacyClose) {
            privacyClose.addEventListener('click', () => {
                privacyModal.classList.remove('show');
            });
        }

        privacyModal.addEventListener('click', event => {
            if (event.target === privacyModal) {
                privacyModal.classList.remove('show');
            }
        });
    }

});
