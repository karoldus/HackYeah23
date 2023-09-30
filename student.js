// // Function to render data in the table
// function renderProjects(projects) {
//     const projectTable = document.getElementById('projectTable').getElementsByTagName('tbody')[0];
//     projectTable.innerHTML = '';
//     projects.forEach((project) => {
//         const row = projectTable.insertRow();
//         const nameCell = row.insertCell(0);
//         const descriptionCell = row.insertCell(1);
//         const createdOnCell = row.insertCell(2);

//         nameCell.textContent = project.name;
//         descriptionCell.textContent = project.description;
//         createdOnCell.textContent = project.createdOn;
//     });
// }

// // TODO
// function get_task_details(task_id){
//     const task = db.collection('tasks').doc(task_id.toString());
//     task.get().then((doc) => {
//         if (doc.exists) {
//             const data = doc.data();
//             console.log(data);
//             return data;
//         } else {
//             console.log("No such document!");
//             return null;
//         }
//     });
// }

// Check if the user is authenticated
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user.email);
        console.log(user);
        // User is signed in, fetch and render data
        // db.collection('projects').get()
        //     .then((querySnapshot) => {
        //         const projects = [];
        //         querySnapshot.forEach((doc) => {
        //             const project = doc.data();
        //             projects.push(project);
        //         });
        //         renderProjects(projects);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching projects: ', error);
        //     });
        // Reference to the document
        const docRef = db.collection("users").doc(user.email);

        // Get the document
        docRef.get().then((doc) => {
        if (doc.exists) {
            // Document found, you can access its data
            const data = doc.data();
            const role = data.role;
            console.log("Document data:", data);
            if(role != 1){
                window.location.href = 'login.html'; //TODO
            }
            const points = data.points;
            const name = data.name;
            const tasks = data.tasks;

            const pointsElement = document.getElementById('points-place');
            pointsElement.innerHTML = points.toString();

            const nameElement = document.getElementById('name-place');
            nameElement.innerHTML = name;

            const taskElement = document.getElementById('task-place');

            if(tasks.length == 0){
                const taskElement = document.getElementById('task-place');
                taskElement.innerHTML = 'Brak zadań';
                return;
            }

            tasks_realized = [];
            tasks_not_realized = [];

            tasks_html = '';

            tasks.forEach(element => {
                if(element.realized == true){
                    tasks_realized.push(element);
                } else {
                    tasks_not_realized.push(element);
                }
            });

            if(tasks_not_realized.length == 0){
                tasks_html += '<h3>Brak zadań do realizacji</h3>';
            }
            else
            {
                tasks_html += '<h3>Zadania do realizacji</h3>';
                tasks_not_realized.forEach(element => {
                    tasks_html += '<div class="task"><h4>' + element.id + '</h4> Zobacz szczegóły <a href="student-task.html?id=' + element.id + '&status=undone">tutaj</a></div>';
                });
            }

            if(tasks_realized.length == 0){
                tasks_html += '<h3>Brak zrealizowanych zadań</h3>';
            }
            else
            {
                tasks_html += '<h3>Zrealizowane zadania</h3>';
                tasks_realized.forEach(element => {
                    tasks_html += '<div class="task"><h4>' + element.id + '</h4> Zobacz szczegóły <a href="student-task.html?id=' + element.id + '&status=done">tutaj</a></div>';
                });
            }

            taskElement.innerHTML = tasks_html;


        } else {
            console.log("No such document!");
            alert('Login failed. Please check your credentials.');
        }
        }).catch((error) => {
        console.error("Error getting document:", error);
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

// Function to get and display geolocation
function getGeolocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        }, (error) => {
            console.error('Geolocation error:', error);
        });
    } else {
        console.error('Geolocation is not available in this browser.');
    }
}

// Add a click event listener to the "Get Location" button
const getLocationButton = document.getElementById('getLocationButton');
if (getLocationButton) {
    getLocationButton.addEventListener('click', () => {
        getGeolocation();
    });
}
