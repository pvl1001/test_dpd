import s from './Search.module.scss'
import { useContext } from "react";
import { TableContext } from "../../context";


function Search() {
   const { searchSubmit, searchValue, setSearchValue } = useContext( TableContext )

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