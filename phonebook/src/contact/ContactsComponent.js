import React, {Component} from 'react';
import {ContactShortDisplay} from "./ContactShortDisplay";

class ContactsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };

        this.updateContact = this.updateContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:3001/contacts")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result || []
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.contact !== this.props.contact) {
            fetch("http://localhost:3001/contacts")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('contacts list:', result);
                    this.setState({
                        isLoaded: true,
                        items: result || []
                    });
                    this.props.updating(false);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        }
    }

    updateContact (id) {
      // const contact = {};
      for (let item of this.state.items) {
        // console.log('item:', item);
        // console.log('input id:', id);
        if (item.id == id) {
          const newContact = {
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            gender: item.gender,
            phone: item.phone,
            email: item.email
          }
          // contact.id = item.id;
          // contact.firstName = item.firstName;
          // contact.lastName = item.lastName;
          // contact.gender = item.gender;
          // contact.phone = item.phone;
          // contact.email = item.email;
          // this.setState(newContact);
          console.log('updating contact:', newContact);
          this.props.updating(true);
          this.props.current(newContact);
        }
      }
    }

    deleteContact (id) {
      fetch(`http://localhost:3001/contacts/${id}`, {
          method: 'DELETE'
      })
      .then(res => res.json())
      .then(
          (result) => {
              this.props.onSuccess(result);
              console.log('deleted contact');
          },
          (error) => {
              this.props.onError(error)
          }
      )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <h3>Contacts</h3>
                    <div className="labels">
                      <span className="label">Name</span>
                      <span className="label">Gender</span>
                      <span className="label">Phone</span>
                      <span className="label">Email</span>
                    </div>
                    <ul className="contact-list">
                      {items.map( (item, index) => (
                          <li className="contact" key={index}>
                            <ContactShortDisplay contact={item} />
                            <div className="buttons"> 
                              <button value={item.id} className="update" onClick={(e) => this.updateContact(e.target.value)}>Update</button>
                              <button value={item.id} className="delete" onClick={(e) => this.deleteContact(e.target.value)}>X</button>
                            </div>
                          </li>
                      ))}
                    </ul>
                </div>
            );
        }
    }
}

ContactsComponent.propTypes = {};

export default ContactsComponent;