global_user = null;
global_task_id = null;
global_project_geo = null;

function do_the_task_after_geo(user_geo)
{  
    if(Math.abs(user_geo[0] - global_project_geo[0]) > 0.01 || Math.abs(user_geo[1] - global_project_geo[1]) > 0.01)
    {
        alert("Nie jesteś w pobliżu miejsca zadania. Przejdź do miejsca zadania i spróbuj ponownie.");
        return;
    }
    
    const userTaskRef = db.collection("users").doc(global_user.email);
    userTaskRef.get().then((doc) => {
        changed = false;
        if (doc.exists) {
            doc_data = doc.data();
            to_update = doc_data.tasks;
            to_update.forEach(element => {
                if(element.id == global_task_id)
                {
                    element.realized = true;
                    element.realized_date = new Date();
                    changed = true;
                }
            });
            if(!changed)
            {
                console.log("Task not found");
                return;
            }
            userTaskRef.update({
                tasks: to_update
            }).then(() => {
                console.log("Document successfully updated!");
                window.location.href = 'student.html';
              }).catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
              });

        } else {
            console.log("No such document!");
            return;
        }
    });
}


// Function to get and display geolocation
function getGeolocationArray() {
    geo_coords = null;
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            geo_coords = [latitude, longitude];
            if(geo_coords != null)
            {
                console.log(geo_coords);
                do_the_task_after_geo(geo_coords);
            }
        }, (error) => {
            console.error('Geolocation error:', error);
            return null;
        });
    } else {
        console.error('Geolocation is not available in this browser.');
        return null;
    }
}

function do_the_task()
{
    if(global_task_id == null || global_user == null || global_project_geo == null)
    {
        console.log("NULL params");
        return;
    }

    
    const user_geo = getGeolocationArray();
    if(user_geo == null)
    {
        alert("Nie masz włączonej geolokalizacji. Włącz ją i spróbuj ponownie.");
        return;
    }
}


// Check if the user is authenticated
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        global_user = user;
        console.log(user.email);
        console.log(user);
        
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
            
            const urlParams = new URLSearchParams(window.location.search);
            const task_id = urlParams.get('id');
            const user_task_status = urlParams.get('status');

            global_task_id = task_id;

            const task_details = db.collection('tasks').doc(task_id.toString());
            task_details.get().then((doc) => {
                if (!doc.exists) {
                    console.log('No such document!');
                    return;
                }
                const task_data = doc.data();
                const deadline = task_data.deadline;
                const goal = task_data.goal;

                const goal_details = db.collection('projects').doc(goal.toString());
                goal_details.get().then((doc) => {
                    if (!doc.exists) {
                        console.log('No such document!');
                        return;
                    }
                    const goal_data = doc.data();
                    const goal_name = goal_data.name;
                    const goal_description = goal_data.description;
                    const goal_geo = goal_data.geo;
                    global_project_geo = [goal_geo._lat, goal_geo._long];
                    console.log(global_project_geo);
                    // TODO more

                    const taskElement = document.getElementById('task-place');
                    task_htlm = '<h1>' + goal_name + '</h1>';
                    task_htlm += '<p>' + goal_description + '</p>';
                    task_htlm += '<p>Deadline: ' + task_data.deadline + '</p>';

                    if(user_task_status == "undone")
                    {
                        task_htlm += '<button type="button" id="DoTaskButton" class="btn btn-primary">Wykonaj zadanie</button>';
                    }
                    taskElement.innerHTML = task_htlm;

                    const doButton = document.getElementById("DoTaskButton");
                    if (doButton) {
                        doButton.addEventListener('click', () => {
                            do_the_task();
                        });
                    }

                });
            });


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

