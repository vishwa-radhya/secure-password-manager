import './password-health.styles.scss'
import { useUserAuthContext } from '../../contexts/user-auth.context';
import AuthenticationForm from '../../components/authentication-form/authentication-form.component';
import AsyncLoader from '../../components/async-loader/async-loader.component';

const PasswordHealth = () => {
    const {isAuthenticatedWithPassword}=useUserAuthContext();

    if(!isAuthenticatedWithPassword){
        return <AuthenticationForm />
    }

    return <AsyncLoader text={"Nothing Yet!"} type={"empty"} />

    // return ( 
    //     <div className='password-health-div'>
    //         password health
    //     </div>
    //  );
}
 
export default PasswordHealth;