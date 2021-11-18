import { createContext, useState } from 'react'

interface ILoginProvider {
  customerId: string | null
  setCustomerId?: React.Dispatch<React.SetStateAction<string | null>>
}
export const LoginContext = createContext<ILoginProvider>({
  customerId: null,
})

export const LoginProvider: React.FC = ({ children }) => {
  const [customerId, setCustomerId] = useState<string | null>(null)

  return (
    <LoginContext.Provider value={{ customerId, setCustomerId }}>
      {children}
    </LoginContext.Provider>
  )
}
