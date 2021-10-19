import React, { /*useState,*/ /*useEffect*/ } from "react";
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux'
import { getClose } from '../../redux-sclice/popupwindow'
Modal.setAppElement('#root');

const ModalPage = () => {
    const { open } = useSelector((state) => state.popup);
    const { message } = useSelector((state) => state.popup);
    const dispatch = useDispatch();
   // const [headerText, setheaderText] = useState("");
    //const [bodyText, setbodyText] = useState("");
    //const [savebutton, setsaveButton] = useState(false);

   /* useEffect(() => {
        console.log(message)
    }, [open])*/
 
    function closeModal() {
        dispatch(getClose())
    }
    return (
        <>
            {open && <div className="react-model-window">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className={`modal-title ${(message.type === "error")?"text-danger":"text-success"}`} >{message.headerText}</h5>
                            <button type="button" className="close" onClick={() => closeModal()} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{message.bodyText}</p>
                        </div>
                        <div className="modal-footer">
                            {message.saveButton && <button type="button" className="btn btn-primary" onClick={() => { dispatch(getClose()) }}>Save changes</button>}
                            <button type="button" className="btn btn-secondary" onClick={() => { dispatch(getClose()) }}>Close</button>
                        </div>
                    </div>
                </div>
            </div>}

        </>
    )
}

export default ModalPage;