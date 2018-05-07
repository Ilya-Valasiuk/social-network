import React, { Component } from 'react';
import { Button } from 'reactstrap'
import { Interests } from './interests';
import { LoadingScreen } from './loading-screen';
import { LOCAL_URL_PREFIX } from '../../config/config';
import { fetchData } from './../../helper';

function getUserId({ search }) {
  const userId = search.split('userId=')[1];

  return userId;
}

export class Main extends Component {
  state = {
    userId: getUserId(this.props.location),
    isLoading: true,
  }

  componentDidMount() {
    this.fetchUser(this.state.userId);
  }

  fetchUser = (userId) => {
    fetchData(`${LOCAL_URL_PREFIX}/user/${userId}`)
      .then(({ interests, ...userData }) => {
        this.setState({
          ...userData,
          interests,
          showInterests: !interests.length,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleInterests = () => {
    this.setState(prevState => ({ showInterests: !prevState.showInterests }));
  }

  render() {
    const { showInterests, userId, isLoading, interests } = this.state;

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
        <div>User id - {userId}</div>
        <Button onClick={() => this.toggleInterests()}>Edit Interests</Button>
      </section>
    );
  }
  
}
