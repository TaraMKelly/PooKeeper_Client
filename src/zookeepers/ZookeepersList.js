import React from "react";
import ZookeeperListItem from "./ZookeeperListItem";

function ZookeepersList({ zookeepers, setZookeepers }) {

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
      {zookeepers.map((zookeeper) => (
        <ZookeeperListItem
          key={zookeeper.id}
          zookeeper={zookeeper}
          zookeepers={zookeepers}
          setZookeepers={setZookeepers}
        />
      ))}
    </div>
  );
}

export default ZookeepersList;
