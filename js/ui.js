export const displayStudents = (students) => {
    const container = document.getElementById("student-container");

    const studentCards = students.map(student => {
        return `
        <div class="student-card">
            <h2>${student.name}</h2>
            
            <p>
            <strong>Email:</strong><br>
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
                <p>${course}: ${count}</p>
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