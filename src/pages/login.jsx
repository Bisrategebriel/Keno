import { useEffect, useRef, useState } from "react";
import { LoginAction } from "../stores/authSlice/authAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Notification = ({ message, type }) => {
  if (type === "error") {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

const Login = () => {
  const passWordRef = useRef();
  const usernameRef = useRef();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const handleLogin = async () => {
    const username = usernameRef.current.value;
    const password = passWordRef.current.value;

    setDisabled(true);
    try {
      const response = await dispatch(LoginAction({ username, password }));
      if (response.payload && response.payload.isActive === true) {
        localStorage.setItem("token", response.payload.token);
        window.location.href = "/";
        setDisabled(false);
      } else {
        setDisabled(false);
        Notification({
          message: "Invalid Username or Password",
          type: "error",
        });
      }
    } catch (error) {
      setDisabled(false);
    }
  };

  return (
    <div className="grid w-full min-h-screen place-items-center">
      <div
        className="flex flex-col items-center gap-3 px-5 pt-5 bg-black pb-9 rounded-2xl -mt-60"
        style={{ boxShadow: "0 0 20px #5cb85c" }}
      >
        <h1 className="text-[1.8rem] text-green-600 mb-5">Keno Game Login</h1>

        <input
          className="border-[1px] w-[180px] border-green-500 rounded-md px-1 py-1"
          placeholder="Username"
          ref={usernameRef}
          type={"text"}
        />
        <input
          className="border-[1px] w-[180px] border-green-500 rounded-md px-1 py-1"
          placeholder="Password"
          ref={passWordRef}
          type={"password"}
        />

        <button
          className="px-3 py-2 text-white bg-green-500 rounded-md"
          onClick={handleLogin}
          disabled={disabled}
          style={{
            backgroundColor: disabled ? "" : "",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default Login;
