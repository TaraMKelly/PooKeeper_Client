import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import AnimalsToolBar from './AnimalsToolBar';
import AnimalsList from './AnimalsList';
import NewAnimalForm from './NewAnimalForm';
import AnimalDetail from './AnimalDetail';
import EditAnimalForm from './EditAnimalForm';

function AnimalsContainer() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    async function fetchAnimals() {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/animals`, {
        headers: { Accept: 'application/json' }
      });

      const parsedBody = await res.json();

      setAnimals(parsedBody);
    }

    fetchAnimals();
  }, []);

  return (
    <div className="w-4/5 mx-auto pt-12">
      <AnimalsToolBar />
      <Switch>
        <Route exact path="/animals">
          <AnimalsList animals={animals} setAnimals={setAnimals} />
        </Route>
        <Route exact path="/animals/new">
          <NewAnimalForm animals={animals} setAnimals={setAnimals} />
        </Route>
        <Route
          exact
          path="/animals/:id"
          render={({ match }) => (
            <AnimalDetail
              animal={animals.find((dog) => dog.id === parseInt(match.params.id))}
            />
          )}
        />
        <Route
          exact
          path="/animals/:id/edit"
          render={({ match }) => (
            <EditAnimalForm
              animals={animals}
              animal={animals.find((dog) => dog.id === parseInt(match.params.id))}
              setAnimals={setAnimals}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default AnimalsContainer;
