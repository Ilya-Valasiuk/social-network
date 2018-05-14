/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal as ReactModal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Modal extends React.Component {
  render() {
    return (
      <ReactModal isOpen={this.props.modal} toggle={() => this.props.onCloseModal()} className={this.props.className}>
        <ModalHeader toggle={() => this.props.onCloseModal()}>{this.props.title}</ModalHeader>
        <ModalBody>
          {this.props.bodyMessage}
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => this.props.onSuccess()}>Ок</Button>{' '}
          <Button color="secondary" onClick={() => this.props.onCloseModal()}>Закрыть</Button>
        </ModalFooter>
      </ReactModal>
    );
  }
}
