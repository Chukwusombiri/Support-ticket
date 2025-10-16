import api from '../../utilities/api';

const noteService = {
    getNotes: async (url) => {
        const results =  await api.get(url);
        return results.data
    },

    createNote: async (url, data) => {
        const result = await api.post(url, data);
        return result.data
    }
}

export default noteService