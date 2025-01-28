document.addEventListener("DOMContentLoaded", function () {
    const empBodyDiv = document.querySelector(".emp-home-reg-body");

    function displayEmployees() {
        fetch("http://localhost:3000/empList", { method: "GET" })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch employee data");
                }
                return response.json();
            })
            .then(employeeData => {
                console.log("employeeData:", employeeData);

                empBodyDiv.innerHTML = "";

                employeeData.forEach(employee => {
                    const employeeRow = document.createElement("div");
                    employeeRow.classList.add("emp-home-emp1");

                    employeeRow.innerHTML = `
                        <div class="reg-emp-name reg-name center">
                            <img src="${employee.profileImage}" alt="Employee">
                            <p>${employee.name}</p>
                        </div>
                        <div class="reg-emp-gender reg-gender center">${employee.gender}</div>
                        <div class="reg-emp-dept reg-dept center">
                            ${employee.departments.map(dept => `<div class="dept">${dept}</div>`).join("")}
                        </div>
                        <div class="reg-emp-salary reg-salary center">${employee.salary}</div>
                        <div class="reg-emp-start-date reg-start-date center">
                            ${employee.startDate.day} ${employee.startDate.month} ${employee.startDate.year}
                        </div>
                        <div class="reg-emp-actions reg-actions center">
                            <img src="../Assets/deleteIcon.png" alt="Delete Icon" class="action-icon delete" data-id="${employee.id}">
                            <img src="../Assets/editIcon.webp" alt="Edit Icon" class="action-icon edit" data-id="${employee.id}">
                        </div>
                    `;
                    empBodyDiv.appendChild(employeeRow);
                });

                document.querySelectorAll(".action-icon.delete").forEach(button => {
                    button.addEventListener("click", handleDeleteEmployee);
                });

                document.querySelectorAll(".action-icon.edit").forEach(button => {
                    button.addEventListener("click", handleEditEmployee);
                });
            })
            .catch(error => {
                console.error("Error fetching employee data:", error);
            });
    }

    function handleDeleteEmployee(event) {
        const employeeId = event.target.getAttribute("data-id");

        const confirmDelete = confirm("Are you sure you want to delete this employee?");
        if (confirmDelete) {
            fetch(`http://localhost:3000/empList/${employeeId}`, {
                method: "DELETE"
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to delete employee");
                    }
                    console.log(`Employee with ID ${employeeId} deleted successfully`);
                    displayEmployees();
                })
                .catch(error => {
                    console.error("Error deleting employee:", error);
                });
        }
    }

    function handleEditEmployee(event) {
        const employeeId = event.target.getAttribute("data-id");

        fetch(`http://localhost:3000/empList/${employeeId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch employee data for editing");
                }
                return response.json();
            })
            .then(employee => {
                localStorage.setItem("employeeToEdit", JSON.stringify(employee));

                window.location.href = "./EmployeePayrollForm.html";
            })
            .catch(error => {
                console.error("Error fetching employee for editing:", error);
            });
    }

    displayEmployees();
});
