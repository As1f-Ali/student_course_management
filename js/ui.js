export const displayStudents = (students) => {
    const container = document.getElementById("student-container");

    const studentCards = students.map(student => {
        return `
        <div class="student-card">
            <h2>${student.name}</h2>
            <p>Age: ${student.age}</p>
            <p>Course: ${student.course}</p>
        </div>
        `;
    });
    
    container.innerHTML = studentCards.join("");

};

export const displayCourses = (students) => {

    const dropdown = document.getElementById("course-filter");

    const uniqueCourses = [
        ...new Set(
            students.map(student => student.course)
        )
    ];

    const options = uniqueCourses.map(course => {

        return `
            <option value="${course}">
                ${course}
            </option>
        `;

    });

    dropdown.innerHTML += options.join("");

};