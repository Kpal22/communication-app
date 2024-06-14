import React, { useState, useEffect } from 'react';
import UserStorage from '../database/UserStorage';

const GroupChat = () => {
    const [messages, setMessages] = useState([]);
    const user = UserStorage.getUserFromSession();
    const getMessages = () => setMessages(UserStorage.getMessages());

    useEffect(getMessages, []);

    const handleSend = (event) => {
        event.preventDefault();
        const newMessage = event.target.elements.newMessage.value.trim();
        if (newMessage) {
            UserStorage.saveMessage({
                datetime: new Date().toISOString(),
                username: user.name,
                text: newMessage
            });
            getMessages();
            event.target.reset();
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Group Chat</h1>
            <div className="card">
                <div className="card-body">
                    <div className="messages">
                        {messages.map((message, index) => ( message && 
                            <div key={index} className="alert alert-secondary" role="alert">
                                <strong>[{new Date(message.datetime).toLocaleString()}] {message.username}:</strong> {message.text}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSend}>
                        <div className="form-group row align-items-center">
                            <label htmlFor="newMessage" className="col-sm-2 col-form-label text-capitalize">
                                <strong>{user.name}:</strong>
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter message"
                                    name="newMessage"
                                    id="newMessage"
                                />
                            </div>
                            <div className="col-sm-1 d-flex justify-content-end">
                                <button className="btn btn-sm btn-primary mr-2" type="submit">Send</button>
                            </div>
                            <div className="col-sm-1 d-flex justify-content-end">
                                <button className="btn btn-sm btn-secondary" type="button" onClick={getMessages}>Refresh</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GroupChat;
