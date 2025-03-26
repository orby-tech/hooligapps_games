import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h1>Welcome</h1>
      <Link to="/form">Go to Form</Link>
      <Link to="/form?date=2025-03-19&first_name=John&last_name=Doe">
        Go to Form with Params
      </Link>
    </div>
  );
};

export default Home;
