import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API_URL = "http://localhost:3001/toys";

function App() {
    const [showForm, setShowForm] = useState(false);
    const [toys, setToys] = useState(null);

    function handleClick() {
        setShowForm((showForm) => !showForm);
    }

    function handleAddToy(newToy) {
        setToys((toys) => [...toys, newToy]);
    }

    function handleDeleteToy(id) {
        setToys((toys) => toys.filter((toy) => toy.id !== id));
    }

    function handleUpdateToy(updatedToy) {
        setToys((toys) =>
            toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy)),
        );
    }

    useEffect(() => {
        fetch("http://localhost:3001/toys")
            .then((r) => {
                if (!r.ok) {
                    throw new Error("failed to get listings");
                }
                return r.json();
            })
            .then((result) => {
                console.log(result);
                setToys(result);
            })
            .catch((error) => console.log(error.message));
    }, []);

    return (
        <>
            <Header />
            {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
            <div className="buttonContainer">
                <button onClick={handleClick}>Add a Toy</button>
            </div>
            <ToyContainer
                toys={toys}
                onDeleteToy={handleDeleteToy}
                onUpdateToy={handleUpdateToy}
            />
        </>
    );
}

export default App;
