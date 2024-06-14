const Modal = ({ showModal, title, body, confirmButton, closeButton, actionButton, onConfirm, onClose, onAction, children }) => {
    return showModal ?
        (<>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">{title}</h5>
                        </div>
                        {body && (
                            <div className="modal-body">
                                <p>{body}</p>
                            </div>
                        )}
                        {children && (
                            <div className="modal-body">
                                {children}
                            </div>
                        )}
                        <div className="modal-footer">
                            {confirmButton && (
                                <button type="button" className="btn btn-sm btn-success" onClick={onConfirm}>{confirmButton}</button>
                            )}
                            {closeButton && (
                                <button type="button" className="btn btn-sm btn-primary" onClick={onClose}>{closeButton}</button>
                            )}
                            {actionButton && (
                                <button type="button" className="btn btn-sm btn-danger" onClick={onAction}>{actionButton}</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>)
        : <></>
};

export default Modal;
