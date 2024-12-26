const express =  require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/userRoutes');
const creatorRouter = require('./routes/creatorRoutes');
const userAssessmentRouter = require('./routes/UserAssessmentRoutes');
const frontEndDomain = process.env.frontEndDomain

const { connectToMongoDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

const userId = process.env.MONGO_USER;
const userPassword = process.env.MONGO_PASSWORD;

//MongoDB Connection
connectToMongoDB(`mongodb+srv://${userId}:${userPassword}@cluster1.hvniz.mongodb.net/assessmemtPortal?retryWrites=true&w=majority&appName=Cluster1`)
.then(console.log("MongoDB connected successfully"))
.catch((err)=>console.log(`Error: ${err}`)
);

app.use(cors({
    origin: frontEndDomain,
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
app.use('/api/creator', creatorRouter);
app.use('/api/user', userAssessmentRouter);

app.listen(PORT, () => console.log(`Server is started on port: ${PORT}`));

