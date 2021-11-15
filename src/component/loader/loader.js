import { memo } from 'react';
import './loader.css';



const Loader = memo(function Loader({ loading }) {
    if (!loading) return null
    return (
        <div className="loader"></div>

    )
})


export default Loader



