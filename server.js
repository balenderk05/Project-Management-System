const express = require('express')
const dotenv =require ('dotenv')
const morgan =require ('morgan')
const cors =require ('cors')
const helmet =require ('helmet')
const authRoute = require('./routes/userRoute')
const projectRoute = require('./routes/projectRoute')
const taskRoutes = require('./routes/taskRoute')
const db =  require('./config/db')


dotenv.config()

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())

app.use("/api/users", authRoute)
app.use("/api/user", projectRoute)
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT 


    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });


