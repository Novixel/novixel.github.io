// Dark mode toggle
// Global subject prefix for all mailto links/forms. Change this one value to adjust.
window.MAIL_SUBJECT_PREFIX = '[SITE]';
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

// Enhance mailto forms to inject a subject prefix and body content
function initContactForms() {
    var forms = document.querySelectorAll('form[action^="mailto:"]');
    forms.forEach(function(form){
        if (form.__mailtoEnhanced) return; // avoid double binding
        form.__mailtoEnhanced = true;
        form.addEventListener('submit', function(e){
            e.preventDefault();
            var action = form.getAttribute('action') || '';
            var toMatch = action.match(/mailto:([^?]+)/i);
            var to = toMatch ? toMatch[1] : 'novixel@hotmail.com';
            var prefix = window.MAIL_SUBJECT_PREFIX || '';
            var subjectInput = form.querySelector('[name="subject"]');
            var rawSubject = (subjectInput ? subjectInput.value : 'Inquiry').trim() || 'Inquiry';
            var subject = (prefix ? prefix + ' ' : '') + rawSubject;
            var name = (form.querySelector('[name="name"]') || {}).value || '';
            var email = (form.querySelector('[name="email"]') || {}).value || '';
            var message = (form.querySelector('[name="message"]') || {}).value || '';
            function enc(v){ return encodeURIComponent(v); }
            var bodyLines = [];
            if (name) bodyLines.push('Name: ' + name);
            if (email) bodyLines.push('Email: ' + email);
            bodyLines.push('');
            if (message) bodyLines.push(message);
            var body = enc(bodyLines.join('\r\n'));
            var mailto = 'mailto:' + to + '?subject=' + enc(subject) + '&body=' + body;
            window.location.href = mailto;
        });
    });
}

document.addEventListener('DOMContentLoaded', initContactForms);

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

// Auto-open Home tab on page load for index.html
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the homepage with tabs
    var homeTab = document.getElementById('Home');
    var homeButton = document.querySelector('.tablinks');
    
    if (homeTab && homeButton && window.location.pathname === '/index.html' || window.location.pathname === '/') {
        // Simulate click on Home tab
        homeButton.click();
    }
});