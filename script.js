 // Vulnerable JavaScript Example

 // Authentication check – minimal client-side guard
 function isAuthenticated() {
     // check for auth token in localStorage
     return !!localStorage.getItem('authToken');
 }

// 1. Cross-Site Scripting (XSS)
function displayUserInput() {
    if (!isAuthenticated()) { console.error('Unauthorized access'); return; }
    var userInput = document.getElementById('userInput').value;
    // Directly inserting user input into the DOM without sanitization
    document.getElementById('output').textContent = userInput;
}

// 2. Insecure use of eval
function executeUserScript() {
    if (!isAuthenticated()) { console.error('Unauthorized access'); return; }
    var userScript = document.getElementById('userScript').value;
    // Using eval to execute user-provided script
    console.warn('Dynamic script execution is disabled for security.');
}

// 3. Unsecured AJAX request
function loadUserData() {
    if (!isAuthenticated()) { console.error('Unauthorized access'); return; }
    fetch('https://example.com/userdata', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
    })
    .then(data => {
        document.getElementById('ajaxOutput').textContent = data;
    })
    .catch(error => console.error('Error fetching user data:', error));
}
