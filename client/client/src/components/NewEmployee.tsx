// new employee === newmotorcycle

import { Container, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const NewEmployee = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    hireDate: "",
    country: "",
    designation: "",
    id: "",
    imageUrl: "",
    reportsTo: "",
  });

  const URL = "http://localhost:8080/Employee";

  const handleChange = ({ target }: any) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  //POST!!!!!!!!!!!!!!
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(data.hireDate);

    const response = await axios.post(URL, data);
    console.log(response);
    if (response.status === 200) {
      Swal.fire("Saved!", `The record has been saved successfully!`);
      navigate("/");
    } else {
      Swal.fire("Error!", "There was a problem recording the data!", "error");
    }
  };

  return (
    <Container>
      <h1 className="text-center" style={{ margin: "1.5rem" }}>
        Add New Employee
      </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="country"
            placeholder="Country"
            value={data.country}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="designation"
            placeholder="Designation"
            value={data.designation}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="date"
            name="hireDate"
            placeholder="Hire Date"
            value={data.hireDate}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="id"
            placeholder="Employee ID"
            value={data.id}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="imageUrl"
            placeholder="URL Image"
            value={data.imageUrl}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <select
            className="form-control"
            name="reportsTo"
            value={data.reportsTo}
            onChange={handleChange}
            required
          >
            <option value="">Choose Manager</option>
            <option value="Stephen Bell">Stephen Bell</option>
            <option value="Jordan Goodwin">Jordan Goodwin</option>
            <option value="Maribel Lopez">Maribel Lopez</option>
          </select>
        </Form.Group>
        <button className="btn btn-success">Save</button>
      </Form>
    </Container>
  );
};

export default NewEmployee;
