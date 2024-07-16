function includeHTML() {
    const elements = document.querySelectorAll('[data-include-html]');
    const fetchPromises = [];

    elements.forEach(el => {
        const file = el.getAttribute('data-include-html');
        if (file) {
            fetchPromises.push(
                fetch(file)
                    .then(response => response.text())
                    .then(data => {
                        el.innerHTML = data;
                        el.removeAttribute('data-include-html');
                    })
                    .catch(error => console.error('Error including HTML:', error))
            );
        }
    });

    return Promise.all(fetchPromises);
}

window.onload = function() {
    includeHTML().then(() => {
        // Any additional code that needs to run after HTML inclusion
        const text = "Welcome to Journey Joy International Airport";
        const textElement = document.getElementById("welcome-text");
        let index = 0;

        function typeWriter() {
            if (index < text.length) {
                textElement.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100); // Adjust typing speed here
            }
        }

        typeWriter();

        const viewer = document.getElementById('spline-viewer');
        const tooltip = document.getElementById('tooltip');

        viewer.addEventListener('mouseenter', function(event) {
            if (event.target.id === 'your-airplane-id') {
                tooltip.style.display = 'block';
                tooltip.innerHTML = `
                    <strong>Flight Details:</strong><br>
                    Flight Number: AB123<br>
                    Departure: XYZ Airport<br>
                    Arrival: ABC Airport<br>
                    Time: 10:00 AM - 1:00 PM
                `;
            }
        });

        viewer.addEventListener('mousemove', function(event) {
            if (tooltip.style.display === 'block') {
                tooltip.style.left = `${event.clientX + 10}px`;
                tooltip.style.top = `${event.clientY + 10}px`;
            }
        });

        viewer.addEventListener('mouseleave', function(event) {
            if (event.target.id === 'your-airplane-id') {
                tooltip.style.display = 'none';
            }
        });
    });
};
