import axios from "axios";

export const fetchDataGener = async () => {
    const today = new Date()
    const start = today.toISOString()

    const endDate = new Date(today)
    endDate.setDate(today.getDate() + 3)
    const end = endDate.toISOString()

    const url = `https://api.carbonintensity.org.uk/generation/${start}/${end}`

    const response = await axios.get(url)
    return response.data.data
}