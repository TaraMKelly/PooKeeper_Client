import React, { useState, useEffect } from 'react'
import ZookeepersList from './ZookeepersList'
import { Switch, Route } from 'react-router-dom';
import EditZookeeperForm from './EditZookeeperForm';

function ZookeepersContainer() {
  const [zookeepers, setZookeepers] = useState([])

  useEffect(() => {
    async function fetchZookeepers() {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/zookeepers`, {
        headers: { Accept: 'application/json' }
      });

      const parsedBody = await res.json();

      setZookeepers(parsedBody);
    }

    fetchZookeepers();
  }, []);


  return (
    <Switch>
      <Route
        exact path="/zookeepers">
        <ZookeepersList zookeepers={zookeepers} setZookeepers={setZookeepers} />
      </Route>
      <Route
        exact path="/zookeepers/:id/edit"
        render={({ match }) => (
          <EditZookeeperForm
            zookeepers={zookeepers}
            zookeeper={zookeepers.find((zookeeper) => zookeeper.id === parseInt(match.params.id))}
            setZookeepers={setZookeepers}
          />

        )}
      />
    </Switch>
  )
}

export default ZookeepersContainer;