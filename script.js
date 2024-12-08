var darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
var darkModeSwitch = document.getElementById('darkModeSwitch');

// Set initial switch position based on system preference
if (darkModeMediaQuery.matches) {
    document.body.classList.add('dark-mode');
    darkModeSwitch.firstChild.className = 'fas fa-sun';
    document.querySelector('.separator').classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
    darkModeSwitch.firstChild.className = 'fas fa-moon';
    document.querySelector('.separator').classList.remove('dark-mode');
}

function toggleDarkMode(event) {
    var button = event.target;
    var isDarkMode = document.body.classList.toggle('dark-mode');
    if (isDarkMode) {
        button.className = 'fas fa-sun';
        document.querySelector('.separator').classList.add('dark-mode');
    } else {
        button.className = 'fas fa-moon';
        document.querySelector('.separator').classList.remove('dark-mode');
    }
}
document.getElementById('darkModeSwitch').addEventListener('click', toggleDarkMode);

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
