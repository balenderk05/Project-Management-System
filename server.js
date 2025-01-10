const express = require('express')
const dotenv =require ('dotenv')
const morgan =require ('morgan')
const cors =require ('cors')
const helmet =require ('helmet')

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())

const PORT = process.env.PORT 

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})