import axios from 'axios';

// export const register = newUser =>
//   axios
//     .post('users/register', {
//       first_name: newUser.first_name,
//       last_name: newUser.last_name,
//       email: newUser.email,
//       password: newUser.password,
//     })
//     .then(res => {
//       console.log('Registered');
//     });

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
