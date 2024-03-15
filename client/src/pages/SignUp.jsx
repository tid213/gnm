import SignUpForm from "../components/SignUpForm";
import { Link } from 'react-router-dom';

function SignUp(){
    return(
        <div>
            <SignUpForm />
            <Link to="/">Go back to Home</Link>
        </div>
    )
}

export default SignUp;