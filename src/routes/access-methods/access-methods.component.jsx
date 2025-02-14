import './access-methods.styles.scss'
import { useUserAuthContext } from '../../contexts/user-auth.context';
import AuthenticationForm from '../../components/authentication-form/authentication-form.component';

const AccessMethods = () => {
    const {isAuthenticatedWithPassword}=useUserAuthContext();

    if(!isAuthenticatedWithPassword){
        return <AuthenticationForm />
    }

    return ( 
        <div className='access-methods-div'>
            access methods
        </div>
     );
}
 
export default AccessMethods;