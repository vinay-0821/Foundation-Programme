console.log("This is the index.js file for the sample project.");

const resumeButton = document.getElementById("resume-button");

resumeButton.addEventListener("click", () => {
    const googledriveLink = "https://drive.google.com/file/d/1dS4iYF420bkYm14sMSYgUYUkbBL44gFv/view?usp=sharing";
    window.open(googledriveLink, "_blank");
});

const formSubmitButton = document.getElementById("form-submit");

formSubmitButton.addEventListener("click", (event) => {
    window.alert("Form submitted successfully!");
    event.preventDefault(); 
})