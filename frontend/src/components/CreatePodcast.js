import React, { useState } from 'react';
import { Container, Button, Card, Row, Col, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const CreatePodcast = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulated success (replace with actual logic)
    toast.success('🎉 Podcast Created Successfully!', {
      position: 'top-center',
      autoClose: 3000,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setAudioUrl('');
  };

  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <ToastContainer />
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg">
              <Card.Header className="bg-primary text-white text-center">
                <h3 className="mb-0">
                  <i className="bi bi-mic-fill me-2"></i>Create New Podcast
                </h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="floatingTitle" className="form-floating mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Podcast Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                    <Form.Label>Podcast Title</Form.Label>
                  </Form.Group>

                  <Form.Group controlId="floatingDescription" className="form-floating mb-3">
                    <Form.Control
                      as="textarea"
                      placeholder="Podcast Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      style={{ height: '100px' }}
                      required
                    />
                    <Form.Label>Description</Form.Label>
                  </Form.Group>

                  <Form.Group controlId="floatingAudio" className="form-floating mb-4">
                    <Form.Control
                      type="url"
                      placeholder="Audio URL"
                      value={audioUrl}
                      onChange={(e) => setAudioUrl(e.target.value)}
                      required
                    />
                    <Form.Label>Audio URL</Form.Label>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    <i className="bi bi-upload me-2"></i>Create Podcast
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreatePodcast;
