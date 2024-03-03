const URL = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies'; // URL for the API
const API_KEY = 'solaris-2ngXkR6S02ijFrTP'; // API Key
let planets = []; // Array to store the planets

// Function to fetch the data from the API
async function fetchData() {
    try { // Try to fetch the data
        const response = await fetch(URL, { // Fetch the data
            method: 'GET', // Use the GET method to fetch the data
            headers: {'x-zocom': API_KEY} // Add the API key to the headers 
        });
// If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Network response was not ok');
        } 
// If the response is ok, parse the data and store it in the planets array
        const data = await response.json(); // Parse the data
        planets = data.bodies; // Store the data in the planets array
    } catch (error) { // If there has been an error, log the error
        console.log('There has been a problem with your fetch operation:', error.message);
    }
}
// Call the fetchData function
fetchData(); 

// Function to display planet info
function displayPlanetInfo (planet) {
    const infoDiv = document.querySelector('.planet__info'); // Get the div where the information will be displayed
    if (infoDiv) { // If the div exists, display the information
        infoDiv.innerHTML = // Display the information: name, latin name, description, circumference, distance from the sun, max and min temperature
        `       
            <h2>${planet.name}</h2>
            <h4>${planet.latinName}</h4>
            <p>${planet.desc}</p>
            <tb><h5>Omkrets</h5>
            <p>${planet.circumference}</p>
            <h5>Km från solen</h5>
            <p>${planet.distance}</p>
            <h5>Max temperatur</h5>
            <p>${planet.temp.day} C</p>
            <h5>Min temperatur</h5>
            <p>${planet.temp.night} C</p><tb>
        `;
    } else {
        console.log('error'); // If the div doesn't exist, log an error
    }
}

// Function to search for a planet  
const searchField = document.getElementById('searchBar'); // Get the search field
const searchButton = document.querySelector('.button__submit'); // Get the search button

searchField.addEventListener('keyup', (event) => { // Add an event listener to the search field
    if (event.key === 'Enter') { // User can press the enter key instead of clicking the search button
        const searchTerm = searchField.value.toLowerCase(); // Get the search term and convert it to lowercase 
        const foundPlanet = planets.find(planet => planet.name.toLowerCase() === searchTerm); // Search for the planet
        searchField.value = ''; // Clear the search field

        if (foundPlanet) { // If we found a planet, display its information
            displayPlanetInfo(foundPlanet); // Display the planet information
            onPlanetSearch(); // Display the overlay
        } else { // If we didn't find a planet, display an error message
            alert('Nu blev något fel :( Försök igen.'); // Display an error message
        }}
});

// function to display the overlay
function onPlanetSearch() { 
    const overlay = document.querySelector('.display__info'); // Get the overlay
    overlay.style.display = 'block'; // Make it a block element, style it in css as display: none to keep it hidden until the user searches for a planet
}
// Function to hide the overlay
function hideOverlay() { // Function to hide the overlay
    const overlay = document.querySelector('.display__info'); 
    overlay.style.display = 'none'; // Hide the overlay
}
// Add event listener to the close button to hide the overlay
const closeButton = document.querySelector('.close__button'); // Get the close button
closeButton.addEventListener('click', hideOverlay); // Add an event listener to the close button

