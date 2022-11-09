import s from './Home.module.scss'
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/Search/Search";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import { TableContext } from "../../context";


function Home() {
   const paginationSize = 20
   const [ initialData, setInitialData ] = useState( [] )
   const [ sliceData, setSliceData ] = useState( [] )
   const [ activeSliceCount, setActiveSliceCount ] = useState( 0 )
   const [ searchValue, setSearchValue ] = useState( '' )
   const [ isLoading, setIsLoading ] = useState( false )
   const [ searchParams, setSearchParams ] = useSearchParams()
   const queryParams = {
      search: searchParams.get( 'search' ) || '',
      page: searchParams.get( 'page' ) || ''
   }


   async function getData() {
      try {
         setIsLoading( true )
         const response = await axios.get( 'http://localhost:4000/api/getdata' )
         setIsLoading( false )
         return response
      } catch ( err ) {
         setIsLoading( false )
         console.log( err )
         alert( 'Ошибка' )
      }
   }

   // разбить массив для пагинации
   function getSliceData( array ) {
      const slicedArray = []

      for ( let i = 0; i < array.length; i += paginationSize ) {
         slicedArray.push( array.slice( i, i + paginationSize ) )
      }

      setSliceData( slicedArray )
      return slicedArray
   }

   function searchSubmit( e ) {
      e.preventDefault()

      setActiveSliceCount( 0 )
      setSearchParams( { ...queryParams, search: searchValue, page: '' } )
      getFilterData( initialData )
   }

   function getFilterData( initialArray ) {
      // распарсить объект
      function parseObject( obj ) {
         if ( obj ) {
            const arr = []

            // получить вложенные объекты
            function parseObjectHelper( obj ) {
               Object.values( obj ).forEach( el => {
                  if ( el === null ) return
                  if ( typeof el === 'object' ) return parseObjectHelper( el )
                  arr.push( el )
               } )
            }

            parseObjectHelper( obj )
            return arr
         }

         return []
      }

      // фильтрация
      return initialArray.filter( el => {
         const parseElement = parseObject( el ).join( ' ' ).toLowerCase().trim()
         return parseElement.includes( queryParams.search.toLowerCase() )
      } )
   }

   useEffect( () => {
      getData().then( ( { data } ) => {
         setInitialData( data )
         getSliceData( getFilterData( data ) )
         // проверка на несуществующую страницу пагинации
         if ( getSliceData( getFilterData( data ) )[+queryParams.page - 1] === undefined ) {
            setSearchParams( { ...queryParams, page: '' } )
            setActiveSliceCount( 0 )
         }
      } )
   }, [] )

   useEffect( () => {
      if ( initialData.length ) getSliceData( getFilterData( initialData ) )
      // записать данные из URL
      if ( queryParams.search ) setSearchValue( queryParams.search )
      if ( queryParams.page ) setActiveSliceCount( +queryParams.page - 1 )
   }, [ searchParams ] )


   return (
      <TableContext.Provider value={ {
         searchSubmit,
         searchValue,
         setSearchValue,
         tableData: sliceData[activeSliceCount],
         paginationData: getFilterData( initialData ),
         activeSliceCount,
         setActiveSliceCount,
         queryParams
      } }>

         <div className={ s._ }>

            <Search/>

            { isLoading ?
               <Loader/>
               : sliceData.length
                  ? <>
                     <Table/>
                     <Pagination/>
                  </>
                  : <p>Ничего не найдено</p>
            }

         </div>
      </TableContext.Provider>
   )
}


export default Home
