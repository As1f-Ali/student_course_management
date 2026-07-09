import { fetchStudents } from "./api.js";
import { displayStudents, displayCourses } from "./ui.js";


let allStudents = [];
let searchText = "";
let selectedCourse = "all";


// Apply all filters
const applyFilters = () => {

    let filteredStudents = allStudents;


    // Course filter
    if (selectedCourse !== "all") {

        filteredStudents = filteredStudents.filter(student => {

            return student.course === selectedCourse;

        });

    }


    // Name search filter
    if (searchText !== "") {

        filteredStudents = filteredStudents.filter(student => {

            return student.name
                .toLowerCase()
                .includes(searchText.toLowerCase());

        });

    }


    displayStudents(filteredStudents);

};


// Initialize application
const init = async () => {

    allStudents = await fetchStudents();


    displayStudents(allStudents);

    displayCourses(allStudents);



    // Search functionality
    const searchInput = document.getElementById("search-input");


    searchInput.addEventListener("input", () => {

        searchText = searchInput.value;

        applyFilters();

    });



    // Course filter functionality
    const courseFilter = document.getElementById("course-filter");


    courseFilter.addEventListener("change", () => {

        selectedCourse = courseFilter.value;

        applyFilters();

    });

};


init();