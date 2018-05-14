import React from 'react';
import { Container, Col, Row } from 'reactstrap';

import './footer.css';

export function Footer() {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="social mb-0">
              <iframe src="https://ghbtns.com/github-btn.html?user=Ilya-Valasiuk&amp;repo=social-network&amp;type=star&amp;count=true"
                frameBorder="0" scrolling="0" width="100" height="20px"></iframe>
              <iframe src="https://ghbtns.com/github-btn.html?user=Ilya-Valasiuk&amp;repo=social-network&amp;type=fork&amp;count=true"
                frameBorder="0" scrolling="0" width="100" height="20px"></iframe>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}