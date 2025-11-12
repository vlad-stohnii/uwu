// Vulnerable JavaScript Example

// 1. Cross-Site Scripting (XSS)
function displayUserInput() {
    var userInput = document.getElementById('userInput').value;
    // Directly inserting user input into the DOM without sanitization
    document.getElementById('output').innerHTML = userInput;
}

// 2. Insecure use of eval
function executeUserScript() {
    var userScript = document.getElementById('userScript').value;
    // Using eval to execute user-provided script
    eval(userScript);
}

// 3. Unsecured AJAX request
function loadUserData() {
    var xhr = new XMLHttpRequest();
    // Use HTTPS and validate response origin and content to avoid mixed-origin rendering
    xhr.open('GET', 'https://example.com/userdata', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                try {
                    // Ensure the actual response URL's origin matches expected origin
                    var responseOrigin = (xhr.responseURL) ? new URL(xhr.responseURL).origin : null;
                    if (responseOrigin !== 'https://example.com') {
                        console.warn('Blocked response from unexpected origin:', responseOrigin);
                        return;
                    }
                } catch (e) {
                    console.warn('Origin check failed:', e);
                    return;
                }
                // Use textContent to avoid interpreting response as HTML
                document.getElementById('ajaxOutput').textContent = xhr.responseText;
            } else {
                console.warn('Failed to load user data, status:', xhr.status);
            }
        }
    };
    xhr.send();
}
