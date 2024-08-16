import {
  server
} from './node.js'
import axios from 'axios'

server.listen()

// This is a simple Node.js application that
// does a network request and prints the response.
async function app() {
  const response = await axios.get(`${process.env.MOCK_ADRESS}/user`)
  .then(response => {
    console.log(response.status)
    console.log(response.statusText)
    console.log(response.headers)
    console.log(response.data)

  })

  // console.log(user)
}

app()