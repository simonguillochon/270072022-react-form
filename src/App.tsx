import { useState } from 'react';
import Greetings from './Greetings';
import Register from './Register';
import User from './model/User';

function App() {

  const [user, setUser] = useState<User>();
  const handleUser = (user: User) => {
    setUser(user);
  }

  return (
    <div className='app'>
      {!user
        ? <Register onChangeUser={handleUser} />
        : <Greetings user={user} />
      }
    </div>
  );
}

export default App;
