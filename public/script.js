document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements ---
    const navHome = document.getElementById('nav-home');
    // Correctly select the Login and Register buttons from the header (they are now removed from HTML header)
    // These variables will correctly be null, and the if(navLogin) checks will prevent errors.
    const navLogin = document.getElementById('nav-login'); 
    const navRegister = document.getElementById('nav-register');
    const languageSelector = document.getElementById('language-selector');

    const registerPageSection = document.getElementById('register-page-section');
    const loginPageSection = document.getElementById('login-page-section');

    // --- Register Page Specific Elements ---
    const roleItems = document.querySelectorAll('.role-item');
    const roleGrp = document.getElementById('role-grp');
    const formBox = document.getElementById('form-box');
    const initialMessage = document.getElementById('initial-message');

    const registerForms = {
        'farmer-option': document.getElementById('farmer-form'),
        'labourer-option': document.getElementById('labourer-form'),
        'vendor-option': document.getElementById('vendor-form'),
        'industry-option': document.getElementById('industry-form'),
        'consultancy-option': document.getElementById('consultancy-form') // NEW: Consultancy form
    };

    // --- Login Page Specific Elements ---
    const loginForm = document.getElementById('login-form');
    const loginToRegisterLink = document.getElementById('login-to-register');

    // --- Consultancy Form Specific Elements (for dynamic fields) ---
    const consultantOwnEquipment = document.getElementById('consultant-own-equipment');
    const equipmentTypeDiv = document.getElementById('equipment-type-div');


    // --- Function to switch between sections ---
    function showSection(sectionToShowId) {
        // Hide all page sections
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.add('hidden');
        });

        // Show the requested section
        const sectionToShow = document.getElementById(sectionToShowId);
        if (sectionToShow) {
            sectionToShow.classList.remove('hidden');
            // Reset scroll to top of the main content area for better UX
            document.getElementById('dynamic-content-area').scrollTop = 0; 
        }

        // Reset register page state if navigating away from it (e.g., from Register to Login)
        if (sectionToShowId !== 'register-page-section') {
            roleGrp.classList.remove('grp-compact'); // Un-compact the role group
            initialMessage.classList.remove('hidden'); // Show initial message
            Object.values(registerForms).forEach(form => form.classList.add('hidden')); // Hide all register forms
            formBox.classList.remove('form-show'); // Hide the form box animation
            
            // Reset active/hover states for all role items
            roleItems.forEach(opt => {
                opt.classList.remove('item-active');
                opt.style.borderColor = ''; // Clear inline border style
            });
        }
    }

    // --- Initial Load: Show register page by default ---
    showSection('register-page-section');

    // --- Navigation Event Listeners ---
    if (navHome) {
        navHome.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            showSection('register-page-section'); // Go to register page (our "home")
        });
    }

    // These buttons are removed from HTML header, so these listeners won't fire but won't cause errors.
    if (navLogin) { 
        navLogin.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('login-page-section');
        });
    }

    if (navRegister) { 
        navRegister.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('register-page-section');
        });
    }

    // Link from login form to register page
    if (loginToRegisterLink) {
        loginToRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('register-page-section');
        });
    }

    // --- Language Selector Event Listener (Global) ---
    if (languageSelector) {
        languageSelector.addEventListener('change', (event) => {
            console.log('Language changed to:', event.target.value);
            // In a real application, you would implement logic here to change the page's language
        });
    }

    // --- Register Page Specific Logic ---
    roleItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log(`Role item clicked: ${item.id}`);

            // Remove 'item-active' class and reset styles from all role items
            roleItems.forEach(opt => {
                opt.classList.remove('item-active');
                opt.style.borderColor = ''; // Clear inline border style
            });

            // Add the 'grp-compact' class to the role group to trigger its shrinking and repositioning animation
            roleGrp.classList.add('grp-compact');
            console.log('Added grp-compact to role-grp'); // Debugging log

            // Add the 'item-active' class to the clicked item and set its specific border color
            item.classList.add('item-active');
            // Dynamically set border color based on the selected role (unified green for most, distinct for new)
            if (item.id === 'farmer-option' || item.id === 'labourer-option' || item.id === 'vendor-option' || item.id === 'industry-option') {
                item.style.borderColor = '#16A34A'; // Tailwind green-600 for active border
            } else if (item.id === 'consultancy-option') {
                item.style.borderColor = '#34D399'; // A slightly different green for consultancy
            }


            // Hide the initial "Please select your role" message
            if (initialMessage) {
                initialMessage.classList.add('hidden');
            }

            // Hide all registration forms
            Object.values(registerForms).forEach(form => {
                form.classList.add('hidden');
            });

            const selectedForm = registerForms[item.id];
            if (selectedForm) {
                // Ensure form box is ready for the 'form-show' class transition
                formBox.classList.remove('form-show');
                // A small delay allows CSS transitions to reset before re-adding 'form-show'
                setTimeout(() => {
                    selectedForm.classList.remove('hidden'); // Make the specific form visible
                    formBox.classList.add('form-show'); // Trigger the form box's fade-in/slide-up
                    console.log('Added form-show to form-box, displayed form:', selectedForm.id); // Debugging log
                }, 100); // Adjust delay as needed for a smoother animation
            }
        });
    });

    // --- Form Submission Handlers (Register Forms) ---
    Object.values(registerForms).forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default browser form submission
            const formData = new FormData(event.target); // Get form data
            const data = {};
            // Convert form data to a plain JavaScript object
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            console.log(`Register Form Submitted for ${event.target.id}:`, data);
            
            const messageBox = document.createElement('div');
            messageBox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            messageBox.innerHTML = `
                <div class="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto">
                    <p class="text-lg font-semibold text-gray-800 mb-4">Registration form submitted!</p>
                    <p class="text-gray-600 mb-4">Check the console for submitted data.</p>
                    <button id="close-message" class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200 ease-in-out">Close</button>
                </div>
            `;
            document.body.appendChild(messageBox);

            document.getElementById('close-message').addEventListener('click', () => {
                messageBox.remove();
            });
        });
    });

    // --- Login Form Submission Handler ---
    if (loginForm) { // Ensure loginForm exists before adding listener
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            console.log('Login attempt:', { username, password });

            const messageBox = document.createElement('div');
            messageBox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            messageBox.innerHTML = `
                <div class="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto">
                    <p class="text-lg font-semibold text-gray-800 mb-4">Login attempt received!</p>
                    <p class="text-gray-600 mb-4">Username: ${username}</p>
                    <p class="text-gray-600 mb-4">Password: ${'*'.repeat(password.length)}</p>
                    <p class="text-gray-600 mb-4"> (In a real app, this would be authenticated)</p>
                    <button id="close-message" class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200 ease-in-out">Close</button>
                </div>
            `;
            document.body.appendChild(messageBox);

            document.getElementById('close-message').addEventListener('click', () => {
                messageBox.remove();
            });
        });
    }

    // --- Consultancy Form Specific Logic ---
    if (consultantOwnEquipment) {
        consultantOwnEquipment.addEventListener('change', (event) => {
            if (event.target.value === 'yes') {
                equipmentTypeDiv.classList.remove('hidden');
            } else {
                equipmentTypeDiv.classList.add('hidden');
            }
        });
    }
});
