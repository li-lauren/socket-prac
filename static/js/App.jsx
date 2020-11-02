// Connect with server via socket io
//let socket = io.connect('http://0.0.0.0:5000/')

let socket;

const connectSocket = (room) => {
    socket = io.connect('http://0.0.0.0:5000/');
    console.log('Connecting...');
    if (socket && room) {
        socket.emit('join', room)
    }
}

const disconnectSocket = () => {
    console.log('Disconnecting...')
    if (socket) {
        socket.disconnect();
    }
}

const JoinRoom = () => {
    const rooms = [1, 2, 3, 4, 5]
    const [user, setUser] = React.useState('');
    const [room, setRoom] = React.useState(rooms[0]);

    React.useEffect(() => {
        if (room) {
            connectSocket(room)
            console.log(`Joined Room ${room}`)
        };

        return () => {
            disconnectSocket()
        }
    }, [room]);

    const getUser = e => {
        setUser(e.target.value);
    };

    return (
        <React.Fragment>
            User
            <input value={user} name="user" onChange={e => getUser(e)} />
            <p>Room: {room} </p>
            {rooms.map((room, i) =>
                <button onClick={()=> setRoom(room)} key={i}>{room}</button>
            )}
        </React.Fragment>  
    )
}
const App = () => {
    const [messages, setMessages] = React.useState(["Hello And Welcome"]);
    const [message, setMessage] = React.useState("");
  
    React.useEffect(() => {
      getMessages();
    }, [messages.length]);
  
    const getMessages = () => {
      socket.on("message", msg => {
        //   let allMessages = messages;
        //   allMessages.push(msg);
        //   setMessages(allMessages);
        setMessages([...messages, msg]);
      });
    };
  
    // On Change
    const onChange = e => {
      setMessage(e.target.value);
    };
  
    // On Click
    const onClick = () => {
      if (message !== "") {
        socket.emit("message", message);
        setMessage("");
      } else {
        alert("Please Add A Message");
      }
    };
  
    return (
      <div>
        <JoinRoom />
        {messages.length > 0 &&
          messages.map(msg => (
            <div>
              <p>{msg}</p>
            </div>
          ))}
        <input value={message} name="message" onChange={e => onChange(e)} />
        <button onClick={() => onClick()}>Send Message</button>
      </div>
    );
  };
  

ReactDOM.render(<App />, document.getElementById('root'));