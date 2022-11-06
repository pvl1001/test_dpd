const fs = require( 'fs' )
const express = require( 'express' )
const bodyParser = require( "body-parser" )
const router = express.Router()
const cors = require( 'cors' )
const app = express()
const PORT = 4000


app.use( bodyParser.urlencoded( { extended: false } ) )
app.use( bodyParser.json() )
app.use( cors() )
app.use( "/", router )


// Вернуть массив для таблицы
app.get( '/api/getdata', ( req, res ) => {
   const data = JSON.parse( fs.readFileSync( './api.json' ).toString( 'utf-8' ) )
   const filterData = data.results.map( el => {
      const { id, picture, name, gender, location, dob, email, phone } = el
      return { id, picture, name, gender, location, dob, email, phone }
   } )
   res.json( filterData )
} )


app.listen( PORT, function () {
   console.log( `CORS-enabled web server listening on port ${ PORT }` )
} )