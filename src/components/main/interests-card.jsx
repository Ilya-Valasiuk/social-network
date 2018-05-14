import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const InterstsCard = ({ title, onClick, isActive, previewLink = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180' }) => {
  return (
    <div>
      <Card>
        <CardImg top width="100%" src={previewLink} alt="title" />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <Button color={isActive ? 'danger' : 'success'} onClick={onClick}>{isActive ? 'Удалить' : 'Добавить'}</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export {
  InterstsCard,
}
