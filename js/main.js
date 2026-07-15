import { fetchStudents } from "./api.js";
import { 
    displayStudents,
    displayCourses,
    displayStatistics,
    showLoading,
    hideLoading,
    showError,
    setupDetailsButton,
    setupCloseModal,
    setupOutsideClick,
    setupAddStudentForm
} from "./ui.js";


let allStudents = [];
let searchText = "";
let selectedCourse = "all";


const applyFilters = () => {

    let filteredStudents = allStudents;


    if (selectedCourse !== "all") {

        filteredStudents = filteredStudents.filter(student => {

            return student.course === selectedCourse;

        });

    }


    if (searchText !== "") {

        filteredStudents = filteredStudents.filter(student => {

            return student.name
                .toLowerCase()
                .includes(searchText.toLowerCase());

        });

    }


    displayStudents(filteredStudents);

    setupDetailsButton(filteredStudents);

};


const init = async () => {
    try {

        showLoading();


        allStudents = await fetchStudents();


        hideLoading();


        displayStudents(allStudents);

        displayCourses(allStudents);

        displayStatistics(allStudents);

        setupAddStudentForm((studentData => {

            const exists = allStudents.some(student => 
                student.email.toLowerCase() === studentData.email
            );

            if (exists) {
                alert("Student with this email already exists");
                return;
            }

            const maxId = allStudents.reduce( (maxId, student) => {
                return maxId < student.id ? student.id : maxId
            }, 0);

            const newStudent = {
                id: maxId + 1,
                ...studentData
            }

            allStudents.push(newStudent);

            displayStudents(allStudents);
            displayStatistics(allStudents);
            displayCourses(allStudents);
            setupDetailsButton(allStudents);
        }));

        setupDetailsButton(allStudents);

        setupCloseModal();

        setupOutsideClick();

    } catch(error) {


        hideLoading();


        showError(
            "Unable to load student data"
        );


        console.error(error);

    }

    const searchInput = document.getElementById("search-input");


    searchInput.addEventListener("input", () => {

        searchText = searchInput.value;

        applyFilters();

    });



    const courseFilter = document.getElementById("course-filter");


    courseFilter.addEventListener("change", () => {

        selectedCourse = courseFilter.value;

        applyFilters();

    });

};


init();