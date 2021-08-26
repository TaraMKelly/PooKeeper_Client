import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import AnimalsToolBar from './AnimalsToolBar';
import AnimalsList from './AnimalsList';
import NewAnimalForm from './NewAnimalForm';
import AnimalDetail from './AnimalDetail';
import EditAnimalForm from './EditAnimalForm';
// import AnimalsAZ from './AnimalsAZ';
// import AnimalsAge from './AnimalsAge';


function AnimalsContainer() {
  const [animals, setAnimals] = useState([]);
  const [search, setSearch] = useState("")


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

  // useEffect(() => {
  //   async function fetchAnimals() {
  //     const res = await fetch(`${process.env.REACT_APP_API_URL}/animals/a-z`, {
  //       headers: { Accept: 'application/json' }
  //     });

  //     const parsedBody = await res.json();

  //     setAnimals(parsedBody);
  //   }
  //   fetchAnimals();
  // }, []);

  // useEffect(() => {
  //   async function fetchAnimals() {
  //     const res = await fetch(`${process.env.REACT_APP_API_URL}/animals/age`, {
  //       headers: { Accept: 'application/json' }
  //     });

  //     const parsedBody = await res.json();

  //     setAnimals(parsedBody);
  //   }
  //   fetchAnimals();
  // }, []);

  function handleDeleteAnimal(id) {
    const deletedAnimal = animals.filter((animal) => animal.id !== id);
    setAnimals(deletedAnimal);
  }

  function handleEditAnimal(updatedAnimal) {
    const updatedAnimals = animals.map((animal) => {
      if (animal.id === updatedAnimal.id) {
        return updatedAnimal;
      } else {
        return animal;
      }
    });
    setAnimals(updatedAnimals);
  }

  const sendSearchWord = (value) => {
      setSearch(value)
  }

  const filterSearchAnimal = () => {
    if (search)
        return [...animals].filter(animal => animal.name.toLowerCase().includes(search) || animal.species.toLowerCase().includes(search))
    else
        return animals
  }


  return (
    <div className="w-4/5 mx-auto pt-12">
      <AnimalsToolBar />
      <Switch>
        <Route exact path="/animals">
          <AnimalsList animals={filterSearchAnimal()} onAnimalDelete={handleDeleteAnimal} sendSearchWord={sendSearchWord} />
        </Route>
        {/* <Route path="/animals/a-z">
          <AnimalsAZ animals={filterSearchAnimal()} onAnimalDelete={handleDeleteAnimal} sendSearchWord={sendSearchWord} />
        </Route> */}
        {/* <Route path="/animals/age">
          <AnimalsAge animals={filterSearchAnimal()} onAnimalDelete={handleDeleteAnimal} sendSearchWord={sendSearchWord} />
        </Route> */}
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
              onAnimalEdit={handleEditAnimal}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default AnimalsContainer;
