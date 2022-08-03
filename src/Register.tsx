import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import './Register.css';
import User from "./model/User";

export interface RegisterProps {
  onChangeUser: (user: User) => void,
}

function Register(props: RegisterProps) {

  const [firstname, setFirstname] = useState('');
  const onChangeFirstname = (event: ChangeEvent<HTMLInputElement>) => { setFirstname(event.target.value); }

  const [lastname, setLastname] = useState('');
  const onChangeLastname = (event: ChangeEvent<HTMLInputElement>) => { setLastname(event.target.value.toLowerCase()); }

  const [password, setPassword] = useState('');
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value); }

  const [age, setAge] = useState(18);
  const onChangeAge = (event: ChangeEvent<HTMLInputElement>) => { setAge(+event.target.value); }

  const [alert, setAlert] = useState('');

  const [isDisabled, setDisabled] = useState(false);
  useEffect(() => {
    setDisabled(firstname === '' || lastname === '' || password === '' || age < 18);
  }, [isDisabled, firstname, lastname, password, age]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await axios.post(process.env.REACT_APP_API_BASE_URL + '/register', {
      firstname: firstname, lastname: lastname, password: password, age: age
    })
      .then(response => {
        props.onChangeUser(response.data.requestBody);
        console.log(response.data.requestBody);
      })
      .catch(error => {
        console.error(error);
        setAlert(error.message);
      });
  }

  return (
    <div className='container'>

      <h1 className='title'>
        register
      </h1>

      <form className='form' onSubmit={handleSubmit}>

        {/* firstname */}
        <div className='element'>
          <label className='label' htmlFor='firstname'>
            first name :
          </label>
          <input className='input' type='text'
            id='firstname' name='firstname'
            aria-label='firstname' aria-required
            defaultValue='' onChange={onChangeFirstname}
          />
        </div>

        {/* lastname */}
        <div className='element'>
          <label className='label' htmlFor='lastname'>
            last name :
          </label>
          <input className='input' type='text'
            id='lastname' name='lastname'
            aria-label='lastname' aria-required
            defaultValue='' onChange={onChangeLastname}
          />
        </div>

        {/* password */}
        <div className='element'>
          <label className='label' htmlFor='password'>
            password :
          </label>
          <input className='input' type='password'
            id='password' name='password'
            aria-label='password' aria-required
            defaultValue='' onChange={onChangePassword}
          />
        </div>

        {/* age */}
        <div className='element'>
          <label className='label' htmlFor='age'>
            age :
          </label>
          <input className='input' type='range'
            id='age' name='age'
            min='1' max='100' aria-label='age'
            defaultValue={age} onChange={onChangeAge}
          />
          <output>{age}</output>
        </div>

        {/* submit */}
        <div className='button' aria-label='submit'>
          <button type="submit" disabled={isDisabled}>
            continue
          </button>
        </div>

      </form>

      {alert !== '' && <div className='alert'>
        <span id='message' aria-label='alert-message'>{alert}</span>
      </div>}

    </div>
  )
}

export default Register;
