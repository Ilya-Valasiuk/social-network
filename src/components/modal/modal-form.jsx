/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal as ReactModal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';

export class ModalForm extends React.Component {
  render() {
    return (
      <ReactModal isOpen={this.props.modal} toggle={this.props.onCloseModal} className={this.props.className}>
        <ModalHeader toggle={this.props.onCloseModal}>{this.props.title}</ModalHeader>
        <AvForm onValidSubmit={this.props.onValidSubmit} onInvalidSubmit={this.props.onInvalidSubmit}>
          <ModalBody>
            {this.props.children}
          </ModalBody>
          <ModalFooter>
            <Button color="success">Ок</Button>
            <Button color="secondary" onClick={this.props.onCloseModal}>Закрыть</Button>
          </ModalFooter>
        </AvForm>
      </ReactModal>
    );
  }
}
