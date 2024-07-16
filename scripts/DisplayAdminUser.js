document.addEventListener('DOMContentLoaded', function() {
    async function fetchUsers() {
        try {
            const response = await axios.get('http://localhost/flight-full-stack/Back-End/user/readAll.php');
            const data = response.data;
            const usersContainer = document.getElementById('users-container');
            
            // Debug statement to check the received data
            console.log(data);

            if (data.users) {
                data.users.forEach(user => {
                    const userDiv = document.createElement('div');
                    userDiv.classList.add('user');

                    userDiv.innerHTML = `
                        <div class="left">
                            <div class="user-info">
                                <div class="userName">Username: ${user.username}</div>
                                <div>Email: ${user.email}</div>
                            </div>
                        </div>
                        <div class="right">
                            <i class="fa-solid fa-x delete" data-user-id="${user.user_id}"></i>
                            <div class="buttonContainer">
                                <button class="editButton" onclick="editUser(${user.user_id})">Edit <i class="fa-solid fa-arrow-right-long"></i></button>
                            </div>
                        </div>
                    `;

                    const deleteIcon = userDiv.querySelector('.delete');

                    deleteIcon.addEventListener('click', async function() {
                        const userId = deleteIcon.getAttribute('data-user-id');
                        try {
                            const deleteResponse = await axios.post(
                                'http://localhost/flight-full-stack/Back-End/user/delete.php',
                                { id: userId },
                                { headers: { 'Content-Type': 'application/json' } }
                            );
                            if (deleteResponse.data.message) {
                                userDiv.remove();
                            } else {
                                console.error('Failed to delete user:', deleteResponse.data.error);
                            }
                        } catch (error) {
                            console.error('Error deleting user:', error);
                        }
                    });
                    usersContainer.appendChild(userDiv);
                });
            } else {
                usersContainer.innerHTML = `<p>${data.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    fetchUsers();
});

function editUser(userId) {
    // Implement the edit functionality
    console.log(`Edit user with ID: ${userId}`);
}
