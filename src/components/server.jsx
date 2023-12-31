const IPAdress = "192.168.102.196";

const SignUpToServer = async (idToken) => {
  try {
    console.log(idToken);
    const response = await fetch("http://" + IPAdress + ":80/go/SignUp", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: idToken,
      },
      credentials: "include",
    });
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};
const SignInToServer = async (idToken) => {
  try {
    console.log(idToken);
    const response = await fetch("http://" + IPAdress + ":80/go/Login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: idToken,
      },
      credentials: "include",
    });
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};
export { SignUpToServer, SignInToServer };
