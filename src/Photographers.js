import React from 'react';

function Photographers (props) {
 return (
    <div className="list-group">
    {props.photographers.map(photographer => (
      <button type="button" className={"list-group-item list-group-item-action" + (props.currentPhotographer && props.currentPhotographer.id === photographer.id ? " active" : "")} key={photographer.id} onClick={() => props.onSelectPhotographer(photographer)}>
        {photographer.name}
      </button>
    ))}
  </div>
 );
}

export default Photographers;