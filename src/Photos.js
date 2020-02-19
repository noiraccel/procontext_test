import React, { useState } from 'react';

function Photos(props) {
    const PHOTOS_PER_PAGE = 10
    const [page, setPage] = useState(1);

    if (!props.photos.length) return null;

    return (
        <>
            <div>
                {props.photos.slice(0, page * PHOTOS_PER_PAGE).map(photo => (
                    <img key={photo.id} alt={photo.title} src={photo.thumbnailUrl}></img>
                ))}
            </div>
             {props.photos.length > PHOTOS_PER_PAGE * page && 
             <div className="text-center">
                 <button type="button" className="btn btn-primary mt-3" onClick={() => setPage(page + 1)}>ЕЩЕ!</button>
             </div>}
        </>
    );
}

export default Photos;