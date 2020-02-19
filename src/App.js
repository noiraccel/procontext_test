import React, { useState, useEffect } from "react";
import Photographers from "./Photographers";
import Albums from "./Albums";
import Photos from "./Photos";
import Loader from './Loader';

function App() {
  const [isLoading, setIsLoading] = useState({
    photographers: true,
    albums: false,
    photos: false
  });
  const [photographers, setPhotographers] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(result => {
        setPhotographers(result);
        setIsLoading(i => ({ ...i, ...{ photographers: false } }));
      });
  }, []);
  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);

  const [cachedAlbums, setCachedAlbums] = useState({})
  const [cachedPhotos, setCachedPhotos] = useState({})

  const [currentPhotographer, setCurrentPhotographer] = useState(null);
  const [currentAlbum, setCurrentAlbum] = useState(null);

  function handlePhotographer(photographer) {
    setIsLoading(i => ({ ...i, ...{ albums: true, photos: false } }));
    setPhotos([]);

    if (!cachedAlbums[photographer.id]) {
      fetch('https://jsonplaceholder.typicode.com/albums/?userId=' + photographer.id)
        .then(response => response.json())
        .then(result => {
          let _albums = cachedAlbums;
          _albums[photographer.id] = result;

          setCachedAlbums(_albums);
          setAlbums(result);
          setIsLoading(i => ({ ...i, ...{ albums: false, photos: false } }));
        });
    } else {
      setAlbums(cachedAlbums[photographer.id]);
      setIsLoading(i => ({ ...i, ...{ albums: false, photos: false } }));
    }

    setCurrentPhotographer(photographer);
  }

  function handleAlbum(album) {
    setIsLoading(i => ({ ...i, ...{ photos: true } }));

    if (!cachedPhotos[album.id]) {
      fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + album.id)
        .then(response => response.json())
        .then(result => {
          let _photos = cachedPhotos;
          _photos[album.id] = result;

          setCachedPhotos(_photos);
          setPhotos(result);
          setIsLoading(i => ({ ...i, ...{ photos: false } }));
        });
    } else {
      setPhotos(cachedPhotos[album.id]);
      setIsLoading(i => ({ ...i, ...{ photos: false } }));
    }

    setCurrentAlbum(album);
  }

  return (
    <div className="App container-fluid py-3">
      <div className="row">
        <div className="col-md-4 mb-3 mb-md-0">
          {!isLoading.photographers && <Photographers photographers={photographers} currentPhotographer={currentPhotographer} onSelectPhotographer={handlePhotographer}/>}
          {isLoading.photographers && <Loader />}
        </div>
        <div className="col-md-4 mb-3 mb-md-0">
          {!isLoading.albums && <Albums albums={albums} currentAlbum={currentAlbum} onSelectAlbum={handleAlbum} />}
          {isLoading.albums && <Loader />}
        </div>
        <div className="col-md-4">
          {!isLoading.photos && <Photos photos={photos} />}
          {isLoading.photos && <Loader />}
        </div>
      </div>
    </div>
  );
}

export default App;
