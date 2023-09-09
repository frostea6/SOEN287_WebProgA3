const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const port = 5087;
app.use(bodyParser.urlencoded({
  extended: false}));
app.use(cookieParser());

app.use(cookieParser());

function findSummation(N =1){
  if (typeof N !== 'number' || N <= 0 || !Number.isInteger(N)) {
    return false;
  }

  let summation = 0;
  for (let i = 1; i <= N; i++) {
    summation += i;
  }

  return summation;
}
function uppercaseFirstandLast(string) {
  const para = string.split(' ');
  const paraGet = [];

  for (let i = 0; i < para.length; i++) {
    const word = para[i];
    if (word.length < 2) {
      paraGet.push(word.toUpperCase());
    } else {
      const newPara =
        word.charAt(0).toUpperCase() + word.slice(1, -1) +
        word.charAt(word.length - 1).toUpperCase();
      paraGet.push(newPara);
    }
  }
  return paraGet.join(' ');
}

function findAverageAndMedian(nb){

  const stringNum = nb.split(' ');
  let arrayOfNumbers = [];
  let sum = 0;

  for(let i=0;i<stringNum.length;i++){
    arrayOfNumbers.push(parseInt(stringNum[i]));
  }

  for(let i=0; i<arrayOfNumbers.length; i++){
    sum += arrayOfNumbers[i];
  }
  const avrg = (sum/arrayOfNumbers.length);

  arrayOfNumbers.sort(function(a, b){
    return a-b;
  });
  let median;
  const indexM = Math.floor(arrayOfNumbers.length / 2);
  if(arrayOfNumbers.length % 2===0) {
    median = (arrayOfNumbers[indexM - 1] + arrayOfNumbers[indexM]) / 2;
  } else {
    median = arrayOfNumbers[indexM];
  }
  if(isNaN(avrg) || isNaN(median)){
    return "error! invalid input, this should be numbers."
  }
  return ("average: "+ avrg+ " median: " + median);
}

function find4Digits(numbersString) {
  const numbersArray = numbersString.split(' ');

  for (let i = 0; i < numbersArray.length; i++) {
    const numberString = numbersArray[i];

    if (numberString.length === 4 && !isNaN(parseInt(numberString, 10))) {
      return "the 4 digit number is: "+ numberString;
    }
  }

  return false;
}
app.get('/visits', (req, res) => {
  let visits = parseInt(req.cookies.visits) || 0;

  if (visits === 0) {
    res.cookie('visits', 1);
    res.send('<h1>Welcome to my webpage! It is your first time here.</h1>');
  } else {
    visits++;
    const lastVisitTime = new Date().toString();
    res.cookie('visits', visits);
    res.send(`<h1>Hello, this is the ${visits} time that you are visiting my webpage.<br>Last time you visited my webpage on: ${lastVisitTime}</h1>`);
  }
});
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/checkPhoneNumber', (req, res) => {
  const phoneNumberPattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  const submittedPhoneNumber = req.body.phoneNumber;

  if (phoneNumberPattern.test(submittedPhoneNumber)) {
    res.send('Phone number is correct!');
  } else {
    res.send('Invalid phone number format. Please use ddd-ddd-dddd format.');
  }
});


app.get('/', (req,res)=>{
  res.sendFile('index.html', {root: __dirname});

})
app.post('/findSummation', (req, res)=>{
  const num = parseInt(req.body.number);
  if(isNaN(num)){
    return res.send('input must a positive integer!');
  }
  const ans = findSummation(num);
  res.send('Summation result: '+ ans);


});
app.get('/findSummation', (req,res)=>{
  res.sendFile('index.html', {root: __dirname});

})


app.post("/uppercaseFirstandLast", (req,res)=>{
  const string = req.body.string;
  const newString = uppercaseFirstandLast(string);
  res.send('new string is : '+ newString);

});

app.get("/uppercaseFirstandLast", (req, res)=>{
  res.sendFile('index.html', {root:__dirname});
});

app.post("/findAverageAndMedian", (req, res) =>{
  const input = req.body.numbers;
  res.send(findAverageAndMedian(input));

});


app.get('/findAverageAndMedian', (req,res)=>{
  res.sendFile('index.html', {root: __dirname});
});

app.post('/find4Digits',(req,res)=>{
  const input = req.body.numbers;
  res.send(find4Digits(input));


})

app.get('/find4Digits', (req,res)=>{
  res.sendFile('index.html', {root: __dirname});
});



app.listen(5087, ()=>{
  console.log('server is running on port '+ port);
});
