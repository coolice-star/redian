// API基础URL
const API_BASE_URL = 'http://localhost:3000/api';

// API服务
const ApiService = {
    // 注册新用户
    register: async (username, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || '注册失败');
            }
            
            return data;
        } catch (error) {
            console.error('注册请求错误:', error);
            throw error;
        }
    },
    
    // 用户登录
    login: async (username, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || '登录失败');
            }
            
            // 保存令牌到本地存储
            if (data.token) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('currentUser', JSON.stringify({
                    id: data.user.id,
                    username: data.user.username,
                    isLoggedIn: true
                }));
            }
            
            return data;
        } catch (error) {
            console.error('登录请求错误:', error);
            throw error;
        }
    },
    
    // 获取当前用户信息
    getCurrentUser: async () => {
        try {
            const token = localStorage.getItem('authToken');
            
            if (!token) {
                throw new Error('未登录');
            }
            
            const response = await fetch(`${API_BASE_URL}/user`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || '获取用户信息失败');
            }
            
            return data;
        } catch (error) {
            console.error('获取用户信息错误:', error);
            throw error;
        }
    },
    
    // 注销
    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
    },
    
    // 检查是否已登录
    isAuthenticated: () => {
        return localStorage.getItem('authToken') !== null;
    }
}; 