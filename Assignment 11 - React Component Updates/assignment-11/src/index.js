// @flow
/* eslint eqeqeq: "off" */

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert } from './widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Course {
  id: number;
  static nextId = 1;

  code: string;
  title: string;

  constructor(code: string, title: string) {
    this.id = Course.nextId++;
    this.code = code;
    this.title = title;
  }
}


class Student {
  id: number;
  static nextId = 1;

  firstName: string;
  lastName: string;
  email: string;
  courses: Course[];

  constructor(firstName: string, lastName: string, email: string, courses: Course[]) {
    this.id = Student.nextId++;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.courses = courses;
  }
}

let courses = [
  new Course('TDAT3019', 'Systemutvikling 3'),
  new Course('TDAT3020', 'Sikkerhet i programvare og nettverk'),
  new Course('TDAT3022', 'Systemutviklingsprosjekt'),
  new Course('TDAT3023', '3D-grafikk med prosjekt'),
  new Course('TDAT3024', 'Matematikk og fysikk valgfag'),
  new Course('TDAT3025', 'Anvendt maskinlæring med prosjekt')
];

let students = [
  new Student('Ola', 'Jensen', 'ola.jensen@ntnu.no',
    [
      courses[0],
      courses[1],
      courses[2]
    ]),
  new Student('Kari', 'Larsen', 'kari.larsen@ntnu.no',
    [
      courses[1],
      courses[2],
      courses[3],
      courses[4]
    ]),
];

class Menu extends Component {
  render() {
    return (
      <table className={"navbar navbar-expand-lg navbar-light bg-light sticky-top"}>
        <tbody>
        <tr>
          <td>
            <NavLink className={"navbar-brand"} activeStyle={{ color: 'darkblue' }} exact to="/">
              React example
            </NavLink>
          </td>
          <td>
            <NavLink className={"navbar-brand"} activeStyle={{ color: 'darkblue' }} to="/students">
              Students
            </NavLink>
          </td>
          <td>
            <NavLink className={"navbar-brand"} activeStyle={{ color: 'darkblue' }} exact to="/courses">
              Courses
            </NavLink>
          </td>
        </tr>
        </tbody>
      </table>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="React example with static pages">User input and application state are covered next week.</Card>;
  }
}

class StudentList extends Component {
  render() {
    return (
      <div className={"card"}>
        <div className={"card-body"}>
          <h5 className={"card-title"}>Students</h5>
          <NavLink className={"btn btn-success"} activeStyle={{ color: 'darkblue' }} to={'/students/0/add'}>
            add student
          </NavLink>
          <ul className={"list-group"}>
            {students.map(student => (
              <li className={"list-group-item"} key={student.email}>
                <NavLink activeStyle={{ color: 'darkblue' }} exact to={'/students/' + student.id}>
                  {student.firstName} {student.lastName}
                </NavLink>{' '}
                <NavLink className={"btn btn-danger"} activeStyle={{ color: 'darkblue' }} to={'/students/' + student.id + '/delete'}>
                  delete
                </NavLink>
                <NavLink className={"btn btn-primary"} activeStyle={{ color: 'darkblue' }} to={'/students/' + student.id + '/edit'}>
                  edit
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

class CourseList extends Component {
  render() {
    return (
      <div className={"card"}>
        <div className={"card-body"}>
          <h5 className={"card-title"}>Courses</h5>
          <NavLink className={"btn btn-success"} activeStyle={{ color: 'darkblue' }} to={'/courses/0/add'}>
            add course
          </NavLink>
          <ul className={"list-group"}>
            {courses.map(course => (
              <li className={"list-group-item"} key={course.code}>
                <NavLink activeStyle={{ color: 'darkblue' }} to={'/courses/' + course.id}>
                  {course.title}
                </NavLink>
                <NavLink className={"btn btn-danger"} activeStyle={{ color: 'darkblue' }} to={'/courses/' + course.id + '/delete'}>
                  delete
                </NavLink>
                <NavLink className={"btn btn-primary"} activeStyle={{ color: 'darkblue' }} to={'/courses/' + course.id + '/edit'}>
                  edit
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

class StudentDetails extends Component<{ match: { params: { id: number } } }> {
  render() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return null; // Return empty object (nothing to render)
    }
    return (
      <div className={"card"}>
        <div className={"card-body"}>
          <h5 className={"card-title"}>Details</h5>
          <ul className={"list-group"}>
            <li className={"list-group-item"}>First name: {student.firstName}</li>
            <li className={"list-group-item"}>Last name: {student.lastName}</li>
            <li className={"list-group-item"}>Email: {student.email}</li>
          </ul>
          <div className={"card"}>
            <div className={"card-body"}>
              <h5 className={"card-title"}>Courses</h5>
              <ul className={"list-group"}>
                {student.courses.map(courses => (
                  <li className={"list-group-item"} key={courses.code}>
                    <NavLink activeStyle={{ color: 'darkblue' }} to={'/courses/' + courses.code}>
                      {courses.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class StudentEdit extends Component<{ match: { params: { id: number } } }> {
  firstName = ''; // Always initialize component member variables
  lastName = '';
  email = '';

  render() {
    return (
      <div className={"card"}>
        <div className={"card-body"}>
          <form>
            <ul className={"list-group"}>
              <li className={"list-group-item"}>
                First name:{' '}
                <input
                  type="text"
                  value={this.firstName}
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.firstName = event.target.value)}
                />
              </li>
              <li className={"list-group-item"}>
                Last name:{' '}
                <input
                  type="text"
                  value={this.lastName}
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.lastName = event.target.value)}
                />
              </li>
              <li className={"list-group-item"}>
                Email:{' '}
                <input
                  type="text"
                  value={this.email}
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.email = event.target.value)}
                />
              </li>
            </ul>
            <button className={"btn btn-success"} type="button" onClick={this.save}>
              Save
            </button>
          </form>

        </div>
      </div>

    );
  }

  // Initialize component state (firstName, lastName, email) when the component has been inserted into the DOM (mounted)
  mounted() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return;
    }

    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.email = student.email;
  }

  save() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return;
    }

    student.firstName = this.firstName;
    student.lastName = this.lastName;
    student.email = this.email;

    // Go to StudentDetails after successful save
    history.push('/students/' + student.id);
  }
}


class StudentDelete extends Component<{ match: { params: { id: number } } }> {
  firstName = ''; // Always initialize component member variables
  lastName = '';
  email = '';

  render() {
    return (
      <div className={"card"}>
        <div className={"card-body"}>
          <p className={"card-text"}>Are you sure?</p>
          <button className={"btn btn-success"} type="button" onClick={this.delete}>
            Yes
          </button>
          <button className={"btn btn-success"} type="button" onClick={this.undo}>
            No
          </button>

        </div>
      </div>

    );
  }

  delete() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return;
    }

    students.splice(students.indexOf(student), 1);

    history.push('/students/');
  }

  undo() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return;
    }
    history.push('/students/');
  }
}

class StudentAdd extends Component {
  firstName = ''; // Always initialize component member variables
  lastName = '';
  email = '';

  render() {
    return (
      <div className={"card"}>
        <div className={"card-body"}>
          <form>
            <ul className={"list-group"}>
              <li className={"list-group-item"}>
                First name:{' '}
                <input
                  type="text"
                  value={this.firstName}
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.firstName = event.target.value)}
                />
              </li>
              <li className={"list-group-item"}>
                Last name:{' '}
                <input
                  type="text"
                  value={this.lastName}
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.lastName = event.target.value)}
                />
              </li>
              <li className={"list-group-item"}>
                Email:{' '}
                <input
                  type="text"
                  value={this.email}
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.email = event.target.value)}
                />
              </li>
            </ul>
            <ul className={"list-group"}>
              {courses.map(course => (
                <li className={"list-group-item"} key={course.code}>
                  <input
                    type={"checkbox"}
                    value={course.code}
                    id={course.code}
                  />
                  <label htmlFor={course.code}>
                    {course.title}
                  </label>
                </li>
              ))}
            </ul>
            <button className={"btn btn-success"} type="button" onClick={this.add}>
              add
            </button>
          </form>
        </div>
      </div>
    );
  }


  add() {
    let studentCourses = [];

    courses.forEach(course => {
      let checkbox = document.getElementById(course.code);
      if(checkbox.checked) {
        studentCourses.push(course);
      }
    })

    students.push(new Student(this.firstName, this.lastName, this.email, studentCourses));

    // Go to StudentDetails after successful save
    history.push('/students/');
  }
}

class CourseDetails extends Component<{ match: { params: { id: number } } }> {
  render() {
    let course = courses.find(course => course.id == this.props.match.params.id);
    if (!course) {
      console.error('Course not found'); // Until we have a warning/error system (next week)
      return null; // Return empty object (nothing to render)
    }
    return (
      <div className={"card"}>
        <div className={"card-body"}>
          <h5 className={"card-title"}>Details</h5>
          <ul className={"list-group"}>
            <li className={"list-group-item"}>Code: {course.code}</li>
            <li className={"list-group-item"}>Title: {course.title}</li>
          </ul>

          <div className={"card"}>
            <div className={"card-body"}>
              <h5 className={"card-title"}>Students</h5>

              <ul className={"list-group"}>
                {students.filter(e => e.courses.includes(course)).map(student => (
                  <li className={"list-group-item"}>
                    <NavLink activeStyle={{ color: 'darkblue' }} to={'/students/' + student.email}>
                      {student.firstName} {student.lastName}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CourseEdit extends Component<{ match: { params: { id:number } } }> {
  code = ''; // Always initialize component member variables
  title = '';

  render() {
    return (
      <div className={"card"}>
        <div className={"card-body"}>
          <form>
            <ul className={"list-group"}>
              <li className={"list-group-item"}>
                Code:{' '}
                <input
                  type="text"
                  value={this.code}
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.code = event.target.value)}
                />
              </li>
              <li className={"list-group-item"}>
                Title:{' '}
                <input
                  type="text"
                  value={this.title}
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.title = event.target.value)}
                />
              </li>
            </ul>
            <button className={"btn btn-success"} type="button" onClick={this.save}>
              Save
            </button>
          </form>

        </div>
      </div>

    );
  }

  // Initialize component state (firstName, lastName, email) when the component has been inserted into the DOM (mounted)
  mounted() {
    let course = courses.find(course => course.id == this.props.match.params.id);
    if (!course) {
      Alert.danger('Course not found: ' + this.props.match.params.id);
      return;
    }

    this.code = course.code;
    this.title = course.title;
  }

  save() {
    let course = courses.find(course => course.id == this.props.match.params.id);
    if (!course) {
      Alert.danger('Course not found: ' + this.props.match.params.id);
      return;
    }

    course.code = this.code;
    course.title = this.title;

    // Go to StudentDetails after successful save
    history.push('/courses/' + course.id);
  }
}

class CourseDelete extends Component<{ match: { params: { id: number } } }> {
  code = ''; // Always initialize component member variables
  title = '';


  render() {
    return (
      <div className={"card"}>
        <div className={"card-body"}>
          <p className={"card-text"}>Are you sure?</p>
          <button className={"btn btn-success"} type="button" onClick={this.delete}>
            Yes
          </button>
          <button className={"btn btn-success"} type="button" onClick={this.undo}>
            No
          </button>

        </div>
      </div>

    );
  }

  delete() {
    let course = courses.find(course => course.id == this.props.match.params.id);
    if (!course) {
      Alert.danger('Course not found: ' + this.props.match.params.id);
      return;
    }

    courses.splice(courses.indexOf(course), 1);

    students.forEach(student => {
      if(student.courses.includes(course)) {
        let temp = student.courses;
        temp.splice(temp.indexOf(course), 1);
        student.courses = temp;
      }
    });

    history.push('/courses/');
  }

  undo() {
    let course = courses.find(course => course.id == this.props.match.params.id);
    if (!course) {
      Alert.danger('Course not found: ' + this.props.match.params.id);
      return;
    }
    history.push('/courses/');
  }
}

class CourseAdd extends Component {
  code = ''; // Always initialize component member variables
  title = '';

  render() {
    return (
      <div className={"card"}>
        <div className={"card-body"}>
          <form>

            <ul className={"list-group"}>
              <li className={"list-group-item"}>
                Code:{' '}
                <input
                  type="text"
                  value={this.code}
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.code = event.target.value)}
                />
              </li>
              <li className={"list-group-item"}>
                Title:{' '}
                <input
                  type="text"
                  value={this.title}
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.title = event.target.value)}
                />
              </li>
            </ul>
            <ul className={"list-group"}>
              {students.map(student => (
                <li className={"list-group-item"} key={student.email}>
                  <input
                    type={"checkbox"}
                    value={student.email}
                    id={student.email}
                  />
                  <label htmlFor={student.email}>
                    {student.firstName} {student.lastName}
                  </label>
                </li>
              ))}
            </ul>
            <button className={"btn btn-success"} type="button" onClick={this.add}>
              add
            </button>
          </form>
        </div>
      </div>
    );
  }


  add() {
    let courseStudents = [];

    // students.forEach(student => {
    //   let checkbox = document.getElementById(student.email);
    //   if(checkbox.checked) {
    //     courseStudents.push(student);
    //   }
    // })

    courses.push(new Course(this.code, this.title));

    // Go to StudentDetails after successful save
    history.push('/courses/');
  }
}

class Card extends Component<{ title: string , children: string}> {
  render() {
    return(
      <div className={"card"}>
        <div className={"card-body"}>
          <h5 className={"card-title"}>{this.props.title}</h5>
          <p className={"card-text"}>{this.props.children}</p>
        </div>
      </div>
    )
  }
}

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/" component={Home} />
        <Route path="/students" component={StudentList} />
        <Route exact path="/students/:id" component={StudentDetails} />
        <Route exact path="/students/:id/edit" component={StudentEdit} />
        <Route exact path="/students/:id/delete" component={StudentDelete} />
        <Route exact path="/students/:id/add" component={StudentAdd} />
        <Route path="/courses" component={CourseList} />
        <Route path="/courses/:id" component={CourseDetails} />
        <Route path="/courses/:id/edit" component={CourseEdit} />
        <Route path="/courses/:id/delete" component={CourseDelete} />
        <Route path="/courses/:id/add" component={CourseAdd} />
      </div>
    </HashRouter>,
    root
  );
