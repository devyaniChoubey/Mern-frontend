import {useLocation, Navigate} from 'react-router-dom';


// const PrivateRoute = ({ component: Component,...rest}) => {
//     return <Route {...rest} component={(props) => {
//         const token = window.localStorage.getItem('token');
//         if(token){
//             return <Component {...props}/>
//         }else{
//             return <Navigate to={'/signin'}/>
//         }
//     }}/>
// }




const PrivateRoute = ({ children }) => {
    // let auth = useAuth();
    let location = useLocation();
    const token = window.localStorage.getItem('token');

    if (!token || token === "undefined") {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/signin" state={{ from: location }} />;
    }

    return children;
}

export default PrivateRoute;




