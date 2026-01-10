// ===========================================
// Novixel Portfolio - Scripts v2
// ===========================================

// Global subject prefix for all mailto links/forms
window.MAIL_SUBJECT_PREFIX = '[SITE]';

// ===========================================
// Dark Mode
// ===========================================
function setInitialDarkMode() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
        setDarkModeButtonIcon(true);
    } else {
        document.body.classList.remove('dark-mode');
        setDarkModeButtonIcon(false);
    }
}

function setDarkModeButtonIcon(isDark) {
    var btn = document.querySelector('.fa-moon, .fa-sun');
    if (btn) {
        btn.classList.remove('fa-moon', 'fa-sun');
        btn.classList.add(isDark ? 'fa-sun' : 'fa-moon');
    }
}

function toggleDarkMode(event) {
    var isDarkMode = document.body.classList.toggle('dark-mode');
    setDarkModeButtonIcon(isDarkMode);
}

// Initialize dark mode on page load
window.addEventListener('DOMContentLoaded', setInitialDarkMode);

// ===========================================
// Contact Form Enhancement
// ===========================================
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

// ===========================================
// Tab Navigation
// ===========================================
function openTab(evt, tabName) {
    // Hide all panels
    var panels = document.querySelectorAll('.tabcontent');
    panels.forEach(function(p) {
        p.style.display = 'none';
        p.hidden = true;
    });

    // Remove active state from all tabs
    var tabs = document.querySelectorAll('.tablinks');
    tabs.forEach(function(t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
    });

    // Show selected panel
    var panel = document.getElementById(tabName);
    if (panel) {
        panel.style.display = 'block';
        panel.hidden = false;
    }

    // Activate clicked button
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
        evt.currentTarget.setAttribute('aria-selected', 'true');
    }
}

// ===========================================
// Navigation Helpers
// ===========================================
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function jumpToContact(e) {
    // Prevent default anchor behavior
    if (e) e.preventDefault();

    // Ensure Home tab is active (contact is in main view)
    var homeBtn = document.getElementById('tab-Home');
    if (homeBtn) homeBtn.click();

    // Smooth scroll to contact section
    var contact = document.getElementById('contact');
    if (contact) {
        setTimeout(function() {
            contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// ===========================================
// Logo Toggle (Easter Egg)
// ===========================================
function CoolThing() {
    var logo = document.querySelector('.mainlogo');
    if (!logo) return;
    var src1 = 'Novixel-icon-Trans1.png';
    var src2 = 'Novixel-icon-Trans2.png';
    var currentSrc = logo.getAttribute('src').replace(/^\\|\//, '');
    logo.setAttribute('src', currentSrc === src1 ? src2 : src1);
}

// ===========================================
// Initialize on Page Load
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    // Auto-open Home tab on pages with tab navigation
    var homeTab = document.getElementById('Home');
    var homeButton = document.getElementById('tab-Home') || document.querySelector('.tablinks');
    
    if (homeTab && homeButton) {
        homeButton.click();
    }
});