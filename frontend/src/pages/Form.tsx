import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorList from "../components/ErrorList";
import DataList from "../components/DataList";
import { submitPOST } from "../api/submit";

const FormPage = () => {
  const [date, setDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [data, setData] = useState<
    {
      date: string;
      name: string;
    }[]
  >([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitProcessing, setSubmitProcessing] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const submitRequest = async (
    date: string,
    firstName: string,
    lastName: string
  ) => {
    setSubmitProcessing(true);
    setError({});
    try {
      const response = await submitPOST({
        date,
        firstName,
        lastName,
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        setData([]);

        return;
      }

      const responseData = await response.json();

      setData(responseData.data);
    } catch (e: unknown) {
      setError({ request: [String(e)] });
      setData([]);
    } finally {
      setSubmitProcessing(false);
      setSearchParams({
        date: date,
        first_name: firstName,
        last_name: lastName,
      });
    }
  };

  useEffect(() => {
    const initialDate = searchParams.get("date") || "";
    const initialFirstName = searchParams.get("first_name") || "";
    const initialLastName = searchParams.get("last_name") || "";

    setDate(initialDate);
    setFirstName(initialFirstName);
    setLastName(initialLastName);

    if (initialFirstName && initialLastName && initialDate) {
      const loadState = async () => {
        setLoading(true);
        await handleSubmit(initialDate, initialFirstName, initialLastName);
        setLoading(false);
      };

      loadState();
    } else {
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (
    date: string,
    firstName: string,
    lastName: string
  ) => {
    await submitRequest(date, firstName, lastName);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={{ gap: "10px", display: "flex", flexDirection: "column" }}>
      <Link to={"/"}> To main page</Link>

      <h1>Form</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          handleSubmit(date, firstName, lastName);
        }}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {!submitProcessing && (
        <button
          type="button"
          onClick={() => {
            setDate("");
            setFirstName("");
            setLastName("");
            setData([]);
            setError({});
            setSearchParams({});
          }}
        >
          Clear Form
        </button>
      )}

      {submitProcessing && <Spinner />}
      {!submitProcessing && <ErrorList error={error} />}
      {!submitProcessing && <DataList data={data} />}
    </div>
  );
};

export default FormPage;
