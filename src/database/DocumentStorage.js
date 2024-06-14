const DocumentStorage = (() => {
    const getDocuments = () => {
        const documents = localStorage.getItem('documents');
        return documents ? JSON.parse(documents) : [];
    };

    return {
        getDocumentsList: (ownerId) => {
            return getDocuments().filter(doc => doc.owner == ownerId);
        },
        getSharedDocumentsList: (ownerId) => {
            return getDocuments().filter(doc => doc.sharing.find(id => id == ownerId));
        },
        getDocumentById: (id) => {
            const documents = getDocuments();
            return documents.find(doc => doc.id == id);
        },
        saveDocument: (document) => {
            const documents = getDocuments();
            documents.push(document);
            localStorage.setItem('documents', JSON.stringify(documents));
        },
        updateDocument: (updatedDocument) => {
            let documents = getDocuments();
            documents = documents.map(doc => {
                if (doc.id == updatedDocument.id) {
                    return {
                        ...doc,
                        ...updatedDocument
                    };
                }
                return doc;
            });
            localStorage.setItem('documents', JSON.stringify(documents));
        },
        deleteDocument: (id) => {
            let documents = getDocuments();
            documents = documents.filter(doc => doc.id != id);
            localStorage.setItem('documents', JSON.stringify(documents));
        },
        getSharedDocuments: (userId) => {
            const documents = getDocuments();
            return documents.filter(doc => doc.sharing.includes(userId));
        },
        addShare: (documentId, userId) => {
            let documents = getDocuments();
            documents = documents.map(doc => {
                if (doc.id == documentId) {
                    return {
                        ...doc,
                        sharing: [...doc.sharing, Number(userId)]
                    };
                }
                return doc;
            });
            localStorage.setItem('documents', JSON.stringify(documents));
        },
        removeShare: (documentId, userId) => {
            let documents = getDocuments();
            documents = documents.map(doc => {
                if (doc.id == documentId) {
                    return {
                        ...doc,
                        sharing: doc.sharing.filter(id => id != userId)
                    };
                }
                return doc;
            });
            localStorage.setItem('documents', JSON.stringify(documents));
        }
    };
})();

export default DocumentStorage;
