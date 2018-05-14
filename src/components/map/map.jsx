import React, { Component, Fragment } from 'react';
import GoogleMapReact from 'google-map-react';
import { Modal } from '../modal/modal';
import { Marker } from './marker';

import './map.css';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export class Map extends Component {
  static defaultProps = {
    center: null,
    zoom: 15
  };

  state = {
    center: this.props.center,
    zoom: this.props.zoom,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.setState({ center: { lat: latitude, lng: longitude }});
      this.props.updateUserPosition({ lat: latitude, lng: longitude })
    });
  }

  markerClick = (userId, displayName) => {
    this.setState({
      showModal: true,
      modalUser: userId,
      modalUserName: displayName,
    });
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      modalUser: null,
      modalUserName: null,
    });
  }

  sendInvite = (userId) => {
    this.props.sendInvite(userId);
    this.closeModal();
  }

  render() {
    const { center, zoom, showModal, modalUser, modalUserName } = this.state;
    const { photo, users } = this.props;

    return (
      // Important! Always set the container height explicitly
      <div className="d-flex align-items-center justify-content-center map_wrapper">
        {
          center ?
            <Fragment>
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBlQcKxukgknYt3IFbF2NcdrdQlzY21P44' }}
                defaultCenter={center}
                defaultZoom={zoom}
              >
                <Marker
                  lat={center.lat}
                  lng={center.lng}
                  photo={photo}
                />
                {
                  users.map(({ position, id, photoLink, displayName }) => {
                    return (
                      position ? <Marker
                        key={id}
                        lat={position.lat}
                        lng={position.lng}
                        photo={photoLink}
                        id={id}
                        onMarkerClick={(...data) => this.markerClick(id, displayName)}
                      /> : null
                    );
                })
                }
              </GoogleMapReact>
              <Modal
                modal={showModal}
                user={modalUser}
                title="Приглашение?"
                bodyMessage={`Отправить приглашение ${modalUserName}?`}
                onSuccess={() => this.sendInvite(modalUser)}
                onCloseModal={() => this.closeModal()}
              />
            </Fragment> :
            <div>Map is loading...</div>
        }
        
      </div>
    );
  }
}
