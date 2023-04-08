import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { toast } from "react-toastify"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"

const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
}

export default function Auth({setActive}) {
    const [state, setState] = useState(initialState);
    const [signUp, setSignUp] = useState(false);

    const {email, password, firstName, lastName, confirmPassword} = state;

    const navigate = useNavigate()

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const handleAuth = async (e) => {
        e.preventDefault();
        if(!signUp) {
            if(email && password) {
                const {user} = await signInWithEmailAndPassword(auth, email, password)
                setActive("home")
            } else {
                if (password !== confirmPassword) {
                    return toast.error("Tous les champs sont obligatoires")
                }
            }
        } else {
            if(password !== confirmPassword) {
                return toast.error("Les mots de passe ne correspondent pas")
            }
            if(firstName && lastName && email && password) {
                const {user} = await createUserWithEmailAndPassword(auth, email, password)
                await updateProfile(user,  {displayName: `${firstName} ${lastName}`})
                setActive("home")
            } else {
                return toast.error("Tous les champs sont obligatoires")
            }
        }
        navigate("/")
    }

    return(
        <div className="container-fluid mb-4">
            <div className="container">
                <div className="col-12 text-center">
                    <div className="text-center heading py-2">
                        {!signUp ? "Sign-In" : "Sign-Up"}
                    </div>
                </div>
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-10 col-md-8 col-lg-6">
                        <form className="row" onSubmit={handleAuth}>
                            {signUp && (
                                <>
                                    <div className="col-6 py-3">
                                    <input 
                                        type="text" 
                                        className="form-control input-text-box" 
                                        placeholder="Prénom"
                                        name="firstName"
                                        value={firstName}
                                        onChange={handleChange}  
                                    />
                                    </div>
                                    <div className="col-6 py-3">
                                    <input 
                                        type="text" 
                                        className="form-control input-text-box" 
                                        placeholder="Nom"
                                        name="lastName"
                                        value={lastName}
                                        onChange={handleChange}  
                                    />
                                    </div>
                                </>
                            )}
                            <div className="col-12 py-3">
                                <input 
                                    type="email" 
                                    className="form-control input-text-box" 
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}  
                                />
                            </div>
                            <div className="col-12 py-3">
                                <input 
                                    type="password" 
                                    className="form-control input-text-box" 
                                    placeholder="Mot de passe"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}  
                                />
                            </div>
                            {signUp && (
                                <>
                                    <div className="col-12 py-3">
                                    <input 
                                        type="password" 
                                        className="form-control input-text-box" 
                                        placeholder="Confirmez le mot de passe"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleChange}  
                                    />
                                    </div>
                                </>
                            )}
                            <div className="col-12 py-3 text-center">
                                <button 
                                    className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`}
                                    type="submit"
                                >
                                    {!signUp ? "Connexion" : "Inscription"}
                                </button>
                            </div>
                        </form>
                        <div>
                            {!signUp ? (
                                <>
                                    <div className="text-center justify-content-center mt-2 pt-2">
                                        <p className="small fw-bold mt-2 pt-1 mb-0">
                                            Toujours pas de compte ?&nbsp;
                                            <span 
                                                className="link-danger" 
                                                style={{textDecoration: "non", cursor: "pointer"}}
                                                onClick={() => setSignUp(true)}
                                            >
                                                Inscription
                                            </span>
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-center justify-content-center mt-2 pt-2">
                                        <p className="small fw-bold mt-2 pt-1 mb-0">
                                            Vous avez déjà un compte ?&nbsp;
                                            <span 
                                                style={{
                                                    textDecoration: "non", 
                                                    cursor: "pointer", 
                                                    color: "#298af2"
                                                }}
                                                onClick={() => setSignUp(false)}
                                            >
                                                Connexion
                                            </span>
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}