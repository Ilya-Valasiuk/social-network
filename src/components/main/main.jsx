import React, { Component } from 'react';
import { Button } from 'reactstrap'
import { Interests } from './interests';
import { LoadingScreen } from './loading-screen';
import { Map } from './../map/map';
import { Modal } from './../modal/modal';
import { LOCAL_HOST, LOCAL_URL_PREFIX } from '../../config/config';
import { fetchData, postData, getUserId } from './../../helper';

export class Main extends Component {
  state = {
    userId: getUserId(this.props.location),
    invitation: null,
    isLoading: true,
  }

  componentDidMount() {
    this.fetchUser(this.state.userId);

    // Create WebSocket connection.
    this.socket = new WebSocket(`ws://${LOCAL_HOST}`);

    // Connection opened
    this.socket.addEventListener('open', (event) => {
        console.log('socket connected')
    });

    // Listen for messages
    this.socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data && data.invite && data.userId === this.state.userId) {
          this.setState({
            invitation: {
              fromUserId: data.fromUserId,
              fromUserName: data.fromUserName
            }
          });
        }
      } catch(e) {
        console.log(e);
      }
    });

    this.socket.addEventListener('close', (event) => {
      // debugger
    })
  }

  fetchUser = (userId) => {
    fetchData(`${LOCAL_URL_PREFIX}/user/${userId}/users`)
      .then(({ user, users }) => {
        const { interests, ...userData } = user;
        this.setState({
          ...userData,
          interests,
          showInterests: !interests.length,
          isLoading: false,
          users,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sendInvite = (userId) => {
    this.socket.send(JSON.stringify({
      invite: true,
      userId,
      fromUserId: this.state.userId,
      fromUserName: this.state.displayName,
    }));
  }

  updateUserPosition = (position) => {
    postData(`${LOCAL_URL_PREFIX}/user/${this.state.userId}/position`, {
      position
    }, 'PUT')
      // .then()
  }

  toggleInterests = () => {
    this.setState(prevState => ({ showInterests: !prevState.showInterests }));
  }

  saveInvintation = (fromUserId) => {
    postData(`${LOCAL_URL_PREFIX}/user/${this.state.userId}/notification`, {
      notification: {
        fromUserId,
        fromUserName: this.state.displayName,
        fromObjectUserId: this.state._id,
        place: 'Shevchenko',
        time: new Date(),
      }
    }, 'PUT')
    .then((user) => {
      debugger
      console.log(user);
    })
  }

  discardInvintation = () => {
    this.setState({ invitation: null });
  }


  render() {
    const { showInterests, userId, displayName, isLoading, interests, photoLink, users, invitation, _id } = this.state;

    if (isLoading) {
      return (
        <LoadingScreen />
      );
    }

    if (showInterests) {
      return (
        <Interests userId={userId} interests={interests} fetchUser={() => this.fetchUser(userId)} toggleInterests={() => this.toggleInterests()} />
      );
    }

    return (
      <section>
        <div className="text-center">
          <h2>Интересы</h2>
          <Button color="success" onClick={() => this.toggleInterests()}>Выбрать</Button>
        </div>

        <div className="py-3 text-center">
          <h2>Карта</h2>
          <Map
            photo={photoLink}
            users={users}
            updateUserPosition={(...data) => this.updateUserPosition(...data)}
            sendInvite={(...data) => this.sendInvite(...data)}
          />
          {
            invitation &&
              <Modal
                title="Встреча"
                bodyMessage={`Встреча с ${invitation.fromUserName}`}
                onSuccess={() => this.saveInvintation(invitation.fromUserId)}
                onCloseModal={() => this.discardInvintation()}
                modal
              />
          }
        </div>
      </section>
    );
  }
  
}
