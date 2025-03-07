document.addEventListener('DOMContentLoaded', function() {
    const purchaseForm = document.getElementById('purchaseForm');
    const serviceSelect = document.getElementById('service');
    const customServiceDetails = document.getElementById('customServiceDetails');

    // Show/hide custom service details based on selection
    serviceSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customServiceDetails.classList.remove('hidden');
        } else {
            customServiceDetails.classList.add('hidden');
        }
    });

    // Handle form submission
    purchaseForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            service: serviceSelect.value,
            customService: document.getElementById('customService').value,
            paymentMethod: document.querySelector('input[name="payment"]:checked').value,
            email: document.getElementById('email').value,
            discord: document.getElementById('discord').value
        };

        // Redirect to Discord with form data
        const discordInviteLink = 'https://discord.gg/tzE9yWBwqx';
        localStorage.setItem('pendingPurchase', JSON.stringify(formData));
        window.location.href = discordInviteLink;
    });

    // Update payment method details based on selection
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            const selectedMethod = this.value;
            // Additional logic for showing specific payment instructions could be added here
        });
    });

    // Crypto address modal handler
    const cryptoButtons = document.querySelectorAll('.show-addresses');
    cryptoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showCryptoAddresses();
        });
    });

    // Roblox details modal handler
    const robloxButtons = document.querySelectorAll('.show-roblox');
    robloxButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showRobloxDetails();
        });
    });

    // Amazon Gift Card modal handler
    const amazonButtons = document.querySelectorAll('.show-amazon');
    amazonButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showAmazonDetails();
        });
    });

    // Steam Gift Card modal handler
    const steamButtons = document.querySelectorAll('.show-steam');
    steamButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showSteamDetails();
        });
    });

    function showCryptoAddresses() {
        const addresses = {
            btc: 'your-btc-address',
            eth: 'your-eth-address',
            usdt: 'your-usdt-address',
            bch: 'your-bch-address'
        };

        const modal = createModal('Cryptocurrency Addresses', `
            <div class="crypto-addresses">
                <div class="crypto-address">
                    <i class="fab fa-bitcoin"></i>
                    <p>Bitcoin (BTC)</p>
                    <div class="address-copy">
                        <input type="text" readonly value="${addresses.btc}">
                        <button class="copy-btn" data-address="${addresses.btc}">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
                <!-- Add similar blocks for other cryptocurrencies -->
            </div>
        `);

        document.body.appendChild(modal);
        setupCopyButtons();
    }

    function showRobloxDetails() {
        const modal = createModal('Roblox Payment Details', `
            <div class="roblox-details">
                <div class="roblox-info">
                    <h3>How to pay with Robux</h3>
                    <ol>
                        <li>Join our Roblox group</li>
                        <li>Purchase the designated gamepass</li>
                        <li>Provide screenshot of purchase</li>
                        <li>Get your service instantly</li>
                    </ol>
                    <a href="https://www.roblox.com/groups/your-group" class="btn btn-primary" target="_blank">
                        Join Roblox Group
                    </a>
                </div>
            </div>
        `);

        document.body.appendChild(modal);
    }

    function showAmazonDetails() {
        const modal = createModal('Amazon Gift Card Details', `
            <div class="gift-card-details">
                <div class="gift-card-info">
                    <h3>Amazon.fr Gift Cards Only</h3>
                    <ul>
                        <li>We only accept Amazon.fr gift cards</li>
                        <li>Screenshot of the gift card code is required</li>
                        <li>Contact support for redemption process</li>
                    </ul>
                    <div class="warning">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Important: Only French Amazon gift cards (.fr) will be accepted.</p>
                    </div>
                </div>
            </div>
        `);

        document.body.appendChild(modal);
    }

    function showSteamDetails() {
        const modal = createModal('Steam Gift Card Details', `
            <div class="gift-card-details">
                <div class="gift-card-info">
                    <h3>Steam Gift Cards</h3>
                    <ul>
                        <li>All currencies accepted</li>
                        <li>Send screenshot of gift card code</li>
                        <li>Instant verification process</li>
                    </ul>
                    <div class="note">
                        <i class="fas fa-info-circle"></i>
                        <p>Contact support after purchase for redemption instructions.</p>
                    </div>
                </div>
            </div>
        `);

        document.body.appendChild(modal);
    }

    function createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal fade-in';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;

        modal.querySelector('.close-btn').onclick = () => modal.remove();
        return modal;
    }

    function setupCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.onclick = function() {
                const address = this.dataset.address;
                navigator.clipboard.writeText(address).then(() => {
                    showToast('Address copied to clipboard!');
                });
            };
        });
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
});
