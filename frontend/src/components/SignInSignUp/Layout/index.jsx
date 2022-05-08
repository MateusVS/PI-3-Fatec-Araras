import { Container } from './styles';

import SignInSignUpBox from '../Box';

function SignInSignUpLayout({ page }) {
  return (
    <Container>
      <SignInSignUpBox page={page} />
    </Container>
  );
}

export default SignInSignUpLayout;
