document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('user-input-form');
    const inputField = document.getElementById('user-input');
    const outputSection = document.getElementById('output');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const userInput = inputField.value;

        fetch('http://localhost:3000/api/endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input: userInput })
        })
        .then(response => response.json())
        .then(data => {
            outputSection.innerHTML = `<p>Response: ${data.output}</p>`;
        })
        .catch(error => {
            console.error('Error:', error);
            outputSection.innerHTML = '<p>Error fetching data. Please try again.</p>';
        });
    });
});