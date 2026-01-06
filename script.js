(function(){
  const form = document.getElementById('login-form');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const toggle = document.getElementById('toggle-password');
  const msg = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');

  function setMessage(text, type){
    msg.textContent = text;
    msg.className = type === 'error' ? 'vis-error' : type === 'success' ? 'vis-success' : '';
  }

  toggle.addEventListener('click', ()=>{
    const t = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', t);
    toggle.textContent = t === 'text' ? 'Hide' : 'Show';
    toggle.setAttribute('aria-pressed', t === 'text');
  });

  function validate(){
    if(!email.value){ setMessage('Please enter your email.', 'error'); email.focus(); return false }
    // simple email pattern check
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!re.test(email.value)){ setMessage('Please enter a valid email address.', 'error'); email.focus(); return false }
    if(!password.value || password.value.length < 6){ setMessage('Password must be at least 6 characters.', 'error'); password.focus(); return false }
    setMessage('', '');
    return true
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!validate()) return;
    submitBtn.disabled = true; submitBtn.textContent = 'Signing in...'; setMessage('','');
    // mock async auth
    setTimeout(()=>{
      // demo: accept any credentials where password is 'password' or length >=6 (you can change)
      if(password.value === 'password' || password.value.length >= 6){
        setMessage('Signed in successfully — demo only.', 'success');
        // store a mock token when remember is checked
        if(document.getElementById('remember').checked){ localStorage.setItem('demo_token','logged-in'); }
        submitBtn.textContent = 'Signed in';
      } else {
        setMessage('Invalid credentials.','error');
        submitBtn.disabled = false; submitBtn.textContent = 'Sign in';
      }
    }, 800);
  });
})();