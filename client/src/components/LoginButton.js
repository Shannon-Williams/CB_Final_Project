import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <Button onClick={() => loginWithRedirect()}>log in</Button>;
};

export default LoginButton;

const Button = styled.button`
  color: var(--test);
  font-weight: bold;
`;
