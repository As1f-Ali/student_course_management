export const displayStudents = (students) => {
    const container = document.getElementById("student-container");

    const studentCards = students.map(student => {
        return `
        <div class="student-card">
            <h2>${student.name}</h2>
            
            <p>
            <strong>Course:</strong> 
            ${student.course}
            </p>

            <button class="view-detail" data-id = "${student.id}">View Details</button>

        </div>
        `;
    });
    
    container.innerHTML = studentCards.join("");

};

export const setupDetailsButton = (students) => {

    const buttons = document.querySelectorAll(".view-detail");

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
        const studentId = Number(event.target.dataset.id);
        const student = students.find(student => student.id === studentId);
        showStudentDetails(student);
    });
});

};

export const showStudentDetails = (student) => {

    const studentDetails = document.getElementById("student-detail");

    studentDetails.innerHTML = 
    `
        <h2>${student.name}</h2>
            
        <p>
        <strong>Email:</strong>
        ${student.email}
        </p>

        <p>
        <strong>Age:</strong> 
        ${student.age}
        </p>
            
        <p>
        <strong>Course:</strong> 
        ${student.course}    
        </p>
            
        <p>
        <strong>Enrollment Year:</strong> 
        ${student.enrollmentYear}    
        </p>

        <p>
        <strong>GPA:</strong> 
        ${student.gpa}
        </p>
    `;

    document.getElementById("modal").style.display = "flex";

};

export const setupCloseModal = () => {

    const closeButton = document.getElementById("close-modal");

    closeButton.addEventListener("click", () => {

        document.getElementById("modal").style.display = "none";

    });

};

export const setupOutsideClick = () => {
    const modal = document.getElementById("modal");
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
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

export const displayStatistics = (students) => {

    const totalStudents = students.length;

    
    const totalAge = students.reduce((sum, student) => {

        return sum + student.age;

    }, 0);


    const averageAge = (
        totalAge / students.length
    ).toFixed(1);



    const courseCount = students.reduce((count, student) => {

        count[student.course] =
            (count[student.course] || 0) + 1;

        return count;

    }, {});



    document.getElementById("total-students")
        .textContent = totalStudents;


    document.getElementById("average-age")
        .textContent = averageAge;


    document.getElementById("course-count")
        .innerHTML =
        Object.entries(courseCount)
        .map(([course, count]) => {

            return `
            <div class="course-card">

                <p>${course}</p>

                <p class="stat-number">
                ${count}
                </p>

            <small>Students</small>

            </div>
            `;
        })
        .join("");

};

export const showLoading = () => {

    document.getElementById("loading")
        .style.display = "block";

};

export const hideLoading = () => {

    document.getElementById("loading")
        .style.display = "none";

};

export const showError = (message) => {

    const errorElement =
        document.getElementById("error-message");


    errorElement.textContent = message;

};