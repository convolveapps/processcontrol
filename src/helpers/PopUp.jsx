import {useState, useEffect} from 'react';

const PopUp = ({children, headerContent, isActive, closePopUp}) => {

    const [coverClass, setCoverClass] = useState('pop-cover');
    const [modalClass, setModalClass] = useState('pop-modal bg-shadow');

    useEffect(()=>{
        if(isActive){
            setCoverClass('pop-cover active');
            setModalClass('pop-modal bg-shadow active');
        }
        else{
            setCoverClass('pop-cover');
            setModalClass('pop-modal bg-shadow');
        }
    },[isActive])

    return (
        <>
            <div className={coverClass} onClick={closePopUp}></div>
            <div className={modalClass}>
                <div className="modal-header">
                    <h5>{headerContent}</h5>
                    <i className="fa-solid fa-rectangle-xmark" onClick={closePopUp}></i>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <div className="btn-container">
                        <button className="btn btn-primary" onClick={closePopUp}>Ok</button>
                        <button className="btn btn-warning-outline" onClick={closePopUp}>Close</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopUp