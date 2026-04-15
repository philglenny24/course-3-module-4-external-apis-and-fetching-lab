const weatherApi = "https://api.weather.gov/alerts/active?area=";

// 1. Correct the Selectors to match your HTML exactly
const stateInput = document.getElementById('state-input');
const fetchButton = document.getElementById('fetch-alerts'); // Matched to HTML
const alertsDisplay = document.getElementById('alerts-display'); // Matched to HTML
const errorDiv = document.getElementById('error-message');

/**
 * Step 1: Fetch Alerts
 */
async function fetchWeatherAlerts() {
    const stateCode = stateInput.value.trim().toUpperCase();

    // Step 3: Clear UI
    resetUI();

    if (!stateCode) {
        displayError("Please enter a state abbreviation.");
        return;
    }

    try {
        const response = await fetch(`${weatherApi}${stateCode}`);
        
        if (!response.ok) {
            throw new Error("Unable to fetch weather data for that state.");
        }

        const data = await response.json();
        
        // Step 2: Display Data
        displayAlerts(data, stateCode);

    } catch (error) {
        // Step 4: Handle Errors
        displayError(error.message);
    }
}

/**
 * Step 2: Display Alerts
 */
function displayAlerts(data, state) {
    const features = data.features;
    
    // The test specifically looks for "Weather Alerts: [number]"
    // Change your summary text to match the test's expectation
    const summary = document.createElement('h2');
    summary.id = "summary"; 
    summary.textContent = `Weather Alerts: ${features.length}`; // Fixed this line
    alertsDisplay.appendChild(summary);

    const ul = document.createElement('ul');
    features.forEach(alert => {
        const li = document.createElement('li');
        li.textContent = alert.properties.headline;
        ul.appendChild(li);
    });
    alertsDisplay.appendChild(ul);
}

/**
 * Step 3 & 4: UI Management
 */
function resetUI() {
    stateInput.value = ''; 
    alertsDisplay.innerHTML = '';
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
}

function displayError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// 2. Add Event Listener (with a null check for safety)
if (fetchButton) {
    fetchButton.addEventListener('click', fetchWeatherAlerts);
}