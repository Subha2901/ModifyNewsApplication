import React, { useState, useRef } from 'react';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import emailjs from '@emailjs/browser';

export default function ContactUs(props) {
    const form = useRef();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const { data: countries } = countryList();
    const [feedback, setFeedback] = useState({
        fname: '',
        lname: '',
        address: '',
        email: '',
        note: ''
    })
    

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_e32hvtv', 'template_0pnafir', form.current, 'Wlz9hWbi1v9Tuuy_b')
            .then((result) => {
                console.log(result.text);
                props.showAlert('Feedback submitted sucessfully', 'success')
            }, (error) => {
                console.log(error.text);
                props.showAlert("Feedback can't be submitted", 'error')
            });
    };

    const handleChange = function (event) {

        const { name, value } = event.target;
        console.log(name, value);

        setFeedback(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    const countryOptions = countries.map((country) => ({
        value: country.value,
        label: country.label,
    }));

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
    };

    let styles = {
        option: (provided, state) => ({
            ...provided,
            fontWeight: state.isSelected ? "bold" : "normal",
            color: "#212529"
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: '#212529'
        })
    };

    console.log(feedback);

    return (
        <div style={{ color: 'white', display: 'flex', justifyContent: 'center', padding: '4%' }}>

            <div className="col-md-7 col-lg-8" style={{backgroundColor: 'black', padding: '2% 10%', borderRadius: '10%' }}>
                <h4 className="mb-3" style={{ textAlign: 'center', fontFamily: 'cursive', fontWeight: '700', fontSize: '2rem' }}>Share your feedback with us</h4>
                <form ref={form} onSubmit={sendEmail} className="needs-validation" noValidate data-bs-theme="dark" style={{ paddingTop: '20px' }}>
                    <div className="row g-3">
                        <div className="col-sm-6">
                            <label htmlFor="firstName" className="form-label">First name</label>
                            <input value={feedback.fname} onChange={handleChange} name='fname' type="text" className="form-control" id="firstName" placeholder="" required />
                            <div className="invalid-feedback">
                                Valid first name is required.
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="lastName" className="form-label">Last name<span className="text-body-secondary">(Optional)</span></label>
                            <input value={feedback.lname} onChange={handleChange} name='lname' type="text" className="form-control" id="lastName" placeholder="" />
                        </div>

                        <div className="col-12">
                            <label htmlFor="email" className="form-label">Email <span className="text-body-secondary"></span></label>
                            <input value={feedback.email} onChange={handleChange} type="email" name='email' className="form-control" id="email" placeholder="you@example.com" required />
                            <div className="invalid-feedback">
                                Please enter a valid email address.
                            </div>
                        </div>

                        <div className="col-12">
                            <label htmlFor="address" className="form-label">Address<span className="text-body-secondary">(Optional)</span></label>
                            <input value={feedback.address} onChange={handleChange} type="text" name='address' className="form-control" id="address" placeholder="1234 Main St" />
                        </div>

                        <div className="col-md-5">
                            <label htmlFor="country" className="form-label">Country</label>
                            <Select
                                name='country'
                                options={countryOptions}
                                className="form-control"
                                required
                                value={selectedCountry}
                                onChange={handleCountryChange}
                                styles={styles}
                                maxMenuHeight={250}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter your feedback</label>
                            <textarea value={feedback.note} onChange={handleChange} name='note' className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder='Enter your feedback'></textarea>
                        </div>
                    </div>

                    <div className='container' style={{ padding: '30px 0px', textAlign: 'right' }}><button className="btn btn-primary btn-lg" type="submit">SUbmit Feedback</button></div>
                </form>
            </div>
        </div>
    )
}
