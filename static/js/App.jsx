// Connect with server via socket io
let socket = io.connect('http://0.0.0.0:5000/')


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