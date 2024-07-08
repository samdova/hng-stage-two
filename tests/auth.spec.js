// tests/auth.spec.js
const request = require('supertest');
const app = require('../app');
const { User, Organisation } = require('../models');

describe('User Registration and Login', () => {
  afterAll(async () => {
    await User.destroy({ where: {} });
    await Organisation.destroy({ where: {} });
  });

  test('It should register user successfully', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'Sam',
        lastName: 'Dova',
        email: 'samdova@example.com',
        password: 'password',
        phone: '1234567890',
      });
    
    expect(response.status).toBe(201);
    expect(response.body.data.user.email).toBe('samdova@example.com');
  });

  test('It should log the user in successfully', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'samdova@example.com',
        password: 'password',
      });
    
    expect(response.status).toBe(200);
    expect(response.body.data.user.email).toBe('samdova@example.com');
  });

  test('It should fail if required fields are missing', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        firstName: '',
        email: 'sandova@example.com',
        password: 'password',
      });
    
    expect(response.status).toBe(422);
  });

  test('It should fail if there’s a duplicate email', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'Sammy',
        lastName: 'Dova',
        email: 'samdova@example.com',
        password: 'password',
      });
    
    expect(response.status).toBe(422);
  });
});
