// client/src/services/authService.ts
const API_URL = process.env.REACT_APP_AUTH_URL; // Ensure this matches your server's URL

// Define the structure of a user object
interface User {
  username: string;
  password: string;
  isAdmin?: boolean;
}

// Define the structure for the register response
interface RegisterResponse {
  user: User;
  message?: string;
}

// Register a new user
const register = async (userData: User): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 409) { // Conflict (username already exists)
        throw new Error(errorData.message || 'Username already exists');
      }
      throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    throw error; // Re-throw to be caught in the component
  }
};

// Log in a user
const login = async (username: string, password: string): Promise<User> => {
  if(process.env.REACT_APP_AUTH_URL === "") {
    console.log('REACT_APP_AUTH_URL is not defined');
  } else {
    console.log('REACT_APP_AUTH_URL is defined:', process.env.REACT_APP_AUTH_URL);
  }
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user as User;
  } catch (error) {
    throw error;
  }
};

// Log out the current user
const logout = (): void => {
  localStorage.removeItem('user');
};

// Get the currently logged-in user
const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? (JSON.parse(user) as User) : null;
};

// Export the service
const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
