// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';

class Course {
  code: string;
  title: string;

  constructor(code: string, title: string) {
    this.code = code;
    this.title = title;
  }
}

class Student {
  firstName: string;
  lastName: string;
  email: string;
  courses: Course[];

  constructor(firstName: string, lastName: string, email: string, courses: Course[]) {
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

// class Home extends Component {
//   render() {
//     return <div>React example with static pages</div>;
//   }
// }

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
          <ul className={"list-group"}>
            {students.map(student => (
              <li className={"list-group-item"} key={student.email}>
                <NavLink activeStyle={{ color: 'darkblue' }} to={'/students/' + student.email}>
                  {student.firstName} {student.lastName}
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
          <ul className={"list-group"}>
            {courses.map(course => (
              <li className={"list-group-item"} key={course.code}>
                <NavLink activeStyle={{ color: 'darkblue' }} to={'/courses/' + course.code}>
                  {course.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>


    );
  }
}

class StudentDetails extends Component<{ match: { params: { email: string } } }> {
  render() {
    let student = students.find(student => student.email == this.props.match.params.email);
    if (!student) {
      console.error('Student not found'); // Until we have a warning/error system (next week)
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

class CourseDetails extends Component<{ match: { params: { code: string } } }> {
  render() {
    let course = courses.find(course => course.code == this.props.match.params.code);
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

class Card extends Component<{ title: string , children: string}> {
  render() {
    return(
      <div className={"card"}>
        <div className={"card-body"}>
          <h5 className={"card-title"}>{this.props.title}</h5>
          <p class={"card-text"}>{this.props.children}</p>
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
        <Menu />
        <Route exact path="/" component={Home} />
        <Route path="/students" component={StudentList} />
        <Route path="/students/:email" component={StudentDetails} />
        <Route path="/courses" component={CourseList} />
        <Route path="/courses/:code" component={CourseDetails} />
      </div>
    </HashRouter>,
    root
  );
