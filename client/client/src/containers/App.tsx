import "./App.css";
import { Container } from "react-bootstrap";
import ListEmployees from "../components/ListEmployees";

function App() {
  return (
    <Container fluid>
      <h2 className="text-center">Product List </h2>
      <ListEmployees />
    </Container>
  );
}

export default App;
