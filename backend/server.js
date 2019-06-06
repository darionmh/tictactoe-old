const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });

console.log("Loaded!", wss.address())


const resetBoard = () => {
  let board = []
  for(let i=0;i<9;i++){
      board.push({id: i, playerId: null})
  }
  return board
}

let state = {
  players: [],
  board: resetBoard()
}

const NEW_CONNECTION = "NEW_CONNECTION"
const REMOVE_CONNECTION = "REMOVE_CONNECTION"
const SET_PLAYER_NAME = "SET_PLAYER_NAME"

let updateClients = () => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(state));
    }
  });
}

const reducer = ({type, id, payload}) => {
  console.log(type+"-"+id, payload)
  switch(type){
    case NEW_CONNECTION:
      state.players = [...state.players, {id}]
      break
    case REMOVE_CONNECTION:
      state.players = state.players.filter(it => it.id !== id)
      break
    case SET_PLAYER_NAME:
      const {name} = payload
      state.players = state.players.map(it => {
        if(it.id === id) it.name = name
        return it
      })
      break
    default:
      console.log("no action recognized for type "+type)
      break
  }

  console.log(state)
  updateClients()
}

const dispatch = (type, id, payload) => ({
  type, id, payload
})

let i = 0
wss.on('connection', function connection(ws) {
  ws.id = i++
  reducer(dispatch(NEW_CONNECTION, ws.id))

  ws.on('close', () => {
    reducer(dispatch(REMOVE_CONNECTION, ws.id))
  })
  
  ws.on('message', function incoming(data) {
    const message = JSON.parse(data)
    reducer(dispatch(message.type, ws.id, message.payload))
  });
});

