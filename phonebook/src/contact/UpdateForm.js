import React from "react";

export default function UpdateForm(props) {
    const id = props.contact.id;
    const [firstName, setFirstName] = React.useState(props.contact.firstName);
    const [lastName, setLastName] = React.useState(props.contact.lastName);
    const [gender, setGender] = React.useState(props.contact.gender);
    const [email, setEmail] = React.useState(props.contact.email);
    const [phone, setPhone] = React.useState(props.contact.phone);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`updating...
            id: ${id}
            firstName: ${firstName}
            lastName: ${lastName}
            gender: ${gender}
            phone: ${phone}
            email: ${email}`);

        fetch(`http://localhost:3001/contacts/${id}`, {
            method: 'PUT',
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
          
          <h3>Update Contact</h3>
          
          <label>
              First Name:
              <input
                  name="firstName"
                  type="text"
                  placeholder={firstName}
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required/>
          </label>

          <label>
              Last Name:
              <input
                  name="lastName"
                  type="text"
                  placeholder={lastName}
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
                  placeholder={phone}
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required/>
          </label>

          <label>
              Email:
              <input
                  name="email"
                  type="email"
                  placeholder={email}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required/>
          </label>

          <button>Submit</button>
      </form>
    );
}