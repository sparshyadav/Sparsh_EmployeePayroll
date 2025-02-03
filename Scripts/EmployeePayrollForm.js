const submitButton = document.getElementById("submit-btn");
const resetButton = document.getElementById("reset-btn");
const cancelButton = document.getElementById("cancel-btn");
const form = document.querySelector("form");

const employeeToEdit = JSON.parse(localStorage.getItem("employeeToEdit"));

if (employeeToEdit) {
    document.getElementById("form-name").value = employeeToEdit.name;
    document.querySelector(`input[name="profile"][value="${employeeToEdit.profileImage}"]`).checked = true;
    document.querySelector(`input[name="gender"][value="${employeeToEdit.gender}"]`).checked = true;

    employeeToEdit.departments.forEach((department) => {
        const checkbox = document.querySelector(`input[name="department"][value="${department}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });

    document.getElementById("salary").value = employeeToEdit.salary;
    document.getElementById("day").value = employeeToEdit.startDate.day;
    document.getElementById("month").value = employeeToEdit.startDate.month;
    document.getElementById("year").value = employeeToEdit.startDate.year;
    document.getElementById("notes").value = employeeToEdit.notes;
}

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
        year: document.getElementById("year").value,
    };

    const notes = document.getElementById("notes").value;

    const formData = {
        name,
        profileImage,
        gender,
        departments,
        salary,
        startDate,
        notes,
    };

    if (employeeToEdit) {
        fetch(`http://localhost:3000/empList/${employeeToEdit.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update employee data");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Employee data updated:", data);
                alert("Employee payroll data has been updated!");
                localStorage.removeItem("employeeToEdit");
                window.location.href = "./HomePage.html";
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                alert("Failed to update data. Please try again.");
            });
    } else {
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
                window.location.href = "./HomePage.html";
            })
            .catch((error) => {
                console.error("Error saving data:", error);
                alert("Failed to save data to the server. Please try again.");
            });
    }
});

resetButton.addEventListener("click", function () {
    form.reset();
    if (employeeToEdit) {
        localStorage.removeItem("employeeToEdit");
        window.location.href = "./EmployeePayrollForm.html";
    }
});

cancelButton.addEventListener("click", function () {
    form.reset();
    localStorage.removeItem("employeeToEdit");
    window.history.back();
});

