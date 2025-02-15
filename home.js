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
