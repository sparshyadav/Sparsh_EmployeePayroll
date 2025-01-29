$(document).ready(function () {
    const $empBodyDiv = $(".emp-home-reg-body");
    let employeeList = [];

    function displayEmployees(employees) {
        $empBodyDiv.empty();

        employees.forEach(function (employee) {
            const employeeRow = `
                <div class="emp-home-emp1">
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
                </div>`;
            $empBodyDiv.append(employeeRow);
        });

        $(".action-icon.delete").on("click", handleDeleteEmployee);
        $(".action-icon.edit").on("click", handleEditEmployee);
    }

    function fetchEmployees() {
        $.ajax({
            url: "http://localhost:3000/empList",
            method: "GET",
            success: function (employeeData) {
                console.log("employeeData:", employeeData);
                employeeList = employeeData;
                displayEmployees(employeeList);
            },
            error: function (error) {
                console.error("Error fetching employee data:", error);
            }
        });
    }

    function handleDeleteEmployee(event) {
        const employeeId = $(event.target).data("id");

        if (confirm("Are you sure you want to delete this employee?")) {
            $.ajax({
                url: `http://localhost:3000/empList/${employeeId}`,
                method: "DELETE",
                success: function () {
                    console.log(`Employee with ID ${employeeId} deleted successfully`);
                    fetchEmployees();
                },
                error: function (error) {
                    console.error("Error deleting employee:", error);
                }
            });
        }
    }

    function handleEditEmployee(event) {
        const employeeId = $(event.target).data("id");

        $.ajax({
            url: `http://localhost:3000/empList/${employeeId}`,
            method: "GET",
            success: function (employee) {
                localStorage.setItem("employeeToEdit", JSON.stringify(employee));
                window.location.href = "./EmployeePayrollForm.html";
            },
            error: function (error) {
                console.error("Error fetching employee for editing:", error);
            }
        });
    }

    $("#search-box").on("input", function () {
        const searchText = $(this).val().toLowerCase();

        const filteredEmployees = employeeList.filter(employee => {
            return (
                employee.name.toLowerCase().includes(searchText) ||
                employee.gender.toLowerCase().includes(searchText) ||
                employee.departments.some(dept => dept.toLowerCase().includes(searchText)) ||
                employee.salary.toString().includes(searchText) ||
                `${employee.startDate.day} ${employee.startDate.month} ${employee.startDate.year}`.toLowerCase().includes(searchText)
            );
        });

        displayEmployees(filteredEmployees);
    });

    $(".crossIcon").on("click", function () {
        $("#search-box").val("");
        displayEmployees(employeeList);
    });

    fetchEmployees();
});

