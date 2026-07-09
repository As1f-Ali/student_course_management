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