document.getElementById('send-btn').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;

    console.log('User input:', userInput); // Debugging log

    fetch('http://localhost/flight-full-stack/Back-End/openai.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: userInput })
    })
    .then(response => {
        console.log('Response status:', response.status); // Debugging log
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const chatLog = document.getElementById('chat-log');
        if (data.error) {
            chatLog.innerHTML += `<div class="bot-message">Error: ${data.error}</div>`;
        } else {
            chatLog.innerHTML += `<div class="user-message">${userInput}</div>`;
            chatLog.innerHTML += `<div class="bot-message">${data.response}</div>`;
        }
        document.getElementById('user-input').value = '';
    })
    .catch(error => {
        console.error('Error:', error); // Debugging log
        const chatLog = document.getElementById('chat-log');
        chatLog.innerHTML += `<div class="bot-message">Error: ${error.message}</div>`;
    });
});
