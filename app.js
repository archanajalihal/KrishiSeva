/* 
    FarmConnect - Digital Aggregation Platform
    Application Logic
*/

// Initial Application State
const state = {
    view: 'marketplace',
    user: null,
    searchQuery: '',
    lang: localStorage.getItem('appLang') || 'en',
    // Farmer Produce Submissions (Aggregation)
    farmerRegistrations: JSON.parse(localStorage.getItem('farmerRegistrations')) || [
        { id: 103, name: 'Harjeet Singh', village: 'Amritsar', phone: '9988776655', crop: 'Wheat', quantity: 500, date: '2026-03-20' }
    ],
    // Logistics / Pickups
    pickupRequests: JSON.parse(localStorage.getItem('pickupRequests')) || [
        { id: 1, farmerId: 101, date: '2026-03-16', status: 'Pending', village: 'Nellore' }
    ],
    // Buyer Demand
    buyerRequests: [
        { id: 3, buyer: 'FabIndia', crop: 'Silk Cocoon', demand: '500 KG', priceRange: '₹460-490' }
    ],
    // Marketplace Listings (Existing)
    crops: [
        { id: 1, name: 'Premium Sona Masoori Rice', category: 'Grain', quantity: '500 KG', price: '₹55/KG', location: 'Nellore, AP', farmer: 'Srinivasa Rao', img: 'crop_green_rice_paddy_1773239475793.png' },
        { id: 2, name: 'Organic Golden Wheat', category: 'Grain', quantity: '1000 KG', price: '₹32/KG', location: 'Ludhiana, PB', farmer: 'Harjeet Singh', img: 'crop_wheat_field_1773239437596.png' },
        { id: 4, name: 'Arabica Coffee Beans', category: 'Commercial', quantity: '150 KG', price: '₹450/KG', location: 'Chikmagalur, KA', farmer: 'Kaveri Estate', img: 'crop_coffee_beans.png' },
        { id: 5, name: 'Pure Lakadong Turmeric', category: 'Spice', quantity: '80 KG', price: '₹320/KG', location: 'Jaintia Hills, ML', farmer: 'Meghalaya FPO', img: 'crop_turmeric.png' },
        { id: 6, name: 'Wild Forest Organic Honey', category: 'Commercial Food', quantity: '120 Units', price: '₹580/Unit', location: 'Sundarbans, WB', farmer: 'Sundarban Bee-Keepers', img: 'crop_honey.png' },
        { id: 7, name: 'Premium Roasted Cashews', category: 'Commercial Food', quantity: '200 KG', price: '₹850/KG', location: 'Kollam, KL', farmer: 'Kerala Cashew Co-op', img: 'crop_cashews.png' },
        { id: 8, name: 'Kashmiri Mogra Saffron', category: 'Spice', quantity: '500 G', price: '₹350/G', location: 'Pampore, JK', farmer: 'Valley Saffron Growers', img: 'crop_saffron.png' },
        { id: 9, name: 'Cold Pressed Groundnut Oil', category: 'Commercial Food', quantity: '500 L', price: '₹220/L', location: 'Anantapur, AP', farmer: 'Rayalaseema FPO', img: 'crop_oil.png' },
        { id: 10, name: 'Organic Palm Jaggery', category: 'Commercial Food', quantity: '300 KG', price: '₹180/KG', location: 'Tuticorin, TN', farmer: 'Coastal Palm Society', img: 'crop_jaggery.png' },
        { id: 11, name: 'Green Cardamom (8mm)', category: 'Spice', quantity: '100 KG', price: '₹1650/KG', location: 'Idukki, KL', farmer: 'High Range Spices', img: 'crop_cardamom.png' },
        { id: 12, name: 'Guntur Sannam Red Chili', category: 'Spice', quantity: '1000 KG', price: '₹240/KG', location: 'Guntur, AP', farmer: 'Red Gold Farmers', img: 'crop_chili.png' },
        { id: 13, name: 'Premium Mulberry Silk Cocoons', category: 'Textile', quantity: '300 KG', price: '₹480/KG', location: 'Ramanagara, KA', farmer: 'Silk Route FPO', img: 'crop_silk.png' }
    ],
    marketPrices: [
        { crop: 'Wheat', current: '₹2850', high: '₹2900', trend: 'up', change: '+2.4%' },
        { crop: 'Paddy', current: '₹4200', high: '₹4300', trend: 'down', change: '-1.2%' },
        { crop: 'Silk Cocoon', current: '₹450', high: '₹520', trend: 'up', change: '+5.4%' }
    ],
    weatherAlerts: [
        { type: 'Rain', severity: 'Medium', message: 'Heavy rain expected in Nellore district. Delay harvest by 2 days.', date: '2026-03-14' },
        { type: 'Heat', severity: 'High', message: 'Extreme heat wave in Punjab. Ensure proper irrigation.', date: '2026-03-16' }
    ],
    training: [
        { id: 1, title: 'Organic Certification Workshop', category: 'Skill Up', duration: '2 Days', level: 'Intermediate', instructor: 'Dr. Ramesh B.', students: 45 },
        { id: 2, title: 'Drip Irrigation Maintenance', category: 'Technical', duration: '1 Day', level: 'Beginner', instructor: 'Eng. Sarah K.', students: 120 },
        { id: 3, title: 'Smart Market Pricing Strategies', category: 'Business', duration: '3 Hours', level: 'Advanced', instructor: 'Prof. Anjali M.', students: 85 },
        { id: 4, title: 'Post-Harvest Loss Prevention', category: 'Operational', duration: '1 Day', level: 'Intermediate', instructor: 'Vijay Kumar', students: 60 }
    ]
};

const translations = {
    en: {
        nav_marketplace: "Marketplace",
        nav_aggregation: "Aggregation",
        nav_logistics: "Logistics",
        nav_skills: "Skills",
        nav_registration: "Farmer Reg",
        hero_title: "Bridging the Gap from <br>Farm to Commercial Buyer",
        hero_desc: "FarmConnect empowers FPOs with institutional-grade marketing tools and direct access to premium buyers nationwide.",
        btn_register: "Register Produce",
        btn_browse: "Browse Marketplace",
        btn_contact: "Contact Seller",
        market_title: "Marketplace",
        market_desc: "Access 500+ verified active crop listings",
        search_placeholder: "Search by crop, variety, or district...",
        footer_text: "© 2026 KrishiSeva FPO Platform. Strengthening Farmer-to-Buyer Connections.",
        signin: "Sign In",
        logout: "Logout",
        hello: "👋 Hello",
        form_name: "Farmer Name",
        form_village: "Village",
        form_phone: "Phone Number",
        form_crop: "Crop Type",
        form_qty: "Quantity (KG)",
        form_date: "Expected Harvest Date",
        btn_submit: "Submit Registration",
        btn_voice: "🎤 Use Voice Input",
        btn_schedule: "Schedule",
        btn_dispatch: "Dispatch",
        agg_title: "Aggregation Dashboard",
        log_title: "Logistics & Pickup Center",
        skills_title: "Skill Up for the <br>Future of Farming",
        btn_enroll: "Enroll Now"
    },
    kn: {
        nav_marketplace: "ಮಾರುಕಟ್ಟೆ",
        nav_aggregation: "ಸಂಗ್ರಹಣೆ",
        nav_logistics: "ಸರಕು ಸಾಗಣೆ",
        nav_skills: "ಕೌಶಲ್ಯಗಳು",
        nav_registration: "ರೈತರ ನೋಂದಣಿ",
        hero_title: "ಹೊಲದಿಂದ ವಾಣಿಜ್ಯ <br>ಖರೀದಿದಾರರಿಗೆ ಸಂಪರ್ಕ",
        hero_desc: "FarmConnect ಸಂಸ್ಥೆಯು FPO ಗಳಿಗೆ ಸಾಂಸ್ಥಿಕ ದರ್ಜೆಯ ಮಾರುಕಟ್ಟೆ ಪರಿಕರಗಳನ್ನು ಮತ್ತು ಪ್ರೀಮಿಯಂ ಖರೀದಿದಾರರಿಗೆ ನೇರ ಪ್ರವೇಶವನ್ನು ನೀಡುತ್ತದೆ.",
        btn_register: "ಉತ್ಪನ್ನವನ್ನು ನೋಂದಾಯಿಸಿ",
        btn_browse: "ಮಾರುಕಟ್ಟೆಯನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ",
        btn_contact: "ಮಾರಾಟಗಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ",
        market_title: "ಮಾರುಕಟ್ಟೆ",
        market_desc: "500+ ಪರಿಶೀಲಿಸಿದ ಸಕ್ರಿಯ ಬೆಳೆ ಪಟ್ಟಿಗಳನ್ನು ಪ್ರವೇಶಿಸಿ",
        search_placeholder: "ಬೆಳೆ, ವೈವಿಧ್ಯ ಅಥವಾ ಜಿಲ್ಲೆಯ ಮೂಲಕ ಹುಡುಕಿ...",
        footer_text: "© 2026 ಕೃಷಿಸೇವಾ FPO ಪ್ಲಾಟ್‌ಫಾರ್ಮ್. ರೈತ ಮತ್ತು ಖರೀದಿದಾರರ ನಡುವಿನ ಸಂಪರ್ಕವನ್ನು ಬಲಪಡಿಸುವುದು.",
        signin: "ಸೈನ್ ಇನ್",
        logout: "ಲಾಗ್ ಔಟ್",
        hello: "👋 ನಮಸ್ಕಾರ",
        form_name: "ರೈತರ ಹೆಸರು",
        form_village: "ಗ್ರಾಮ",
        form_phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
        form_crop: "ಬೆಳೆ ವಿಧ",
        form_qty: "ಪ್ರಮಾಣ (KG)",
        form_date: "ನಿರೀಕ್ಷಿತ ಕೊಯ್ಲು ದಿನಾಂಕ",
        btn_submit: "ನೋಂದಣಿಯನ್ನು ಸಲ್ಲಿಸಿ",
        btn_voice: "🎤 ಧ್ವನಿ ಇನ್ಪುಟ್ ಬಳಸಿ",
        btn_schedule: "ನಿಗದಿಪಡಿಸಿ",
        btn_dispatch: "ರವಾನಿಸಿ",
        agg_title: "ಸಂಗ್ರಹಣೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        log_title: "ಸರಕು ಸಾಗಣೆ ಮತ್ತು ಪಿಕಪ್ ಕೇಂದ್ರ",
        skills_title: "ಕೃಷಿಯ ಭವಿಷ್ಯಕ್ಕಾಗಿ <br>ಕೌಶಲ್ಯವನ್ನು ಹೆಚ್ಚಿಸಿ",
        btn_enroll: "ಈಗ ನೋಂದಾಯಿಸಿ"
    },
    hi: {
        nav_marketplace: "बाज़ार",
        nav_aggregation: "एकत्रीकरण",
        nav_logistics: "रसद",
        nav_skills: "कौशल",
        nav_registration: "किसान पंजीकरण",
        hero_title: "खेत से व्यावसायिक <br>खरीदार तक की दूरी मिटाना",
        hero_desc: "FarmConnect FPO को संस्थागत-ग्रेड मार्केटिंग टूल और प्रीमियम खरीदारों तक सीधी पहुंच प्रदान करता है।",
        btn_register: "उत्पाद पंजीकृत करें",
        btn_browse: "बाज़ार देखें",
        btn_contact: "विक्रेता से संपर्क करें",
        market_title: "बाज़ार",
        market_desc: "500+ सत्यापित सक्रिय फसल लिस्टिंग तक पहुंच",
        search_placeholder: "फसल, किस्म या जिले के आधार पर खोजें...",
        footer_text: "© 2026 कृषिसेवा FPO प्लेटफॉर्म। किसान-से-खरीदार के बीच के संबंधों को मजबूत करना।",
        signin: "साइन इन",
        logout: "लॉग आउट",
        hello: "👋 नमस्ते",
        form_name: "किसान का नाम",
        form_village: "गांव",
        form_phone: "फ़ोन नंबर",
        form_crop: "फसल का प्रकार",
        form_qty: "मात्रा (KG)",
        form_date: "कटाई की अपेक्षित तिथि",
        btn_submit: "पंजीकरण जमा करें",
        btn_voice: "🎤 वॉयस इनपुट का उपयोग करें",
        btn_schedule: "शेड्यूल करें",
        btn_dispatch: "रवाना करें",
        agg_title: "एकत्रीकरण डैशबोर्ड",
        log_title: "रसद और पिकअप केंद्र",
        skills_title: "खेती के भविष्य के <br>लिए कौशल बढ़ाएं",
        btn_enroll: "अभी पंजीकरण करें"
    },
    te: {
        nav_marketplace: "మార్కెట్ ప్లేస్",
        nav_aggregation: "సేకరణ",
        nav_logistics: "లాజిస్టిక్స్",
        nav_skills: "నైపుణ్యాలు",
        nav_registration: "రైతు నమోదు",
        hero_title: "పొలం నుండి వాణిజ్య <br>కొనుగోలుదారుకు అనుసంధానం",
        hero_desc: "FarmConnect FPOలకు సంస్థాగత-స్థాయి మార్కెటింగ్ సాధనాలను మరియు ప్రీమియం కొనుగోలుదారులకు ప్రత్యక్ష ప్రాప్తిని అందిస్తుంది.",
        btn_register: "ఉత్పత్తిని నమోదు చేయండి",
        btn_browse: "మార్కెట్ ప్లేస్ చూడండి",
        btn_contact: "విక్రేతను సంప్రదించండి",
        market_title: "మార్కెట్ ప్లేస్",
        market_desc: "500+ ధృవీకరించబడిన యాక్టివ్ పంట జాబితాలను యాక్సెస్ చేయండి",
        search_placeholder: "పంట, రకం లేదా జిల్లా ద్వారా వెతకండి...",
        footer_text: "© 2026 కృషిసేవా FPO ప్లాట్‌ఫారమ్. రైతు-కొనుగోలుదారు అనుసంధానాన్ని బలోపేతం చేయడం.",
        signin: "సైన్ ఇన్",
        logout: "లాగ్ అవుట్",
        hello: "👋 నమస్కారం",
        form_name: "రైతు పేరు",
        form_village: "గ్రామం",
        form_phone: "ఫోన్ నంబర్",
        form_crop: "పంట రకం",
        form_qty: "పరిమాణం (KG)",
        form_date: "కోత ఆశించిన తేదీ",
        btn_submit: "నమోదును సమర్పించండి",
        btn_voice: "🎤 వాయిస్ ఇన్‌పుట్ ఉపయోగించండి",
        btn_schedule: "షెడ్యూల్ చేయండి",
        btn_dispatch: "పంపండి",
        agg_title: "సేకరణ డాష్‌బోర్డ్",
        log_title: "లాజిస్టిక్స్ & పికప్ సెంటర్",
        skills_title: "వ్యవసాయ భవిష్యత్తు కోసం <br>నైపుణ్యాన్ని పెంచుకోండి",
        btn_enroll: "ఇప్పుడే చేరండి"
    }
};

// Translation Helper
function t(key) {
    return translations[state.lang][key] || key;
}

// Helper to save state
function saveState() {
    localStorage.setItem('farmerRegistrations', JSON.stringify(state.farmerRegistrations));
    localStorage.setItem('pickupRequests', JSON.stringify(state.pickupRequests));
}

// UI Rendering Functions
const templates = {
    registration: () => `
        <div class="fade-in">
            <header class="hero" style="padding: 3rem 2.5rem; margin-bottom: 2rem;">
                <h1>${t('nav_registration')}</h1>
                <p>Register your produce for institutional aggregation and direct market access.</p>
            </header>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;">
                <div class="login-card" style="text-align: left; max-width: 100%;">
                    <h3>Digital Registration Form</h3>
                    <p style="margin-bottom: 2rem; color: var(--text-light);">Fields marked with * are required</p>
                    
                    <form id="registration-form" onsubmit="handleRegistration(event)">
                        <div class="form-group">
                            <label>${t('form_name')} *</label>
                            <input type="text" id="reg-name" required placeholder="Full Name">
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div class="form-group">
                                <label>${t('form_village')} *</label>
                                <input type="text" id="reg-village" required placeholder="Village Name">
                            </div>
                            <div class="form-group">
                                <label>${t('form_phone')} *</label>
                                <input type="tel" id="reg-phone" required placeholder="10-digit Mobile">
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div class="form-group">
                                <label>${t('form_crop')} *</label>
                                <input type="text" id="reg-crop" required placeholder="e.g. Tomato, Onion">
                                <button type="button" class="btn-login" style="margin-top: 0.5rem; background: var(--secondary); padding: 0.5rem 1rem; font-size: 0.8rem;" onclick="startVoice('reg-crop')">
                                    ${t('btn_voice')}
                                </button>
                            </div>
                            <div class="form-group">
                                <label>${t('form_qty')} *</label>
                                <input type="number" id="reg-qty" required placeholder="Total Quantity">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Pin Farm Location *</label>
                            <div id="reg-map" style="height: 250px; border-radius: 12px; margin-bottom: 0.5rem; background: #e2e8f0;"></div>
                            <input type="hidden" id="reg-lat">
                            <input type="hidden" id="reg-lng">
                            <small style="color: var(--text-light);">Click on the map to mark your farm's exact location.</small>
                        </div>
                        <div class="form-group">
                            <label>${t('form_date')}</label>
                            <input type="date" id="reg-date">
                        </div>
                        <button type="submit" class="btn-login" style="width: 100%; margin-top: 1rem; justify-content: center;">${t('btn_submit')}</button>
                    </form>
                </div>

                <div>
                    <div style="background: white; padding: 2rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); margin-bottom: 2rem;">
                        <h4 style="margin-bottom: 1rem; color: var(--primary);">Live Weather Alerts</h4>
                        ${state.weatherAlerts.map(alert => `
                            <div style="padding: 1rem; border-radius: 12px; background: ${alert.severity === 'High' ? '#fee2e2' : '#fef3c7'}; margin-bottom: 1rem; border-left: 4px solid ${alert.severity === 'High' ? '#ef4444' : '#f59e0b'};">
                                <strong style="display: block; font-size: 0.8rem; text-transform: uppercase;">${alert.type} Alert (${alert.severity})</strong>
                                <p style="font-size: 0.9rem; margin: 4px 0;">${alert.message}</p>
                                <small style="color: var(--text-light);">${alert.date}</small>
                            </div>
                        `).join('')}
                    </div>

                    <div style="background: var(--primary); color: white; padding: 2rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
                        <h4>Why Register?</h4>
                        <ul style="margin-top: 1rem; padding-left: 1.2rem; font-size: 0.9rem; opacity: 0.9;">
                            <li>Guaranteed pickup within 48 hours of harvest.</li>
                            <li>Direct access to Institutional Buyers (BigBasket, Reliance).</li>
                            <li>Electronic payment within 24 hours of aggregation.</li>
                            <li>Higher "Aggregation Premium" compared to local Mandi.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `,

    aggregation: () => {
        const aggregates = state.farmerRegistrations.reduce((acc, reg) => {
            acc[reg.crop] = (acc[reg.crop] || 0) + Number(reg.quantity);
            return acc;
        }, {});

        return `
            <div class="fade-in">
                <h1>${t('agg_title')}</h1>
                <p style="color: var(--text-light); margin-bottom: 3rem;">Consolidated produce data across 50+ clusters</p>

                <div class="stats-grid">
                    ${Object.entries(aggregates).map(([crop, qty]) => `
                        <div class="stat-card">
                            <span class="stat-label">Total ${crop}</span>
                            <span class="stat-val">${qty} KG</span>
                            <div style="margin-top: 1rem; font-size: 0.8rem; color: #2d6a4f; font-weight: 700;">
                                Ready for Bulk Sale
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem;">
                    <div style="background: white; padding: 2rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
                        <h3 style="margin-bottom: 1.5rem;">Recent Farmer Submissions</h3>
                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                                <thead style="background: #f8fafc; border-bottom: 2px solid #eef2f6;">
                                    <tr>
                                        <th style="padding: 1rem;">${t('form_name')}</th>
                                        <th style="padding: 1rem;">${t('form_village')}</th>
                                        <th style="padding: 1rem;">${t('form_crop')}</th>
                                        <th style="padding: 1rem;">Qty</th>
                                        <th style="padding: 1rem;">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${state.farmerRegistrations.slice().reverse().map(reg => `
                                        <tr style="border-bottom: 1px solid #f1f5f9;">
                                            <td style="padding: 1rem; font-weight: 600;">${reg.name}</td>
                                            <td style="padding: 1rem;">${reg.village}</td>
                                            <td style="padding: 1rem;"><span class="badge" style="margin:0;">${reg.crop}</span></td>
                                            <td style="padding: 1rem; font-weight: 700;">${reg.quantity} KG</td>
                                            <td style="padding: 1rem;">
                                                <button class="btn-login" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;" onclick="schedulePickup(${reg.id})">${t('btn_schedule')}</button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <div style="background: white; padding: 2rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); margin-bottom: 2rem;">
                            <h3>Buyer Market Heat</h3>
                            <p style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 1.5rem;">High demand crops for this week</p>
                            ${state.buyerRequests.map(req => `
                                <div style="padding: 1rem; border-radius: 12px; background: #f0fdf4; margin-bottom: 1rem; border: 1px solid #dcfce7;">
                                    <strong style="color: #166534;">${req.crop} Needed</strong>
                                    <div style="display: flex; justify-content: space-between; margin-top: 5px; font-size: 0.9rem;">
                                        <span>Demand: ${req.demand}</span>
                                        <span style="font-weight: 700;">${req.priceRange}/KG</span>
                                    </div>
                                    <small style="color: var(--text-light);">By ${req.buyer}</small>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    logistics: () => `
        <div class="fade-in">
            <h1>${t('log_title')}</h1>
            <p style="color: var(--text-light); margin-bottom: 3rem;">Manage vehicle routing and collection schedules</p>

            <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 3rem;">
                <div>
                     <div style="background: white; padding: 2rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
                        <h3>Collection Points</h3>
                        <p style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 1.5rem;">Live Cluster Logistics Map</p>
                        
                        <div id="map" style="height: 400px; border-radius: 12px; background: #e2e8f0; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);">
                            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-light);">
                                <div style="text-align: center;">
                                    <p>Initializing Google Maps...</p>
                                    <small>(Requires valid API Key & Billing)</small>
                                </div>
                            </div>
                        </div>

                        <ul style="margin-top: 2rem; list-style: none;">
                            ${[...new Set(state.farmerRegistrations.map(r => r.village))].map(v => `
                                <li style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding: 0.75rem 0;">
                                    <span>📍 ${v}</span>
                                    <span style="font-weight: 700;">${state.farmerRegistrations.filter(r => r.village === v).length} Farmers</span>
                                </li>
                            `).join('')}
                        </ul>
                     </div>
                </div>

                <div style="background: white; padding: 2rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
                    <h3>Pickup Logistics Dashboard</h3>
                    <div style="margin-top: 1.5rem;">
                        ${state.pickupRequests.length === 0 ? '<p>No active pickups scheduled.</p>' : 
                            state.pickupRequests.map(p => {
                                const farmer = state.farmerRegistrations.find(f => f.id === p.farmerId);
                                return `
                                    <div style="padding: 1.5rem; border: 1px solid #eef2f6; border-radius: 16px; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                                        <div>
                                            <span class="badge" style="background: ${p.status === 'Pending' ? '#fff7ed' : '#f0fdf4'}; color: ${p.status === 'Pending' ? '#c2410c' : '#166534'};">${p.status}</span>
                                            <h4 style="margin: 0.5rem 0 0.25rem 0;">${farmer ? farmer.name : 'Unknown Farmer'}</h4>
                                            <p style="font-size: 0.9rem; color: var(--text-light);">
                                                Location: ${p.village} | Scheduled: ${p.date}
                                            </p>
                                        </div>
                                        <div style="text-align: right;">
                                            <button class="btn-login" style="background: #2563eb;" onclick="alert('Dispatching vehicle to ${p.village}...')">${t('btn_dispatch')}</button>
                                        </div>
                                    </div>
                                `;
                            }).join('')
                        }
                    </div>
                </div>
            </div>
        </div>
    `,

    training: () => `
        <div class="fade-in">
            <header class="hero" style="background: linear-gradient(135deg, #4338ca 0%, #312e81 100%);">
                <span class="badge" style="background: rgba(255,255,255,0.2); color: white; margin-bottom: 2rem;">FarmConnect Academy</span>
                <h1>${t('skills_title')}</h1>
                <p>Access specialized training modules, certifications, and expert-led workshops to maximize your farm's efficiency and profit.</p>
            </header>

            <div class="marketplace-header">
                <div>
                    <h2>Available Training Programs</h2>
                    <p style="color: var(--text-light);">Upgrade your agricultural expertise</p>
                </div>
            </div>

            <div class="product-grid" style="grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));">
                ${state.training.map(course => `
                    <div class="card" style="border-bottom: 4px solid #4338ca;">
                        <div class="card-body">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span class="badge" style="background: #e0e7ff; color: #4338ca; margin: 0;">${course.category}</span>
                                <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-light);">${course.level}</span>
                            </div>
                            <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #1e1b4b;">${course.title}</h3>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; background: #f8fafc; padding: 1rem; border-radius: 12px;">
                                <div>
                                    <small style="display: block; color: var(--text-light); text-transform: uppercase; font-size: 0.65rem; font-weight: 700;">Duration</small>
                                    <span style="font-weight: 700;">${course.duration}</span>
                                </div>
                                <div>
                                    <small style="display: block; color: var(--text-light); text-transform: uppercase; font-size: 0.65rem; font-weight: 700;">Instructor</small>
                                    <span style="font-weight: 700;">${course.instructor}</span>
                                </div>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                                <span style="color: var(--text-light); font-size: 0.9rem;">👥 ${course.students} Joined</span>
                                <button class="btn-login" style="background: #4338ca; border-radius: 30px;" onclick="alert('Enrolled successfully in ${course.title}!')">${t('btn_enroll')}</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div style="margin-top: 5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div style="background: white; padding: 2.5rem; border-radius: 24px; box-shadow: var(--shadow-lg);">
                    <h3 style="margin-bottom: 1rem;">My Skill Badges</h3>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <div style="text-align: center;">
                            <div style="width: 70px; height: 70px; background: #dcfce7; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 0.5rem;">🌿</div>
                            <small style="font-weight: 700;">Organic</small>
                        </div>
                        <div style="text-align: center;">
                            <div style="width: 70px; height: 70px; background: #e0f2fe; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 0.5rem;">💧</div>
                            <small style="font-weight: 700;">Irrigation</small>
                        </div>
                    </div>
                </div>
                <div style="background: var(--primary); color: white; padding: 2.5rem; border-radius: 24px; box-shadow: var(--shadow-lg);">
                    <h3>Request Training</h3>
                    <p style="opacity: 0.8; margin: 1rem 0 1.5rem 0;">Don't see what you're looking for? Request a custom workshop for your village cluster.</p>
                    <button class="btn-login btn-secondary" style="background: white; border: none;">Propose Topic</button>
                </div>
            </div>
        </div>
    `,

    marketplace: () => `
        <div class="fade-in">
            <header class="hero">
                <h1>${t('hero_title')}</h1>
                <p>${t('hero_desc')}</p>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn-login" onclick="setView('registration')">${t('btn_register')}</button>
                    <button class="btn-login btn-secondary" onclick="document.getElementById('market-start').scrollIntoView({behavior: 'smooth'})">${t('btn_browse')}</button>
                </div>
            </header>

            <div class="marketplace-header" id="market-start">
                <div>
                    <h1>${t('market_title')}</h1>
                    <p style="color: var(--text-light); font-weight: 500;">${t('market_desc')}</p>
                </div>
                <div class="search-bar">
                    <input type="text" class="search-input" placeholder="${t('search_placeholder')}" oninput="state.searchQuery = this.value; render();">
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
                            <button class="btn-login" style="width: 100%; margin-top: 1.5rem; justify-content: center;" onclick="alert('Purchase query sent!')">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg>
                                ${t('btn_contact')}
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `,

    login: () => `
        <section class="login-section fade-in">
            <div class="login-card">
                <h2>Welcome to FarmConnect</h2>
                <p>Join our Digital Aggregation Network!</p>
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

    // Update Navigation Text Dynamically
    document.querySelectorAll('.nav-link').forEach(link => {
        const view = link.dataset.view;
        if (view === 'marketplace') link.innerText = t('nav_marketplace');
        if (view === 'aggregation') link.innerText = t('nav_aggregation');
        if (view === 'logistics') link.innerText = t('nav_logistics');
        if (view === 'training') link.innerText = t('nav_skills');
        if (view === 'registration') link.innerText = t('nav_registration');
        
        link.classList.remove('active');
        if (view === state.view) link.classList.add('active');
    });

    // Update Footer Text (Global)
    const footer = document.querySelector('footer p');
    if (footer) footer.innerText = t('footer_text');

    // Update Language Selector Value
    const langSelector = document.getElementById('lang-selector');
    if (langSelector) langSelector.value = state.lang;

    // Initialize Maps based on view

    // Update User Info Area
    const userInfo = document.getElementById('user-info');
    if (state.user) {
        userInfo.innerHTML = `
            <span style="font-weight: 600;">${t('hello')}, ${state.user}</span>
            <button class="btn-login" style="background: #e63946;" onclick="handleLogout()">${t('logout')}</button>
        `;
    } else {
        const isLoginView = state.view === 'login';
        userInfo.innerHTML = isLoginView ? '' : `<button class="btn-login" onclick="setView('login')">${t('signin')}</button>`;
    }
}

window.changeLanguage = (lang) => {
    state.lang = lang;
    localStorage.setItem('appLang', lang);
    render();
}

// Map Initialization Logic
function initLogisticsMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    // Check if Google is actually loaded and key is valid
    if (typeof google === 'undefined' || !google.maps) {
        renderMockMap('map', 'Logistics Hub: Nellore / Kavali Cluster');
        return;
    }

    try {
        const center = { lat: 14.4426, lng: 79.9865 };
        const map = new google.maps.Map(mapContainer, {
            zoom: 10,
            center: center,
            styles: [
                { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#1b4332" }] },
                { "featureType": "landscape", "stylers": [{ "color": "#f1f5f9" }] },
                { "featureType": "water", "stylers": [{ "color": "#dcfce7" }] }
            ]
        });

        // Add Markers for all Registered Farmers
        state.farmerRegistrations.forEach(farmer => {
            if (farmer.lat && farmer.lng) {
                new google.maps.Marker({
                    position: { lat: farmer.lat, lng: farmer.lng },
                    map: map,
                    title: `${farmer.name} - ${farmer.crop}`,
                    label: farmer.crop[0]
                });
            }
        });
    } catch (e) {
        console.warn("Google Maps failed to initialize:", e);
        renderMockMap('map', 'Logistics Hub (API Connection Issue)');
    }
}

function initRegistrationMap() {
    const mapContainer = document.getElementById('reg-map');
    if (!mapContainer) return;

    if (typeof google === 'undefined' || !google.maps) {
        renderMockMap('reg-map', 'Click to mark farm (Mock Interface Enabled)');
        return;
    }

    try {
        const defaultPos = { lat: 14.4426, lng: 79.9865 };
        const map = new google.maps.Map(mapContainer, {
            zoom: 12,
            center: defaultPos,
            disableDefaultUI: true,
            zoomControl: true
        });

        let marker = null;
        map.addListener('click', (e) => {
            const pos = e.latLng;
            if (marker) marker.setMap(null);
            marker = new google.maps.Marker({ position: pos, map: map });
            document.getElementById('reg-lat').value = pos.lat();
            document.getElementById('reg-lng').value = pos.lng();
        });
    } catch (e) {
        renderMockMap('reg-map', 'Farm Locator (API Connection Issue)');
    }
}

// Visual Fallback when API Key is pending or invalid
function renderMockMap(containerId, label) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div style="height: 100%; background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden;">
            <div style="position: absolute; width: 100%; height: 100%; opacity: 0.1; background-image: radial-gradient(#1b4332 1px, transparent 1px); background-size: 20px 20px;"></div>
            <span style="font-size: 3rem; margin-bottom: 1rem;">🗺️</span>
            <strong style="color: var(--primary); z-index: 1;">${label}</strong>
            <p style="font-size: 0.8rem; color: var(--text-light); text-align: center; padding: 0 2rem; z-index: 1;">
                The platform is ready. To enable live satellite tracking, please ensure your Google Maps API Key has billing enabled in the Google Cloud Console.
            </p>
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem; z-index: 1;">
                 <span class="badge" style="background: #dcfce7; color: #1b4332;">Logic Active</span>
                 <span class="badge" style="background: #fee2e2; color: #991b1b;">API Offline</span>
            </div>
            ${containerId === 'reg-map' ? `
                <button class="btn-login" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.8rem;" onclick="document.getElementById('reg-lat').value=14.44; document.getElementById('reg-lng').value=79.98; alert('GPS Coordinates captured via fallback!')">
                    Simulate Location Capture
                </button>
            ` : ''}
        </div>
    `;
}

// Global Actions (Exposed to window for onclick)
window.setRole = (role, btn) => {
    state.selectedRole = role;
    document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

window.handleLogin = () => {
    state.user = state.selectedRole || 'Farmer';
    setView('aggregation');
}

window.handleLogout = () => {
    state.user = null;
    setView('marketplace');
}

window.handleRegistration = (event) => {
    event.preventDefault();
    const newReg = {
        id: Date.now(),
        name: document.getElementById('reg-name').value,
        village: document.getElementById('reg-village').value,
        phone: document.getElementById('reg-phone').value,
        crop: document.getElementById('reg-crop').value,
        quantity: document.getElementById('reg-qty').value,
        date: document.getElementById('reg-date').value || new Date().toISOString().split('T')[0],
        lat: parseFloat(document.getElementById('reg-lat').value) || 14.4426,
        lng: parseFloat(document.getElementById('reg-lng').value) || 79.9865
    };
    state.farmerRegistrations.push(newReg);
    saveState();
    alert('Registration Successful! Your produce has been added to the aggregation pool.');
    setView('aggregation');
}

window.startVoice = (targetId) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert('Voice recognition not supported in this browser.');
        return;
    }
    const recognition = new SpeechRecognition();
    recognition.onstart = () => {
        alert('Listening... Please say the crop name (e.g. Tomato)');
    };
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById(targetId).value = transcript;
    };
    recognition.start();
}

window.schedulePickup = (farmerId) => {
    const farmer = state.farmerRegistrations.find(f => f.id === farmerId);
    const date = prompt('Enter Pickup Date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
    if (date) {
        state.pickupRequests.push({
            id: Date.now(),
            farmerId: farmerId,
            date: date,
            status: 'Pending',
            village: farmer.village
        });
        saveState();
        alert(`Pickup scheduled for ${farmer.name} on ${date}`);
        setView('logistics');
    }
}

// Initial Navigation Event Handlers
function initNav() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            setView(link.dataset.view);
        });
    });

    const homeLink = document.getElementById('home-link');
    if (homeLink) {
        homeLink.addEventListener('click', () => setView('marketplace'));
    }
}

// Initialize App
initNav();
render();
