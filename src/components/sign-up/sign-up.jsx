import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export function SignUp() {
  return (
    <Container>
      <p className="h3">Авторизироваться через</p>
      <ul>
        <li><a href="http://localhost:3000/api/auth/vkontakte">Вконтакте</a></li>
      </ul>
    </Container>
  );
}
