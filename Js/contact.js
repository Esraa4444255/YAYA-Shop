(function(){
  if(window.emailjs) {
    emailjs.init("oC4uck4mYQLYIWS8R"); 
  }
})();

document.addEventListener("DOMContentLoaded", function(){
  const form = document.getElementById("contact-form");
  const sendBtn = document.getElementById("send-btn");
  const sendingEl = document.getElementById("sending");
  const toast = document.getElementById("toast");

  function showToast(text, type = 'success', timeout = 2500){
    toast.textContent = text;
    toast.className = `show ${type}`;
    setTimeout(()=> toast.className = '', timeout);
  }
  function validateForm() {
    let ok = true;
    form.querySelectorAll('[required]').forEach(inp=>{
      if(!inp.value || inp.value.trim() === '') {
        inp.classList.add('is-invalid');
        ok = false;
      } else inp.classList.remove('is-invalid');
    });
    return ok;
  }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!validateForm()) {
    showToast('Please fill required fields', 'error');
    return;
    }

    const name = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const phone = document.getElementById('c-phone').value.trim();
    const message = document.getElementById('c-message').value.trim();

    sendBtn.disabled = true;
    sendingEl.style.display = 'inline-block';

    const serviceId = "service_odcd4v7";
    const templateId = "template_9j8zp0i"; 

    const templateParams = {
      name: name,
      email: email,
      phone: phone,
      message: message
    };

    emailjs.send(serviceId, templateId, templateParams)
      .then(()=>{
        sendBtn.disabled = false;
        sendingEl.style.display = 'none';
        form.reset();
        showToast('Message sent — thank you ❤️', 'success');
      })
      .catch((err)=>{
        console.error('EmailJS error:', err);
        sendBtn.disabled = false;
        sendingEl.style.display = 'none';
        showToast('Failed to send. Try again later', 'error');
      });
  });
});
