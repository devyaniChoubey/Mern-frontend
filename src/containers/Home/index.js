import { Container } from 'react-bootstrap';
import Layout from '../../components/Layout';
const Home = (props) => {
    return(
         <Layout>
            <Container className="text-center" style={{margin : '5rem', background : '#fff'}}>
                <h1>Welcome to admin dashboard</h1>
            </Container>
         </Layout>
    )
}

export default Home;