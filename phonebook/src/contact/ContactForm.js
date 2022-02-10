import React from "react";

export default function ContactForm (props) {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`creating...
            firstName: ${firstName}
            lastName: ${lastName}
            gender: ${gender}
            phone: ${phone}
            email: ${email}`);

        fetch("http://localhost:3001/contacts", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName, lastName, phone, email, gender})
        })
        .then(res => res.json())
        .then(
            (result) => {
                props.onSuccess(result)
            },
            (error) => {
                props.onError(error)
            }
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            
            <h3>Create Contact</h3>
            <div className="inputs">
                <label>
                    First Name:
                    <input
                        name="firstName"
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required/>
                </label>

                <label>
                    Last Name:
                    <input
                        name="lastName"
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required/>
                </label>

                <label>
                    Gender:
                    <select
                        name="gender"
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                        required>
                        <option key=""/>
                        {['MALE', 'FEMALE'].map(gender => (
                            <option key={gender}>{gender}</option>
                        ))}
                    </select>
                </label>
                
                <label>
                    Phone:
                    <input
                        name="phone"
                        type="phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required/>
                </label>

                <label>
                    Email:
                    <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required/>
                </label>
            </div>
    
            <button>Submit</button>
        </form>
    );
}