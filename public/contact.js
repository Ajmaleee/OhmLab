function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';

    setTimeout(() => {
        document.getElementById('contactForm').reset();
        document.getElementById('contactForm').style.display = 'block';
        document.getElementById('successMessage').style.display = 'none';
    }, 5000);
}
