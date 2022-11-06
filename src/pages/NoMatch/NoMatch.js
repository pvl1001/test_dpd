import s from './NoMatch.module.scss'
import { Link } from "react-router-dom"


function NoMatch() {
   return (
      <div className={ s._ }>
         <h1>404</h1>
         <p>Данной страницы не существует.</p>
         <Link to={ '/' }>Вернуться назад</Link>
      </div>
   )
}


export default NoMatch