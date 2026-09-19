import { useEffect, useState } from "react";
import { supabase } from "./supabase";

function App(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function getSession(){
      const { data } = await supabase.auth.getSession();

      setSession(data.session);
    }

    getSession();
  }, []);

  async function handleSubmit(event: React.FormEvent){
    event.preventDefault();

    setMessage("");

    if (isLogin){
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error){
        setMessage(error.message);
        return;
      }

      setMessage("Successful Login!");
    }else{

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Signup successful! Please check your email to confirm your account.");
      }
    }
  }


  return (
    <div>
      {session ? (
        <div>
          <h1>BeautyList</h1>

          <h2>You're logged in!</h2>
          <p>{session.user.email}</p>
        </div>
      ) : (
        <div>
          <h1>BeautyList</h1>

          <h2>{isLogin ? "Log In" : "Create an Account"}</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                required
              />
            </div>

            <button type="submit">
              {isLogin ? "Log in" : "Sign Up"}
            </button>
          </form>

          {message && <p>{message}</p>}

          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Need an account? Sign Up!"
              : "Already have an account? Log in"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;