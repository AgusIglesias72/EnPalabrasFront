import axios from 'axios'

const url = process.env.REACT_APP_URL

export const GetAllSales = async () => {
  try {
    const response = await axios.get(`${url}/api/all`)
    return response.data.values
  } catch (error) {
    return {
      error: error.response.data,
      message: 'Error',
    }
  }
}

export const GetOneSale = async (id) => {
  try {
    const response = await axios.get(`${url}/api/all/${id}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    return {
      error: error.response.data,
      message: 'Error',
    }
  }
}

export const addMayorista = async (data) => {
  try {
    const response = await axios.post(`${url}/api/other/mayorista`, data)
    return response.data
  } catch (error) {
    return {
      error: error.response.data,
      message: 'Error',
    }
  }
}

export const ordersMeli = async (date) => {
  try {
    const response = await axios.post(`${url}/api/meli/${date}`)
    return response.data
  } catch (error) {
    return {
      error: error.response.data,
      message: 'Error',
    }
  }
}

export const ordersTN = async (from) => {
  try {
    const response = await axios.post(`${url}/api/tn/${from}`)
    return response.data
  } catch (error) {
    return {
      error: error.response.data,
      message: 'Error',
    }
  }
}

export const udpateDB = async () => {
  try {
    const response = await axios.put(`${url}/api/all`)
    return response.data
  } catch (error) {
    return {
      error: error.response.data,
      message: 'Error',
    }
  }
}

export const addRegalo = async (data) => {
  try {
    const response = await axios.post(`${url}/api/other/regalo`, data)
    return response.data
  } catch (error) {
    return {
      error: error.response.data,
      message: 'Error',
    }
  }
}

export const addPersonal = async (data) => {
  try {
    const response = await axios.post(`${url}/api/other/personal`, data)
    return response.data
  } catch (error) {
    return {
      error: error.response.data,
      message: 'Error',
    }
  }
}
