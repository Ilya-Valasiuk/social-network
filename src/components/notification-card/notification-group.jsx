import React, { Fragment } from 'react';
import { Row } from 'reactstrap'
import { NotificationCard } from './notification-card';

export function NotificationGroup({ notifications, onRemove }) {
  return (
    <Fragment>
      {
        notifications.map((notification, index) => {
          const isLast = notifications.length === index + 1;
          const isFirst = index === 0;

          return (
            <NotificationCard
              key={notification._id}
              notification={notification}
              isLast={isLast}
              isFirst={isFirst}
              onRemove={onRemove}
            />
          );
        })
      }
    </Fragment>
  );
}
