// The main program is a simple menu-driven system for creating
// courses, course offerings, students; listing courses,
// students, and offerings; adding courses to students,
// students to courses, and prerequisites to courses. It can
// be used to test the public interfaces of the classes in
// this application.

import { CourseList, Course } from "./Course";
import { StudentList, Student } from "./Student";
import { OfferingList, CourseOffering } from "./CourseOffering";

const courses = new CourseList(50);
const students = new StudentList(50);
const offerings = new OfferingList(50);
let course1: Course = null;
let course2: Course = null;
let student: Student = null;
let offer1: CourseOffering = null;
let duration = 0, age = 0, choice = 0;
let answer = '', name = '', description = '', courseName = '';
let ssn = '', date = '', room = '';
let c = '';


type PromiseBody<T = any> = (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void;

function prompt(msg: string): PromiseLike<string> {
	return new Promise((r, f) => {
		const readline = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout
		})
		readline.question(msg, (name) => {
			r(name);
			readline.close()
		});
	});
}



async function main() {

	do {
		console.log("What would you like to do ?");
		console.log(" 1) Build a new course");
		console.log(" 2) Build a new student");
		console.log(" 3) BUild a new course offering");
		console.log(" 4) List courses");
		console.log(" 5) List students\n");
		console.log(" 6) List offerings\n");
		console.log(" 7) Add a prerequisite to a course\n");
		console.log(" 8) Add a course to a student\n");
		console.log(" 9) Add a student to a course offering\n");
		console.log("10) Detailed info on a course\n");
		console.log("11) Detailed info on a student\n");
		console.log("12) Detailed info on an of fering\n");
		console.log(" q) Quit\n");

		answer = await prompt("Your choice? :");

		choice = parseInt(answer);

		switch (choice) {
			case 1: {
				name = await prompt("Enter name: ");
				description = await prompt("Enter description:");
				duration = parseInt(await prompt("Enter duration"));
				courses.addItem(new Course(name, description, duration));
				c = await prompt("");
			} break;
		}

	} while (true);
}

main();