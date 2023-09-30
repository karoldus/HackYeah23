const projectTable = document.getElementById('projectTable').getElementsByTagName('tbody')[0];

// Function to render data in the table
function renderProjects(projects) {
    projectTable.innerHTML = '';
    projects.forEach((project) => {
        const row = projectTable.insertRow();
        const nameCell = row.insertCell(0);
        const descriptionCell = row.insertCell(1);

        nameCell.textContent = project.name;
        descriptionCell.textContent = project.description;
    });
}

// Fetch data from Firestore
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
