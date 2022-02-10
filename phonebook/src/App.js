import React, {useState} from 'react';
import './App.css';
import ContactsComponent from "./contact/ContactsComponent";
import ContactForm from "./contact/ContactForm";
import UpdateForm from "./contact/UpdateForm";


export default function App () {
    const [contact, setContact] = useState(null);
    const [error, setError] = useState(null);
    const [updatingContact, setUpdatingContact] = useState(false);
    const [currentContact, setCurrentContact] = useState(null);

    return (
        <div className="App">
            {error}
            <h1>Apex Systems Phonebook</h1>
            {updatingContact ? 
            <UpdateForm onError={setError} onSuccess={setContact} contact={currentContact}/> : 
            <ContactForm onError={setError} onSuccess={setContact} contact={contact}/>} 
            <ContactsComponent onError={setError} onSuccess={setContact} contact={contact} updating={setUpdatingContact} current={setCurrentContact}/>
        </div>
    );
}

