import {useState, useContext} from 'react'
import { userSignOperation } from '../scripts/crudFunctions';
import {Link, useLocation} from 'react-router-dom'
import {loggedUser} from '../context'


function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState({
                                                        generalMsg: '',
                                                        emailMsg: '',
                                                        passwordMsg: ''
                                                    })
    const {setUser} = useContext(loggedUser)    
    const loc = useLocation()                                                

    // input border styles
    const normalStyle = {
        borderBottom: '1px solid lightgray'
    }

    const errorStyle = {
        border: '1px solid #da3f3f',
        borderRadius: '0.3em'
    }

    const errorMsgStyle = {color: '#da3f3f', fontSize: '0.8rem', paddingLeft: '5px'}

    return (  
        <div className="signInContainer">
            <form className="formContainer">
                <h4 style={{textAlign:'center'}}>Your account to everything</h4>
                {errorMessage.generalMsg !== '' && <p style={errorMsgStyle}>{errorMessage.generalMsg}</p>}
                <div className="formInputContainer">
                    <input type="email" placeholder="Email address" required style={errorMessage.emailMsg === '' ? normalStyle : errorStyle} onChange={(e) => setEmail(e.target.value)}/>
                    {/* Conditional rendering of error email message */}
                    {errorMessage.emailMsg !== '' && <p style={errorMsgStyle}>{errorMessage.emailMsg}</p>}
                </div>
                <div className="formInputContainer">
                    <input type="text" placeholder="Password" required min="8" max="30" style={errorMessage.passwordMsg === '' ? normalStyle : errorStyle} onChange={(e) => setPassword(e.target.value)}/>
                    {/* Conditional rendering of error password message */}
                    {errorMessage.passwordMsg !== '' && <p style={errorMsgStyle}>{errorMessage.passwordMsg}</p>}
                </div>
                <button className="formSubmitBtn" onClick={(e) => {
                    let errorStatus= {
                        generalMsg: '',
                        emailMsg: '',
                        passwordMsg: ''
                    }
                    e.preventDefault()
                    // validating email and password are not empty and valid
                    if(!email.includes('@') || !email.includes('.') || email.length < 10) {
                        errorStatus.emailMsg = 'Please enter a valid email address.'
                    }
                    if(password.trim(' ').length === 0){
                        errorStatus.passwordMsg = 'Please enter a password.'
                    }
                    
                    // if email and password are valid call userSignOperation
                    if (errorStatus.emailMsg === '' && errorStatus.passwordMsg === ''){
                        userSignOperation(`${process.env.REACT_APP_SERVER_URL}/signIn`, {email:email.toLowerCase(), password: password})
                        .then(result => {
                            // user found
                            if(result){
                                // update loggedUser context
                                const {firstName, lastName, _id, email} = result
                                const user = {
                                    name: firstName + ' ' + lastName,
                                    id: _id,
                                    email: email
                                }
                                setUser(user)
                                /**
                                 * redirect user to homepage ('/')
                                 * using loc.pathname to avoid losing the loggedUser data by using the redirect function
                                 */
                                loc.pathname = '/'
                            }else{
                            // user not found
                            errorStatus.generalMsg = 'Incorrect email or password.'
                            }
                            setErrorMessage(errorStatus)
                        })
                        .catch(error => {
                            errorStatus.generalMsg = 'There was a problem signing in, please try again.'
                            setErrorMessage(errorStatus)
                        })
                    }else {
                        setErrorMessage(errorStatus)
                    }

                }}>Sign in</button>
                <p style={{textAlign: 'center', fontSize: '0.9rem'}}>Not a member? <Link to='signUp'>Sign up</Link></p>
            </form>
        </div>
    );
}

export default SignIn;