const submitButton = document.getElementById("submit-btn");
const resetButton = document.getElementById("reset-btn");
const cancelButton = document.getElementById("cancel-btn");
const form = document.querySelector("form");

submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    const name = document.getElementById("form-name").value;
    const profileImage = document.querySelector('input[name="profile"]:checked')?.value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const departments = [];
    const departmentCheckboxes = document.querySelectorAll('input[name="department"]:checked');

    departmentCheckboxes.forEach((checkbox) => {
        departments.push(checkbox.value);
    });

    const salary = document.getElementById("salary").value;
    const startDate = {
        day: document.getElementById("day").value,
        month: document.getElementById("month").value,
        year: document.getElementById("year").value
    };

    const notes = document.getElementById("notes").value;

    const formData = {
        name,
        profileImage,
        gender,
        departments,
        salary,
        startDate,
        notes
    };

    fetch("http://localhost:3000/empList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to save data to the server");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Data saved to JSON server:", data);
            alert("Employee payroll data has been saved to the server!");
        })
        .catch((error) => {
            console.error("Error saving data:", error);
            alert("Failed to save data to the server. Please try again.");
        });
});

resetButton.addEventListener("click", function () {
    form.reset();
});

cancelButton.addEventListener("click", function () {
    form.reset();
    window.history.back();
});
