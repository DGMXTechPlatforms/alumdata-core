import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Notify = () => { 
    
    
    

return (
    <div className="">
        {/*<button onClick={notificar}>Notify !</button>*/}
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </div>
);
}

export default Notify;