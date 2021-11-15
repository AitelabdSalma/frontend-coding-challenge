import { memo } from 'react';
import './errorHandler.css';



const ErrorHandler = memo(function ErrorHandler({ error }) {
    if (!error) return null
    return (<div class="error">Error message</div>)
})


export default ErrorHandler



