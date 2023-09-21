import React, { useEffect, useState } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch pizza data from your server
    fetch("http://localhost:3001/pizzas")
      .then((response) => response.json())
      .then((data) => {
        setPizzas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pizza data:", error);
        setLoading(false);
      });
  }, []);

  const handleEditPizza = (pizza) => {
    setSelectedPizza(pizza);
  };

  const handlePizzaFormSubmit = (formData) => {
    if (selectedPizza) {
      // If selectedPizza is not null, it means we are editing an existing pizza
      // Send a PUT request to update the pizza on the server
      fetch(`http://localhost:3001/pizzas/${selectedPizza.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((updatedPizza) => {
          // Update the pizza in the local state with the updated data
          const updatedPizzas = pizzas.map((pizza) =>
            pizza.id === updatedPizza.id ? updatedPizza : pizza
          );
          setPizzas(updatedPizzas);
          setSelectedPizza(null); // Clear selectedPizza to end the editing mode
        })
        .catch((error) => {
          console.error("Error updating pizza:", error);
        });
    } else {
      // If selectedPizza is null, it means we are creating a new pizza
      // Send a POST request to create a new pizza on the server
      fetch("http://localhost:3001/pizzas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((newPizza) => {
          // Add the new pizza to the local state
          setPizzas([...pizzas, newPizza]);
          setSelectedPizza(null); // Clear selectedPizza to end the editing mode
        })
        .catch((error) => {
          console.error("Error creating pizza:", error);
        });
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <PizzaList pizzas={pizzas} onEditClick={handleEditPizza} />
            )}
          </div>
          <div className="col-md-4">
            <PizzaForm selectedPizza={selectedPizza} onSubmit={handlePizzaFormSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
