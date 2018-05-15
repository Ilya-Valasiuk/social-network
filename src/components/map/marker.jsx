import React from 'react';

import './marker.css';

export function Marker(props) {
  const { $geoService, onMarkerClick, user } = props;
  const { photoLink } = user;
  const zoom = props.$geoService.getZoom();

  return (
    <div className="marker" onClick={() => onMarkerClick(user)}>
      <img className="rounded-circle" width={zoom * 1.5} height={zoom * 1.5} src={photoLink} alt="profile photo"/>
      {/* <span>{name}</span> */}
    </div>
  );
}

Marker.defaultProps = {
  onMarkerClick: () => {}
};
