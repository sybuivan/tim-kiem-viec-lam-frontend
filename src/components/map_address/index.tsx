import React from 'react';
import GoogleMapReact from 'google-map-react';

const MapAddress = ({ lat, lng }: { lat: number; lng: number }) => {
  const defaultProps = {
    center: {
      lat,
      lng,
    },
    zoom: 11,
  };

  const renderMarkers = (map: any, maps: any) => {
    let marker = new maps.Marker({
      position: defaultProps.center,
      map,
      title: 'Hello World!',
    });
    return marker;
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onGoogleApiLoaded={({ map, maps }: { map: any; maps: any }) =>
          renderMarkers(map, maps)
        }
      ></GoogleMapReact>
    </div>
  );
};

export default MapAddress;
