import s from './Pagination.module.scss'
import { useSearchParams } from "react-router-dom"
import { useContext } from "react";
import { TableContext } from "../../context";


function Pagination() {
   const { paginationData, activeSliceCount, setActiveSliceCount, queryParams } = useContext( TableContext )
   const [ , setSearchParams ] = useSearchParams()
   const count = 20
   const arrCountPagination = Math.ceil( paginationData.length / count )
   const arr = []


   for ( let i = 1; i <= arrCountPagination; i++ ) {
      arr.push( i )
   }

   function clickHandler( i ) {
      setActiveSliceCount( i - 1 )
      setSearchParams( { ...queryParams, page: String( i ) } )
   }


   return (
      <ul className={ s._ }>
         { arr.map( i =>
            <li
               key={ i }
               className={ activeSliceCount === i - 1 ? s.active : '' }
               onClick={ () => clickHandler( i ) }
            >{ i }</li>
         ) }
      </ul>
   )
}

export default Pagination