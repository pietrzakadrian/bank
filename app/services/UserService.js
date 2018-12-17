import axios from 'axios';

export const register = newUser =>
  axios
    .post('http://localhost:3000/api/users/register', {
      login: newUser.login,
      password: newUser.password,
      name: newUser.name,
      surname: newUser.surname,
      address: newUser.address,
    })
    .then(res => {
      console.log('Registered');
      return 1;
    })
    .catch(err => {
      console.log(err);
    });

export const login = user =>
  axios
    .post('http://localhost:3000/api/users/login', {
      login: user.login,
      password: user.password,
    })
    .then(res => {
      localStorage.setItem('userToken', res.data.token);
      return res.data.token;
    })
    .catch(err => {
      console.log(err);
    });
