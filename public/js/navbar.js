const logoutHandler = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to logout');
    }
};

const loginHandler = async (event) => {
    event.preventDefault();
    document.location.replace('/login');
};

const dashboardHandler = async (event) => {
    event.preventDefault();
    document.location.replace('/dashboard');
};

const homeHandler = async (event) => {
    event.preventDefault();
    document.location.replace('/');
};


function addButtonClicks () {
    const logoutEl = document.querySelector('#logout-button');
    if (logoutEl) logoutEl.addEventListener('click', logoutHandler);
    const loginEl = document.querySelector('#login-button');
    if (loginEl) loginEl.addEventListener('click', loginHandler);
    document.querySelector('#dashboard-button').addEventListener('click', dashboardHandler);
    document.querySelector('#home-button').addEventListener('click', homeHandler);
}

addButtonClicks()




