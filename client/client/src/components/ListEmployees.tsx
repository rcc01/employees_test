// this is mockup ListMotorcycles
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Form, Modal } from "react-bootstrap";
import CardEmployees from "./CardEmployees";
import Swal from "sweetalert2";

const ListEmployees = () => {
  const URL = "http://localhost:8080/Employee";

  // GET!!!!!!!!!!!!!!!!!!!!!

  const getData = async () => {
    const response = await axios.get(URL);
    response.data.forEach((element: any) => {
      if (element.hireDate !== "") {
        element.hireDate = element.hireDate.slice(0, 10)
      }
    });
    return response;
  };

  const [list, setList] = useState<any[]>([]); //create state always in parents
  const [updateList, setUpdateList] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [dataModal, setDataModal] = useState({
    id: "",
    country: "",
    designation: "",
    hireDate: "",
    imageUrl: "",
    reportsTo: "",
  });

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  useEffect(() => {
    getData().then((response) => {
      setList(response.data);
    });
  }, [updateList]);

  const handleChangeModal = ({ target }: any) => {
    setDataModal({
      ...dataModal,
      [target.name]: target.value,
    });
  };

  // PUT!!!!!!!  - edit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await axios.put(`${URL}`, dataModal);
    if (response.status === 200) {
      Swal.fire(
        "Saved!",
        `The data ${response.data.id} has been saved successfully!`,
        "success"
      );
      handleCloseModal();
      setUpdateList(!updateList);
    } else {
      Swal.fire(
        "Error!",
        "There was an issue updating the information!",
        "error"
      );
      console.log(response);
    }
  };

  return (
    <Container className="mb-5">
      <Row>
        {list.map((employee, id) => {
          return (
            <CardEmployees
              employee={employee}
              key={id}
              setUpdateList={setUpdateList}
              updateList={updateList}
              handleOpenModal={handleOpenModal}
              setDataModal={setDataModal}
            />
          );
        })}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>Update Information</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="country"
                placeholder="Country"
                value={dataModal.country}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="designation"
                placeholder="Designation"
                value={dataModal.designation}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="date"
                name="hireDate"
                placeholder="Hire Date"
                value={dataModal.hireDate}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="image"
                placeholder="URL Image"
                value={dataModal.imageUrl}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <select
                className="form-control"
                name="reportsTo"
                onChange={handleChangeModal}
                required
              >
                <option value={dataModal.reportsTo}>
                  {dataModal.reportsTo}
                  {/* if dataModal.trademark ==== value {
                    do not show that option
                  } */}
                </option>
                <option value="Stephen Bell">Stephen Bell</option>
                <option value="Jordan Goodwin">Jordan Goodwin</option>
                <option value="Maribel Lopez">Maribel Lopez</option>
              </select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary"
              type="reset"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            <button className="btn btn-success" type="submit">
              Guardar
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ListEmployees;
