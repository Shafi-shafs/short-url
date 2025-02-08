document.getElementById('urlForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const longUrl = document.getElementById('longUrl').value;
    const customAlias = document.getElementById('customAlias').value;
    const topic = document.getElementById('topic').value;
    const resultDiv = document.getElementById('result');
    const shortUrlElement = document.getElementById('shortUrl');
    const analyticsLink = document.getElementById('analyticsLink');
    
    // Send POST request to backend to shorten the URL
    try {
        const response = await fetch('http://localhost:5000/api/shorten', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ longUrl, customAlias, topic })
        });

        const data = await response.json();

        if (data.shortUrl) {
            shortUrlElement.textContent = `Shortened URL: ${data.shortUrl}`;
            analyticsLink.setAttribute('href', `/api/analytics/${data.shortUrl}`);
            resultDiv.style.display = 'block';
        } else {
            alert('Failed to shorten the URL');
        }
    } catch (error) {
        console.error('Error shortening URL:', error);
        alert('Error shortening URL');
    }
});
