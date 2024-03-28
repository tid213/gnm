import SignInForm from "../components/SignInForm";
import { Link } from 'react-router-dom';


function SignIn(){
    return(
        <div className="min-h-screen bg-lime-100 flex items-center justify-center">
            <div className="max-w-sm w-full"><SignInForm /></div>
            
        </div>
    )
}

export default SignIn;