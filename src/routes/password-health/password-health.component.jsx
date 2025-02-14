import './password-health.styles.scss'
import { useUserAuthContext } from '../../contexts/user-auth.context';
import AuthenticationForm from '../../components/authentication-form/authentication-form.component';

const PasswordHealth = () => {
    const {isAuthenticatedWithPassword}=useUserAuthContext();

    if(!isAuthenticatedWithPassword){
        return <AuthenticationForm />
    }

    return ( 
        <div className='password-health-div'>
            password health
        </div>
     );
}
 
export default PasswordHealth;