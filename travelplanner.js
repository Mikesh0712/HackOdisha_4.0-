const form = document.getElementById('itinerary-form');
const itineraryContainer = document.getElementById('itinerary-container');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const destination = document.getElementById('destination').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const activities = document.getElementById('activities').value.split(',');

    const itinerary = generateItinerary(destination, startDate, endDate, activities);
    displayItinerary(itinerary);
});

function generateItinerary(destination, startDate, endDate, activities) {
    const itinerary = [];
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    for (let i = 0; i <= endDateObj.getDate() - startDateObj.getDate(); i++) {
        const date = new Date(startDateObj.getTime() + i * 24 * 60 * 60 * 1000);
        const dayItinerary = [];

        for (const activity of activities) {
            dayItinerary.push(`${activity} at ${destination}`);
        }

        itinerary.push({
            date: date.toLocaleDateString(),
            activities: dayItinerary,
        });
    }

    return itinerary;
}

function displayItinerary(itinerary) {
    itineraryContainer.innerHTML = '';
    for (const day of itinerary) {
        const dayHtml = `
            <h2>${day.date}</h2>
            <ul>
                ${day.activities.map((activity) => `<li>${activity}</li>`).join('')}
            </ul>
        `;
        itineraryContainer.innerHTML += dayHtml;
    }
}
