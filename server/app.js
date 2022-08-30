const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')
// const CoffeeItem = require('./models/CoffeeItem')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api', routes)

const PORT = config.get('port') ?? 8080

// if(process.env.NODE_ENV === 'production') {
//     console.log('Prod');
// } else {
//     console.log('development');
// }
// const express = require('express');
const fileUpload = require('express-fileupload');

app.use(cors())
app.use(fileUpload({
    createParentPath: true,
}))

app.post('/uploadedFiles', async (req, res) => {
  
    //  if(!req.files) {
    //     return res.status(400).json({ msg: 'No file uploaded' })
    // }
    const slicedDirname = __dirname.slice(0, __dirname.length - 6)
    const imgArr = []

    for(let i = 0; i < 3; i++) {
      const fileIndex = `file${i}`
      file = req.files[fileIndex]

      if(file) {
        const newFileName = encodeURI(Date.now() + '-' + file.name);
        imgArr.push(`/uploads/${newFileName}`)
        file.mv(`${slicedDirname}/client/public/uploads/${newFileName}`, err => {
          if(err) {
              return res.status(500).send(err);
          }  
        })
      }
    }

    res.status(200).send(imgArr)
})


async function start() {
    try {
      mongoose.connection.once('open', () => {
        initDatabase()
      })
      await mongoose.connect("mongodb+srv://Stanislav:Bkktdfkj666@cluster0.tbqoo.mongodb.net/?retryWrites=true&w=majority")
      console.log(chalk.green('MongoDB connected'));
      app.listen(PORT, () => console.log(chalk.green(`Server has been started on port ${PORT}...`)))
    } catch (error) {
      console.log(chalk.red(error.message));
      process.exit(1)
    }

}
start()

