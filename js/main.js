import { fetchStudents } from "./api.js";
import { 
    displayStudents, 
    displayCourses,
    displayStatistics
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

};


const init = async () => {

    allStudents = await fetchStudents();


    displayStudents(allStudents);

    displayCourses(allStudents);

    displayStatistics(allStudents);

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