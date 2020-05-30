import React, { Component, Fragment } from "react";
import randomstring from "randomstring";
import { Form, Button } from "react-bootstrap";
import SweetAlert from "sweetalert2-react";
import UserClass from "./UserClass";
import ListUser from "./ListUser";
import CardUser from "./CardUser";
import Pagination from "./Pagination";

class UserForm extends Component {
  state = {
    id: "",
    name: "",
    age: "",
    gender: "",
    jobs: {
      Teacher: false,
      Student: false,
      Developer: false
    },
    createdAt: "",
    updatedAt: "",
    nameError: "",
    ageError: "",
    genderError: "",
    jobError: "",
    button: "Submit",
    isList: true,
    showAlert: false,
    alertText: "",
    users: [],
    pageOfItems: []
  };

  //handle validate fields
  validate = () => {
    const { name, age, gender, jobs } = this.state;
    let nameError = "";
    let ageError = "";
    let genderError = "";
    let jobError = "";
    const regexName = /^[a-z][a-z\s]*$/i;

    // name can't be empty
    if (name === "") {
      nameError = "Name can't be empty!";
    }
    // must be a valid name
    else if (!regexName.test(name)) {
      nameError = "Invalid name!";
    }
    // age can't be empty
    if (!age) {
      ageError = "Age can't be empty!";
    }
    // age can't be greater than 110
    else if (age > 110) {
      ageError = "Age can't be greater than 110";
    }
    // gender can't be empty
    if (!gender) {
      genderError = "Gender can't be empty!";
    }
    // jobs can't be empty
    if (!jobs.Teacher || !jobs.Student || !jobs.Developer) {
      jobError = "Job can't be empty!";
    }
    // jobError will be empty if one of the following is true
    if (jobs.Teacher || jobs.Student || jobs.Developer) {
      jobError = "";
    }
    // error state will occur if the following is true
    if (nameError || ageError || genderError || jobError) {
      this.setState({ nameError, ageError, genderError, jobError });
      return false;
    }
    // else return true
    return true;
  };

  //handle changing fields
  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    if (event.target.type === "checkbox") {
      value = event.target.checked;
      this.setState({ jobs: { ...this.state.jobs, [name]: value } });
    } else {
      this.setState({ [name]: value });
    }
  };

  //handle submit button click
  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();

    if (isValid) {
      //checking if it is a submit button
      if (event.target.innerText === "Submit") {
        const id = randomstring.generate(5);
        const time = new Date().toISOString();
        const createdAt = time;
        const updatedAt = time;

        const { name, age, gender, jobs } = this.state;

        let listJobs = [];
        for (let key in jobs) {
          if (jobs[key] === true) {
            listJobs.push(key);
          }
        }
        const newUser = new UserClass(
          id,
          name,
          age,
          gender,
          listJobs,
          createdAt,
          updatedAt
        );

        this.setState({
          users: [...this.state.users, newUser],
          id: "",
          name: "",
          age: "",
          gender: "",
          jobs: {
            Teacher: false,
            Student: false,
            Developer: false
          },
          createdAt: "",
          updatedAt: "",
          nameError: "",
          ageError: "",
          genderError: "",
          jobError: "",
          showAlert: true,
          alertText: "Add"
        });
      }

      //it can be update button or cancel button
      else {
        const { id, name, age, gender, jobs, createdAt } = this.state;
        let { updatedAt } = this.state;
        const time = new Date().toISOString();
        const newUpdatedAt = time;
        updatedAt = newUpdatedAt;
        let listJobs = [];
        for (let key in jobs) {
          if (jobs[key] === true) {
            listJobs.push(key);
          }
        }
        const currentUser = new UserClass(
          id,
          name,
          age,
          gender,
          listJobs,
          createdAt,
          updatedAt
        );

        this.setState({
          users: [
            ...this.state.users.map(user => {
              if (user.id === currentUser.id) {
                user.name = currentUser.name;
                user.age = currentUser.age;
                user.gender = currentUser.gender;
                user.listJobs = currentUser.listJobs;
                user.updatedAt = currentUser.updatedAt;
              }
              return user;
            })
          ],
          id: "",
          name: "",
          age: "",
          gender: "",
          jobs: {
            Teacher: false,
            Student: false,
            Developer: false
          },
          createdAt: "",
          updatedAt: "",
          nameError: "",
          ageError: "",
          genderError: "",
          jobError: "",
          showAlert: true,
          alertText: "Update",
          button: "Submit"
        });
      }
    }
  };

  // handle cancel button click
  handleCancel = () => {
    this.setState({
      id: "",
      name: "",
      age: "",
      gender: "",
      jobs: {
        Teacher: false,
        Student: false,
        Developer: false
      },
      button: "Submit"
    });
  };

  //handle View
  handleView = () => {
    this.setState({
      nameError: "",
      ageError: "",
      genderError: "",
      jobError: ""
    });
  };

  //handle update
  handleUpdate = user => {
    const currentUser = new UserClass(
      user.id,
      user.name,
      user.age,
      user.gender,
      user.listJobs,
      user.createdAt,
      user.updatedAt
    );
    const jobsState = {};
    const isTeacher = currentUser.listJobs
      .filter(job => job === "Teacher")
      .map(job => (job === "Teacher" ? true : false));
    const isStudent = currentUser.listJobs
      .filter(job => job === "Student")
      .map(job => (job === "Student" ? true : false));
    const isDeveloper = currentUser.listJobs
      .filter(job => job === "Developer")
      .map(job => (job === "Developer" ? true : false));

    jobsState.Teacher = isTeacher[0];
    jobsState.Student = isStudent[0];
    jobsState.Developer = isDeveloper[0];

    this.setState({
      id: currentUser.id,
      name: currentUser.name,
      age: currentUser.age,
      gender: currentUser.gender,
      jobs: jobsState,
      createdAt: currentUser.createdAt,
      updatedAt: currentUser.updatedAt,
      button: "Update",
      nameError: "",
      ageError: "",
      genderError: "",
      jobError: ""
    });
  };

  //handle delete
  handleDelete = userId => {
    const users = this.state.users.filter(user => user.id !== userId);
    this.setState({
      users,
      pageOfItems: [],
      nameError: "",
      ageError: "",
      genderError: "",
      jobError: ""
    });
  };

  //handle list
  handleListView = () => {
    this.setDisplayView(true);
  };

  //handle card
  handleCardView = () => {
    this.setDisplayView(false);
  };

  //set display
  setDisplayView = value => {
    this.setState({ isList: value });
  };

  // handle pagination
  onChangePage = pageOfItems => {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  };
  render() {
    const {
      name,
      age,
      gender,
      jobs,
      nameError,
      ageError,
      genderError,
      jobError,
      button,
      users,
      pageOfItems,
      isList,
      showAlert,
      alertText
    } = this.state;

    const showList = (
      <ListUser
        users={pageOfItems}
        handleView={this.handleView}
        handleUpdate={this.handleUpdate}
        handleDelete={this.handleDelete}
      />
    );

    const showCard = users.map(user => (
      <CardUser
        key={user.id}
        user={user}
        handleView={this.handleView}
        handleUpdate={this.handleUpdate}
        handleDelete={this.handleDelete}
      />
    ));

    return (
      <Fragment>
        <h3 className="bg-dark text-white text-center pt-2 pb-3">
          Personal Information
        </h3>
        <Form>
          <Form.Group>
            <Form.Label htmlFor="name">Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Input Name"
              value={name}
              onChange={this.handleChange}
            />
            <h5 className="text-danger">{nameError}</h5>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="name">Age:</Form.Label>
            <Form.Control
              type="number"
              name="age"
              placeholder="Age"
              value={age}
              onChange={this.handleChange}
            />
            <h5 className="text-danger">{ageError}</h5>
          </Form.Group>

          <Form.Group>
            <h5>Gender:</h5>
            <Form.Check
              inline
              type="radio"
              name="gender"
              value="Male"
              label="Male"
              checked={gender === "Male"}
              onChange={this.handleChange}
            />
            <Form.Check
              inline
              type="radio"
              name="gender"
              value="Female"
              label="Female"
              checked={gender === "Female"}
              onChange={this.handleChange}
            />
            <h5 className="text-danger">{genderError}</h5>
          </Form.Group>

          <Form.Group>
            <h5>Job:</h5>
            <Form.Check
              inline
              type="checkbox"
              name="Teacher"
              label="Teacher"
              checked={jobs.Teacher}
              onChange={this.handleChange}
            />
            <Form.Check
              inline
              type="checkbox"
              name="Student"
              label="Student"
              checked={jobs.Student}
              onChange={this.handleChange}
            />
            <Form.Check
              inline
              type="checkbox"
              name="Developer"
              label="Developer"
              checked={jobs.Developer}
              onChange={this.handleChange}
            />
            <h5 className="text-danger">{jobError}</h5>
          </Form.Group>

          <Button variant="dark" type="submit" onClick={this.handleSubmit}>
            {button}
          </Button>
          {button === "Update" ? (
            <Button
              className="ml-3"
              variant="info"
              type="submit"
              onClick={this.handleCancel}
            >
              Cancel
            </Button>
          ) : null}
        </Form>
        <div className="text-center my-3">
          Display data:
          <Button
            variant="outline-info"
            className="mx-3"
            onClick={this.handleListView}
          >
            List
          </Button>
          <Button variant="outline-info" onClick={this.handleCardView}>
            Card
          </Button>
        </div>
        {isList ? showList : showCard}
        {isList && users.length > 0 ? (
          <Pagination
            users={users}
            onChangePage={this.onChangePage}
            pageSize={5}
            initialPage={1}
          />
        ) : null}
        <SweetAlert
          show={showAlert}
          title="Success"
          text={
            alertText === "Add"
              ? `User has add successfully!`
              : `User has update successfully!`
          }
          onConfirm={() => this.setState({ showAlert: false })}
        />
      </Fragment>
    );
  }
}

export default UserForm;
