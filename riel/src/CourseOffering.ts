import { Course } from "./Course";
import { StudentList, Student } from "./Student";

const studentLen = 15;

// The CourseOffering class captures the relationship of a
// course, in a room, on a particular date, with a particular
// group of students. It is not a reference-counting class,
// because we never share CourseOffering objects on multiple
// lists.
export class CourseOffering {
	// private
	private course: Course;
	private room: string;
	private date: string;
	private attendees: StudentList;

	// public
	constructor(course: Course, room: string, date: string) {
		this.course = course;
		course.attachObject();
		this.room = room;
		this.date = date;
		this.attendees = new StudentList(studentLen);
	}

	static copy(other: CourseOffering) {
		const self = new CourseOffering(other.course, other.room, other.date);
		return self;
	}

	remove() {
		if (this.course.detachObject() == 1) {
			this.course.remove();
		}
		this.attendees.remove();
	}

	// The course offering must ensure that a new student has
	// the necessary prerequisites. It does this by getting
	// the list of courses the student has taken from the Student
	// and gives it to the check_prereq method of the course.
	// The course can determine if the prerequisites are met,
	// since the course has the list of prerequisites and the
	// Student has given, via the CourseOffering object's call
	// to get_courses, the list of courses.
	addStudent(student: Student): void {
		if (this.course.checkPrereq(student.getCourses())) {
			this.attendees.addItem(student);
			console.log("Student added to course");
		} else {
			console.log("Admission refuesd: Student does not have the necessary prerequisites");
		}
	}
	print(): void {
		console.log("The course offering for");
		this.course.shortPrint();
		console.log(`will be held in a room ${this.room} starting on ${this.date}`);
		console.log("Current attendees include: ");
		this.attendees.print();
	}
	shortPrint(): void {
		this.course.shortPrint();
		console.log(this.date);
	}

	// The name of the course is not enough when comparing course
	// offerings. We must also test the dates.
	areYou(name: string, date: string): number {
		return !date.localeCompare(this.date) && this.course.areYou(name);
	}
}

// The CourseOffering list class is similar to the Student
// and Course list classes.
export class OfferingList {
	// private
	offerings: CourseOffering[];
	size = 0;
	offeringNum = 0;

	constructor(size: number) {
		this.offeringNum = 0;
		this.offerings = [];
		this.size = size;
	}

	static copy(other: OfferingList) {
		const self = new OfferingList(other.size);
		for (const o of other.offerings) {
			self.offerings.push(o);
		}
		self.offeringNum = other.offeringNum;
		return self;
	}

	remove() {
		this.offerings.forEach(x => x.remove());
	}

	// public
	addItem(offering: CourseOffering): number {
		if (this.offeringNum == this.size) {
			return 0;
		}
		this.offerings[this.offeringNum++] = offering;
	}

	findItem(guessName: string, date: string): CourseOffering | null {
		return this.offerings.find(x => x.areYou(guessName, date));
	}

	print() {
		this.offerings.forEach(x => x.shortPrint());
	}

}