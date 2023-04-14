function updateTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

function changeTheme() {
    if(localStorage.theme === 'light') {
        localStorage.theme = 'dark';
    } else {
        localStorage.theme = 'light';
    }
    updateTheme();
}

updateTheme();

function toggleProfileSelect() {
    let profile = $('#profile_select_menu');
    profile.toggleClass('hidden')
}
function toggleNavbar() {
    let profile = $('#navbar__Content');
    profile.toggleClass('hidden')
}