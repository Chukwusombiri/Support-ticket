import api from "../../utilities/api"

const TICKET_URL = '/tickets'

const createTicket = async (ticketData) => {    
    const response = await api.post(TICKET_URL, ticketData)
    return response.data
}

const getTickets = async () => {    
    const response = await api.get(TICKET_URL)
    return response.data
}

const getTicket = async (ticketId) => {    
    const response = await api.get(`${TICKET_URL}/${ticketId}`)
    return response.data
}

const closeTicket = async (ticketId) => {    
    const response = await api.put(`${TICKET_URL}/${ticketId}`, { status: 'closed' })
    return response.data
}

const deleteTicket = async (ticketId) => {    
    const response = await api.delete(`${TICKET_URL}/${ticketId}`)
    return response.data
}

const updateTicket = async (ticketId, ticketData) => {    
    const response = await api.put(`${TICKET_URL}/${ticketId}`, ticketData)
    return response.data
}

export default {
    createTicket,
    getTickets,
    getTicket,
    closeTicket,
    deleteTicket,
    updateTicket
}