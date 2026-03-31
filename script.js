// Get the necessary DOM elements
const form = document.getElementById('suggestion-form');
const suggestionTitle = document.getElementById('suggestion-title');
const suggestionDescription = document.getElementById('suggestion-description');
const suggestionList = document.getElementById('suggestion-list');

// Initialize suggestions array (from localStorage or default)
let suggestions = JSON.parse(localStorage.getItem('suggestions')) || [];

// Render all suggestions
function renderSuggestions() {
    suggestionList.innerHTML = ''; // Clear the list before re-rendering

    suggestions.forEach((suggestion, index) => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        
        // Suggestion content
        suggestionItem.innerHTML = `
            <div>
                <h3>${suggestion.title}</h3>
                <p>${suggestion.description}</p>
            </div>
            <div>
                <span class="suggestion-votes">Votes: ${suggestion.votes}</span>
                <button onclick="vote(${index}, 1)">Upvote</button>
                <button onclick="vote(${index}, -1)">Downvote</button>
            </div>
        `;
        
        suggestionList.appendChild(suggestionItem);
    });
}

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload on form submission
    
    const newSuggestion = {
        title: suggestionTitle.value,
        description: suggestionDescription.value,
        votes: 0 // Initial vote count
    };
    
    suggestions.push(newSuggestion);
    localStorage.setItem('suggestions', JSON.stringify(suggestions));
    
    // Clear input fields
    suggestionTitle.value = '';
    suggestionDescription.value = '';
    
    // Re-render the suggestions
    renderSuggestions();
});

// Handle voting
function vote(index, voteChange) {
    suggestions[index].votes += voteChange;
    localStorage.setItem('suggestions', JSON.stringify(suggestions));
    renderSuggestions();
}

// Initial rendering
renderSuggestions();