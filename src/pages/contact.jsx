import React from 'react';
import emailjs from 'emailjs-com';
import Navigation from '@/components/Navigation';

export default function Contact() {

    const [messageSended, setMessageSended] = React.useState(null);

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm(`${process.env.NEXT_PUBLIC_SERVICE_ID}`, `${process.env.NEXT_PUBLIC_TEMPLATE_ID}`, e.target, `${process.env.NEXT_PUBLIC_PUBLIC_ID}`)
            .then((result) => {
                console.log(`[${result.text}] Message envoyé !`);
                setMessageSended(true);
                e.target.reset();
            }
                , (error) => {
                    console.log(error.text);
                    setMessageSended(false);
                });
    }

    const messageSuccess = () => {
        return <p>Message sended !</p>
    }

    const messageError = () => {
        return <p>Message not sended !</p>
    }

    return (
        <div className="Contact">
            <Navigation />

            <div className="Form">
                <form id='contact' className="form-container" onSubmit={sendEmail}>
                    <h2>Contact</h2>
                    <p>
                        {messageSended === true ? messageSuccess() : messageSended === false ? messageError() : null}
                    </p>

                    <label htmlFor="name">Full name</label>
                    <input type="text" name="from_name" placeholder='Your full name...' required />

                    <label htmlFor="mail">E-mail</label>
                    <input type="email" name="from_email" placeholder='Your email...' required />

                    <label htmlFor="message">Message</label>
                    <textarea name="message" placeholder='Your message...' required />

                    <input type="submit" value="Send" />
                </form>
            </div>
        </div>
    );

}