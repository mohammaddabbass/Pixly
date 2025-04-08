import React from 'react'
import {ArrowLeft} from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import "./styles.css"


const Back = ({ className }) => {
        const navigate = useNavigate();
        return (
                <ArrowLeft color="#FFFFFF" onClick={()=>navigate(-1)} className={`${className} back-button`}/>  

        )
}

export default Back;
