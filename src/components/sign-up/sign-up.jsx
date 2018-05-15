import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { LOCAL_HOST, LOCAL_URL_PREFIX } from '../../config/config';

export function SignUp() {
  return (
    <Container>
      <p className="h3">Авторизироваться через</p>
      <ul>
        <li><a href={`${LOCAL_URL_PREFIX}/auth/vkontakte`}>Вконтакте</a></li>
      </ul>
    </Container>
  );
}
