import request from 'supertest';
import { app } from '../index';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import mongoose, { ConnectOptions } from 'mongoose';
import initializeTestDatabase from '../../setupTestDB'; 

const MONGO_URI_TEST = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/test'; 

jest.mock('../models/User'); // Mock the User model
jest.mock('bcryptjs');

const mockUserFindOne = jest.fn();
const mockUserSave = jest.fn();
const mockBcryptHash = jest.fn();
const mockBcryptCompare = jest.fn();



beforeEach(() => {
    (User.findOne as jest.Mock) = mockUserFindOne;
    mockUserFindOne.mockClear();

    (User.prototype.save as jest.Mock) = mockUserSave; // Mock User.save
    mockUserSave.mockClear(); // added this line to clear mock data

    (bcrypt.hash as jest.Mock) = mockBcryptHash;
    (bcrypt.compare as jest.Mock) = mockBcryptCompare;
    mockBcryptHash.mockResolvedValue('hashed_password'); // Mock bcrypt.hash
    mockBcryptCompare.mockResolvedValue(true);
    mockBcryptHash.mockClear();
    mockBcryptCompare.mockClear();


});

describe('Auth Routes', () => {
    it('should register a new user', async () => {
        mockUserFindOne.mockResolvedValueOnce(null); // Mock no existing user
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'testpassword',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('User registered successfully');
    });

    it('should prevent registration of existing user', async () => {
        mockUserFindOne.mockResolvedValueOnce({ username: 'testuser', password: 'hashed_password' }); // Mock user exists
        const res = await request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', password: 'testpassword' });
        expect(res.statusCode).toEqual(409);
    });

    it('should handle validation errors during registration', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ username: '', password: '' });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Username and password are required');
    });

    it('should allow login with correct credentials', async () => {
        mockUserFindOne.mockResolvedValueOnce({ username: 'testuser', isAdmin: false, password: 'hashed_password' });
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpassword' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Login successful');
        expect(res.body.user.username).toEqual('testuser');
        expect(res.body.user.isAdmin).toBe(false);
    });

    // it('should handle login with incorrect credentials', async () => {
    //     mockUserFindOne.mockResolvedValueOnce({ username: 'testuser', password: 'hashed_password' });
    //     mockBcryptCompare.mockResolvedValueOnce(false); // Mock incorrect password
    //     const res = await request(app)
    //         .post('/api/auth/login')
    //         .send({ username: 'testuser', password: 'incorrectpassword' });
    //     expect(res.body.message).toBe('Authentication failed');
    //     expect(res.statusCode).toEqual(401);
    // });


    it('should handle non-existing username', async () => {
        mockUserFindOne.mockResolvedValueOnce(null);
        const res = await request(app)
          .post('/api/auth/login')
          .send({ username: 'nonexistinguser', password: 'password' });
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Authentication failed');
      });


    it('should return 500 on server errors during registration', async () => {
      const mockError = new Error('Database connection error');
      (User.findOne as jest.Mock).mockRejectedValueOnce(mockError);
    
      const res = await request(app)
        .post('/api/auth/register')
        .send({ username: 'testuser', password: 'testpassword' });
    
      expect(res.statusCode).toEqual(500);
      expect(res.body.message).toEqual('Registration failed');
      expect(res.body.error).toEqual('Database connection error');
    });
    
    it('should return 500 on server errors during login', async () => {
      const mockError = new Error('Database connection error');

      mockUserFindOne.mockRejectedValueOnce(mockError); // Mock User.findOne to reject
    
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: 'testpassword' });
    
      expect(res.statusCode).toEqual(500);
      expect(res.body.message).toEqual('Login failed');
    });
    

});