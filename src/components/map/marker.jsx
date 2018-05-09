import React from 'react';

import './marker.css';

export function Marker(props) {
  const { name, photo, $geoService, onMarkerClick, id } = props;
  const zoom = props.$geoService.getZoom();

  return (
    <div className="marker" onClick={() => onMarkerClick(id)}>
      <img className="rounded-circle" width={zoom * 1.5} height={zoom * 1.5} src={photo} alt="profile photo"/>
      {/* <span>{name}</span> */}
    </div>
  );
}

Marker.defaultProps = {
  onMarkerClick: () => {}
};
