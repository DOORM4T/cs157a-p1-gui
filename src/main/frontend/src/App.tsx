import { Block } from 'baseui/block'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ConnectionTest from './components/ConnectionTest'
import CustomerPage from './pages/CustomerPage'
import TitlePage from './pages/TitlePage'

export const ROUTES = {
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
      <div style={{ position: 'absolute', left: 0, top: '-1rem' }}>
        <ConnectionTest />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.title} element={<TitlePage />} caseSensitive />
          <Route path={ROUTES.customer} element={<CustomerPage />} />
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
