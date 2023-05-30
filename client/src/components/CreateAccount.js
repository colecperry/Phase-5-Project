import React, {useState, useEffect} from "react"
import { Button, Form } from 'semantic-ui-react'
import { Navigate, useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { userState } from "../recoil/atoms"
import { FaDog } from 'react-icons/fa';

function CreateAccount() {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const setUser = useSetRecoilState(userState)
    const navigate = useNavigate()


    const handleSubmit = async () => {
        // event.preventDefault();
    
        let newUser = {
            user_name: userName,
            user_image: '',
            user_email: email,
            _password_hash: password,
            user_phone_number: phoneNumber,
            user_address: address,
            user_city: city,
            user_state: state,
            user_zip_code: zipCode
        };

        // console.log(newUser);
    
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
    
            if (response.ok) {
                const user = await response.json();
                setUser(user);
                console.log(user)
                // Redirect to the desired location using the `Navigate` component
                navigate("/home");
            } else {
                throw new Error('Failed to create user');
            }
    };


    return (
        <div className="container">
            <h1 style={{
            paddingTop:"50px",
            paddingBottom:"50px",
            fontSize:"3.5rem",
            textAlign: "center",
            fontFamily: 'Verdana, sans-serif'
            }}>Doggio
            <FaDog/>
            </h1> 
            <h2 style={{
            paddingTop:"0px",
            paddingBottom:"0px",
            fontSize:"2rem",
            textAlign: "center",
            fontFamily: 'Verdana, sans-serif'
            }}>Create Account
            </h2> 
        <div className='loginContainer'>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <Form.Field className="mb-3" controlId="formBasicName">
                    <label>Full Name</label>
                    <input value={userName} onChange={e => setUserName(e.target.value)} placeholder="Enter full name" />
                </Form.Field>
                <Form.Field className="mb-3" controlId="formBasicEmail">
                    <label>Email address</label>
                    <input type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Field>
                <Form.Field className="mb-3" controlId="formBasicPassword">
                    <label>Password</label>
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Field>
                <Form.Field className="mb-3" controlId="formBasicPhoneNumber">
                    <label>Enter Phone Number</label>
                    <input placeholder="Phone number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                </Form.Field>
                <Form.Field className="mb-3" controlId="formBasicAddress">
                    <label>Enter Address</label>
                    <input type="text" placeholder="Enter Address" value={address} onChange={e => setAddress(e.target.value)} />
                </Form.Field>
                <Form.Field className="mb-3" controlId="formBasicCity">
                    <label>Enter City</label>
                    <input type="text" placeholder="Enter City" value={city} onChange={e => setCity(e.target.value)} />
                </Form.Field>
                <Form.Field className="mb-3" controlId="formBasicState">
                    <label>Enter State</label>
                    <input type="text" placeholder="Enter State" value={state} onChange={e => setState(e.target.value)} />
                </Form.Field>
                <Form.Field className="mb-3" controlId="formBasicZipCode">
                    <label>Enter Zip Code</label>
                    <input type="text" placeholder="Enter Zip Code" value={zipCode} onChange={e => setZipCode(e.target.value)} />
                </Form.Field>
                <div style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
                    <Button variant="secondary" type="submit"
                    style={{
                        marginBottom: '20px'
                    }}>
                    SignUp
                    </Button>
                </div>
            </Form>
            </div>
        </div>
        );
}

export default CreateAccount;