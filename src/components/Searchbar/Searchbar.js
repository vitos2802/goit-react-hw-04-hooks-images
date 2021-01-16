import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleValueChange = e => {
    setValue(e.currentTarget.value.toLowerCase());
  };
  const handleFormSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      toast.error('Wow so easy !');
      return;
    }
    onSubmit(value);
    setValue('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleFormSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleValueChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
