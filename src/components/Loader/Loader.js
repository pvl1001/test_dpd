import s from './Loader.module.scss'

function Loader() {
   return (
      <div className={ s.lds_roller }>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
      </div>
   )
}

export default Loader