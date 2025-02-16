import './access-methods.styles.scss'
import { useUserAuthContext } from '../../contexts/user-auth.context';
import AuthenticationForm from '../../components/authentication-form/authentication-form.component';
import AsyncLoader from '../../components/async-loader/async-loader.component';

const AccessMethods = () => {
    const {isAuthenticatedWithPassword}=useUserAuthContext();

    if(!isAuthenticatedWithPassword){
        return <AuthenticationForm />
    }

        return <AsyncLoader text={"Nothing Yet!"} type={"empty"} />
    
    
    // return ( 
    //     <div className='access-methods-div'>
    //         access methods
    //     </div>
    //  );
}
 
export default AccessMethods;