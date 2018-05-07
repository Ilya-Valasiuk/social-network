import React, { Component } from 'react';
import { ButtonGroup, Button } from 'reactstrap'
import { LoadingScreen } from './loading-screen';
import { LOCAL_URL_PREFIX } from '../../config/config';
import { fetchData, postData } from './../../helper';

export class Interests extends Component {
  state = {
    isLoading: true,
    selected: this.props.interests,
  }

  componentDidMount() {
    fetchData(`${LOCAL_URL_PREFIX}/interests`)
      .then(data => {
        if (data.error) {
          console.log('Intersts fetch failed');
        } else {
          this.setState({ interests: data.result, isLoading: false, })
        }
      })
  }

  toggleInterest(interest) {
    this.setState(prevState => {
      const index = prevState.selected.findIndex(selectedEl => selectedEl._id === interest._id);
      
      return {
        selected: index > -1 ? prevState.selected.filter(selectedEl => selectedEl._id !== interest._id) : prevState.selected.concat(interest),
      }
    });
  }

  sendInterets = () => {
    const interestsIds = this.state.selected.map(interest => interest._id);

    if (!interestsIds.length) {
      alert('Please choose some element');
      return null;
    }

    postData(`${LOCAL_URL_PREFIX}/user/${this.props.userId}/interests`, { interests: interestsIds }, 'PUT')
      .then(() => { this.props.fetchUser() })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const { isLoading, interests, selected } = this.state;

    console.log(this.state)

    if (isLoading) {
      return <LoadingScreen />;
    }

    return (
      <section>
        <div>Choose Interests</div>

        <ButtonGroup>
          {
            interests.map(interest => (
              <Button
                key={interest._id}
                color="primary"
                onClick={() => this.toggleInterest(interest)}
                active={selected.some(selectedEl => selectedEl._id === interest._id)}
              >
                {interest.title}
              </Button>
            ))
          }
        </ButtonGroup>

        <div className="py-3">
          <Button color="success" onClick={() => this.sendInterets()}>Update Intersts</Button>
          <Button onClick={this.props.toggleInterests}>Close Intersts</Button>
        </div>

      </section>
    );
  }
}
