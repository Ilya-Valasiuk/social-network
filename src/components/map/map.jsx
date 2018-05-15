import React, { Component, Fragment } from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from './marker';
import { Invivation } from './invatation';

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

  markerClick = user => {
    this.setState({
      showModal: true,
      modalUser: user,
    });
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      modalUser: null,
    });
  }

  sendInvite = ({ user, data }) => {
    this.props.sendInvite(user, data);
    this.closeModal();
  }

  render() {
    const { center, zoom, showModal, modalUser, modalUserName } = this.state;
    const { users, user } = this.props;

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
                  user={user}
                />
                {
                  users.map(user => {
                    return (
                      user.position ? <Marker
                        key={user.id}
                        lat={user.position.lat}
                        lng={user.position.lng}
                        user={user}
                        onMarkerClick={this.markerClick}
                      /> : null
                    );
                })
                }
              </GoogleMapReact>
            </Fragment> :
            <div>Map is loading...</div>
        }
        {
          showModal && <Invivation
            showModal={showModal}
            user={modalUser}
            onSuccess={this.sendInvite}
            onCloseModal={this.closeModal}
          />
        }
      </div>
    );
  }
}
