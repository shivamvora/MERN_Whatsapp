import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState( [] );
  useEffect( () => {
    axios.get( '/messages/sync' )
      .then( response => {
        console.log( 'response', response.data );
        setMessages( response.data )
      } )
  }, [] );

  useEffect( () => {
    const pusher = new Pusher( '6795240dbeff49a7bac1', {
      cluster: 'ap2'
    } );

    const channel = pusher.subscribe( 'messages' );
    channel.bind( 'inserted', ( newMessage ) => {
      setMessages( [...messages, newMessage] )
    } );
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages] );

  console.log( "messages state set", messages );

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
