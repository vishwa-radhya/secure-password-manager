import './gen-random-pass.styles.scss';
import PassLengthSlider from '../pass-length-slider/pass-length-slider.component';
import { useState } from 'react';
import ToggleSwitch from '../toggle-switch/toggle-switch.component';
import PropTypes from 'prop-types';


const labels=['Numbers','Uppercase Letters','Lowercase letters','Special symbols']

const GenRandomPass = ({setDisplayPassword}) => {
    const [length,setLength]=useState(8);
    const [useUppercase, setUseUppercase] = useState(true);
    const [useLowercase, setUseLowercase] = useState(true);
    const [useDigits, setUseDigits] = useState(true);
    const [useSymbols, setUseSymbols] = useState(true);
    const handleSetLength=(val)=>setLength(val);
    const setters=[setUseDigits,setUseUppercase,setUseLowercase,setUseSymbols];
    const states=[useDigits,useUppercase,useLowercase,useSymbols];

    const generatePassword = () => {
        let characters = '';
        if (useUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
        if (useDigits) characters += '0123456789';
        if (useSymbols) characters += '!@#$%^&*()_+=-`~[]\\{}|;\':",./<>?';
        if (!characters) {
          alert("At least one character type must be selected."); 
          return;
        }
        let newPassword = '';
        const randomArray = new Uint8Array(length);
        window.crypto.getRandomValues(randomArray);
    
        for (let i = 0; i < length; i++) {
            const randomIndex = randomArray[i] % characters.length;
            newPassword += characters.charAt(randomIndex);
        }
        setDisplayPassword(newPassword)
      };
    return ( 
        <div className='gen-random-pass-div'>
            <h3>Generate random password</h3>
            <PassLengthSlider length={length} handleSetLength={handleSetLength} />
            <div className='options'>
                <h3>Include:</h3>
                <div className='opts'>
                    {setters.map((set,index)=>{
                        return <div key={`random-pass-setters-${index}`}>
                            <p>{labels[index]}</p>
                            <ToggleSwitch bool={states[index]} set={setters[index]} />
                        </div>
                    })}
                </div>
            </div>
            <button className='gen c-btn' onClick={generatePassword}>Generate</button>
        </div>
     );
}
GenRandomPass.propTypes={
    setDisplayPassword:PropTypes.func,
}
export default GenRandomPass;