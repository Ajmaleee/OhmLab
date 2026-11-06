let formData = { name: '', email: '', subject: '', message: '' };
let submitted = false;

function handleSubmit(e) {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
    alert('Please fill in all fields');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert('Please enter a valid email address');
    return;
  }

  submitted = true;
  renderForm();

  setTimeout(() => {
    formData = { name: '', email: '', subject: '', message: '' };
    submitted = false;
    renderForm();
  }, 5000);
}

function renderForm() {
  const container = document.getElementById('formContainer');
  if (submitted) {
    container.innerHTML = `
      <div class="success-message">
        <p>Thank you for your message! We'll get back to you soon.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <form class="contact-form" onsubmit="handleSubmit(event)">
      <div class="form-group">
        <label>Your Name:</label>
        <input type="text" value="${formData.name}" onchange="formData.name=this.value" placeholder="Enter your full name" />
      </div>
      <div class="form-group">
        <label>Your Email:</label>
        <input type="email" value="${formData.email}" onchange="formData.email=this.value" placeholder="Enter your email address" />
      </div>
      <div class="form-group">
        <label>Subject:</label>
        <input type="text" value="${formData.subject}" onchange="formData.subject=this.value" placeholder="What is this about?" />
      </div>
      <div class="form-group">
        <label>Message:</label>
        <textarea rows="6" onchange="formData.message=this.value" placeholder="Write your message here...">${formData.message}</textarea>
      </div>
      <button type="submit" class="btn-primary" style="width: 100%;">Send Message</button>
    </form>
  `;
}

function renderContact() {
  const main = document.getElementById('main');
  if (!main) return;

  main.innerHTML = `
    <div class="legal-page">
      <h1>Contact Us</h1>
      <p>
        We'd love to hear from you! Whether you have questions, suggestions, found a bug,
        or just want to share feedback, feel free to reach out.
      </p>

      <div class="contact-info-box">
        <h2>Contact Information</h2>
        <div class="contact-info-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <span><strong>Email:</strong> ajmalsworkshop@gmail.com</span>
        </div>
        <div class="contact-info-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span><strong>Phone:</strong> +91 9495050785</span>
        </div>
        <div class="contact-info-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span><strong>Location:</strong> Kerala, India</span>
        </div>
        <div class="contact-info-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span><strong>Creator:</strong> Ajmal Ali A</span>
        </div>
      </div>

      <div class="ad-slot" id="container-599b0f251b4dddca60e7fc09e25a632f"></div>

      <h2>Send Us a Message</h2>
      <p>Fill out the form below and we'll get back to you as soon as possible.</p>
      <div id="formContainer"></div>

      <div style="margin-top: 2rem;">
        <h2>What You Can Contact Us About</h2>
        <ul>
          <li><strong>Bug Reports:</strong> Found an error in a calculation or the website? Let us know!</li>
          <li><strong>Feature Requests:</strong> Have an idea for a new calculator or feature?</li>
          <li><strong>Educational Use:</strong> Teachers interested in using OhmLab in their classes</li>
          <li><strong>General Questions:</strong> Questions about how to use the calculators</li>
          <li><strong>Feedback:</strong> Suggestions for improvements or general feedback</li>
        </ul>
      </div>

      <div class="ad-slot" id="container-599b0f251b4dddca60e7fc09e25a632f"></div>
    </div>
  `;

  document.title = 'Contact Us - OhmLab';
  setMeta('description', "Get in touch with OhmLab. We'd love to hear your feedback, suggestions, or questions.");

  renderForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderContact);
} else {
  renderContact();
}
