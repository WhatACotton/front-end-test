import initializeFirebase from "../firebase/firebaseConfig";
("../firebase/firebaseConfig");
import { SignIn, SignUp, PassReset, YourComponent } from "../components/signin";
import { useState } from "react";
import { useRouter } from "next/router";

import {
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
export default function Signin() {
  initializeFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <Form>
        <FormGroup>
          <Label>メールアドレス：</Label>
          <Input
            type="email"
            name="email"
            style={{ height: 50, fontSize: "1.2rem", margin: "1rem" }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>パスワード：</Label>
          <Input
            type="password"
            name="password"
            style={{ height: 50, fontSize: "1.2rem", margin: "1rem" }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <YourComponent email={email} password={password} />
        <SignIn email={email} password={password} />
        <SignUp email={email} password={password} />
        <PassReset email={email} />
      </Form>
    </div>
  );
}
