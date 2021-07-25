import { useState, useRef } from 'react';
import s from './Form.module.css';
import { v4 as uuidv4 } from 'uuid';

export default function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameId = useRef(uuidv4());

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ name: name, number: number });
    reset();
  };

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit}>
        <label htmlFor={nameId.current}>
          <p className={s.form__label}>Name</p>
          <input
            type="text"
            name="name"
            className={s.form__firstInput}
            value={name}
            onChange={handleInputChange}
            id={nameId.current}
            placeholder="Enter name"
            required
          />
        </label>
        <label>
          <p className={s.form__label}>Number</p>
          <input
            type="tel"
            name="number"
            value={number}
            onChange={handleInputChange}
            maxLength="9"
            minLength="7"
            pattern="[0-9]{3}-{0,1}[0-9]{2}-{0,1}[0-9]{2}"
            required
            placeholder="123-45-67"
          />
        </label>
        <div className={s.submit__box}>
          <button
            className={s.form__button}
            type="submit"
            disabled={name === '' || number === ''}
          >
            Add contact
          </button>
        </div>
      </form>
    </div>
  );
}

// class Form extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   nameId = uuidv4();

//   handleInputChange = event => {
//     const { name, value } = event.currentTarget;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     this.props.onSubmit(this.state);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({
//       name: '',
//       number: '',
//     });
//   };

//   render() {
//     const { name, number } = this.state;

//     return (
//       <div className={s.container}>
//         <form className={s.form} onSubmit={this.handleSubmit}>
//           <label htmlFor={this.nameId}>
//             <p className={s.form__label}>Name</p>
//             <input
//               type="text"
//               name="name"
//               className={s.form__firstInput}
//               value={name}
//               onChange={this.handleInputChange}
//               id={this.nameId}
//               pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//               placeholder="Enter name"
//               required
//             />
//           </label>
//           <label>
//             <p className={s.form__label}>Number</p>
//             <input
//               type="tel"
//               name="number"
//               value={number}
//               onChange={this.handleInputChange}
//               maxLength="9"
//               minLength="7"
//               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//               required
//               placeholder="123-45-67"
//             ></input>
//           </label>
//           <button
//             className={s.form__button}
//             type="submit"
//             disabled={name === '' || number === ''}
//           >
//             Add contact
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

// export default Form;
