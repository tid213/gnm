import SignUpForm from "../components/SignUpForm";
import { Link } from 'react-router-dom';

function SignUp(){
    return(
        <div className="min-h-screen bg-lime-100 flex items-center justify-center">
            <div className="max-w-sm w-full"><SignUpForm /></div>
            
        </div>
    )
}

export default SignUp;