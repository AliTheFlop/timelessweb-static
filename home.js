document.addEventListener("DOMContentLoaded", function () {
    const select = document.querySelector(".contactus-form select");

    select.addEventListener("change", function () {
        if (this.value === "") {
            this.style.color = "rgba(255, 255, 255, 0.6)";
        } else {
            this.style.color = "rgba(255, 255, 255, 1)";
        }
    });
});

function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formButton = form.querySelector("button");
    const originalButtonText = formButton.innerHTML;

    // Change button text to show loading
    formButton.innerHTML = "Sending...";
    formButton.disabled = true;

    // Create hidden iframe to capture the response
    const iframe = document.createElement("iframe");
    iframe.name = "hidden_iframe";
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // When iframe loads, form was submitted
    iframe.onload = function () {
        // Create success message container
        const successContainer = document.createElement("div");
        successContainer.style.gridColumn = "1 / -1";
        successContainer.style.display = "flex";
        successContainer.style.justifyContent = "center";
        successContainer.style.alignItems = "center";
        successContainer.style.minHeight = "300px";

        // Create success message
        const successMessage = document.createElement("div");
        successMessage.style.color = "#a0a300";
        successMessage.style.padding = "20px";
        successMessage.style.textAlign = "center";
        successMessage.style.fontSize = "18px";
        successMessage.style.fontWeight = "bold";
        successMessage.innerHTML =
            "Thank you for your submission! We'll be in touch soon.";

        // Add the message to the container
        successContainer.appendChild(successMessage);

        // Clear form and display success
        form.innerHTML = "";
        form.appendChild(successContainer);
        form.style.display = "grid";

        // Clean up iframe
        setTimeout(() => document.body.removeChild(iframe), 1000);
    };

    // Set form to submit to the iframe
    form.target = "hidden_iframe";

    // Submit the form traditionally
    form.submit();

    return false;
}
