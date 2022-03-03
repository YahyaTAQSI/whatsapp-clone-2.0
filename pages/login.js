import styled from "styled-components";
import Head from "next/head";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

export default function Login() {
  const singIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <Container>
      <Head>
        <title>Login to WhatsApp 2.0</title>
      </Head>
      <LoginContainer>
        <Logo src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
        <Button onClick={singIn} variant="outlined">
          Sing In With Google
        </Button>
      </LoginContainer>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: #ffffff;
`;
const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 50px;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
`;
const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
