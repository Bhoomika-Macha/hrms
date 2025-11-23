import { useState, useEffect } from "react";

function EmployeeForm({ initialData, onSubmit, buttonLabel }) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.first_name);
      setLastName(initialData.last_name);
      setEmail(initialData.email);
      setPhone(initialData.phone);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ first_name, last_name, email, phone });
  };

  return (
    <form onSubmit={handleSubmit}>

      <input placeholder="First Name"
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
      /><br/><br/>

      <input placeholder="Last Name"
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
      /><br/><br/>

      <input placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/><br/>

      <input placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      /><br/><br/>

      <button type="submit">{buttonLabel}</button>
    </form>
  );
}

export default EmployeeForm;
