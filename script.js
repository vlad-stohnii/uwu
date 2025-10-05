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
    document.getElementById('output').innerHTML = userInput;
}

// 2. Insecure use of eval
function executeUserScript() {
    if (!isAuthenticated()) { console.error('Unauthorized access'); return; }
    var userScript = document.getElementById('userScript').value;
    // Using eval to execute user-provided script
    eval(userScript);
}

// 3. Unsecured AJAX request
function loadUserData() {
    if (!isAuthenticated()) { console.error('Unauthorized access'); return; }
    var xhr = new XMLHttpRequest();
    // Using HTTP instead of HTTPS and no proper handling of CORS
    xhr.open('GET', 'https://example.com/userdata', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById('ajaxOutput').innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}
