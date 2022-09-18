//CardMotorcycle === CardEmployees

// motorcycle props = employee props

import axios from "axios";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "./styles/styles.css";
import Swal from "sweetalert2";

interface Props {
  setDataModal: any;
  handleOpenModal: any;
  setUpdateList: any;
  updateList: any;
  employee: {
    country: string;
    designation: string;
    hireDate: "2022-09-13T16:02:31.936Z";
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    imageUrl: string;
    reportsTo: "string";
  };
}

const CardEmployees: React.FC<Props> = ({
  employee,
  setUpdateList,
  updateList,
  handleOpenModal,
  setDataModal,
}) => {
  const URL = "http://localhost:8080/Employee";

  const handleDelete = () => {
    Swal.fire({
      title: `Are you sure you want to delete ${employee.id} ?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${URL}/${employee.id}`).then((response) => {
          if (response.status === 200) {
            Swal.fire(
              "Deleted!",
              `Employee ${employee.id} deleted successfully!`,
              "success"
            );
            setUpdateList(!updateList);
          } else {
            Swal.fire(
              "Error!",
              "There was an issue deleting the employee",
              "error"
            );
          }
        });
      }
    });
  };

  const handleEdit = () => {
    handleOpenModal();
    setDataModal(employee);
  };

  return (
    <div className="col-4 mb-3">
      <Card>
        <Card.Title className="text-center m-2">{employee.id}</Card.Title>
        <img
          src={employee.imageUrl}
          alt={employee.id}
          className="card-img-top image-card"
        />
        <Card.Body>
          <ListGroup className="mb-2">
            <ListGroupItem>
              <strong>Country: </strong>
              {employee.country}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Designation: </strong>
              {employee.designation}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Hire Date: </strong>
              {employee.hireDate}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Reports to: </strong>
              {employee.reportsTo}
            </ListGroupItem>
          </ListGroup>
          <button className="btn btn-danger m-2" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn btn-primary m-2" onClick={handleEdit}>
            Edit
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardEmployees;
