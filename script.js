// ===========================================
// Novixel Labs - Site Behaviors
// ===========================================

window.MAIL_SUBJECT_PREFIX = '[NOVIXEL LABS]';
window.NOVIXEL_INTAKE_ENDPOINT = window.NOVIXEL_INTAKE_ENDPOINT || '';

function isLocalHost() {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
}

function intakeEndpoint() {
    if (window.NOVIXEL_INTAKE_ENDPOINT) return window.NOVIXEL_INTAKE_ENDPOINT;
    return isLocalHost() ? 'http://127.0.0.1:8787/api/send-email' : '/api/send-email';
}

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
// Contact Form (Legacy mailto:)
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
// AJAX Contact Form (for Cloudflare Worker)
// ===========================================
function initAjaxContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var statusMessage = document.createElement('div');
    statusMessage.className = 'formStatus';
    statusMessage.setAttribute('role', 'status');
    statusMessage.setAttribute('aria-live', 'polite');
    statusMessage.style.display = 'none';
    form.parentNode.insertBefore(statusMessage, form);

    var thankYouMessage = document.createElement('div');
    thankYouMessage.className = 'card';
    thankYouMessage.style.display = 'none';
    thankYouMessage.innerHTML = '<h2><i class="fas fa-check-circle"></i> Thank You</h2><p>Thanks - I will review your workflow and reply shortly. You can also <a href="#/book-workflow-fit">book a workflow fit call here</a>.</p>';
    form.parentNode.insertBefore(thankYouMessage, form.nextSibling);

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var submitButton = form.querySelector('button[type="submit"]');
        var originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        statusMessage.style.display = 'none';
        statusMessage.textContent = '';
        statusMessage.className = 'formStatus';

        var turnstileWidget = form.querySelector('.cf-turnstile');
        var siteKey = turnstileWidget ? (turnstileWidget.getAttribute('data-sitekey') || '').trim() : '';
        if (!siteKey || siteKey === 'YOUR_PRODUCTION_SITE_KEY') {
            statusMessage.textContent = 'Turnstile is not configured yet. Add the production Cloudflare site key before testing live submissions.';
            statusMessage.className = 'formStatus error';
            statusMessage.style.display = 'block';
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            return;
        }

        var formData = new FormData(form);
        var formProps = Object.fromEntries(formData);
        
        if (!formProps['cf-turnstile-response']) {
            statusMessage.textContent = 'Please complete the security check and try again.';
            statusMessage.className = 'formStatus error';
            statusMessage.style.display = 'block';
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            if (window.turnstile) {
                window.turnstile.reset();
            }
            return;
        }

        var payload = JSON.stringify(formProps);

        fetch(intakeEndpoint(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: payload,
        })
        .then(function(response) {
            if (response.ok) {
                form.style.display = 'none';
                var aside = form.closest('.contactLayout').querySelector('.contactAside');
                if(aside) aside.style.display = 'none';
                thankYouMessage.style.display = 'block';
            } else {
                return response.text().then(function(text) {
                    var message = 'The server returned an error. Please try again.';
                    var contentType = response.headers.get('content-type') || '';

                    if (contentType.indexOf('application/json') !== -1) {
                        try {
                            var data = JSON.parse(text);
                            message = data.error || message;
                        } catch (error) {
                            message = 'The server returned broken JSON. Please try again.';
                        }
                    } else if ((text || '').trim().charAt(0) === '<') {
                        message = 'The intake route is returning a website page instead of the Worker response. Check the Cloudflare /api/send-email route.';
                    }

                    throw new Error(message);
                });
            }
        })
        .catch(function(error) {
            statusMessage.textContent = 'An error occurred: ' + error.message + ' Please try again later.';
            statusMessage.className = 'formStatus error';
            statusMessage.style.display = 'block';
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            if (window.turnstile) {
                window.turnstile.reset();
            }
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
    initAjaxContactForm(); // <-- Added this line
    openInitialTab();
});
