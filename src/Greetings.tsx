import User from './model/User';

export interface GreetingsProps {
  user: User,
}

export default function Greetings(props: GreetingsProps) {

  return (
    <div>Greetings {props.user.firstname}!</div>
  )
}
