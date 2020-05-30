import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import Moment from "react-moment";
import "moment/locale/km";
import UserShowModal from "./UserShowModal";

const CardUser = props => {
  const { user, handleView, handleUpdate, handleDelete } = props;

  return (
    <Card className="mt-3">
      <Card.Header>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
            Actions
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <UserShowModal
              user={user}
              isButton={false}
              handleView={handleView}
            />
            <Dropdown.Item onClick={() => handleUpdate(user)}>
              Update
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDelete(user.id)}>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
      <Card.Body>
        <Card.Text>{user.name}</Card.Text>
        Jobs:
        {user.listJobs.map((job, i) => (
          <ul key={i}>
            <li>{job}</li>
          </ul>
        ))}
      </Card.Body>
      <Card.Footer>
        <Moment fromNow locale="km">
          {user.createdAt}
        </Moment>
      </Card.Footer>
    </Card>
  );
};

export default CardUser;
