const REPORT_A_ENDPOINT = '/api/reportA'

export const useGetReportA = () => {
  const getReportA = async () => {
    const endpoint = `${REPORT_A_ENDPOINT}`

    try {
      const response = await fetch(endpoint)
      const accountSummaryText = await response.text()
      alert(accountSummaryText)
    } catch (error) {
      console.error(error)
    }
  }

  return getReportA
}
