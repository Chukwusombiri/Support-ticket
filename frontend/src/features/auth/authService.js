import api from '../../utilities/api';

const authService = {
    // Register user
    register: async (userData) => {
        const response = await api.post('/register', userData); 
        const {data} = response; 
        if(!data.token){
            throw new Error('Registration failed during credentials storage');
        }   
        localStorage.setItem('authUser', JSON.stringify(data));         
        return data;
    },

    // Login user
    login: async (userData) => {
        const response = await api.post('/login', userData);
        const data = response.data; 
        localStorage.setItem('authUser', JSON.stringify(data));                
        return data;
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('authUser');
    }
};

export default authService;