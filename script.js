// Dark mode toggle
function setInitialDarkMode() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
        setDarkModeButtonIcon(true);
        setSeparatorDarkMode(true);
    } else {
        document.body.classList.remove('dark-mode');
        setDarkModeButtonIcon(false);
        setSeparatorDarkMode(false);
    }
}

function setDarkModeButtonIcon(isDark) {
    var btn = document.querySelector('.fa-moon, .fa-sun');
    if (btn) btn.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

function setSeparatorDarkMode(isDark) {
    var sep = document.querySelector('.separator');
    if (sep) sep.classList[isDark ? 'add' : 'remove']('dark-mode');
}

function toggleDarkMode(event) {
    var isDarkMode = document.body.classList.toggle('dark-mode');
    setDarkModeButtonIcon(isDarkMode);
    setSeparatorDarkMode(isDarkMode);
}

// Initialize dark mode on page load
window.addEventListener('DOMContentLoaded', setInitialDarkMode);

// Tab navigation
function openTab(evt, tabName) {
    var i;
    var tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    var tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}

// Logo toggle
function CoolThing() {
    var logo = document.getElementsByClassName('mainlogo')[0];
    if (!logo) return;
    var src1 = 'Novixel-icon-Trans1.png';
    var src2 = 'Novixel-icon-Trans2.png';
    var currentSrc = logo.getAttribute('src').replace(/^\\|\//, '');
    logo.setAttribute('src', currentSrc === src1 ? src2 : src1);
}