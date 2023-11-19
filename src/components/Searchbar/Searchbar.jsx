import { FcSearch } from 'react-icons/fc';
import toast from 'react-hot-toast';
import {
  SearchBarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Seachbar.styled';
import { useState } from 'react';

export const Seachbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    // перевірка на пустий рядок
    if (query.trim() === '') {
      toast('Add valid text!', {
        icon: '☝️',
        style: {
          margin: '70px',
          borderRadius: '10px',
          background: '#c11919',
          color: '#fff',
        },
      });
      return;
    }
    onSubmit(query);

    reset();
  };

  const reset = () => {
    setQuery('');
  };

  const handleInputChange = event => {
    setQuery(event.target.value.toLowerCase());
  };

  return (
    <SearchBarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FcSearch size="26px" />
        </SearchFormButton>

        <SearchFormInput
          onChange={handleInputChange}
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchBarHeader>
  );
};
