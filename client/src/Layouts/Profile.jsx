import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loggedUser, countContext } from "../context";

// importing functions
import { findUser, updateUserData } from "../scripts/crudFunctions";
import { bagCount } from "../scripts/bagFunctions";

function Profile() {
  const { user, setUser } = useContext(loggedUser);
  const { setCount } = useContext(countContext);
  // state selecting active option
  const [active, setActive] = useState("account");
  const [profileData, setProfileData] = useState(user);
  const [save, setSave] = useState(true);
  const [saveStatus, setSaveStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    generalMsg: "",
    firstNameMsg: "",
    lastNameMsg: "",
    emailMsg: "",
    passwordMsg: "",
  });
  const navigate = useNavigate();

  // styles
  const selected = {
    backgroundColor: "lightgray",
  };

  const errorStyle = {
    border: "1px solid #da3f3f",
    borderRadius: "0.3em",
  };

  const errorMsgStyle = {
    color: "#da3f3f",
    fontSize: "0.8rem",
    paddingLeft: "5px",
  };

  // user orders
  const allOrders =
    user?.orders?.length > 0 ? (
      user.orders.map((order) => {
        return <div className="order-container">{order}</div>;
      })
    ) : (
      <p>
        You don't have any orders, jump back in and{" "}
        <Link to="/">start shopping</Link>
      </p>
    );

  // password Regex
  const passwordRules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isValidPassword = (str) => passwordRules.test(str);

  // alphabetic Regex
  const alpha = /^[a-zA-Z]*$/;
  const isAlpha = (str) => alpha.test(str);

  function validateChanges() {
    // clearing errors from last validation
    setErrorMessage({
      generalMsg: "",
      firstNameMsg: "",
      lastNameMsg: "",
      emailMsg: "",
      passwordMsg: "",
    });

    let errorStatus = {
      generalMsg: "",
      firstNameMsg: "",
      lastNameMsg: "",
      emailMsg: "",
      passwordMsg: "",
    };
    // validating email and password are not empty and valid
    if (
      !profileData.email.includes("@") ||
      !profileData.email.includes(".") ||
      profileData.email.length < 10
    ) {
      errorStatus.emailMsg = "Please enter a valid email address.";
    }
    if (profileData.password.trim(" ").length === 0) {
      errorStatus.passwordMsg = "Please enter a password.";
    } else if (!isValidPassword(profileData.password)) {
      errorStatus.passwordMsg =
        "Password must contain: \n" +
        "Minimum 8 characters\n" +
        "1 uppercase letter\n" +
        "1 lowercase letter\n" +
        "1 number\n" +
        "1 special character";
    }
    if (profileData.firstName.trim(" ").length === 0) {
      errorStatus.firstNameMsg = "Please enter your first name";
    } else if (!isAlpha(profileData.firstName)) {
      errorStatus.firstNameMsg = "Please enter a valid name";
    }

    if (profileData.lastName.trim(" ").length === 0) {
      errorStatus.lastNameMsg = "Please enter your last name";
    } else if (!isAlpha(profileData.lastName)) {
      errorStatus.lastNameMsg = "Please enter a valid name";
    }

    // if firstname, lastname, email and password are valid call updateUserData
    if (
      errorStatus.emailMsg === "" &&
      errorStatus.passwordMsg === "" &&
      errorStatus.firstNameMsg === "" &&
      errorStatus.lastNameMsg === ""
    ) {
      // if changed email address
      if (profileData.email !== user.email) {
        // check if email exists in the database
        findUser(
          `${process.env.REACT_APP_SERVER_URL}/user/${profileData.email}`
        )
          .then((user) => {
            if (user) {
              errorStatus.emailMsg = "This email is already in use.";
              setErrorMessage(errorStatus);
            }
          })
          .catch((error) => {
            errorStatus.generalMsg =
              "There was a problem saving changes, please try again.";
            setErrorMessage(errorStatus);
          });
      }

      if (errorStatus.emailMsg === "") {
        updateUserData(`${process.env.REACT_APP_SERVER_URL}/updateUser`, {
          email: profileData.email.toLowerCase(),
          password: profileData.password,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          id: user.id,
        })
          .then((result) => {
            // success
            setSaveStatus("Your changes has been saved.");
            // set user context
            setUser(user);
          })
          .catch((error) => {
            errorStatus.generalMsg =
              "There was a problem saving changes, please try again.";
            setErrorMessage(errorStatus);
          });
      }
    } else {
      setErrorMessage(errorStatus);
    }
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-options">
        <button
          style={active === "account" ? selected : null}
          className="profile-option-btn"
          onClick={() => setActive("account")}>
          Account
        </button>
        <button
          style={active === "orders" ? selected : null}
          className="profile-option-btn"
          onClick={() => setActive("orders")}>
          Orders
        </button>
        <button
          style={active === "signOut" ? selected : null}
          className="profile-option-btn"
          onClick={() => {
            navigate("/signIn");
            setUser(null);
            setCount(bagCount(null));
          }}>
          Sign out
        </button>
      </div>
      <div className="profile-active-option">
        {active === "account" && (
          <div className="user-info">
            <h3>Account details</h3>
            {errorMessage.generalMsg !== "" && (
              <p style={errorMsgStyle}>{errorMessage.generalMsg}</p>
            )}
            <form>
              <div className="ui-input-container">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={profileData.email}
                  style={errorMessage.emailMsg !== "" ? errorStyle : null}
                  onChange={(e) => {
                    setSave(false);
                    setProfileData({ ...profileData, email: e.target.value });
                  }}
                />
                {errorMessage.emailMsg !== "" && (
                  <p style={errorMsgStyle}>{errorMessage.emailMsg}</p>
                )}
              </div>
              <div className="ui-input-container">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={profileData.password}
                  style={errorMessage.passwordMsg !== "" ? errorStyle : null}
                  onChange={(e) => {
                    setSave(false);
                    setProfileData({
                      ...profileData,
                      password: e.target.value,
                    });
                  }}
                />
                {errorMessage.passwordMsg !== "" && (
                  <p style={errorMsgStyle}>{errorMessage.passwordMsg}</p>
                )}
              </div>
              <div className="ui-input-container">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  type="text"
                  value={profileData.firstName}
                  style={errorMessage.firstNameMsg !== "" ? errorStyle : null}
                  onChange={(e) => {
                    setSave(false);
                    setProfileData({
                      ...profileData,
                      firstName: e.target.value,
                    });
                  }}
                />
                {errorMessage.firstNameMsg !== "" && (
                  <p style={errorMsgStyle}>{errorMessage.firstNameMsg}</p>
                )}
              </div>
              <div className="ui-input-container">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  type="text"
                  value={profileData.lastName}
                  style={errorMessage.lastNameMsg !== "" ? errorStyle : null}
                  onChange={(e) => {
                    setSave(false);
                    setProfileData({
                      ...profileData,
                      lastName: e.target.value,
                    });
                  }}
                />
                {errorMessage.lastNameMsg !== "" && (
                  <p style={errorMsgStyle}>{errorMessage.lastNameMsg}</p>
                )}
              </div>
            </form>
            <button
              disabled={save}
              className="ui-saveBtn"
              onClick={(e) => {
                e.preventDefault();
                validateChanges();
              }}>
              Save changes
            </button>
            <p>{saveStatus}</p>
          </div>
        )}
        {active === "orders" && (
          <div className="user-orders">
            <h3>Orders</h3>
            {allOrders}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
