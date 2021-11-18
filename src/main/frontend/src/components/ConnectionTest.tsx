import { ParagraphXSmall } from 'baseui/typography'
import { useEffect, useState } from 'react'

const TEST_CONNECTION_ENDPOINT = '/api/testConnection'

const ConnectionTest = () => {
  const [isConnected, setConnected] = useState<boolean | null>(null)

  useEffect(() => {
    const testConnection = async () => {
      const response = await fetch(TEST_CONNECTION_ENDPOINT)
      const isDbConnected = (await response.text()) === 'true' ? true : false // testConnection returns "true" or "false"
      return isDbConnected
    }

    testConnection().then((isDbConnected) => {
      setConnected(isDbConnected)
    })
  }, [])

  return (
    <>
      {isConnected === null && (
        <ParagraphXSmall color="yellow">CONNECTING...</ParagraphXSmall>
      )}
      {isConnected === true && (
        <ParagraphXSmall color="green">CONNECTED</ParagraphXSmall>
      )}
      {isConnected === false && (
        <ParagraphXSmall color="red">
          WARNING: DATABASE CONNECTION FAILED
        </ParagraphXSmall>
      )}
    </>
  )
}

export default ConnectionTest
