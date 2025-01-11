const express = require('express')
const dotenv =require ('dotenv')
const morgan =require ('morgan')
const cors =require ('cors')
const helmet =require ('helmet')
const connection = require('./config/db')
const authRoute = require('./routes/authRoutes.js')


dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())

app.use("/api/user", authRoute)
const PORT = process.env.PORT 

connection()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });


