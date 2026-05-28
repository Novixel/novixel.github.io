// ===========================================
// Novixel Labs - Site Behaviors
// ===========================================

window.MAIL_SUBJECT_PREFIX = '[NOVIXEL LABS]';

// ===========================================
// Color Mode
// ===========================================
function setDarkModeButtonIcon(isDark) {
    var btn = document.querySelector('.iconBtn');
    if (!btn) return;
    btn.classList.remove('fa-moon', 'fa-sun');
    btn.classList.add(isDark ? 'fa-sun' : 'fa-moon');
}

function setInitialDarkMode() {
    var savedTheme = null;
    try {
        savedTheme = localStorage.getItem('novixel-theme');
    } catch (error) {
        savedTheme = null;
    }
    var isDark = savedTheme !== 'light';
    document.body.classList.toggle('dark-mode', isDark);
    setDarkModeButtonIcon(isDark);
}

function toggleDarkMode() {
    var isDark = document.body.classList.toggle('dark-mode');
    setDarkModeButtonIcon(isDark);
    try {
        localStorage.setItem('novixel-theme', isDark ? 'dark' : 'light');
    } catch (error) {
        // Storage can be blocked in privacy-restricted browsers.
    }
}

// ===========================================
// Contact Form
// ===========================================
function fieldValue(form, name) {
    var field = form.querySelector('[name="' + name + '"]');
    return field ? field.value.trim() : '';
}

function initContactForms() {
    var forms = document.querySelectorAll('form[action^="mailto:"]');
    forms.forEach(function(form) {
        if (form.__mailtoEnhanced) return;
        form.__mailtoEnhanced = true;

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            var action = form.getAttribute('action') || '';
            var toMatch = action.match(/mailto:([^?]+)/i);
            var to = toMatch ? toMatch[1] : 'novixel@hotmail.com';
            var rawSubject = fieldValue(form, 'subject') || 'Inquiry';
            var subject = window.MAIL_SUBJECT_PREFIX + ' ' + rawSubject;
            var details = [
                ['Name', fieldValue(form, 'name')],
                ['Email', fieldValue(form, 'email')],
                ['Business or project', fieldValue(form, 'company')],
                ['Request type', fieldValue(form, 'project_type')],
                ['Workflow issue', fieldValue(form, 'workflow')]
            ];
            var bodyLines = [];

            details.forEach(function(detail) {
                if (detail[1]) bodyLines.push(detail[0] + ': ' + detail[1]);
            });

            var message = fieldValue(form, 'message');
            if (message) {
                bodyLines.push('', 'Additional details:', message);
            }

            window.location.href = 'mailto:' + to +
                '?subject=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(bodyLines.join('\r\n'));
        });
    });
}

// ===========================================
// Tab Navigation
// ===========================================
function openTab(event, tabName, updateHash) {
    var panel = document.getElementById(tabName);
    if (!panel) return;

    document.querySelectorAll('.tabcontent').forEach(function(item) {
        item.style.display = 'none';
        item.hidden = true;
    });

    document.querySelectorAll('.tablinks').forEach(function(tab) {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
    });

    panel.style.display = 'block';
    panel.hidden = false;

    var tabButton = document.getElementById('tab-' + tabName);
    if (tabButton) {
        tabButton.classList.add('active');
        tabButton.setAttribute('aria-selected', 'true');
    }

    if (updateHash !== false && event && window.history && window.history.replaceState) {
        window.history.replaceState(null, '', tabLocation(tabName));
    }
}

function tabLocation(tabName) {
    var url = new URL(window.location.href);
    url.hash = '';
    if (tabName === 'Home') {
        url.searchParams.delete('tab');
    } else {
        url.searchParams.set('tab', tabName);
    }
    return url.pathname + url.search;
}

function openInitialTab() {
    var queryTab = new URLSearchParams(window.location.search).get('tab');
    var hashTab = window.location.hash.replace('#', '');
    var tabName = queryTab || hashTab || 'Home';
    if (!document.getElementById(tabName)) tabName = 'Home';
    if (hashTab && window.history && window.history.replaceState) {
        window.history.replaceState(null, '', tabLocation(tabName));
    }
    openTab(null, tabName, false);
    window.setTimeout(function() { window.scrollTo(0, 0); }, 0);
}

window.addEventListener('hashchange', function() {
    var tabName = window.location.hash.replace('#', '');
    if (tabName) {
        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', tabLocation(tabName));
        }
        openTab(null, tabName, false);
        window.scrollTo(0, 0);
    }
});

// ===========================================
// Products Filter
// ===========================================
function filterProducts(eventOrCategory, category) {
    var event = typeof eventOrCategory === 'string' ? null : eventOrCategory;
    var selectedCategory = typeof eventOrCategory === 'string' ? eventOrCategory : category;

    document.querySelectorAll('#Products .filters .pill').forEach(function(pill) {
        pill.classList.remove('active');
    });
    if (event && event.currentTarget) event.currentTarget.classList.add('active');

    document.querySelectorAll('#products-grid .serviceCard').forEach(function(card) {
        var categories = (card.dataset.category || '').split(/\s+/);
        card.style.display = selectedCategory === 'all' || categories.indexOf(selectedCategory) !== -1 ? '' : 'none';
    });
}

// ===========================================
// Logo Toggle
// ===========================================
function CoolThing() {
    var logo = document.querySelector('.mainlogo');
    if (!logo) return;
    var src1 = 'Novixel-icon-Trans1.png';
    var src2 = 'Novixel-icon-Trans2.png';
    var currentSrc = logo.getAttribute('src').replace(/^\\|\//, '');
    logo.setAttribute('src', currentSrc === src1 ? src2 : src1);
}

document.addEventListener('DOMContentLoaded', function() {
    setInitialDarkMode();
    initContactForms();
    openInitialTab();
});
