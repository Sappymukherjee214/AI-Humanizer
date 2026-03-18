import axios from 'axios';

async function testSignup() {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', {
            email: 'test' + Date.now() + '@example.com',
            password: 'password123',
            name: 'Test User'
        });
        console.log('Signup success:', response.data);
    } catch (error: any) {
        console.error('Signup failed:', error.response?.data || error.message);
    }
}

testSignup();
