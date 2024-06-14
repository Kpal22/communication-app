import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserStorage from '../database/UserStorage';
import DocumentStorage from '../database/DocumentStorage';
import Modal from './Modal';

const ShareDocument = () => {
    const { documentId } = useParams();
    const currentUser = UserStorage.getUserFromSession();
    const users = UserStorage.getUsersList();
    const [document, setDocument] = useState(null);
    const [sharedUsers, setSharedUsers] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({});

    const fetchDocumentData = useCallback(() => {
        const doc = DocumentStorage.getDocumentById(documentId);
        if (doc) {
            setDocument(doc);
            setSharedUsers(doc.sharing.map(userId => UserStorage.getUserById(userId)));
            setAvailableUsers(users.filter(
                user => user.id !== currentUser.id && !doc.sharing.includes(user.id)
            ));
        }
    }, [documentId, currentUser.id]);

    useEffect(fetchDocumentData, [documentId]);

    const openModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    const handleAddShare = (e) => {
        e.preventDefault();
        const selectedUserId = e.target.elements.chooseUser.value;
        const selectedUser = users.find(user => Number(user.id) === Number(selectedUserId));

        openModal({
            title: 'Share File',
            body: `Share this file with ${selectedUser.name}?`,
            confirmButton: 'Share',
            onConfirm: () => {
                DocumentStorage.addShare(documentId, selectedUserId);
                fetchDocumentData();
                setShowModal(false);
            }
        });
    };

    const handleRemoveShare = (user) => {
        openModal({
            title: 'Remove Share',
            body: `Stop sharing this file with ${user.name}?`,
            actionButton: 'Remove',
            onAction: () => {
                DocumentStorage.removeShare(documentId, user.id);
                fetchDocumentData();
                setShowModal(false);
            }
        });
    };

    return document ? (
        <div className="container mt-4">
            <h2>Sharing File: {document.file}</h2>
            <table className="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th>Shared User</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sharedUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>
                                <button className="btn btn-sm btn-danger" onClick={() => handleRemoveShare(user)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4">
                <h2>Add Sharing</h2>
                <form onSubmit={handleAddShare} className="form-inline">
                    <div className="form-group row">
                        <label htmlFor="chooseUser" className="col-sm-2 col-form-label">Choose User:</label>
                        <div className="col-sm-8">
                            <select id="chooseUser" name="chooseUser" className="form-control" required>
                                <option value="">Select User</option>
                                {availableUsers.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-sm-2">
                            <button type="submit" className="btn btn-sm btn-primary">Add Share</button>
                        </div>
                    </div>
                </form>
            </div>
            <Modal
                showModal={showModal}
                title={modalContent.title}
                body={modalContent.body}
                closeButton="Close"
                onClose={() => setShowModal(false)}
                actionButton={modalContent.actionButton}
                onAction={modalContent.onAction}
                confirmButton={modalContent.confirmButton}
                onConfirm={modalContent.onConfirm}
            />
        </div>
    ) : (
        <div className="text-center">
            <h1 className="text-center">Document Not Found</h1>
            <p className="text-center">The document you are trying to edit does not exist.</p>
            <Link to="/documents" className="btn btn-primary">Go Back</Link>
        </div>
    );
};

export default ShareDocument;
