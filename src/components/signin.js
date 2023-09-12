import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signInToServer } from "./server";
const signIntoFirebase = async (email, password) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    return idToken;
  } catch (error) {
    console.log(error);
  }
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
    console.log(error);
  }
};
const passReset = async (email) => {
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.log(error);
  }
};
function signUp(email, password) {
  signUpToFirebase(email, password).then((idToken) => {
    signUpToServer(idToken);
  });
  return (
    <div>
      <Button
        style={{
          width: 220,
          height: 50,
          margin: "10px 10px 10px 10px",
        }}
        color="primary"
        onClick={() => signup(email, password)}
      >
        新規登録
      </Button>
    </div>
  );
}

function signIn(email, password) {
  signIntoFirebase(email, password).then((idToken) => {
    signInToServer(idToken);
  });
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
          signin(email, password).then(() => {
            Router.push("/");
          });
        }}
      >
        サインイン
      </Button>
    </div>
  );
}
function passReset(email) {
  passReset(email).then(() => {
    Router.push("/");
  });
  return (
    <div>
      <Button
        style={{
          width: 220,
          height: 50,
          margin: "10px 10px 10px 10px",
        }}
        color="primary"
        onClick={() => passreset(email)}
      >
        パスワードのリセット
      </Button>
    </div>
  );
}

export { signIn, signUp, passReset };
