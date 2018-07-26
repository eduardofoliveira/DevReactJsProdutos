import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Api from './Api'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App api={Api}/>, document.getElementById('root'))
registerServiceWorker()

// iniciando o json-server
// json-server --watch db.json --port 3001 --host 192.168.0.31