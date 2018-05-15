import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { ModalForm } from '../modal/modal-form';
// import { Input, Button } from 'reactstrap';
import { Button, Modal as ReactModal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Invivation extends Component {
  state = {};

  handleValidSubmit = (event, values) => {
    this.props.onSuccess({ user: this.props.user, data: values });
  }

  handleInvalidSubmit = (event, errors, values) => {
    // debugger
  }

  render() {
    const { user, showModal, onCloseModal } = this.props;

    return (
      <ModalForm
          modal={showModal}
          title={`Встреча с ${user.displayName}`}
          onValidSubmit={this.handleValidSubmit}
          onInvalidSubmit={this.handleInvalidSubmit}
          onCloseModal={onCloseModal}
        >
          <AvField name="place" label="Адрес" required />
          <AvField name="date" label="Дата" type="date" required />
          <AvField name="time" label="Время" type="time" required />
      </ModalForm>
    );
  }
}
