import Layout from '../../components/Layout/index'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { signup } from '../../actions';
import { useEffect, useState } from 'react';


const Signup = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();


    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)

    
    if (auth.authenticate) {
        return <Navigate to={'/'} />
    }
    

    if(user.loading){
        return <p>Loading...</p>
    }

    const userSignup = (e) => {
        e.preventDefault();
        const user = { firstName, lastName, email, password }
        dispatch(signup(user))
    }


    return (
        <Layout>
            <Container>
                {user.message}
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input label="First Name" placeholder="FirstName" value={firstName} type="text" onChange={(e) => setFirstName(e.target.value)} />
                                </Col>
                                <Col md={6}>
                                    <Input label="Last Name" placeholder="LastName" value={lastName} type="text" onChange={(e) => setLastName(e.target.value)} />
                                </Col>
                                <Input label="Email" placeholder="Email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
                                <Input label="Password" placeholder="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
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