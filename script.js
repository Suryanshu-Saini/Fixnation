document.addEventListener('DOMContentLoaded', () => {
    
    // DOM Elements
    const roleRadios = document.querySelectorAll('input[name="role"]');
    const newMechanicSection = document.getElementById('newMechanicSection');
    
    const loginView = document.getElementById('login-view');
    const signupView = document.getElementById('signup-view');
    
    const btnGoToSignup = document.getElementById('btnGoToSignup');
    const btnBackToLogin = document.getElementById('btnBackToLogin');
    
    const uploadZone = document.getElementById('documentUploadZone');
    const fileInput = document.getElementById('fileUpload');
    const fileList = document.getElementById('fileList');

    // 1. Role Toggling Logic
    // Only show the "New here?" section if Mechanic is selected
    const updateRoleView = () => {
        const selectedRole = document.querySelector('input[name="role"]:checked').value;
        if (selectedRole === 'mechanic') {
            newMechanicSection.classList.remove('hidden');
        } else {
            newMechanicSection.classList.add('hidden');
        }
    };

    roleRadios.forEach(radio => {
        radio.addEventListener('change', updateRoleView);
    });
    
    // Initialize view on load
    updateRoleView();

    // 2. View Navigation (Login vs Signup)
    const showSignupView = () => {
        loginView.classList.remove('active');
        signupView.classList.add('active');
    };

    const showLoginView = () => {
        signupView.classList.remove('active');
        loginView.classList.add('active');
    };

    btnGoToSignup.addEventListener('click', showSignupView);
    btnBackToLogin.addEventListener('click', showLoginView);

    // 3. Drag and Drop File Upload Logic
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadZone.addEventListener(eventName, () => {
            uploadZone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, () => {
            uploadZone.classList.remove('dragover');
        }, false);
    });

    // Handle dropped files
    uploadZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    });

    // Handle files selected via file input click
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        const fileArray = Array.from(files);
        fileArray.forEach(file => {
            // Simplified rendering of file names
            const li = document.createElement('li');
            li.className = 'file-item';
            li.innerHTML = `
                <span class="file-name">${truncateFileName(file.name)}</span>
                <button type="button" class="file-item-remove" title="Remove file">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            `;
            
            // Remove functionality
            li.querySelector('.file-item-remove').addEventListener('click', function() {
                li.remove();
            });

            fileList.appendChild(li);
        });
    }

    function truncateFileName(name, maxLength = 25) {
        if (name.length <= maxLength) return name;
        const ext = name.split('.').pop();
        const main = name.substring(0, name.lastIndexOf('.'));
        return main.substring(0, maxLength - ext.length - 3) + '...' + ext;
    }

    // 4. Form Submit Handlers (Mock Login)
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('login-id').value;
        const key = document.getElementById('login-key').value;
        const selectedRole = document.querySelector('input[name="role"]:checked').value;
        
        if (id === 'admin' && key === 'admin123' && selectedRole === 'admin') {
            window.location.href = 'dashboard.html';
        } else if (id === 'mechanic' && key === 'mech123' && selectedRole === 'mechanic') {
            window.location.href = 'mechanic-app.html';
        } else {
            alert('Invalid credentials. Use: admin/admin123 or mechanic/mech123 based on role.');
        }
    });

    document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Verification request submitted successfully.');
        // Optionally switch back to login
        showLoginView();
        document.getElementById('signupForm').reset();
        fileList.innerHTML = '';
    });
});
