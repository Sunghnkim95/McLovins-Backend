import React from 'react';
import { useHistory } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import {
    BASE_URL,
    fetchLoginUser,
} from '../api';

// CHECK THAT PATH


const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
`;
const Content = styled.div`
  font-family: "ABeeZee", sans-serif;
  width: 480px;
  padding: 12px;
  min-height: 200px;
  border: black solid 2px;
  background: #ADD8E6;
  box-shadow: 0 2px 12px -8px black;
  border-radius: 2%;
`;
const Heading = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 24px;
  border-bottom: 1px solid #888;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
`;
const Input = styled.input`
  height: 1.5rem;
  background: #ddd;
  width: 460px;
  padding: 8px;
  font-size: 22px;
  margin-bottom: 8px;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const FooterButton = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border-radius: 6px;
  box-shadow: 0 2px 6px -2px black;
  background-color: black;
  justify-content: space-around;
  align-items: center;
  height: 36px;
  width: 100px;
  a:visited {
    color: white;
  }
`;
const Login = ({setMyPassword, myPassword, setMyUsername, myUsername, setUserToken}) => {
    let history = useHistory();
    async function loginUser(event) {
        event.preventDefault();
        try {
            const results = await fetchLoginUser(BASE_URL, myUsername, myPassword);
            if(results.user) {
                const token = await results.token;
                setUserToken(token);
                setMyUsername(myUsername);
                localStorage.setItem('userToken', token);
                localStorage.setItem('myUsername', JSON.stringify(myUsername));
                // const routines = await fetchUsersRoutines(myUsername, token)
                // setusersRoutines(routines)
                // history.push("/");
            } else {
                alert("Your Username Or Password Is Incorrect");
            }
        } catch(error) {
            console.error(error);
        } 
    }
    return (
        <div className="background"
            style={{backgroundColor:"blue"}}>
            <Modal>
                <Content>
                    <section className="loginContainer">
                        <Heading>{<h1 className="loginTitle">Login</h1>}</Heading>
                        <Form>    
                                <form className="loginForm" onSubmit={loginUser}>
                                    <div>
                                        <Label>Username:</Label>
                                        <Input 
                                            type="username" 
                                            placeholder="Username" 
                                            className="loginInput" 
                                            onChange={(event) => {setMyUsername(event.target.value)}} 
                                        required/>
                                    </div>
                                    <div>
                                        <Label>Password:</Label>
                                        <Input type="password" 
                                        placeholder="Password" 
                                        className="loginInput" 
                                        onChange={(event) => {setMyPassword(event.target.value)}} 
                                        required/>
                                    </div>
                                    <Footer>
                                        <FooterButton>
                                            <CheckRoundedIcon
                                                style={{ color: "white", fontSize: 30 }}
                                            ></CheckRoundedIcon>
                                            <Button
                                                variant="contained"
                                                style={{
                                                textDecoration: "none",
                                                backgroundColor: "black",
                                                color: "white",
                                                }}
                                                className="btn btn-primary"
                                                type="submit"
                                            >
                                                LOGIN
                                            </Button>
                                        </FooterButton>
                                        <FooterButton>
                                            <CloseRoundedIcon
                                                style={{ color: "white", fontSize: 30 }}
                                            ></CloseRoundedIcon>{" "}
                                            <Link
                                                to="/"
                                                style={{ textDecoration: "none" }}
                                                className="btn btn-primary"
                                                onClick={() => {}}
                                            >
                                                Cancel
                                            </Link>
                                        </FooterButton>
                                    </Footer>
                    
                                </form>
                        </Form>    
                    </section>
                </Content>
            </Modal>
        </div>
    ) 
}
export default Login; 