import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [language, setLanguage] = useState('');
  const [script, setCode] = useState('');
  const [output, setOutput] = useState('');

  

  const handleRun = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/execute/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language, script }),
      });
      console.log(JSON.stringify({ language, script }))
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error('Error executing code:', error);
      setOutput(`Failed to execute code for language ${language}`);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <div className='h1 d-flex justify-content-center'>Code Runner</div>
      </Row>
      <Row>
        <Col>
          <Form>
            <div className='my-2'></div>
            <Form.Group controlId="formLanguageSelect">
              <Form.Label>Select Language</Form.Label>
              <Form.Control as="select" value={language} onChange={e => setLanguage(e.target.value)}>
                <option value="go">GO</option>
                <option value="rust">Rust</option>
                <option value="kotlin">Kotlin</option>
                <option value="">Select a language</option>
                <option value="nodejs">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="c">C</option>
                <option value="cpp">CPP</option>
                <option value="ruby">Ruby</option>
              </Form.Control>
            </Form.Group>
            <div className='my-2'></div>
            <Form.Group controlId="formCodeTextarea">
              <Form.Label>Code</Form.Label>
              <Form.Control as="textarea" rows={10} value={script} onChange={e => setCode(e.target.value)} />
            </Form.Group>
            <Button className="btn btn-primary my-2" onClick={handleRun}>Run</Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Output</Card.Title>
              <Card.Text>
                {output}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="text-center">
          <footer>
            <p>© Aditya Sesha Sai Samineni</p>
            <p>adityaseshasai_s@srmap.edu.in</p>
            <p>Thank You Kalvium. I have learnt a lot implementing this.</p>
          </footer>
        </Col>
      </Row>
    </Container>
  );
}

export default App;