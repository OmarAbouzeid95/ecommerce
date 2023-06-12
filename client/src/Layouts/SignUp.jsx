import {useState, useContext} from 'react'
import {Link, useLocation} from 'react-router-dom'
import { loggedUser, previousLoc } from '../context'
import { userSignOperation, findUser } from '../scripts/crudFunctions'


function SignUp({outletHeight}) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState({
                                                        generalMsg: '',
                                                        firstNameMsg: '',
                                                        lastNameMsg: '',
                                                        emailMsg: '',
                                                        passwordMsg: '',                                    
                                                    })           
    
    const {setUser} = useContext(loggedUser)  
    const {prevLoc, setPrevLoc} = useContext(previousLoc)
    const location = useLocation()                                    
    // password Regex                                                    
    const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/                                                    
    const isValidPassword = (str) => passwordRules.test(str)    

    // alphabetic Regex
    const alpha = /^[a-zA-Z]*$/
    const isAlpha = (str) => alpha.test(str)                                            

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
        <div className="signInContainer" style={{minHeight: outletHeight}}>
            <form className="formContainer">
                <h2 style={{textAlign:'center', paddingBottom: '1em'}}>Become a member</h2>
                {errorMessage.generalMsg !== '' && <p style={errorMsgStyle}>{errorMessage.generalMsg}</p>}
                <div className="formInputContainer">
                    <input type="text" placeholder="First name" required style={errorMessage.firstNameMsg === '' ? normalStyle : errorStyle} onChange={(e) => setFirstName(e.target.value)}/>
                    {/* Conditional rendering of firstname error message */}
                    {errorMessage.firstNameMsg !== '' && <p style={errorMsgStyle}>{errorMessage.firstNameMsg}</p>}
                </div>
                <div className="formInputContainer">
                    <input type="text" placeholder="Last name" required style={errorMessage.lastNameMsg === '' ? normalStyle : errorStyle} onChange={(e) => setLastName(e.target.value)}/>
                    {/* Conditional rendering of lastname error message */}
                    {errorMessage.lastNameMsg !== '' && <p style={errorMsgStyle}>{errorMessage.lastNameMsg}</p>}
                </div>
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
                        firstNameMsg: '',
                        lastNameMsg: '',
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
                    }else if(!isValidPassword(password)) {
                        errorStatus.passwordMsg = 'Password must contain: \n' +
                                                  'Minimum 8 characters\n' +
                                                  '1 uppercase letter\n' +
                                                  '1 lowercase letter\n' +
                                                  '1 number\n' +
                                                  '1 special character'
                    }
                    if(firstName.trim(' ').length === 0){
                        errorStatus.firstNameMsg = 'Please enter your first name'
                    }else if(!isAlpha(firstName)){
                        errorStatus.firstNameMsg = 'Please enter a valid name'
                    }

                    if(lastName.trim(' ').length === 0){
                        errorStatus.lastNameMsg = 'Please enter your last name'
                    }else if(!isAlpha(lastName)){
                        errorStatus.lastNameMsg = 'Please enter a valid name'
                    }
                    
                    // if firstname, lastname, email and password are valid call userSignOperation
                    if (errorStatus.emailMsg === '' && errorStatus.passwordMsg === '' && errorStatus.firstNameMsg === '' && errorStatus.lastNameMsg === ''){

                        // check if email exists in the database
                        findUser(`${process.env.REACT_APP_SERVER_URL}/user/${email}`)
                        .then(user => {
                            if(user) {
                                errorStatus.emailMsg = 'This email is already in use.'
                                setErrorMessage(errorStatus)
                            }else {
                                userSignOperation(`${process.env.REACT_APP_SERVER_URL}/signUp`, {email:email.toLowerCase(), password: password, firstName: firstName, lastName: lastName})
                                .then(result => {
                                    // user added
                                    const id = result.insertedId
                                    const user = {
                                        id: id,
                                        firstName: firstName,
                                        lastName: lastName,
                                        email: email,
                                        password: password,
                                        bagItems: [],
                                        orders: []
                                    }
                                    // set user context
                                    setUser(user)
                                    // redirect user to homepage
                                    if(prevLoc !== '') {
                                        location.pathname = prevLoc
                                        setPrevLoc('')
                                    }else{
                                        location.pathname = '/'
                                    }
                                })
                                .catch(error => {
                                    errorStatus.generalMsg = 'There was a problem signing up, please try again.'
                                    setErrorMessage(errorStatus)
                                })
                                    }
                                })
                                .catch(error => {
                                    errorStatus.generalMsg = 'There was a problem signing up, please try again.'
                                    setErrorMessage(errorStatus)
                                })
                                }else {
                                    setErrorMessage(errorStatus)
                                }

                }}>Sign Up</button>
                <p style={{textAlign: 'center', fontSize: '0.9rem'}}>Already a member? <Link to='/signIn'>Sign in</Link></p>
            </form>
        </div>
    );
}

export default SignUp;