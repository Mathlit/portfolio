// Run as soon as DOM is loaded
window.addEventListener('load', () => {
    init();
});

// Controls the dots in the header
function init() {
    let timeout = null;

    // Modernizr adds the class 'touchevents' if the user uses a touchscreen.
    // Though this locks down the cirkle pattern, it prevents a jumping effect
    if (!document.documentElement.classList.contains('touchevents')) {
        let cirkleBackground = document.querySelector('.cirkleBackground');
        document.addEventListener('mousemove', (e) => {
            let x = e.clientX - 100;
            let y = e.clientY - 100;

            clearTimeout(timeout);
    
            if (y < 300) {
                cirkleBackground.style.opacity = '1';
                cirkleBackground.style.webkitMaskPosition = x + 'px ' + y + 'px';
                cirkleBackground.style.maskPosition = x + 'px ' + y + 'px';
            }

            timeout = setTimeout(() => {
                cirkleBackground.style.opacity = '0';
            }, 500);
        });
    }

    let el = document.querySelector('.m');
    let link = document.createElement('a');
    link.setAttribute('href', 'mailto:' + el.innerHTML);
    link.innerHTML = el.innerHTML;
    el.parentNode.replaceChild(link, el);
}