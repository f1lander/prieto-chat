import React from 'react';
import logo from '../../logo.svg';
import './MainChat.css';
import { ChatMessage, ChatState } from '../../socket/types'
import { ChatContext } from '../../socket/chat-context';
import moment from 'moment';

class MainChat extends React.Component {
    static contextType = ChatContext;
    el: any;
    state: ChatState & any = {
        messages: [
            {
                message: 'Welcome! Type a message and press Send Message to continue the chat.',
                author: 'Prieto Bot'
            }
        ],
        input: '',
        author: '',
        startChat: false
    }

    componentDidMount() {

        //initiate socket connection
        this.context.init();


        const observable = this.context.onMessage();

        observable.subscribe((m: ChatMessage) => {
            let messages = this.state.messages;

            messages.push(m);
            let _length = messages.length;
            console.log(_length);
            this.setState({ messages: messages.slice(-50) });
            console.log(this.state.messages)
        });
    }

    componentWillUnmount() {
        this.context.disconnect();
        // this.scrollToBottom();
    }

    scrollToBottom() {
        //this.el.scrollHeight({ behavior: 'smooth' });
    }

    render() {

        const updateInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
            this.setState({ input: e.target.value });
        }

        const updateAuthorInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
            this.setState({ author: e.target.value });
        }
        const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                handleMessage();
            }
        }

        const handleKeyPressStart = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                handleStart();
            }
        }

        const handleStart = (): void => {
            this.setState({ startChat: true });
        }
        const handleMessage = (): void => {

            const author: string = this.state.author || 'John Smith';

            if (this.state.input !== '') {
                this.context.send({
                    message: this.state.input,
                    author: author,
                });
                this.setState({ input: '' });
            }
        };

        let msgIndex = 0;
        return (
            <div className="App">
                <img src={logo} className="App-logo" alt="logo" />

                <div className="App-chatbox">
                    {this.state.messages.map((msg: ChatMessage) => {
                        msgIndex++;
                        return (
                            <div className={msg.author === this.state.author ? "owner-message" : ""} key={msgIndex}>
                                <div>
                                    <p>{msg.author}</p>
                                    <p style={{ fontSize: 'smaller' }}>{moment(msg.timestamp).format('LT')}</p>
                                    <p>
                                        {msg.message}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {
                    !this.state.startChat &&
                    <>
                        <input
                            className="App-Textarea"
                            placeholder="Type your name"
                            onChange={updateAuthorInput}
                            onKeyPress={handleKeyPressStart}
                            value={this.state.author}
                        />
                        <button onClick={() => { handleStart() }}>
                            Start!
                </button>
                    </>
                }
                {
                    this.state.startChat &&
                    <>
                        <input
                            className="App-Textarea"
                            placeholder="Type your message here..."
                            onChange={updateInput}
                            onKeyPress={handleKeyPress}
                            value={this.state.input}
                        />
                        <p>

                            <button onClick={() => { handleMessage() }}>
                                Send Message
                </button>

                        </p>
                    </>
                }
            </div>
        );
    }
}

export default MainChat;