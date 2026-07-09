import { fetchStudents } from "./api.js";
import { displayStudents } from "./ui.js";

const init = async () => {
    const students = await fetchStudents();

    displayStudents(students);
};
init();
