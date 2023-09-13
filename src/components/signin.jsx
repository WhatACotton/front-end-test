import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { SignInToServer, SignUpToServer } from "./server";
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
import Routing from "./routing";
import { useEffect } from "react";
import { useState } from "react";

const signIntoFirebase = async (email, password) => {
  console.log(email, password);
  const auth = getAuth();
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const idToken = await user.getIdToken();
  return idToken;
};
const signUpToFirebase = async (email, password) => {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    return idToken;
  } catch (error) {
    console.log(error.message);
    if (error.message == "INVALID_EMAIL") {
      alert("メールアドレスが不正です");
      return (
        <div>
          <p>エラー</p>
        </div>
      );
    }
    console.log(error);
  }
};
const passResetToFirebase = async (email) => {
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.log(error);
  }
};
function signUp(email, password) {
  signUpToFirebase(email, password).then((idToken) => {
    SignUpToServer(idToken);
  });
}
export function SignUp(props) {
  return (
    <div>
      <Button
        style={{
          width: 220,
          height: 50,
          margin: "10px 10px 10px 10px",
        }}
        color="primary"
        onClick={() => signUp(props.email, props.password)}
      >
        新規登録
      </Button>
    </div>
  );
}
async function signIn(email, password) {
  await signIntoFirebase(email, password).then((idToken) => {
    SignInToServer(idToken);
  });
}
const handleErr = (error) => {
  switch (error) {
    case "Firebase: Error (auth/invalid-email).":
      setMsg("メールアドレスが正しくありません。");
      break;
    case "Firebase: Error (auth/missing-password).":
      setMsg("パスワードが入力されていません。");
      break;
    case "Firebase: Error (auth/user-not-found).":
      setMsg("ユーザーが見つかりません。");
      break;
    case "Firebase: Error (auth/wrong-password).":
      setMsg("パスワードが間違っています。");
      break;
  }
};
export const YourComponent = (props) => {
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSignIn = async () => {
    try {
      await signIn(props.email, props.password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleErrorMessage = () => {
    switch (error) {
      case "Firebase: Error (auth/invalid-email).":
        setMsg("メールアドレスが正しくありません。");
        break;
      case "Firebase: Error (auth/missing-password).":
        setMsg("パスワードが入力されていません。");
        break;
      case "Firebase: Error (auth/user-not-found).":
        setMsg("ユーザーが見つかりませんでした。");
        break;
      case "Firebase: Error (auth/wrong-password).":
        setMsg("パスワードが間違っています。");
        break;
      default:
        setMsg("");
    }
  };

  return (
    <div>
      <Button
        style={{
          width: 220,
          height: 50,
          margin: "10px 10px 10px 10px",
        }}
        color="primary"
        onClick={() => {
          handleSignIn();
          handleErrorMessage();
        }}
      >
        サインイン
      </Button>
      <p>{msg}</p>
    </div>
  );
};

export function SignIn(props) {
  const [error, setErr] = [""];
  console.log(props.email, props.password);
  const [msg, setMsg] = [""];

  return (
    <div>
      <Button
        style={{
          width: 220,
          height: 50,
          margin: "10px 10px 10px 10px",
        }}
        color="primary"
        onClick={() => {
          useEffect(async () => {
            await signIn(props.email, props.password).catch((error) => {
              setErr(error.message);
            });
            handleErr(error);
          });
        }}
      >
        サインイン
      </Button>
      <p>{msg}</p>
    </div>
  );
}
function passReset(email) {
  passResetToFirebase(email).then(() => {
    <Routing dest="/" />;
  });
}
export function PassReset(props) {
  return (
    <div>
      <Button
        style={{
          width: 220,
          height: 50,
          margin: "10px 10px 10px 10px",
        }}
        color="primary"
        onClick={() => passReset(props.email)}
      >
        パスワードのリセット
      </Button>
    </div>
  );
}
