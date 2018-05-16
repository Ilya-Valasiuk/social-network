import React, { Component } from 'react';
import { Button, Badge} from 'reactstrap'
import { Interests } from './interests';
import { LoadingScreen } from './loading-screen';
import { Map } from './../map/map';
import { Modal } from './../modal/modal';
import { LOCAL_HOST, LOCAL_URL_PREFIX } from '../../config/config';
import { fetchData, postData, getUserId } from './../../helper';
import { NotificationGroup } from './../notification-card/notification-group';

export class Main extends Component {
  state = {
    invitation: null,
    isLoading: true,
    showNotificationModal: false,
  }

  componentDidMount() {
    this.fetchUser(getUserId(this.props.location));

    // Create WebSocket connection.
    this.socket = new WebSocket(`wss://${LOCAL_HOST}`);

    // Connection opened
    this.socket.addEventListener('open', (event) => {
        console.log('socket connected')
    });

    // Listen for messages
    this.socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data && data.invite && data.user.id === this.state.user.id) {
          this.setState({
            invitation: {
              fromUser: data.fromUser,
              data: data.data,
            }
          });
        } else if (data && data.accept && data.user.id === this.state.user.id) {
          this.saveInvintation(data.fromUser, data.data, false);
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
          user: {
            interests,
            ...userData,
          },
          showInterests: !interests.length,
          isLoading: false,
          users,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sendInvite = (user, data) => {
    this.socket.send(JSON.stringify({
      invite: true,
      user,
      data,
      fromUser: this.state.user,
    }));
  }

  acceptInvite = (user, inviteData) => {
    this.socket.send(JSON.stringify({
      accept: true,
      user,
      data: inviteData,
      fromUser: this.state.user,
    }));
  };

  updateUserPosition = (position) => {
    postData(`${LOCAL_URL_PREFIX}/user/${this.state.user.id}/position`, {
      position
    }, 'PUT')
      // .then()
  }

  toggleInterests = () => {
    this.setState(prevState => ({ showInterests: !prevState.showInterests }));
  }

  toggleNotificationModal = () => {
    this.setState(prevState => ({ showNotificationModal: !prevState.showNotificationModal }));
  }

  saveInvintation = (fromUser, inviteData, isAccept = true) => {
    postData(`${LOCAL_URL_PREFIX}/user/${this.state.user.id}/notification`, {
      notification: {
        fromObjectUserId: fromUser._id,
        place: inviteData.place,
        time: inviteData.time,
        date: inviteData.date,
      }
    }, 'PUT')
    .then(({ user }) => {
      this.setState({ user });

      if (isAccept) {
        this.acceptInvite(fromUser, inviteData);

        this.setState({ invitation: null });
      }
    })
  }

  discardInvintation = () => {
    this.setState({ invitation: null });
  }

  onNotificationRemove = (notificationId) => {
    console.log(notificationId);
  }

  render() {
    const { showInterests, isLoading, users, invitation, user, showNotificationModal } = this.state;

    if (isLoading) {
      return (
        <LoadingScreen />
      );
    }

    if (showInterests) {
      return (
        <Interests
          user={user}
          fetchUser={() => this.fetchUser(user.id)}
          toggleInterests={this.toggleInterests}
        />
      );
    }

    return (
      <section>
        <div className="text-center">
          <h2>Интересы</h2>
          <Button color="success" onClick={this.toggleInterests}>Выбрать</Button>
        </div>

        <div className="py-3 text-center">
          <h2>Карта <Badge color="secondary" onClick={this.toggleNotificationModal}>{user.notifications.length}</Badge></h2>
          <Map
            user={user}
            users={users}
            updateUserPosition={this.updateUserPosition}
            sendInvite={this.sendInvite}
          />
          {
            invitation &&
              <Modal
                title="Встреча"
                onSuccess={() => this.saveInvintation(invitation.fromUser, invitation.data)}
                onCloseModal={() => this.discardInvintation()}
                modal
              >
                <p>Встреча с {invitation.fromUser.displayName}</p>
                <p>Место - { invitation.data.place }</p>
                <p>Дата - { invitation.data.date }</p>
                <p>Время - { invitation.data.time }</p>
              </Modal>
          }
          <Modal
            title="Встречи"
            onSuccess={this.toggleNotificationModal}
            modal={showNotificationModal}
          >
            <NotificationGroup notifications={user.notifications} onRemove={this.onNotificationRemove} />
          </Modal>
        </div>
      </section>
    );
  }
  
}
