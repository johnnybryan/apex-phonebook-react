import React from "react";

export const ContactShortDisplay = (props) => {
    let item = props.contact;
    let firstName = item.firstName[0].toUpperCase() + item.firstName.slice(1);
    let lastName = item.lastName[0].toUpperCase() + item.lastName.slice(1);
    let phone = item.phone;
    phone = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`
    return (
        <div className="info">
            <span className="cell">{firstName} {lastName}</span> 
            <span className="cell">{item.gender}</span>
            <span className="cell">{phone}</span> 
            <span className="cell">{item.email}</span>
        </div>
    )
}