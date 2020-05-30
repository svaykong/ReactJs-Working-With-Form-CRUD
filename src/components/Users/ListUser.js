import React from "react";
import { Table, Button } from "react-bootstrap";
import Moment from "react-moment";
import "moment/locale/km";
import UserShowModal from "./UserShowModal";

const ListUser = props => {
  const { users, handleView, handleUpdate, handleDelete } = props;

  return (
    users.length > 0 && (
      <Table className="table mt-3">
        <thead>
          <tr>
            <td>Id:</td>
            <td>Name:</td>
            <td>Age:</td>
            <td>Gender:</td>
            <td>Jobs:</td>
            <td>Created At</td>
            <td>Updated At</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>
                {user.listJobs.map((j, i) => (
                  <ul key={i}>
                    <li>{j}</li>
                  </ul>
                ))}
              </td>
              <td>
                <Moment fromNow locale="km">
                  {user.createdAt}
                </Moment>
              </td>
              <td>
                <Moment fromNow locale="km">
                  {user.updatedAt}
                </Moment>
              </td>
              <td className="text-center">
                <UserShowModal
                  user={user}
                  isButton={true}
                  handleView={handleView}
                />
                <Button
                  className="mx-2"
                  variant="warning"
                  onClick={() => handleUpdate(user)}
                >
                  Update
                </Button>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  );
};

export default ListUser;
