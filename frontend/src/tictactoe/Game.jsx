import React, { Component } from 'react';
import { move, MOVE, ADD_PLAYER } from './Action';
import { Input, Button } from '../../node_modules/semantic-ui-react';

const URL = 'ws://localhost:3030'

class Game extends Component {
    ws = new WebSocket(URL)
    state = {
        playerName: "",
        token: "",
        connected: false,
    }

    componentDidMount() {
        this.ws.onopen = () => {
            console.log("connected")
            this.setState({connected: true})
        }

        this.ws.onmessage = evt => {
            const message = JSON.parse(evt.data)
            console.log(message)
            this.setState({...message})
        }

        this.ws.onerror = evt => {
            this.setState({connected: false})
        }

        this.ws.onclose = () => {
            console.log("disconnected")
            this.setState({connected: false})
        }
    }

    sendMove = (index) => {
        const {playerName} = this.state
        if(playerName === ""){
            alert("You must enter a name..")
            return
        }

        const move = move(playerName, index)
        this.ws.send(JSON.stringify(move))
    }

    submitName = () => {
        this.setState({playerName: this.nameInput}, () => {
            this.ws.send(JSON.stringify({type: "SET_PLAYER_NAME", payload: {name: this.state.playerName}}))
        })
    
    }

    factory = () => {
        const {connected, playerName, token} = this.state
        if(!connected){
            return <div>Connecting</div>
        }

        if(playerName === ""){
            return (
                <div>
                    <Input label="Name" onChange={(data) => this.nameInput = data.target.value}/>
                    <Button onClick={this.submitName}>Submit</Button>
                </div>
            )
        }

        return (
            <div>
                game on
            </div>
        )
    }

    render() {
        return this.factory()
    }
}

export default Game;