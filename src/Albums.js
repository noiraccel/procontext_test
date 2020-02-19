import React, { useState } from "react";

function Albums(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredAlbums = props.albums.filter(album => {
    return new RegExp(searchQuery).test(album.title);
  });

  if (!props.albums.length) return null;

  return (
    <>
      <input type="text" className="form-control mb-3" placeholder="Search" onChange={e => setSearchQuery(e.target.value)} />
      <div className="list-group">
        {filteredAlbums.map(album => (
          <button type="button" className={"list-group-item list-group-item-action" + (props.currentAlbum && props.currentAlbum.id === album.id ? " active" : "")} key={album.id} onClick={() => props.onSelectAlbum(album)}>
            {album.title}
          </button>
        ))}
      </div>
    </>
  );
}

export default Albums;
