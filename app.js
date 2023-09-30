// Function to render data in the table
function renderProjects(projects) {
    const projectTable = document.getElementById('projectTable').getElementsByTagName('tbody')[0];
    projectTable.innerHTML = '';
    projects.forEach((project) => {
        const row = projectTable.insertRow();
        const nameCell = row.insertCell(0);
        const descriptionCell = row.insertCell(1);
        const createdOnCell = row.insertCell(2);

        nameCell.textContent = project.name;
        descriptionCell.textContent = project.description;
        createdOnCell.textContent = project.createdOn;
    });
}

// Check if the user is authenticated
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, fetch and render data
        db.collection('projects').get()
            .then((querySnapshot) => {
                const projects = [];
                querySnapshot.forEach((doc) => {
                    const project = doc.data();
                    projects.push(project);
                });
                renderProjects(projects);
            })
            .catch((error) => {
                console.error('Error fetching projects: ', error);
            });
    } else {
        // User is not signed in, redirect to login page
        window.location.href = 'login.html';
    }
});


// Function to handle logout
function logout() {
    firebase.auth().signOut()
        .then(() => {
            // Redirect to the login page after logout
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('Logout error: ', error);
        });
}

// Add a click event listener to the logout button
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        logout();
    });
}
