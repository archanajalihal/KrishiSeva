/* 
    FPO Marketing Platform - Application Logic
*/

// Initial Application State
const state = {
    view: 'marketplace',
    user: null, // role: 'Admin', 'Farmer', 'Buyer'
    searchQuery: '',
    crops: [
        { id: 1, name: 'Premium Sona Masoori Rice', category: 'Grain', quantity: '500 KG', price: '₹55/KG', location: 'Nellore, AP', farmer: 'Srinivasa Rao', img: 'crop_green_rice_paddy_1773239475793.png' },
        { id: 2, name: 'Organic Golden Wheat', category: 'Grain', quantity: '1000 KG', price: '₹32/KG', location: 'Ludhiana, PB', farmer: 'Harjeet Singh', img: 'crop_wheat_field_1773239437596.png' },
        { id: 3, name: 'Vine-Ripened Roma Tomatoes', category: 'Vegetable', quantity: '200 KG', price: '₹40/KG', location: 'Nashik, MH', farmer: 'Rahul Patil', img: 'crop_tomatoes_basket_1773239457131.png' }
    ],
    marketPrices: [
        { crop: 'Wheat', current: '₹2850', trend: 'up', change: '+2.4%' },
        { crop: 'Paddy (Basmati)', current: '₹4200', trend: 'down', change: '-1.2%' },
        { crop: 'Cotton', current: '₹7500', trend: 'up', change: '+0.8%' },
        { crop: 'Tomato', current: '₹1800', trend: 'up', change: '+15.2%' }
    ],
    networkPosts: [
        { user: 'Kisan Mitra', text: 'Tip: Early morning irrigation reduces evaporation loss significantly.', likes: 24, replies: 5 },
        { user: 'Anil Kumar', text: 'Does anyone have experience with organic pesticides for cotton?', likes: 12, replies: 8 }
    ],
    schemes: [
        {
            name: 'PM-KISAN (Direct Income Support)',
            benefit: '₹6,000 per year direct cash transfer into bank account',
            eligibility: 'Individual landholding farmers (small and marginal focus)',
            link: 'https://pmkisan.gov.in/',
            id: 'S1'
        },
        {
            name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
            benefit: 'Crop insurance protection against yield loss from natural risks',
            eligibility: 'All farmers growing notified crops (Individual application)',
            link: 'https://pmfby.gov.in/',
            id: 'S2'
        },
        {
            name: 'Kisan Credit Card (KCC) Scheme',
            benefit: 'Interest-subsidized loans for agricultural and domestic needs',
            eligibility: 'Individual owner cultivators and sharecroppers',
            link: 'https://pib.gov.in/PressReleasePage.aspx?PRID=1576403',
            id: 'S3'
        },
        {
            name: 'PM-KUSUM (Solar Pump Subsidy)',
            benefit: 'Up to 90% subsidy on solar water pumps for irrigation',
            eligibility: 'Individual farmers with available agricultural land',
            link: 'https://pmkusum.mnre.gov.in/',
            id: 'S4'
        },
        {
            name: 'Soil Health Card Scheme',
            benefit: 'Comprehensive soil report and fertilizer dosage guide',
            eligibility: 'Every individual farm household across the country',
            link: 'https://www.soilhealth.dac.gov.in/',
            id: 'S5'
        },
        {
            name: 'Pashu Kisan Credit Card',
            benefit: 'Low-interest loans for animal husbandry and livestock rearing',
            eligibility: 'Individual farmers owning cattle, poultry, or fish ponds',
            link: 'https://ahd.haryana.gov.in/pashu-kcc',
            id: 'S6'
        }
    ]
};

// UI Rendering Functions
const templates = {
    login: () => `
        <section class="login-section fade-in">
            <div class="login-card">
                <h2>Welcome to KrishiSeva</h2>
                <p>Join our FPO network today!</p>
                <div class="role-selector">
                    <button class="role-btn active" onclick="setRole('Farmer', this)">Farmer</button>
                    <button class="role-btn" onclick="setRole('Buyer', this)">Buyer</button>
                    <button class="role-btn" onclick="setRole('Admin', this)">Admin</button>
                </div>
                <div class="form-group">
                    <label>Mobile Number / Email</label>
                    <input type="text" placeholder="Enter credentials">
                </div>
                <button class="btn-login" style="width: 100%; margin-top: 1rem;" onclick="handleLogin()">Continue</button>
            </div>
        </section>
    `,

    marketplace: () => `
        <div class="fade-in">
            <header class="hero">
                <h1>Bridging the Gap from <br>Farm to Commercial Buyer</h1>
                <p>KrishiSeva empowers FPOs with institutional-grade marketing tools and direct access to premium buyers nationwide.</p>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn-login" onclick="setView('schemes')">Explore Govt Benefits</button>
                    <button class="btn-login btn-secondary" onclick="document.getElementById('market-start').scrollIntoView({behavior: 'smooth'})">Browse Marketplace</button>
                </div>
            </header>

            <div class="marketplace-header" id="market-start">
                <div>
                    <h1>Marketplace</h1>
                    <p style="color: var(--text-light); font-weight: 500;">Access 500+ verified active crop listings</p>
                </div>
                <div class="search-bar">
                    <input type="text" class="search-input" placeholder="Search by crop, variety, or district..." oninput="state.searchQuery = this.value; render();">
                </div>
            </div>

            <div class="product-grid" id="product-list">
                ${state.crops.filter(c => c.name.toLowerCase().includes(state.searchQuery.toLowerCase())).map(crop => `
                    <div class="card">
                        <div class="card-img-wrapper">
                            <img src="${crop.img}" class="card-img" alt="${crop.name}">
                        </div>
                        <div class="card-body">
                            <span class="badge">${crop.category}</span>
                            <h3 style="margin: 0 0 0.5rem 0; font-size: 1.4rem; letter-spacing: -0.02em;">${crop.name}</h3>
                            <p style="font-size: 0.95rem; color: var(--text-light); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 6px;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="3"/></svg>
                                ${crop.location} • By ${crop.farmer}
                            </p>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 1.5rem; border-top: 1px solid #f1f5f9;">
                                <div>
                                    <span style="display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-light); font-weight: 700;">Price per KG</span>
                                    <span class="price-tag">${crop.price.split('/')[0]}</span>
                                </div>
                                <div style="text-align: right;">
                                    <span style="display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-light); font-weight: 700;">Availability</span>
                                    <span style="font-weight: 700; color: var(--text-main);">${crop.quantity}</span>
                                </div>
                            </div>
                            <button class="btn-login" style="width: 100%; margin-top: 1.5rem; justify-content: center;" onclick="sendRequest(${crop.id})">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg>
                                Contact Seller
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Professional Trust Signals -->
            <div style="margin-top: 6rem; padding: 4rem 0; border-top: 1px solid #eef2f6; text-align: center;">
                <p style="text-transform: uppercase; letter-spacing: 0.2em; font-size: 0.75rem; font-weight: 800; color: var(--text-light); margin-bottom: 2rem;">Trusted by agricultural institutions nationwide</p>
                <div style="display: flex; justify-content: center; gap: 4rem; opacity: 0.5; filter: grayscale(1); flex-wrap: wrap;">
                    <span style="font-weight: 900; font-size: 1.5rem;">NABARD</span>
                    <span style="font-weight: 900; font-size: 1.5rem;">e-NAM</span>
                    <span style="font-weight: 900; font-size: 1.5rem;">FCI</span>
                    <span style="font-weight: 900; font-size: 1.5rem;">APEDA</span>
                    <span style="font-weight: 900; font-size: 1.5rem;">NCDC</span>
                </div>
            </div>
        </div>
    `,

    dashboard: () => {
        if (!state.user) return templates.login();

        return `
            <div class="fade-in">
                <h1>Welcome Back, ${state.user}</h1>
                <div class="stats-grid">
                    <div class="stat-card">
                        <span class="stat-label">Total Listings</span>
                        <span class="stat-val">12</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-label">Buyer Leads</span>
                        <span class="stat-val">28</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-label">Estimated Revenue</span>
                        <span class="stat-val">₹2.4L</span>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2>Active Operations</h2>
                    <button class="btn-login" onclick="openUploadModal()">+ New Listing</button>
                </div>
                
                <div style="background: white; border-radius: var(--radius); padding: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                    <table style="width: 100%; text-align: left; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #eee;">
                            <th style="padding: 1rem;">Crop</th>
                            <th style="padding: 1rem;">Status</th>
                            <th style="padding: 1rem;">Leads</th>
                            <th style="padding: 1rem;">Date</th>
                        </tr>
                        <tr>
                            <td style="padding: 1rem;">Basmati Rice</td>
                            <td style="padding: 1rem;"><span style="color: green; font-weight: 600;">Active</span></td>
                            <td style="padding: 1rem;">15</td>
                            <td style="padding: 1rem;">10 Mar 2026</td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
    },

    'price-history': () => `
        <div class="fade-in">
            <h1>Daily Market Prices (Mandi)</h1>
            <p style="color: var(--text-light); margin-bottom: 2rem;">Real-time price index across FPO hubs</p>
            <div class="stats-grid">
                ${state.marketPrices.map(p => `
                    <div class="stat-card">
                        <span class="stat-label">${p.crop} (Quintal)</span>
                        <div style="display: flex; align-items: baseline; gap: 10px;">
                            <span class="stat-val">${p.current}</span>
                            <span style="color: ${p.trend === 'up' ? '#2d6a4f' : '#e63946'}; font-weight: 600; font-size: 0.8rem;">
                                ${p.trend === 'up' ? '▲' : '▼'} ${p.change}
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `,

    network: () => `
        <div class="fade-in">
            <h1>Farmer Connect Network</h1>
            <p style="color: var(--text-light); margin-bottom: 2rem;">Collaborate, learn, and grow together</p>
            
            <div style="background: white; padding: 1.5rem; border-radius: var(--radius); margin-bottom: 2rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                <textarea placeholder="Share an update or ask a question..." style="width: 100%; padding: 1rem; border: 1px solid #ddd; border-radius: 8px; font-family: inherit; margin-bottom: 1rem;" rows="3"></textarea>
                <div style="display: flex; justify-content: flex-end;">
                    <button class="btn-login">Post Update</button>
                </div>
            </div>

            <div id="posts-list">
                ${state.networkPosts.map(post => `
                    <div style="background: white; padding: 1.5rem; border-radius: var(--radius); margin-bottom: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid var(--accent);">
                        <strong style="color: var(--primary);">${post.user}</strong>
                        <p style="margin: 0.5rem 0;">${post.text}</p>
                        <div style="display: flex; gap: 1rem; font-size: 0.8rem; color: var(--text-light);">
                            <span>👍 ${post.likes} Helpful</span>
                            <span>💬 ${post.replies} Replies</span>
                            <span style="margin-left: auto;">2h ago</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `,

    schemes: () => `
        <div class="fade-in">
            <header class="hero" style="background: linear-gradient(135deg, #065f46 0%, #064e3b 100%);">
                <span class="badge" style="background: rgba(255,255,255,0.2); color: white; margin-bottom: 2rem;">Institutional Support</span>
                <h1>Direct-to-Farmer <br>Government Benefits</h1>
                <p>Unlock official subsidies, direct cash transfers, and resource support specifically curated for your farm's growth.</p>
            </header>
            
            <div class="product-grid" style="grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));">
                ${state.schemes.map(scheme => `
                    <div class="card" style="border-top: 5px solid var(--accent); transition: transform 0.3s ease;">
                        <div class="card-body">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
                                <span class="badge" style="margin-bottom: 0;">FARMER SCHEME</span>
                                <div style="background: var(--primary-ultra-light); padding: 10px; border-radius: 12px; color: var(--primary);">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                </div>
                            </div>
                            <h3 style="margin: 0 0 1rem 0; font-size: 1.5rem; color: var(--primary); letter-spacing: -0.02em;">${scheme.name}</h3>
                            
                            <div style="background: #f8fafc; padding: 1.25rem; border-radius: 16px; margin-bottom: 1.5rem;">
                                <strong style="display: block; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-light); margin-bottom: 0.5rem;">Direct Benefit</strong>
                                <p style="font-weight: 700; font-size: 1.15rem; color: var(--primary-light);">${scheme.benefit}</p>
                            </div>

                            <div style="margin-bottom: 2rem;">
                                <strong style="display: block; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-light); margin-bottom: 0.5rem;">Who can apply?</strong>
                                <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">${scheme.eligibility}</p>
                            </div>

                            <a href="${scheme.link}" target="_blank" class="btn-login" style="margin-top: auto; justify-content: center; background: transparent; border: 2px solid var(--primary); color: var(--primary); box-shadow: none;">
                                Apply on Official Portal
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="margin-top: 5rem; background: var(--primary); color: white; padding: 3.5rem; border-radius: 24px; display: flex; align-items: center; gap: 3rem; box-shadow: var(--shadow-xl);">
                <div style="background: rgba(255,255,255,0.1); width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; flex-shrink: 0;">🏛️</div>
                <div>
                    <h3 style="font-size: 1.75rem; margin-bottom: 0.5rem;">Institutional Registration Support</h3>
                    <p style="opacity: 0.85; font-size: 1.1rem; max-width: 800px;">Our FPO field agents are stationed at district hubs to assist you with e-KYC, document digital verification, and direct application filing at zero cost.</p>
                    <button class="btn-login btn-secondary" style="margin-top: 1.5rem; background: white;">Find Nearest Hub</button>
                </div>
            </div>
        </div>
    `
};

// Core Logic & Navigation
function setView(view) {
    state.view = view;
    render();
    window.scrollTo(0, 0);
}

function render() {
    const container = document.getElementById('app-content');
    const viewFn = templates[state.view] || templates.marketplace;
    container.innerHTML = viewFn();

    // Update Nav Active State
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.view === state.view) link.classList.add('active');
    });

    // Update User Info Area
    const userInfo = document.getElementById('user-info');
    if (state.user) {
        userInfo.innerHTML = `
            <span style="font-weight: 600;">👋 ${state.user}</span>
            <button class="btn-login" style="background: #e63946;" onclick="handleLogout()">Logout</button>
        `;
    } else {
        userInfo.innerHTML = `<button class="btn-login" onclick="setView('login')">Sign In</button>`;
    }
}

// Global Actions (Exposed to window for onclick)
window.setRole = (role, btn) => {
    state.selectedRole = role;
    document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

window.handleLogin = () => {
    state.user = state.selectedRole || 'Farmer';
    setView('dashboard');
}

window.handleLogout = () => {
    state.user = null;
    setView('marketplace');
}

window.sendRequest = (id) => {
    const crop = state.crops.find(c => c.id === id);
    alert(`Purchase query sent to ${crop.farmer} for ${crop.name}!`);
}

window.openUploadModal = () => {
    alert('Listing upload form (Admin/Farmer Access Only)');
}

// Initial Navigation Event Handlers
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => setView(link.dataset.view));
});

document.getElementById('home-link').addEventListener('click', () => setView('marketplace'));

// Initialize App
render();
