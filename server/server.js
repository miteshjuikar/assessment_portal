const express =  require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');

const authRouter = require('./routes/userRoutes');

const { connectToMongoDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();
const userId = process.env.MONGO_USER;
const userPassword = process.env.MONGO_PASSWORD;

//MongoDB Connection
connectToMongoDB(`mongodb+srv://${userId}:${userPassword}@cluster1.hvniz.mongodb.net/assessmemtPortal?retryWrites=true&w=majority&appName=Cluster1`)
.then(console.log("MongoDB connected successfully"))
.catch((err)=>console.log(`Error: ${err}`)
);

app.use(cors({
    origin: "http://localhost:5173",
    methods: [ 'GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials: true
}));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
// app.use('/api/admin/products', adminProductsRouter);
// app.use('/api/shop/products', shopProductsRouter);


app.listen(PORT, () => console.log(`Server is started on port: ${PORT}`));

