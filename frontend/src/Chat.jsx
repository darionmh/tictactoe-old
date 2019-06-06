import React, { Component } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage'

const URL = 'ws://localhost:3030'

class Chat extends Component {
    state = {
        name: 'Bob',
        messages: [],
    }

    ws = new WebSocket(URL)

    componentDidMount() {
        this.ws.onopen = () => {
            console.log("connected")
        }

        this.ws.onmessage = evt => {
            const message = JSON.parse(evt.data)
            if(message === "no room"){
                this.ws.close()
            }else{
                this.addMessage(message)            
            }
        }

        this.ws.onclose = () => {
            console.log("disconnected")
            // this.ws = new WebSocket(URL)
        }
    }

    addMessage = message => this.setState(state => ({messages: [...state.messages, message]}), () => this.messagesEnd.scrollIntoView({behavior: "instant"}))

    submitMessage = messageString => {
        const message = {name: this.state.name, message: messageString}
        this.ws.send(JSON.stringify(message))
        this.addMessage(message)
    }   

    render() {
        return (
            <div>
                <label htmlFor="name">
                    Name:&nbsp;
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name..."
                        value={this.state.name}
                        onChange={e => this.setState({name: e.target.value})}
                    />
                </label>

                <ChatInput
                    ws={this.ws}
                    onSubmitMessage={messageString => this.submitMessage(messageString)}
                />
                {this.state.messages.map((message, index) => 
                    <ChatMessage
                        key={index}
                        message={message.message}
                        name={message.name}
                    />,
                )}
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        );
    }
}

export default Chat;