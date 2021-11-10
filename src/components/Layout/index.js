import Header from '../Header/index';
import { Container } from 'react-bootstrap';
const Layout  = (props) => {
    return(
        <>
          <Header/>
          <Container>
          {props.children}
          </Container>
          
        </>
    )
}

export default Layout;