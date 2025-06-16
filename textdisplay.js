const quotes = [
    "ODDJOBS Gaurav - No job is too odd!",
    "Your wish is Gaurav's command at ODDJOBS.",
    "From fixing leaks to moving peaks, ODDJOBS Gaurav does it all!",
    "Need a hand? Call ODDJOBS Gaurav, your reliable odd job expert.",
    "Gaurav’s odd jobs: Where every task is a new adventure.",
    "Got a tough job? ODDJOBS Gaurav is up for the challenge!",
    "No job is too small, ODDJOBS Gaurav tackles them all.",
    "From dawn till dusk, ODDJOBS Gaurav is at your service.",
    "Your odd job superhero: ODDJOBS Gaurav to the rescue!",
    "Big or small, ODDJOBS Gaurav handles it all.",
    "ODDJOBS Gaurav - Turning your to-dos into ta-das!",
    "The one-stop shop for all your odd jobs: ODDJOBS Gaurav."
];

const quoteElement = document.getElementById('textdisplay');

function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.innerText = quotes[randomIndex];
    quoteElement.style.opacity = 1;

    setTimeout(() => {
        quoteElement.style.opacity = 0;
        setTimeout(displayRandomQuote, 1000); // Change quote after fade out
    }, 5000); // Display each quote for 5 seconds
}

// Initial call to start the quote display
displayRandomQuote();

