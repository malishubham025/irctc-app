import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function AdminPage() {
    const navigate = useNavigate();
    const [addTrainData, setAddTrainData] = useState({
        source: "",
        destination: "",
        trainId: "",
        seats: "",
        name: "",
    });

    const [removeTrainData, setRemoveTrainData] = useState({
        trainId: "",
    });

    const handleAddTrainChange = (e) => {
        const { name, value } = e.target;
        setAddTrainData({ ...addTrainData, [name]: value });
    };

    const handleRemoveTrainChange = (e) => {
        const { name, value } = e.target;
        setRemoveTrainData({ ...removeTrainData, [name]: value });
    };

    const handleAddTrainSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/add-train", addTrainData);
            if (response.status === 200) {
                alert("Train added successfully!");
                setAddTrainData({
                    source: "",
                    destination: "",
                    trainId: "",
                    seats: "",
                    name: "",
                });
            } else {
                alert("Failed to add train. Please try again.");
            }
        } catch (err) {
            if(err.status==404){
                alert("Train ID Exist");
            }
            else if(err.status==500){
                
                alert("some error occured !");
            }
        }
    };

    const handleRemoveTrainSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("Data being sent:", removeTrainData); // Debugging log
        const response = await axios.post("http://localhost:3001/remove-train", removeTrainData, {
            headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
            alert("Train removed successfully!");
            setRemoveTrainData({ trainId: "" });
        } else {
            alert("Failed to remove train. Please try again.");
        }
    } catch (err) {
        console.error("Error during request:", err);
        if (err.response?.status === 404) {
            alert("Train does not exist");
        } else {
            alert("Failed to remove train. Please try again.");
        }
    }
};


    function handleViewTrains(e){
        e.preventDefault();
        navigate("/view-trains");
    };

    return (
        <div className="admin-page">
            <h1>Welcome Admin</h1>

            <form onSubmit={handleAddTrainSubmit}>
                <h3>Add Train</h3>
                <input
                    type="text"
                    placeholder="Train ID"
                    name="trainId"
                    value={addTrainData.trainId}
                    onChange={handleAddTrainChange}
                />
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={addTrainData.name}
                    onChange={handleAddTrainChange}
                />
                <input
                    type="text"
                    placeholder="Source"
                    name="source"
                    value={addTrainData.source}
                    onChange={handleAddTrainChange}
                />
                <input
                    type="text"
                    placeholder="Destination"
                    name="destination"
                    value={addTrainData.destination}
                    onChange={handleAddTrainChange}
                />
                <input
                    type="text"
                    placeholder="Seats"
                    name="seats"
                    value={addTrainData.seats}
                    onChange={handleAddTrainChange}
                />
                <button type="submit">Add</button>
            </form>

            <form onSubmit={handleRemoveTrainSubmit}>
                <h3>Remove Train</h3>
                <input
                    type="text"
                    placeholder="Enter Train ID"
                    name="trainId"
                    value={removeTrainData.trainId}
                    onChange={handleRemoveTrainChange}
                />
                <button type="submit">Submit</button>
            </form>

            <button onClick={handleViewTrains}>View Trains</button>
        </div>
    );
}

export default AdminPage;
