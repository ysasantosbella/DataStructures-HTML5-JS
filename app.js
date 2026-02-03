// CHANGE DISPLAYED PAGE 
function changePage(newPage) {
    const displayPage = document.getElementById('main-content-display');

    if (newPage === 'home') {
        displayPage.innerHTML = 
        '<h1>Home</h1><p>Data structures are specialized formats for storing data.</p>'; // todo: add more text here 
    } else if (newPage === 'linear') {
        displayPage.innerHTML = 
        '<h1>Linear Data Structures</h1><p>Examples include arrays, linked lists, stacks, and queues.</p>'; // todo: add more text here 
    } else if (newPage === 'nonlinear') {
        displayPage.innerHTML = 
        '<h1>Non-Linear Data Structures</h1><p>Examples include trees and graphs.</p>'; // todo: add more text here 
    }
}

// SEARCH BUTTON FUNCTIONALITY
function handleSearch() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const result = document.getElementById('search-results');

    if (input.includes("stack") || input.includes("array") || input.includes("queue")) {
        result.innerText = "Found in: Linear Data Structures Section";
        result.style.color = "blue";
    } else if (input.includes("tree") || input.includes("graph")) {
        result.innerText = "Found in: Non-Linear Data Structures Section";
        result.style.color = "green";
    } else {
        result.innerText = "No matches found for: " + input.toUpperCase();
        result.style.color = "red";
    }
}

document.getElementById('search-btn').addEventListener('click', handleSearch);