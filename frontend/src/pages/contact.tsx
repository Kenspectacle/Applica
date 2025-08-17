import React from 'react'

function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>Get in touch with us for support or questions about the Job Application Collector.</p>
      
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p><strong>Email:</strong> support@jobcollector.com</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        <p><strong>Address:</strong> 123 Job Street, Career City, CC 12345</p>
      </div>
      
      <div className="contact-form">
        <h2>Send us a Message</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows={5} required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
