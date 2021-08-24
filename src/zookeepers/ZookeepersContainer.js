import React, { useState, useEffect } from 'react'
import ZookeepersList from './ZookeepersList'

function ZookeepersContainer () {
  const [ zookeepers, setZookeepers] = useState([])

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
      <ZookeepersList zookeepers={zookeepers} setZookeepers={setZookeepers}/>
  )
}

export default ZookeepersContainer ;