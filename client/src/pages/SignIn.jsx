import SignInForm from "../components/SignInForm";
import { Link } from 'react-router-dom';


function SignIn(){
    return(
        <div>
            <SignInForm />
            <Link to="/forgotpassword">Forgot password?</Link>
            <br/>
            <Link to="/">Go back to Home</Link>
        </div>
    )
}

export default SignIn;