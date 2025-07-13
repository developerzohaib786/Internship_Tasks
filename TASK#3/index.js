require('dotenv').config();
const express = require('express')
const app = express();
const cors=require("cors");
const port = process.env.PORT|| 3000;
const connection=require("./db")
const userRoutes=require("./routes/users");
const authRoutes=require("./routes/auth");
const employeeRoute=require("./routes/Employee");
const {Employee}=require('./models/employee');

// connection
connection();

// middlewares 
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));
app.use(cors());

// routes
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find(); // make sure this is correctly imported
    res.json(employees);
  } catch (err) {
    console.error("Error in GET /api/employees:", err); // log the real error
    res.status(500).json({ error: 'Server Error' });
  }
});

app.delete("/api/delete", async (req,res)=>{
      
})

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/newemployee",employeeRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
