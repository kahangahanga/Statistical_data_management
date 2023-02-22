import { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import Axios from "axios";

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const {data} = await Axios.post(process.env.REACT_APP_SERVER_URL, {
        query: `
          query{
            users{
              userId,
              username,
              email,
              avatar,
              password,
              birthdate,
              registeredAt
            }
          }
        `,
      }, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
      });
      !!data.data.users.length&&setUsers(data.data.users);
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {!!users.length&&<table>
          <thead>
            <tr>
              <th>ID</th>
              <th>UserName</th>
              <th>Avatar</th>
              <th>Email</th>
              <th>Password</th>
              <th>Birthday</th>
              <th>RegisteredAt</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(_user=><tr key={_user.userId}>
                <td>{_user.userId}</td>
                <td>{_user.username}</td>
                <td>
                  <img src={_user.avatar} width={32}/>
                </td>
                <td>{_user.email}</td>
                <td>{_user.password}</td>
                <td>{_user.birthdate}</td>
                <td>{_user.registeredAt}</td>
              </tr>)
            }
          </tbody>
        </table>}
      </header>
    </div>
  );
}

export default App;
