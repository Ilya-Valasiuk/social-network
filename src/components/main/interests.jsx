import React, { Component, Fragment } from 'react';
import { forEach, map } from 'lodash';
import { ButtonGroup, Button, Row, Col, CardDeck } from 'reactstrap'
import { LoadingScreen } from './loading-screen';
import { LOCAL_URL_PREFIX } from '../../config/config';
import { fetchData, postData } from './../../helper';
import { InterstsCard } from './interests-card';

const createInterestsMap = interests => {
  const result = {};

  forEach(interests, (interest) => {
    if (result[interest.category]) {
      result[interest.category].push(interest);
    } else {
      result[interest.category] = [].concat(interest);
    }
  });

  return result;
};

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
    const interestsMap = createInterestsMap(interests);

    if (isLoading) {
      return <LoadingScreen />;
    }

    return (
      <section className="">
        <h2 className="mb-3 text-center">Выберите интересы</h2>
        {
          map(interestsMap, (categoryMap, title) => {
            return (
              <Fragment key={title}>
                <h3 className="text-left">{title}</h3>
                <CardDeck className="py-3">
                  {
                    categoryMap.map(interest => (
                      // <Col sm="3" key={interest._id}>
                        <InterstsCard
                          key={interest._id}
                          title={interest.title}
                          previewLink={interest.previewLink}
                          onClick={() => this.toggleInterest(interest)}
                          isActive={selected.some(selectedEl => selectedEl._id === interest._id)}
                        />
                      // </Col>
                    ))
                  }
                </CardDeck>
              </Fragment>
            );
          })
        }

        <div className="py-5">
          <Button color="success" className="mr-3" onClick={() => this.sendInterets()}>Обновить интересы</Button>
          <Button onClick={this.props.toggleInterests}>Закрыть</Button>
        </div>

      </section>
    );
  }
}
