import '@popperjs/core/dist/cjs/popper.js';
import '../assets/contactus.css';

function ContactUsPage() {
  return (
    <main className="container mt-5">
        <h1>Contact Us</h1>
        <p>We would love to hear from you. Fill out the form below to get in touch with us.</p>

        <div className="row">
            <div className="col-md-6 contact-form">
                <form action="#" method="POST">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Your Name</label>
                        <input type="text" className="form-control" id="name" name="name" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Your Email</label>
                        <input type="email" className="form-control" id="email" name="email" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea className="form-control" id="message" name="message" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div id="address" className="col-md-6 contact">
                <h4>Address</h4>
                <p>4 Southern Avenue, Feltham, Middlesex, TW14 9ND</p>
                <h4>Phone</h4>
                <p>+447481094940</p>
                <h4>Email</h4>
                <p>jobrack@gmail.com</p>
            </div>
        </div>
    </main>
  );
};

export default ContactUsPage;
