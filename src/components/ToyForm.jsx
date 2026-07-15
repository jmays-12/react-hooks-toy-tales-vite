import React, { useState } from "react";

const API_URL = "http://localhost:3001/toys";
function ToyForm({ onAddToy }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    function handleSubmit(e) {
        e.preventDefault(); // stops the page from reloading

        const newToy = {
            name,
            image,
            likes: 0,
        };

        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newToy),
        })
            .then((r) => r.json())
            .then((createdToy) => {
                onAddToy(createdToy); // send the new toy back up to App
                setName(""); // reset form
                setImage("");
            });
    }

    return (
        <div className="container">
            <form className="add-toy-form" onSubmit={handleSubmit}>
                <h3>Create a toy!</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter a toy's name..."
                    className="input-text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    name="image"
                    placeholder="Enter a toy's image URL..."
                    className="input-text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <br />
                <input
                    type="submit"
                    name="submit"
                    value="Create New Toy"
                    className="submit"
                />
            </form>
        </div>
    );
}

export default ToyForm;
