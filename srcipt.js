const registrationForm = document.getElementById("registrationForm");
const displayData = document.getElementById("displayData");
const profilePictureDiv = document.querySelector(".profile-picture");
let userCount = 1; // Track the number of users added

// Add an event listener for the "Clear" button
const clearButton = document.querySelector('button[type="reset"]');
clearButton.addEventListener("click", function () {
    // Clear user data and profiles
    displayData.innerHTML = ""; // Clear displayed user data
    profilePictureDiv.innerHTML = ""; // Clear displayed profiles
    userCount = 1; // Reset user count
});

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(registrationForm);
    const entries = formData.entries();

    let displayHTML = "";

    for (const entry of entries) {
        const [key, value] = entry;

        if (key === "skills" && Array.isArray(value)) {
            displayHTML += `<li><strong>${key}:</strong> ${value.join(", ")}</li>`;
        } else if (key === "profilePicture" && value instanceof File) {
            // Check if a profile picture file was selected
            const reader = new FileReader();

            reader.onload = function (event) {
                const displayImage = `<img src="${event.target.result}" alt="Profile Picture" width="150">`;
                const userImageDiv = document.createElement("div");
                userImageDiv.innerHTML = displayImage;

                // Add a line break (styled as inline)
                const lineBreak = document.createElement("br");
                lineBreak.style.display = "inline";
                userImageDiv.appendChild(lineBreak);

                profilePictureDiv.appendChild(userImageDiv);
            };

            reader.readAsDataURL(value);
        } else {
            displayHTML += `<li><strong>${key}:</strong> ${value}</li>`;
        }
    }

    const ul = displayData.querySelector("ul");
    ul.innerHTML += `<div class="user-section">${displayHTML}</div>`;
    userCount++;

    // Reset the form
    registrationForm.reset();
});
