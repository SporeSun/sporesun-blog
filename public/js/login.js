// document.getElementById('login-form').addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     const response = await fetch('/api/users/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//     });

//     if (response.ok) {
//         document.location.replace('/api/dashboard');
//     } else {
//         alert('Failed to log in');
//     }
// });
