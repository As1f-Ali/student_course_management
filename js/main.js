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
    setupOutsideClick
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