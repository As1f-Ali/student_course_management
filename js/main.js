import { fetchStudents } from "./api.js";
import { displayStudents } from "./ui.js";

const init = async () => {

    const students = await fetchStudents();

    displayStudents(students);

    const searchInput = document.getElementById("search-input");

    searchInput.addEventListener("input", () => {

        const searchText = searchInput.value;

        const filteredStudents = students.filter(student => {

            return student.name
                .toLowerCase()
                .includes(searchText.toLowerCase());

        });

        displayStudents(filteredStudents);

    });

};

init();