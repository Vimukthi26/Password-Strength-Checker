# Password Vault 🔐

A modern, highly interactive, and feature-rich Password Strength Checker and Secure Password Generator built with vanilla Web Technologies.

## 🚀 Features

### Core Capabilities
* **Real-time Password Analysis**: As you type, the tool checks your password against multiple security criteria (Uppercase, Lowercase, Numbers, Symbols, Length).
* **Strength Score & Progress Bar**: Visual feedback with a score out of 100 and a 5-level progress bar (Very Weak to Very Strong).

### Advanced Security Metrics
* **Entropy Calculation**: Calculates the mathematical entropy (in bits) of your password based on the character pool size and length.
* **Crack Time Estimation**: Estimates how long it would take a computer capable of 10 billion guesses per second to crack your password.
* **Common Password Detection**: Warns you if you are using one of the top most common passwords (e.g., "123456", "password").
* **Data Breach Check (Have I Been Pwned)**: Uses the *Have I Been Pwned* API (k-Anonymity model) to securely check if your password has been exposed in a known data breach.

### Smart Password Generator
* **Random Characters**: Generate traditional passwords with a customizable length slider and character toggles (Uppercase, Lowercase, Numbers, Symbols).
* **Memorable Passphrases (Diceware)**: Generate highly secure but easy-to-remember passphrases (e.g., "Apple-Rocket-Pizza-84") using a curated wordlist.

### Interactive UI/UX
* **Dark Mode & Light Mode**: Seamlessly toggle between dark and light themes with responsive CSS variables.
* **Interactive Mascot**: A fun, dynamic mascot (🙈/🐵/🐒) that reacts to whether you are typing, viewing, or hiding the password.
* **Strength History Chart**: Keeps a visual history of the strength of the passwords you've checked or generated during your session.
* **Copy to Clipboard**: One-click copy for generated passwords with toast notifications.

## 🛠️ Technologies Used
* **HTML5**: Semantic structure.
* **CSS3**: Modern styling, Flexbox/Grid, CSS Variables (Custom Properties), animations, glassmorphism UI.
* **JavaScript (Vanilla)**: DOM manipulation, event debouncing, cryptography (`window.crypto.getRandomValues`), API integration (Fetch), and SHA-1 hashing (`crypto.subtle.digest`).

## ⚙️ How to Run

Since this is a client-side only application, no installation or build tools are required!

1. Clone the repository:
   ```bash
   git clone https://github.com/Vimukthi26/Password-Strength-Checker.git
   ```
2. Navigate to the project folder.
3. Open `index.html` in your favorite modern web browser.

## 🔒 Privacy & Security Note

This tool evaluates your passwords completely offline in your browser (using JavaScript). The only time it communicates with the internet is to check the *Have I Been Pwned* API, during which it **only sends the first 5 characters** of the SHA-1 hash of your password. Your actual password is never transmitted over the network.

---
**Created by:** Chamodh Vimukthi - ITBNM-2313-0082 (NMC Horizon Campus)
