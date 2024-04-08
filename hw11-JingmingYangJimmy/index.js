
// You MUST have a file called "token.secret" in the same directory as this file!
// This should be the secret token found in https://dashboard.ngrok.com/
// Make sure it is on a single line with no spaces!
// It will NOT be committed.

// TO START
//   1. Open a terminal and run 'npm start'
//   2. Open another terminal and run 'npm run tunnel'
//   3. Copy/paste the ngrok HTTPS url into the DialogFlow fulfillment.
//
// Your changes to this file will be hot-reloaded!

import fetch from 'node-fetch';
import fs from 'fs';
import ngrok from 'ngrok';
import morgan from 'morgan';
import express from 'express';
import CS571 from '@cs571/mobile-client';
import { timeEnd } from 'console';

// Read and register with secret ngrok token.
ngrok.authtoken(fs.readFileSync("token.secret").toString().trim());

// Start express on port 53705
const app = express();
const port = 53705;

// Accept JSON bodies and begin logging.
app.use(express.json());
app.use(morgan(':date ":method :url" :status - :response-time ms'));

// "Hello World" endpoint.
// You should be able to visit this in your browser
// at localhost:53705 or via the ngrok URL.
app.get('/', (req, res) => {
  res.status(200).send(JSON.stringify({
    msg: 'Express Server Works!'
  }))
})

// Dialogflow will POST a JSON body to /.
// We use an intent map to map the incoming intent to
// its appropriate async functions below.
// You can examine the request body via `req.body`
// See https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook#webhook_request
app.post('/', (req, res) => {
  const intent = req.body.queryResult.intent.displayName;

  // A map of intent names to callback functions.
  // The "HelloWorld" is an example only -- you may delete it.
  const intentMap = {
    "HelloWorld": doHelloWorld ,
    "postOnChatRoom" : chatRoomTime ,
    "postChatroomIntent" : chatRoomIntent

  }

  if (intent in intentMap) {
    // Call the appropriate callback function
    intentMap[intent](req, res);
  } else {
    // Uh oh! We don't know what to do with this intent.
    // There is likely something wrong with your code.
    // Double-check your names.
    console.error(`Could not find ${intent} in intent map!`)
    res.status(404).send(JSON.stringify({ msg: "Not found!" }));
  }
})

// Open for business!
app.listen(port, () => {
  console.log(`DialogFlow Handler listening on port ${port}. Use 'npm run tunnel' to expose this.`)
})

// Your turn!
// Each of the async functions below maps to an intent from DialogFlow
// Complete the intent by fetching data from the API and
// returning an appropriate response to DialogFlow.
// See https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook#webhook_response
// Use `res` to send your response; don't return!

async function doHelloWorld(req, res) {
  res.status(200).send({
    fulfillmentMessages: [
      {
        text: {
          text: [
            'You will see this if you trigger an intent named HelloWorld'
          ]
        }
      }
    ]
  })
}

async function chatRoomTime(req, res){
  const params = req.body.queryResult.parameters;
  const chatRoom = await getChatroom(params.ChatroomName);
  let date=new Date(chatRoom.messages[0].created);
  let realdate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  let realtime= date.toLocaleTimeString('en-US', {     hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true  });
  
  res.status(200).send({
      fulfillmentMessages:[
        {
          text:{
            text: [`The last message in ${chatRoom.messages[0].chatroom} was posted on ${realdate} at ${realtime}!`]
          }
        }

      ]
  })
}


async function chatRoomIntent(req, res){
  const params = req.body.queryResult.parameters;

  const chatRoom = await (getChatroom( params.ChatroomName));
  if( params.number1 === ''){
    params.number1=1;
  }
  if(params.number1 >5){
    params.number1=5;
  }

  let result= [];
  for(let i=0;i<params.number1;i++){
    result.push({
          card:{
              title: `${chatRoom.messages[i].title}`,
              subtitle: `${chatRoom.messages[i].poster}`,
              buttons:[
                {
                  text : "READ MORE",
                  postback:  `https://www.cs571.org/f23/badgerchat/chatrooms/${params.ChatroomName}`
                }
              ]
          }
    })
  }

  res.status(200).send({
      fulfillmentMessages:result
  })
}



async function getChatroom(chatrooms){
  const resp= await fetch(`https://cs571.org/api/f23/hw11/messages?chatroom=${chatrooms}&page=1`, {
    headers : {"X-CS571-ID":"bid_5bea493b1f9dbf184ad489e0df83d3635ebd1fa40eeae35c9d810f986d39fe13"}
  });
  const timeResp = await resp.json();
  return timeResp;
}



