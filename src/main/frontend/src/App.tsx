import { Block } from 'baseui/block'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ConnectionTest from './components/ConnectionTest'
import TitlePage from './pages/TitlePage'

const ROUTES = {
  title: '/',
  customer: '/customer',
  admin: '/admin',
}

const App = () => {
  // TODO: Global context to track the logged in User

  return (
    <Block
      maxWidth="100vw"
      height="100vh"
      overflow="hidden"
      backgroundColor="#141414"
    >
      <div style={{ position: 'absolute', left: 0, top: "-1rem" }}>
        <ConnectionTest />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.title} element={<TitlePage />} caseSensitive />
          <Route
            path={ROUTES.customer}
            element={<div style={{ color: 'red' }}>CUSTOMER</div>}
          />
          <Route
            path={ROUTES.admin}
            element={<div style={{ color: 'red' }}>ADMIN</div>}
          />
        </Routes>
      </BrowserRouter>
    </Block>
  )
}

export default App
