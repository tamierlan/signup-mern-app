const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))


const mongoURI = 'mongodb+srv://user:tamerlan12@cluster0-buc3s.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

const Users = require('./routes/Users')

app.use('/users', Users)

if (process.env.NODE_ENV === 'production') {

  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
}


app.listen(port, () => {
  console.log('Server is running on port: ' + port)
})
