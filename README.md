# Employee Payroll Application

This is an Employee Payroll Application built using HTML, CSS, and jQuery. It consists of two main pages: a **Dashboard (Home Page)** that lists employee details, and an **Employee Form Page** for adding or editing employee information. The application is designed to interact with a local JSON server to fetch, store, update, and delete employee data.

## Features

- **Dashboard (Home Page)**:
  - Displays a list of employees with their name, profile picture, gender, department(s), salary, and start date.
  - Allows searching and filtering employees based on name, gender, department, salary, or start date.
  - Provides options to **edit** or **delete** employee records.

- **Employee Form Page**:
  - A form to **add** new employee details or **edit** existing employee information.
  - Includes fields for employee name, profile image, gender, department(s), salary, start date, and notes.
  - Employees can be added or updated, and data is stored and retrieved via a local JSON server.

## Pages

1. **Home Page (Dashboard)**:
   - Displays a list of all employees with a search functionality.
   - Provides options to edit or delete employee records.

2. **Employee Form Page**:
   - A form to input employee data for adding a new employee or editing an existing one.

## Dependencies

- **jQuery**: For DOM manipulation and AJAX requests.
- **JSON Server**: A local server to store and fetch employee data.

## Functionality

### Home Page (Dashboard)

The home page fetches the employee data from the server and displays it in a user-friendly format. Key functionalities include:

- **Fetching Employees**: On page load, the application fetches the employee data from the server and displays it on the home page.
- **Search**: Users can filter employees by name, gender, department, salary, or start date.
- **Edit**: Clicking the edit icon for an employee will navigate to the Employee Form Page with the employee’s details pre-filled for editing.
- **Delete**: Clicking the delete icon will prompt the user for confirmation to delete the employee.

### Employee Form Page

The Employee Form Page is used to add or edit employee details. When editing, the form fields are pre-filled with the employee’s existing data. The form includes:

- **Name**: Input field for the employee’s name.
- **Profile Image**: Radio buttons to select a profile image.
- **Gender**: Radio buttons for selecting the employee’s gender.
- **Departments**: Checkbox options for selecting employee departments.
- **Salary**: Input field for the employee’s salary.
- **Start Date**: Date input for the employee’s start date (day, month, year).
- **Notes**: A textarea for additional notes.

When the form is submitted, it sends either a POST request (to add a new employee) or a PUT request (to update an existing employee) to the server.

### API Endpoints

- **GET** `/empList`: Fetch all employees.
- **POST** `/empList`: Add a new employee.
- **PUT** `/empList/{id}`: Update an employee's data.
- **DELETE** `/empList/{id}`: Delete an employee.

## How to Run

1. Clone the repository to your local machine.
2. Set up a **JSON Server**:
   - Install `json-server` globally: `npm install -g json-server`.
   - Create a `db.json` file to store employee data.
   - Start the server using `json-server --watch db.json --port 3000`.
3. Open `HomePage.html` in your browser to view and interact with the application.

## License

This project is licensed under the MIT License.
