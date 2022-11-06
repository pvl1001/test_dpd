import s from './Search.module.scss'


function Search( { searchValue, setSearchValue, searchSubmit } ) {
   return (
      <form className={ s._ } onSubmit={ searchSubmit }>
         <input
            type="text"
            placeholder={ 'Поиск' }
            value={ searchValue }
            onChange={ e => setSearchValue( e.target.value ) }
         />
         <button type="submit">Найти</button>
      </form>
   )
}


export default Search