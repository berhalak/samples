import { CourseList, Course } from "./Course";

// Students have a name, social security number, and age. Like
// the Course objects, they also have a list of courses (the
// courses that the student has completed). Students are
// a reference-counting class just like the Course class. The
// reference counting works in exactly the same way as that of
// the Course. This will lead the experts to criticize the
// duplicate abstraction caused by the reference-counting
// mechanism. We could use inheritance to solve the problem
// but have not discussed this topic yet. The use of inheritance
// to eliminate duplicate abstractions will be examined in
// Chapter 5.
export class Student {

	// private 

	private name: string;
	private ssn: string;
	private age: number;
	private courses: CourseList;
	private referenceCount: number;

	// public

	constructor(name: string, ssn: string, age: number, ...courses: Course[]) {
		this.name = name;
		this.ssn = ssn;
		this.age = age;
		this.courses = new CourseList(courses.length);
		courses.forEach(course => this.courses.addItem(course));
	}

	static copy(other: Student): Student {
		const self = new Student(other.name, other.ssn, other.age);
		self.courses = CourseList.copy(other.courses);
		return self;
	}

	remove() {
		this.courses.remove();
	}

	attachObject(): number {
		return ++this.referenceCount;
	}

	detachObject(): number {
		return --this.referenceCount;
	}

	addCourse(course: Course): void {
		if (this.courses.addItem(course) == 0) {
			console.log("Cannot add any new courses to the Student.");
		}
	}

	// Note the need for an accessor method. This method will
	// be used by the CourseOffering class when it needs to
	// check the prerequisites of a Student object. The Student
	// is asked for its course list, which is then given to the
	// course for processing. In general, accessor methods are
	// bad in that they imply that this piece of data is not
	// strongly related to the other data of this class or its
	// methods. In general, ask why you are removing this data
	// from its encapsulation, what you are doing with it, and
	// why doesn't the class that owns the data do it for you.
	// In this example, the class cannot perform the behavior itself
	// because it needs data from both the Course and Student objects
	// to make the decision.
	getCourses(): CourseList {
		return this.courses;
	}

	print(): void {
		console.log(`
Name: ${this.name}
SSN: ${this.ssn}
Age: ${this.age}
${this.courses.print()}
`);
	}

	shortPrint(): void {
		console.log(this.name);
	}

	areYou(name: string): number {
		return this.name.localeCompare(name);
	}
}

// The StudentList mirrors the CourseList class except it is
// working on Student objects rather than Course objects.
export class StudentList {
	private students: Student[];
	private size: number;
	private studentNum: number;

	constructor(size: number) {
		this.studentNum = 0;
		this.size = size;
	}

	remove() {
		if (this.studentNum == this.students.length) {
			return 0;
		}
		for (let student of this.students) {
			if (student.detachObject() == 1) {
				student.remove();
			}
		}
		this.students = [];
	}

	static copy(other: StudentList) {
		const self = new StudentList(other.size);
		for (let student of other.students) {
			self.students.push(student);
			student.attachObject();
		}
		self.studentNum = other.studentNum;
		return self;
	}

	addItem(student: Student) {
		if (this.studentNum == this.size) {
			return 0;
		}
		this.students[this.studentNum++] = student;
		student.attachObject();
		return 1;
	}
	findItem(name: string): Student | null {
		return this.students.find(x => x.areYou(name));
	}
	print(): void {
		this.students.forEach(x => x.shortPrint());
	}
}