const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const expenseRoutes = require("./routes/expenses.routes");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/v1", expenseRoutes);
app.get("/",(req,res)=>{
    res.send(`Server successfully running on port number: ${process.env.PORT}`);
});

module.exports = app;
