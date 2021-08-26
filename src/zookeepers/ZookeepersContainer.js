import React, { useState, useEffect } from 'react'
import ZookeepersList from './ZookeepersList'
import ZookeeperDetail from './ZookeeperDetail'
import ZookeepersToolBar from './ZookeepersToolBar'
import { Switch, Route, useParams } from 'react-router-dom';
import EditZookeeperForm from './EditZookeeperForm';
import NewZookeeperForm from './NewZookeeperForm';

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
    <div className="w-4/5 mx-auto pt-12">
         <ZookeepersToolBar />
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
          <Route exact path="/zookeepers/new">
            <NewZookeeperForm zookeepers={zookeepers} setZookeepers={setZookeepers} />
          </Route>
          <Route
          exact
          path="/zookeepers/:id"
          render={({ match }) => (
            <ZookeeperDetail
              zookeeper={zookeepers.find((a) => a.id === parseInt(match.params.id))}
            />
          )}
        />
         </Switch>
    </div>
  )
}

export default ZookeepersContainer;