let express = require('express');
let bodyParser = require('body-parser');
let md5 = require('md5');
let app = express();
let port = 3000;
let mongoose = require('mongoose');
let UserModel = require('./models/userModel');
let cors= require('cors')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


mongoose.connect('mongodb://localhost/inventory',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((con) => {
    console.log('MongoDb connection established')
}).catch((err) => {
    console.log(err)
})

// app.get('/', (req,res,next) => {
//     res.send('Am connected to the server')
// })
// app.post('/register',async (req,res) =>{
//     let data = req.body;
//     const user = new Users();
//     user.firstName = data.firstName
//     user.lastName = data.lastName
//     user.email = data.email
//     user.password = md5(data.password)
//     let savedUser= await user.save();

//     if(savedUser){
//         res.send({
//             firstName: savedUser.firstName,
//             lastName: savedUser.lastName,
//             email: savedUser.email
//         })
//     }
// })

 app.post('/login', (req,res) => {
  let email = req.body.email;
  let password = md5(req.body.password);
    if(email === ''){
        res.send('Email is required')
    }
    if(password === ''){
        res.send('Password is required')
    }
    res.send(password)
})
    // route for registering new user
app.post('/register', async (req,res) => {
    let data = req.body;
    let user = new UserModel()
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    user.password = md5(data.password);
    let newUser = await user.save().then((a) => {
        return a;
    }).catch((err) => {
        res.send(err)
    });

    if(newUser){
        res.send({
            message: 'Registration was success',
            data: {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            }
        })
    }
})
app.post('/login', (req,res) => {
    let email = req.body.email;
    let password = md5(req.body.password);
      if(email === ''){
          res.send('Email is required')
      }
      if(password === ''){
          res.send('Password is required')
      }
      res.send(password)
  })
app.listen(port,() => {
    console.log(`server running on port ${port}`)
})