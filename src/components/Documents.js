import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import DocumentStorage from "../database/DocumentStorage";
import UserStorage from "../database/UserStorage";
import Modal from './Modal';

const Documents = () => {
    const user = UserStorage.getUserFromSession();
    const [myUploads, setMyUploads] = useState([]);
    const [sharedUploads, setSharedUploads] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({});

    useEffect(() => {
        setMyUploads(DocumentStorage.getDocumentsList(user.id));
        setSharedUploads(DocumentStorage.getSharedDocumentsList(user.id).map(doc => ({
            ...doc, sharedBy: UserStorage.getUserById(doc.owner).email
        })));
    }, [user.id]);

    const openModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setMyUploads(DocumentStorage.getDocumentsList(user.id));
        setShowModal(false);
    };

    const handleUploadSubmit = (e) => {
        e.preventDefault();
        const { fileDescription, selectedFile } = e.target.elements;
        DocumentStorage.saveDocument({
            id: Date.now(),
            owner: user.id,
            description: fileDescription.value,
            file: selectedFile.files[0].name,
            sharing: []
        });
        handleCloseModal();
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const { fileID, fileDescription } = e.target.elements;
        DocumentStorage.updateDocument({
            id: fileID.value,
            description: fileDescription.value
        });
        handleCloseModal();
    };

    const handleDelete = (file) => {
        openModal({
            title: 'Delete File',
            body: `Are you sure to delete file: ${file.description}?`,
            actionButton: 'Delete',
            action: () => {
                DocumentStorage.deleteDocument(file.id);
                handleCloseModal();
            }
        });
    };

    const renderTable = (title, data, isMyUploads) => (
        <div className="mb-4">
            <h2>{title}</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Label</th>
                        <th>File Name</th>
                        {isMyUploads ? <th>Action</th> : <th>Shared By</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((file, index) => (
                        <tr key={file.id}>
                            <td>{index + 1}</td>
                            <td>{file.description}</td>
                            <td>{file.file}</td>
                            {isMyUploads ? (
                                <td>
                                    <button className="btn btn-sm btn-success me-2" onClick={() => openModal({
                                        title: 'Edit File',
                                        form: (
                                            <form onSubmit={handleEditSubmit}>
                                                <div className="mb-3">
                                                    <label htmlFor="fileDescription" className="form-label">File Description</label>
                                                    <input type='hidden' id="fileID" name="fileID" value={file.id} required />
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="fileDescription"
                                                        name="fileDescription"
                                                        defaultValue={file.description}
                                                        required
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-sm btn-success">Save</button>
                                            </form>
                                        )
                                    })}>Edit</button>
                                    <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(file)}>Delete</button>
                                    <Link className="btn btn-sm btn-info" to={`/documents/share/${file.id}`}>Share</Link>
                                </td>
                            ) : (
                                <td>{file.sharedBy}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="container mt-4">
            {renderTable('My Uploads', myUploads, true)}
            {renderTable('Shared Uploads', sharedUploads, false)}
            <button className="btn btn-primary" onClick={() => openModal({
                title: 'Upload File',
                form: (
                    <form onSubmit={handleUploadSubmit}>
                        <div className="mb-3">
                            <label htmlFor="fileDescription" className="form-label">File Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fileDescription"
                                name="fileDescription"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="selectedFile" className="form-label">File Upload</label>
                            <input
                                type="file"
                                className="form-control"
                                id="selectedFile"
                                name="selectedFile"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-sm btn-success">Upload</button>
                    </form>
                )
            })}>+ Upload</button>
            <Modal
                showModal={showModal}
                title={modalContent.title}
                body={modalContent.body}
                closeButton="Close"
                onClose={() => setShowModal(false)}
                actionButton={modalContent.actionButton}
                onAction={modalContent.action}
            >
                {modalContent.form}
            </Modal>
        </div>
    );
};

export default Documents;
