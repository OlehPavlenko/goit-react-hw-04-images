import s from './SearchBar.module.css';
import { BiSearchAlt } from 'react-icons/bi';
export const SearchBar = ({ onSubmit }) => {
    return (
        <header className={s.Searchbar}>
            <form className={s.SearchForm} onSubmit={onSubmit}>
                <button type="submit" className={s['SearchForm-button']}>
                    <span className={s['SearchForm-button-label']}>Search</span>
                    <BiSearchAlt size="25" color="#3f51b5" />
                </button>

                <input
                    name="searchBar"
                    className={s['SearchForm-input']}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
};