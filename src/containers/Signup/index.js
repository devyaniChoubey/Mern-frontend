import Layout from '../../components/Layout/index'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';

const Signup = (props) => {
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Input label="First Name" placeholder="FirstName" value="" type="text" onChange={() => { }} />
                                </Col>
                                <Col md={6}>
                                    <Input label="Last Name" placeholder="LastName" value="" type="text" onChange={() => { }} />
                                </Col>
                                <Input label="Email" placeholder="Email" value="" type="email" onChange={() => { }} />
                                <Input label="Password" placeholder="Password" value="" type="text" onChange={() => { }} />
                            </Row>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signup;