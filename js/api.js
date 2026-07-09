export const fetchStudents = async () => {
    try {
        const response = await fetch("../students.json");
        const students = await response.json();

        return students;
    } catch(error) {
        console.log(error);
    }
};