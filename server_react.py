from flask import Flask, jsonify, render_template;
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'

socketIo = SocketIO(app, cors_allowed_origins="*")

# app.debug = True
# app.host = 'localhost'
@app.route('/')
def index():
    return render_template('index_react.html')

@socketIo.on("message")
def handleMessage(msg):
    print(msg)
    send(msg, broadcast=True)
    return None

if __name__ == '__main__':
    socketIo.run(app, debug=True, host='0.0.0.0')