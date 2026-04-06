import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import "../index.css"
import axios from "axios";


const initialValue = {
    email: "",
    password: "",
    terms: false
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validatePassword = /.{4,}/;

 const errorMessages = {
    email: "Please enter a valid email address.",
    password: "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.",
    terms: "You must accept the terms and conditions to proceed."
};

export default function Login() {
    const [formData, setFormData] = useState(initialValue);
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        terms: false
    });
    const history = useHistory();
    useEffect(() => {
        if (validateEmail(formData.email) && formData.terms && validatePassword.test(formData.password)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [formData]);

    const handleChange = (event) => {
        let { type, name, checked, value } = event.target;
        value = type === "checkbox" ? checked : value;
        setFormData({ ...formData, [name]: value });
        if (name === "email") {
            if (validateEmail(value)) {
                setErrors({ ...errors, [name]: false });
            } else {
                setErrors({ ...errors, [name]: true })
            }

        }
        if (name === "password") {
            if (validatePassword.test(value)) {
                setErrors({ ...errors, [name]: false });
            } else {
                setErrors({ ...errors, [name]: true });
            }
        }
        if (name === "terms") {
            if (value) {
                setErrors({ ...errors, [name]: false })
            } else {
                setErrors({ ...errors, [name]: true })
            }

        };
    };

        const handleSubmit = (event) => {
            event.preventDefault();
            if (!isValid) return;
            axios.get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
                .then((response) => {
                    const user = response.data.find((item) =>
                        item.password && item.email && item.password === formData.password && item.email === formData.email
                    );
                    if (user) {
                        setFormData(initialValue);
                        history.push('/Success')
                    }
                });

        };


        return (
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                        onChange={handleChange}
                        value={formData.email}
                        invalid={errors.email}
                        data-cy="email-input"

                    />
                    <FormFeedback data-cy="error-msg">
                        {errorMessages.email}
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        placeholder="Enter your password "
                        type="password"
                        onChange={handleChange}
                        value={formData.password}
                        invalid={errors.password}
                        data-cy="password-input"

                    />
                    <FormFeedback data-cy="error-msg">
                        {errorMessages.password}
                    </FormFeedback>
                </FormGroup>

                <FormGroup check>
                    <Input
                        type="checkbox"
                        name="terms"
                        id="terms"
                        onChange={handleChange}
                        checked={formData.terms}
                        invalid={errors.terms}
                        data-cy="terms-input"

                    />{' '}
                    <Label check htmlFor="terms">
                        I agree to terms of service and privacy policy
                    </Label>
                    <FormFeedback data-cy="error-msg">
                        {errorMessages.terms}
                    </FormFeedback>
                </FormGroup>
                <FormGroup className="text-center p-4">
                    <Button color="primary" disabled={!isValid} data-cy="submit-button">
                        Sign In
                    </Button>
                </FormGroup>
            </Form>
        )
    }