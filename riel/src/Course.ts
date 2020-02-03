export interface ICourse {
	attachObject(): number;
	detachObject(): number;
	addPrereq(course: ICourse): void;
	checkPrereq(courseList: ICourseList): number;
	print(): void;
	shortPrint(): void;
	areYou(name: string): number;
}

export class Course implements ICourse {
	private name: string;
	private description: string;
	private duration: number;
	private prereq: CourseList = new CourseList();
	private referenceCount: number;

	constructor(name: string, description: string, duration: number, ...courses: ICourse[]) {
		this.name = name;
		this.description = description;
		this.duration = duration;
		for (let course of courses) {
			this.prereq.addItem(course);
		}
		this.referenceCount = 1;
	}

	static copy(course: Course) {
		const clone = new Course(course.name, course.description, course.duration);
		clone.referenceCount = course.referenceCount;
		clone.prereq = CourseList.copy(course.prereq);
		return clone;
	}

	// The destructor for Course deletes its prerequisites and
	// checks to be sure that it is the last user that called
	// delete on the course object. If not, an error message
	// is displayed.
	remove() {
		this.prereq.remove();
		if (this.referenceCount > 1) {
			throw new Error(`A course object destroyed with ${this.referenceCount} other objects referencing it`);
		}
	}

	// Each object that points at a Course object must call
	// attach_object to register itself with the object.
	attachObject(): number {
		return ++this.referenceCount;
	}

	// Each object that called attach_object must call detach_object
	// in its destructor (or other member function) to decrement
	// the reference counter
	detachObject(): number {
		return --this.referenceCount;
	}

	// To add a prerequisite to the course, we call the add_item
	// method of CourseList. This method returns zero on failure
	// to add the Course (i.e., the list is full).
	addPrereq(course: ICourse): void {
		if (this.prereq.addItem(course) == 0) {
			throw new Error("Cannot add any new prerequisites");
		}
	}
	checkPrereq(courseList: ICourseList): number {
		throw new Error("Method not implemented.");
	}
	print(): void {
		throw new Error("Method not implemented.");
	}
	shortPrint(): void {
		throw new Error("Method not implemented.");
	}
	areYou(name: string): number {
		throw new Error("Method not implemented.");
	}
}

export interface ICourseList {
	addItem(course: ICourse): number;
	findItem(name: string): ICourse;
	findAll(list: ICourseList): number;
	print(): void;
}

export class CourseList implements ICourseList {
	private courses: ICourse[] = [];
	private size: number;
	private get courseNum() {
		return this.courses.length;
	}

	static copy(other: CourseList) {
		const clone = new CourseList();
		return clone;
	}


	remove() {

	}

	addItem(course: ICourse): number {
		throw new Error("Method not implemented.");
	}
	findItem(name: string): ICourse {
		throw new Error("Method not implemented.");
	}
	findAll(list: ICourseList): number {
		throw new Error("Method not implemented.");
	}
	print(): void {
		throw new Error("Method not implemented.");
	}


}