export const fetchStudents = async () => {

    try {

        const response = await fetch("../students.json");


        if (!response.ok) {

            throw new Error("Failed to fetch students");

        }


        const students = await response.json();


        return students;


    } catch(error) {

        throw error;

    }

};