import Logo from '../Logo/Logo';
import LogInForm from './LogInForm';

function AuthBlock() {
  return (
    <aside className='auth-page__aside auth'>
      <Logo />
      <LogInForm />
    </aside>
  );
}

export default AuthBlock;
