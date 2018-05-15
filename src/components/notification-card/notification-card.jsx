import React from 'react';
import { Row, Col, Button } from 'reactstrap'

export function NotificationCard({ notification, isLast, isFirst, onRemove }) {
  const { user } = notification;
  let customClass = '';
  if (isFirst && !isLast) {
    customClass = 'pb-3';
  } else if (isLast && !isFirst) {
    customClass = 'pt-3';
  } else if (!isLast && !isFirst) {
    customClass = 'py-3';
  }

  return (
    <Row className={`align-items-center px-3 ${customClass} ${isLast ? '' : 'border-bottom'}`}>
      <Col xs="auto">
        <img src={user.photoLink} className="rounded-circle" alt="user photo"/>
      </Col>
      <Col>
        <p className="mb-0">Встреча с {user.displayName}</p>
        <p className="mb-0">Время - {notification.time}</p>
        <p className="mb-0">Дата - {notification.date}</p>
        <p className="mb-0">Место - {notification.place}</p>
      </Col>
      <Col xs="auto">
        <Button color="danger" onClick={onRemove}>Remove</Button>
      </Col>
    </Row>
  );
}

NotificationCard.defaultProps = {
  onRemove: () => {},
};
