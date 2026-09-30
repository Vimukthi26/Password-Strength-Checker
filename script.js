document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const passwordInput = document.getElementById('password-input');
    const toggleVisibilityBtn = document.getElementById('toggle-visibility');
    const iconEye = document.querySelector('.icon-eye');
    const iconEyeOff = document.querySelector('.icon-eye-off');
    
    const strengthText = document.getElementById('strength-text');
    const progressBar = document.getElementById('progress-bar');
    
    const requirementItems = document.querySelectorAll('#requirement-list li');
    
    const suggestionsContainer = document.getElementById('suggestions-container');
    const suggestionsList = document.getElementById('suggestions-list');
    
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const toast = document.getElementById('toast');

    // Requirements regex mapping
    const requirements = {
        length: /.{8,}/,
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /[0-9]/,
        special: /[^A-Za-z0-9]/
    };

    // Toggle Password Visibility
    toggleVisibilityBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        
        if (isPassword) {
            iconEye.classList.add('hidden');
            iconEyeOff.classList.remove('hidden');
        } else {
            iconEye.classList.remove('hidden');
            iconEyeOff.classList.add('hidden');
        }
    });

    // Check Password Strength on Input
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        checkPassword(password);
        
        // Enable/disable copy button based on input
        if (password.length > 0) {
            copyBtn.removeAttribute('disabled');
        } else {
            copyBtn.setAttribute('disabled', 'true');
        }
    });

    // Generate Random Password
    generateBtn.addEventListener('click', () => {
        const newPassword = generateStrongPassword();
        passwordInput.value = newPassword;
        // Trigger input event to update strength UI
        passwordInput.dispatchEvent(new Event('input'));
    });

    // Copy Password to Clipboard
    copyBtn.addEventListener('click', () => {
        const password = passwordInput.value;
        if (!password) return;

        navigator.clipboard.writeText(password).then(() => {
            showToast('Password copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy password: ', err);
            showToast('Failed to copy password!');
        });
    });

    function checkPassword(password) {
        let score = 0;
        let metRequirements = 0;
        let suggestions = [];

        // Check each requirement
        Object.keys(requirements).forEach(req => {
            const regex = requirements[req];
            const isValid = regex.test(password);
            
            // Update UI for this requirement
            const listItem = document.querySelector(`li[data-requirement="${req}"]`);
            if (isValid) {
                listItem.classList.remove('invalid');
                listItem.classList.add('valid');
                metRequirements++;
            } else {
                listItem.classList.remove('valid');
                listItem.classList.add('invalid');
            }
        });

        // Determine specific suggestions if password is not empty
        if (password.length > 0) {
            if (!requirements.length.test(password)) suggestions.push("Make it at least 8 characters long.");
            if (!requirements.uppercase.test(password)) suggestions.push("Add an uppercase letter.");
            if (!requirements.lowercase.test(password)) suggestions.push("Add a lowercase letter.");
            if (!requirements.number.test(password)) suggestions.push("Add a number.");
            if (!requirements.special.test(password)) suggestions.push("Add a special character (!@#$%^&* etc.).");
            
            // Additional checks for complexity if base requirements met
            if (metRequirements >= 3 && password.length < 12) {
                suggestions.push("Increase length to 12+ characters for better security.");
            }
        }

        // Calculate Score
        // Base score on met requirements (0 to 5)
        score = metRequirements;
        
        // Extra points for length
        if (password.length >= 12) score += 1;
        
        // Penalize for common patterns (simplified check)
        if (/^[a-zA-Z]+$/.test(password) && password.length > 0) score -= 1; // Only letters
        if (/^[0-9]+$/.test(password) && password.length > 0) score -= 1; // Only numbers
        
        // Clamp score between 0 and 5
        score = Math.max(0, Math.min(5, score));
        
        // If password is empty, reset score
        if (password.length === 0) {
            score = 0;
            suggestions = [];
        }

        updateStrengthUI(score);
        updateSuggestions(suggestions);
    }

    function updateStrengthUI(score) {
        let strengthLabel = 'None';
        let colorVar = 'var(--strength-0)';
        let width = '0%';

        switch (score) {
            case 0:
                if (passwordInput.value.length > 0) {
                    strengthLabel = 'Very Weak';
                    colorVar = 'var(--strength-1)';
                    width = '10%';
                }
                break;
            case 1:
            case 2:
                strengthLabel = 'Weak';
                colorVar = 'var(--strength-2)';
                width = '30%';
                break;
            case 3:
                strengthLabel = 'Medium';
                colorVar = 'var(--strength-3)';
                width = '60%';
                break;
            case 4:
                strengthLabel = 'Strong';
                colorVar = 'var(--strength-4)';
                width = '80%';
                break;
            case 5:
                strengthLabel = 'Very Strong';
                colorVar = 'var(--strength-5)';
                width = '100%';
                break;
        }

        strengthText.textContent = strengthLabel;
        strengthText.style.color = score > 0 ? colorVar : 'var(--text-secondary)';
        
        progressBar.style.width = width;
        progressBar.style.backgroundColor = colorVar;
    }

    function updateSuggestions(suggestions) {
        suggestionsList.innerHTML = '';
        
        if (suggestions.length > 0 && passwordInput.value.length > 0) {
            suggestionsContainer.style.display = 'block';
            suggestions.forEach(suggestion => {
                const li = document.createElement('li');
                li.textContent = suggestion;
                suggestionsList.appendChild(li);
            });
        } else {
            suggestionsContainer.style.display = 'none';
        }
    }

    function generateStrongPassword() {
        const length = 16; // Generate a robust 16 char password by default
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const special = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
        
        const allChars = uppercase + lowercase + numbers + special;
        let password = "";
        
        // Guarantee at least one of each requirement
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += special[Math.floor(Math.random() * special.length)];
        
        // Fill the rest randomly
        for (let i = 4; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        
        // Shuffle the password so the guaranteed chars aren't always at the beginning
        return password.split('').sort(() => 0.5 - Math.random()).join('');
    }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});
