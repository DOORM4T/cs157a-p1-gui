import { BaseProvider } from 'baseui'
import React from 'react'
import ReactDOM from 'react-dom'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import App from './App'
import './index.css'
import theme from './theme'

const engine = new Styletron()

ReactDOM.render(
  <React.StrictMode>
    <BaseProvider theme={theme}>
      <StyletronProvider value={engine}>
        <App />
      </StyletronProvider>
    </BaseProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
