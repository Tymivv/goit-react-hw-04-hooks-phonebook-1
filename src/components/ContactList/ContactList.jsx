import PropTypes from 'prop-types';
import './ContactList.css';

const ContactList = ({ filteredContacts, onDelete }) => (
  <ul className="list">
    {filteredContacts.map(({ id, nameContact, tel }) => (
      <>
        <li className="item" key={id}>
          {nameContact} : {tel}
        </li>
        <button className="button9" type="button" onClick={onDelete(id)}>
          Delete {nameContact}
        </button>
      </>
    ))}
  </ul>
);

ContactList.propTypes = {
  filteredContacts: PropTypes.array,
  onDelete: PropTypes.func,
};

export default ContactList;
