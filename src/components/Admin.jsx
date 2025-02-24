import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Admin = () => {
    const { id } = useParams(); // Get employee ID from URL
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/employees/${id}`)
            .then((res) => res.json())
            .then((data) => setEmployee(data))
            .catch((err) => console.error("Error fetching employee:", err));
    }, [id]);

    if (!employee) return <p>Loading...</p>;

    return (
        <div>
            <h2>Admin Panel</h2>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Position:</strong> {employee.position}</p>
        </div>
    );
};

export default Admin;
