import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import * as emailjs from 'emailjs-com';

const ContactForm = () => {
    const [contactInfo, setContactInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        description: ''
    })

    const [showAlert, setShowAlert] = useState(false)

    const onDismiss = () => setShowAlert(false)

    const handleChange = e => {
        console.log(e.target.name, e.target.value)
        setContactInfo({
            ...contactInfo,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = e => {
        e.preventDefault()
        setContactInfo({...contactInfo})

        const templateParams = {
            from_name: contactInfo.email,
            to_name: "mlazzell17@gmail.com",
            message: contactInfo.description,
            user_firstName: contactInfo.firstName,
            user_lastName: contactInfo.lastName,
            user_email: contactInfo.email,
            reply_to: contactInfo.email,
            user_phone: contactInfo.phone,
        }

        emailjs.send(
            "service_pz1w5tq",
            "contact_form",
            templateParams,
            "user_MO9TDXHMVlIbTHlTR1xTG")
            .then(res => {
                console.log(res.text)
                setShowAlert(true)
            }, (err) => {
                console.log(err.text)
            })

        setContactInfo({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            description: ''
        })
    }

    return (
        <div className='contactFormDiv'>
            <h2>Contact Us</h2>
            {showAlert &&
                <Alert color='danger' isOpen={showAlert} toggle={onDismiss}>
                    Contact form successfully submitted
                </Alert>
            }
            <Form className='contactForm' onSubmit={submitForm}>
                <FormGroup className='nameInfo'>
                    <Input
                     required
                     type="firstName"
                     name="firstName"
                     id="firstName"
                     placeholder="First Name*"
                     value={contactInfo.firstName}
                     onChange={handleChange}
                    />
                    <Input 
                     required
                     type="lastName"
                     name="lastName"
                     id="lastName"
                     placeholder="Last Name*"
                     value={contactInfo.lastName}
                     onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup className='contactInfo'>
                    <Input
                    required
                     type="email"
                     name="email"
                     id="email"
                     placeholder="Email Address*"
                     value={contactInfo.email}
                     onChange={handleChange}
                    />
                    <Input
                     type="phone"
                     name="phone"
                     id="phone"
                     placeholder="Phone Number"
                     value={contactInfo.phone}
                     onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                     type="textarea"
                     name="description"
                     id="description"
                     placeholder="Comments"
                     value={contactInfo.description}
                     onChange={handleChange}
                    />
                </FormGroup>
                <Button className='submitBtn'>Submit</Button>
        </Form>
      </div>
    )
}

export default ContactForm;