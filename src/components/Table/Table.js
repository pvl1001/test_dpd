import s from './Table.module.scss'


function Table( { data } ) {
   if ( data === null ) return null

   const tableHead = [
      "Аватар",
      "ФИО",
      "Пол",
      "Страна",
      "Дата рождения",
      "Адрес электронной почты",
      "Телефон",
   ]


   return (
      <table className={ s._ }>
         <thead>
         <tr>
            { tableHead.map( el =>
               <th key={ el }>{ el }</th>
            ) }
         </tr>
         </thead>

         <tbody>
         { data.map( ( el, i ) =>
            <tr key={ el.id.name + i }>
               <td><img src={ el.picture.medium } alt="аватар"/></td>
               <td>{ el.name.title } { el.name.first } { el.name.last }</td>
               <td>{ el.gender }</td>
               <td>{ el.location.country }</td>
               <td>{ el.dob.date }</td>
               <td>{ el.email }</td>
               <td>{ el.phone }</td>
            </tr>
         ) }
         </tbody>

      </table>
   )
}

export default Table