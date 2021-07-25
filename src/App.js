import React, { useState, useMemo } from 'react';
import dataFromServer from './data/contacts.json';
import Form from './components/Form';
import Section from './components/Section';
import Contacts from './components/Contacts';
import Filter from './components/Filter';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from './hooks/useLocalStorage';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', dataFromServer);
  const [filter, setFilter] = useState('');

  const validateContact = (data, contacts) => {
    if (contacts.some(({ name }) => name === data.name)) {
      alert(`${data.name} is already in contacts.`);
      return false;
    } else return true;
  };

  const formSubmitHandler = data => {
    const isContactValid = validateContact(data, contacts);

    if (isContactValid) {
      data.id = uuidv4();
      setContacts(state => [data, ...state]);
    }
  };

  const deleteContact = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };

  const handleSearch = e => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = useMemo(() => {
    const getFiltredContacts = contacts => {
      const lowerCaseFilter = filter.toLowerCase();
      return contacts.filter(person =>
        person.name.toLowerCase().includes(lowerCaseFilter),
      );
    };
    return getFiltredContacts(contacts);
  }, [contacts, filter]);

  return (
    <>
      <Section title="Phonebook">
        <Form onSubmit={formSubmitHandler} />
      </Section>

      <Section title="Contacts">
        <Filter value={filter} onChange={handleSearch} />
        <Contacts
          contacts={filteredContacts}
          onDeleteBtnClick={deleteContact}
        />
      </Section>
    </>
  );
}

// class App extends Component {
//   state = {
//     contacts: dataFromServer,
//     filter: '',
//   };
//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   formSubmitHandler = data => {
//     const { contacts } = this.state;
//     const isContactValid = this.validateContact(data, contacts);

//     if (isContactValid) {
//       data.id = uuidv4();
//       this.setState(({ contacts }) => ({
//         contacts: [data, ...contacts],
//       }));
//     }
//   };

//   validateContact = (data, contacts) => {
//     if (contacts.some(({ name }) => name === data.name)) {
//       alert(`${data.name} is already in contacts.`);
//       return false;
//     } else return true;
//   };

//   deleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   handleSearch = e => {
//     this.setState({
//       filter: e.currentTarget.value,
//     });
//   };

//   getFiltredContacts() {
//     const { contacts, filter } = this.state;
//     const lowerCaseFilter = filter.toLowerCase();
//     return contacts.filter(person =>
//       person.name.toLowerCase().includes(lowerCaseFilter),
//     );
//   }

//   render() {
//     const { filter } = this.state;
//     const filteredContacts = this.getFiltredContacts();

//     return (
//       <>
//         <Section title="Phonebook">
//           <Form onSubmit={this.formSubmitHandler} />
//         </Section>

//         <Section title="Contacts">
//           <Filter value={filter} onChange={this.handleSearch} />
//           <Contacts
//             contacts={filteredContacts}
//             onDeleteBtnClick={this.deleteContact}
//           />
//         </Section>
//       </>
//     );
//   }
// }

// export default App;
