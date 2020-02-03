// Courses have a name, description, duration, and a list
// of prerequisites. Since we expect Course objects to
// appear on many lists (e.g., Calculus I is a prerequisite of
// Calculus II, Calculus III, Physics I, etc.), we would like
// to implement shared shallow copies, i.e., we copy only
// pointers, not the entire course object. We accomplish
// this through a technique called reference counting. The
// class gets an integer counter, which maintains how many
// objects are sharing the particular course object. Anyone
// who points at the object must call the Course::attach_object()
// method, which increments the counter. When destroyed, the
// sharing object calls Course::detach_object() to decrement
// the counter. If detach_object() returns zero, then the
// caller knows that it is the last user of that Course
// object and it calls its destructor.
export class Course {
	private name: string;
	private description: string;
	private duration: number;
	private prereq: CourseList = new CourseList();
	private referenceCount: number;

	// This constructor for course takes a name, description,
	// duration, and a variable list of prerequisites. Each
	// prerequisite is added to the list using the CourseList::
	// add_item() method.
	constructor(name: string, description: string, duration: number, ...courses: Course[]) {
		this.name = name;
		this.description = description;
		this.duration = duration;
		for (let course of courses) {
			this.prereq.addItem(course);
		}
		this.referenceCount = 1;
	}

	// The copy constructor for course makes a copy of all the
	// strings and calls the copy constructor for a CourseList.
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
	addPrereq(course: Course): void {
		if (this.prereq.addItem(course) == 0) {
			throw new Error("Cannot add any new prerequisites");
		}
	}
	checkPrereq(courseTaken: CourseList): number {
		return courseTaken.findAll(this.prereq);
	}
	print(): void {
		console.log(`

Course:${this.name}
Description: ${this.description}
Duration:${this.duration}
List of Prerequisites: `);
		this.prereq.print();
		console.log("\r\n");
	}
	shortPrint(): void {
		console.log(this.name);
	}
	areYou(name: string): number {
		return name.localeCompare(this.name);
	}
}


// Each key abstraction also has a corresponding list class
// to maintain the list operations. Readers with more
// experience would certainly argue for the use of C++ templates
// to handle the list classes. I felt that this was too much
// forward referencing, which would have rendered the example less
// readable.
export class CourseList {
	private courses: Course[] = [];
	private size: number;
	private get courseNum() {
		return this.courses.length;
	}

	constructor(size: number) {
		this.size = size;
	}

	static copy(other: CourseList) {
		const clone = new CourseList(other.size);
		for (let course of clone.courses) {
			clone.courses.push(course);
			course.attachObject();
		}
		return clone;
	}
	remove() {
		for (let course of this.courses) {
			course.detachObject();
			course.remove();
		}
	}
	addItem(newItem: Course): number {
		if (this.courseNum == this.size) {
			return 0;
		}
		this.courses.push(newItem);
		newItem.attachObject();
		return 1;
	}
	findItem(name: string): Course {
		throw new Error("Method not implemented.");
	}
	findAll(list: CourseList): number {
		throw new Error("Method not implemented.");
	}
	print(): void {
		throw new Error("Method not implemented.");
	}
}