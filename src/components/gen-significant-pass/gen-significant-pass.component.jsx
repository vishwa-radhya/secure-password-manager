import './gen-significant-pass.styles.scss';
import PassLengthSlider from '../pass-length-slider/pass-length-slider.component';
import { useState } from 'react';
const GenSignificantPass = () => {
    const [length,setLength]=useState(10);

    const handleSetLength=(val)=>setLength(val);
    return ( 
        <div className='gen-significant-pass-div'>
            <h3>Generate significant password</h3>
            <PassLengthSlider length={length} handleSetLength={handleSetLength} />
        </div>
     );
}
 
export default GenSignificantPass;