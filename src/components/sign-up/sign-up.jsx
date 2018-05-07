import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export function SignUp() {
  return (
    <Container>
      <h1>Social network</h1>
      <div>
        <p>Please login with:</p>
        <ul>
          <li><a href="http://localhost:3000/api/auth/vkontakte">vk</a></li>
        </ul>
      </div>
    </Container>
  );
}
