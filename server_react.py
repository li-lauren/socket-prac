from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, send, join_room

import os

#SECRET_KEY = os.environ['SECRET_KEY']
SECRET_KEY = 'blahblah'

app = Flask(__name__)
app.secret_key = SECRET_KEY

io = SocketIO(app, cors_allowed_origins="*")

# app.debug = True
# app.host = 'localhost'
@app.route('/')
def index():
    return render_template('index_react.html')

@io.on("connect")
def test_connect():
    print(f"Client connected")

@io.on("disconnect")
def test_disconnect():
    print("Client disconnected")

@io.on("join")
def handle_join_room(room):
    print(f"User is now in Room {room}, SID: {request.sid}")
    join_room(room)
    io.emit('join_msg', room=room)

@io.on("message")
def handleMessage(msg):
    print(msg)
    send(msg, broadcast=True)
    return None   

if __name__ == '__main__':
    io.run(app, debug=True, host='0.0.0.0')