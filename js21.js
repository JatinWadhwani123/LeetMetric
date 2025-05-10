document.addEventListener("DOMContentLoaded",function(){
    const searchButton = document.getElementById("Search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel =document.getElementById("easy-label");
    const mediumLabel =document.getElementById("medium-label");
    const hardLabel =document.getElementById("hard-label");
    const cardContainer = document.querySelector(".stats-cards");

    function validateUsername(username){
        if(username.trim() ===" "){
            alert("Username should not be empty...");
            return false;
        }
        const regEx=/^[a-zA-Z0-9_-]{3,16}$/;
        const isMatching =regEx.test(username);
        if(isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
    const url = `https://jsonplaceholder.typicode.com/users?username=${username}`;

    try {
        // Simulate delay (e.g., 1.5 seconds)
        await new Promise(resolve => setTimeout(resolve, 1500));
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Unable to fetch the user details");
        }

        const data = await response.json();
        console.log("Logging data", data);
    } catch (error) {
        statsContainer.innerHTML = '<p>No data Found</p>' 
    } finally {
        // ✅ Reset button state
        searchButton.textContent = "Search";
        searchButton.disabled = false;
    }
}



   searchButton.addEventListener("click", function () {
    const username = usernameInput.value.trim();
    console.log("Logging Username:", username);

    // ❗ First: validate the input
    if (username === "") {
        alert("Username should not be empty...");
        return; // ⛔ Stop further execution
    }

    // ✅ Optional: regex validation (can also be inside validateUsername)
    const regEx = /^[a-zA-Z0-9_-]{3,16}$/;
    if (!regEx.test(username)) {
        alert("Invalid Username");
        return;
    }

    // ✅ Valid username, now update UI
    searchButton.textContent = "Searching...";
    searchButton.disabled = true;

    // 🔁 Use setTimeout to allow UI update before fetch starts
    setTimeout(() => {
        fetchUserDetails(username);
    }, 0);
});


})