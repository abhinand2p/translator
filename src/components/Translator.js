import React, { useState, useEffect} from 'react';
import './Translator.css';
import languageList from './language.json';
import axios from 'axios';

export default function Translator() {
    const [inputFormat, setInputFormat] = useState('en');
    const [outputFormat, setOutputFormat] = useState('ml');
    const [translatedText, setTranslatedText] = useState('Translator');
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        // Access and manipulate DOM elements here
        const spinner = document.querySelector('.fa.fa-spinner.fa-spin');
        const translateBtn = document.querySelector('.translate');

        if (spinner && translateBtn) {
            spinner.style.display = "none";
            translateBtn.style.display = 'block';
        }
    }, []);

    const handleReverseLanguage = () => {
        const value = inputFormat;
        setInputFormat(outputFormat);
        setOutputFormat(value);
        setInputText('');
        setTranslatedText('Translation');
    }

    const handleRemoveInputText = () => {
        setInputText('');
        setTranslatedText('Translation');
    }

    const handleTranslate = async () => {
        if (!inputText || !inputFormat || !outputFormat) return;
        document.querySelector('fa.fa-spinner.fa-spin').style.display = "block";
        document.querySelector('.translate').style.display = "none";


        const axios = require('axios');

const encodedParams = new URLSearchParams();
encodedParams.set('q', 'English is hard, but detectably so');

const options = {
  method: 'POST',
  url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'application/gzip',
    'X-RapidAPI-Key': '3d24ec21c4mshd37fa5d01dcb1a2p1b9e16jsn1bc96a1b9a68',
    'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
  },
  data: encodedParams,
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
        document.querySelector('.fa.fa-spinner.fa-spin').style.display = "none"; 
        document.querySelector('.translate').style.display = 'block'; 
    }

    return (
        <div className='container'>
            <div className='row1'>
                <select value={inputFormat} 
                    onChange={ (e) => setInputFormat(e.target.value) }>
                        {Object.keys(languageList).map((key, index) => { 
                        const language = languageList[key]; 
                        return ( 
                            <option key={index} value={key}>{language.name}</option> 
                        ); 
                    })} ;
                    </select>
                    <svg className='reverseSvg'
                        onClick={handleReverseLanguage}
                        focusable = "false"
                        xmlns="http://www.w3.org/2000/svg" 
                     viewBox="0 0 24 24"> 
                <path d= 
"M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"> 
                </path> 
                </svg> 

                <select value={outputFormat} onChange={(e) => { 
                    setOutputFormat(e.target.value); 
                    setTranslatedText('Translation'); 
                }}> 
                    {Object.keys(languageList).map((key, index) => { 
                        const language = languageList[key]; 
                        return ( 
                            <option key={index + 118} value={key}>{language.name}</option> 
                        ); 
                    })} 
                </select> 
            </div>

            <div className="row2"> 
                <div className="inputText"> 
                    <svg className='removeinput' 
                         style={{ display: (inputText.length) ? "block" : "none" }}  
                         onClick={handleRemoveInputText}  
                         focusable="false" 
                         xmlns="http://www.w3.org/2000/svg" 
                         viewBox="0 0 24 24"> 
                         <path d= 
"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"> 
                        </path> 
                    </svg> 
                    <textarea type="text" 
                              value={inputText}  
                              placeholder='Enter Text' 
                              onChange={(e) => setInputText(e.target.value)} /> 
                </div> 
                <div className="outputText">{translatedText}</div> 
            </div> 
            <div className="row3"> 
                <button className='btn' 
                        onClick={handleTranslate}> 
                        <i className="fa fa-spinner fa-spin"></i> 
                        <span className='translate'>Translate</span> 
                </button> 
            </div> 

            
        </div>
    )
}
