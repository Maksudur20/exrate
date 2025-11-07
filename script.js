// API Configuration
const API_KEY = '2428a8da1249300f980cea6b';
const API_URL = 'https://v6.exchangerate-api.com/v6';

// Cache for API responses
let cachedRates = null;
let cachedBaseCurrency = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fetch with timeout and retry logic
async function fetchWithRetry(url, options = {}, retries = 3, timeout = 10000) {
    for (let i = 0; i < retries; i++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            return response;
            
        } catch (error) {
            if (i === retries - 1) throw error;
            
            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        }
    }
}

// Popular currencies to display
const POPULAR_CURRENCIES = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'MXN'];

// Currency names and country codes for flags
const CURRENCY_DATA = {
    'AED': { name: 'UAE Dirham', country: 'ae' },
    'AFN': { name: 'Afghan Afghani', country: 'af' },
    'ALL': { name: 'Albanian Lek', country: 'al' },
    'AMD': { name: 'Armenian Dram', country: 'am' },
    'ANG': { name: 'Netherlands Antillean Guilder', country: 'cw' },
    'AOA': { name: 'Angolan Kwanza', country: 'ao' },
    'ARS': { name: 'Argentine Peso', country: 'ar' },
    'AUD': { name: 'Australian Dollar', country: 'au' },
    'AWG': { name: 'Aruban Florin', country: 'aw' },
    'AZN': { name: 'Azerbaijani Manat', country: 'az' },
    'BAM': { name: 'Bosnia-Herzegovina Mark', country: 'ba' },
    'BBD': { name: 'Barbadian Dollar', country: 'bb' },
    'BDT': { name: 'Bangladeshi Taka', country: 'bd' },
    'BGN': { name: 'Bulgarian Lev', country: 'bg' },
    'BHD': { name: 'Bahraini Dinar', country: 'bh' },
    'BIF': { name: 'Burundian Franc', country: 'bi' },
    'BMD': { name: 'Bermudian Dollar', country: 'bm' },
    'BND': { name: 'Brunei Dollar', country: 'bn' },
    'BOB': { name: 'Bolivian Boliviano', country: 'bo' },
    'BRL': { name: 'Brazilian Real', country: 'br' },
    'BSD': { name: 'Bahamian Dollar', country: 'bs' },
    'BTN': { name: 'Bhutanese Ngultrum', country: 'bt' },
    'BWP': { name: 'Botswana Pula', country: 'bw' },
    'BYN': { name: 'Belarusian Ruble', country: 'by' },
    'BZD': { name: 'Belize Dollar', country: 'bz' },
    'CAD': { name: 'Canadian Dollar', country: 'ca' },
    'CDF': { name: 'Congolese Franc', country: 'cd' },
    'CHF': { name: 'Swiss Franc', country: 'ch' },
    'CLP': { name: 'Chilean Peso', country: 'cl' },
    'CLF': { name: 'Chilean Unit of Account (UF)', country: 'cl' },
    'CNY': { name: 'Chinese Yuan', country: 'cn' },
    'CNH': { name: 'Chinese Yuan (Offshore)', country: 'cn' },
    'COP': { name: 'Colombian Peso', country: 'co' },
    'CRC': { name: 'Costa Rican Colón', country: 'cr' },
    'CUC': { name: 'Cuban Convertible Peso', country: 'cu' },
    'CUP': { name: 'Cuban Peso', country: 'cu' },
    'CVE': { name: 'Cape Verdean Escudo', country: 'cv' },
    'CZK': { name: 'Czech Koruna', country: 'cz' },
    'DJF': { name: 'Djiboutian Franc', country: 'dj' },
    'DKK': { name: 'Danish Krone', country: 'dk' },
    'DOP': { name: 'Dominican Peso', country: 'do' },
    'DZD': { name: 'Algerian Dinar', country: 'dz' },
    'EGP': { name: 'Egyptian Pound', country: 'eg' },
    'ERN': { name: 'Eritrean Nakfa', country: 'er' },
    'ETB': { name: 'Ethiopian Birr', country: 'et' },
    'EUR': { name: 'Euro', country: 'eu' },
    'FJD': { name: 'Fijian Dollar', country: 'fj' },
    'FKP': { name: 'Falkland Islands Pound', country: 'fk' },
    'FOK': { name: 'Faroese Króna', country: 'fo' },
    'GBP': { name: 'British Pound', country: 'gb' },
    'GEL': { name: 'Georgian Lari', country: 'ge' },
    'GGP': { name: 'Guernsey Pound', country: 'gg' },
    'GHS': { name: 'Ghanaian Cedi', country: 'gh' },
    'GIP': { name: 'Gibraltar Pound', country: 'gi' },
    'GMD': { name: 'Gambian Dalasi', country: 'gm' },
    'GNF': { name: 'Guinean Franc', country: 'gn' },
    'GTQ': { name: 'Guatemalan Quetzal', country: 'gt' },
    'GYD': { name: 'Guyanese Dollar', country: 'gy' },
    'HKD': { name: 'Hong Kong Dollar', country: 'hk' },
    'HNL': { name: 'Honduran Lempira', country: 'hn' },
    'HRK': { name: 'Croatian Kuna', country: 'hr' },
    'HTG': { name: 'Haitian Gourde', country: 'ht' },
    'HUF': { name: 'Hungarian Forint', country: 'hu' },
    'IDR': { name: 'Indonesian Rupiah', country: 'id' },
    'ILS': { name: 'Israeli Shekel', country: 'il' },
    'IMP': { name: 'Isle of Man Pound', country: 'im' },
    'INR': { name: 'Indian Rupee', country: 'in' },
    'IQD': { name: 'Iraqi Dinar', country: 'iq' },
    'IRR': { name: 'Iranian Rial', country: 'ir' },
    'ISK': { name: 'Icelandic Krona', country: 'is' },
    'JEP': { name: 'Jersey Pound', country: 'je' },
    'JMD': { name: 'Jamaican Dollar', country: 'jm' },
    'JOD': { name: 'Jordanian Dinar', country: 'jo' },
    'JPY': { name: 'Japanese Yen', country: 'jp' },
    'KES': { name: 'Kenyan Shilling', country: 'ke' },
    'KGS': { name: 'Kyrgyzstani Som', country: 'kg' },
    'KHR': { name: 'Cambodian Riel', country: 'kh' },
    'KID': { name: 'Kiribati Dollar', country: 'ki' },
    'KMF': { name: 'Comorian Franc', country: 'km' },
    'KPW': { name: 'North Korean Won', country: 'kp' },
    'KRW': { name: 'South Korean Won', country: 'kr' },
    'KWD': { name: 'Kuwaiti Dinar', country: 'kw' },
    'KYD': { name: 'Cayman Islands Dollar', country: 'ky' },
    'KZT': { name: 'Kazakhstani Tenge', country: 'kz' },
    'LAK': { name: 'Lao Kip', country: 'la' },
    'LBP': { name: 'Lebanese Pound', country: 'lb' },
    'LKR': { name: 'Sri Lankan Rupee', country: 'lk' },
    'LRD': { name: 'Liberian Dollar', country: 'lr' },
    'LSL': { name: 'Lesotho Loti', country: 'ls' },
    'LYD': { name: 'Libyan Dinar', country: 'ly' },
    'MAD': { name: 'Moroccan Dirham', country: 'ma' },
    'MDL': { name: 'Moldovan Leu', country: 'md' },
    'MGA': { name: 'Malagasy Ariary', country: 'mg' },
    'MKD': { name: 'Macedonian Denar', country: 'mk' },
    'MMK': { name: 'Myanmar Kyat', country: 'mm' },
    'MNT': { name: 'Mongolian Tögrög', country: 'mn' },
    'MOP': { name: 'Macanese Pataca', country: 'mo' },
    'MRU': { name: 'Mauritanian Ouguiya', country: 'mr' },
    'MUR': { name: 'Mauritian Rupee', country: 'mu' },
    'MVR': { name: 'Maldivian Rufiyaa', country: 'mv' },
    'MWK': { name: 'Malawian Kwacha', country: 'mw' },
    'MXN': { name: 'Mexican Peso', country: 'mx' },
    'MYR': { name: 'Malaysian Ringgit', country: 'my' },
    'MZN': { name: 'Mozambican Metical', country: 'mz' },
    'NAD': { name: 'Namibian Dollar', country: 'na' },
    'NGN': { name: 'Nigerian Naira', country: 'ng' },
    'NIO': { name: 'Nicaraguan Córdoba', country: 'ni' },
    'NOK': { name: 'Norwegian Krone', country: 'no' },
    'NPR': { name: 'Nepalese Rupee', country: 'np' },
    'NZD': { name: 'New Zealand Dollar', country: 'nz' },
    'OMR': { name: 'Omani Rial', country: 'om' },
    'PAB': { name: 'Panamanian Balboa', country: 'pa' },
    'PEN': { name: 'Peruvian Sol', country: 'pe' },
    'PGK': { name: 'Papua New Guinean Kina', country: 'pg' },
    'PHP': { name: 'Philippine Peso', country: 'ph' },
    'PKR': { name: 'Pakistani Rupee', country: 'pk' },
    'PLN': { name: 'Polish Zloty', country: 'pl' },
    'PYG': { name: 'Paraguayan Guarani', country: 'py' },
    'QAR': { name: 'Qatari Riyal', country: 'qa' },
    'RON': { name: 'Romanian Leu', country: 'ro' },
    'RSD': { name: 'Serbian Dinar', country: 'rs' },
    'RUB': { name: 'Russian Ruble', country: 'ru' },
    'RWF': { name: 'Rwandan Franc', country: 'rw' },
    'SAR': { name: 'Saudi Riyal', country: 'sa' },
    'SBD': { name: 'Solomon Islands Dollar', country: 'sb' },
    'SCR': { name: 'Seychellois Rupee', country: 'sc' },
    'SDG': { name: 'Sudanese Pound', country: 'sd' },
    'SEK': { name: 'Swedish Krona', country: 'se' },
    'SGD': { name: 'Singapore Dollar', country: 'sg' },
    'SHP': { name: 'Saint Helena Pound', country: 'sh' },
    'SLE': { name: 'Sierra Leonean Leone', country: 'sl' },
    'SLL': { name: 'Sierra Leonean Leone (Old)', country: 'sl' },
    'SOS': { name: 'Somali Shilling', country: 'so' },
    'SRD': { name: 'Surinamese Dollar', country: 'sr' },
    'SSP': { name: 'South Sudanese Pound', country: 'ss' },
    'STN': { name: 'São Tomé and Príncipe Dobra', country: 'st' },
    'SVC': { name: 'Salvadoran Colón', country: 'sv' },
    'SYP': { name: 'Syrian Pound', country: 'sy' },
    'SZL': { name: 'Eswatini Lilangeni', country: 'sz' },
    'THB': { name: 'Thai Baht', country: 'th' },
    'TJS': { name: 'Tajikistani Somoni', country: 'tj' },
    'TMT': { name: 'Turkmenistani Manat', country: 'tm' },
    'TND': { name: 'Tunisian Dinar', country: 'tn' },
    'TOP': { name: 'Tongan Paʻanga', country: 'to' },
    'TRY': { name: 'Turkish Lira', country: 'tr' },
    'TTD': { name: 'Trinidad & Tobago Dollar', country: 'tt' },
    'TVD': { name: 'Tuvaluan Dollar', country: 'tv' },
    'TWD': { name: 'Taiwan Dollar', country: 'tw' },
    'TZS': { name: 'Tanzanian Shilling', country: 'tz' },
    'UAH': { name: 'Ukrainian Hryvnia', country: 'ua' },
    'UGX': { name: 'Ugandan Shilling', country: 'ug' },
    'USD': { name: 'US Dollar', country: 'us' },
    'UYU': { name: 'Uruguayan Peso', country: 'uy' },
    'UZS': { name: 'Uzbekistani Som', country: 'uz' },
    'VES': { name: 'Venezuelan Bolívar', country: 've' },
    'VND': { name: 'Vietnamese Dong', country: 'vn' },
    'VUV': { name: 'Vanuatu Vatu', country: 'vu' },
    'WST': { name: 'Samoan Tala', country: 'ws' },
    'XAF': { name: 'Central African CFA Franc', country: 'cm' },
    'XCD': { name: 'East Caribbean Dollar', country: 'ag' },
    'XCG': { name: 'Caribbean Guilder', country: 'cw' },
    'XDR': { name: 'IMF Special Drawing Rights', country: 'un' },
    'XOF': { name: 'West African CFA Franc', country: 'sn' },
    'XPF': { name: 'CFP Franc', country: 'pf' },
    'YER': { name: 'Yemeni Rial', country: 'ye' },
    'ZAR': { name: 'South African Rand', country: 'za' },
    'ZMW': { name: 'Zambian Kwacha', country: 'zm' },
    'ZWL': { name: 'Zimbabwean Dollar', country: 'zw' }
};

// Helper function to get flag image URL
function getFlagUrl(currency) {
    const currData = CURRENCY_DATA[currency];
    if (!currData) return 'https://flagcdn.com/w40/xx.png'; // Default flag
    return `https://flagcdn.com/w40/${currData.country}.png`;
}

// Fallback for currencies without specific data
const CURRENCY_NAMES = Object.fromEntries(
    Object.entries(CURRENCY_DATA).map(([code, data]) => [code, data.name])
);

// DOM Elements
const elements = {
    amount: document.getElementById('amount'),
    fromCurrency: document.getElementById('fromCurrency'),
    toCurrency: document.getElementById('toCurrency'),
    convertBtn: document.getElementById('convertBtn'),
    swapBtn: document.getElementById('swapBtn'),
    refreshBtn: document.getElementById('refreshBtn'),
    result: document.getElementById('result'),
    resultText: document.getElementById('resultText'),
    rateInfo: document.getElementById('rateInfo'),
    lastUpdate: document.getElementById('lastUpdate'),
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    errorText: document.getElementById('errorText'),
    popularRates: document.getElementById('popularRates'),
    popularLoading: document.getElementById('popularLoading'),
    fromFlag: document.getElementById('fromFlag'),
    toFlag: document.getElementById('toFlag')
};

// Initialize the app
async function init() {
    try {
        await loadCurrencies();
        await loadPopularRates();
        setupEventListeners();
        
        // Perform initial conversion
        await convertCurrency();
    } catch (error) {
        showError('Failed to initialize the app. Please refresh the page.');
        console.error('Initialization error:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    elements.convertBtn.addEventListener('click', convertCurrency);
    elements.swapBtn.addEventListener('click', swapCurrencies);
    elements.refreshBtn.addEventListener('click', refreshData);
    
    // Real-time conversion on input change
    elements.amount.addEventListener('input', debounce(convertCurrency, 500));
    elements.fromCurrency.addEventListener('change', async () => {
        updateFlagIcon('from');
        await loadCurrencies(elements.fromCurrency.value);
        await convertCurrency();
    });
    elements.toCurrency.addEventListener('change', () => {
        updateFlagIcon('to');
        convertCurrency();
    });

    // Enter key to convert
    elements.amount.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            convertCurrency();
        }
    });
}

// Update flag icon when currency changes
function updateFlagIcon(type) {
    const currency = type === 'from' ? elements.fromCurrency.value : elements.toCurrency.value;
    const flagElement = type === 'from' ? elements.fromFlag : elements.toFlag;
    const flagUrl = getFlagUrl(currency);
    flagElement.src = flagUrl;
    flagElement.alt = `${currency} flag`;
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Load currencies from API
async function loadCurrencies(baseCurrency = 'USD') {
    try {
        // Check cache first
        if (cachedRates && cachedBaseCurrency === baseCurrency && 
            cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
            populateCurrencyDropdowns(cachedRates, baseCurrency);
            return;
        }

        const response = await fetchWithRetry(`${API_URL}/${API_KEY}/latest/${baseCurrency}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.result !== 'success') {
            throw new Error(data['error-type'] || 'Failed to fetch currencies');
        }

        // Cache the response
        cachedRates = data.conversion_rates;
        cachedBaseCurrency = baseCurrency;
        cacheTimestamp = Date.now();

        populateCurrencyDropdowns(data.conversion_rates, baseCurrency);
        
    } catch (error) {
        if (error.name === 'AbortError') {
            showError('Request timeout. Please check your connection and try again.');
        } else {
            showError('Failed to load currencies. Please check your connection.');
        }
        console.error('Error loading currencies:', error);
    }
}

// Populate currency dropdowns
function populateCurrencyDropdowns(rates, baseCurrency) {
    const currencies = Object.keys(rates).sort();
    const fromValue = elements.fromCurrency.value || baseCurrency;
    const toValue = elements.toCurrency.value || (baseCurrency === 'USD' ? 'EUR' : 'USD');

    // Populate From Currency
    elements.fromCurrency.innerHTML = currencies.map(currency => {
        const currData = CURRENCY_DATA[currency];
        const name = currData ? currData.name : currency;
        return `<option value="${currency}" ${currency === fromValue ? 'selected' : ''} data-flag="${getFlagUrl(currency)}">
            ${currency} - ${name}
        </option>`;
    }).join('');

    // Populate To Currency
    elements.toCurrency.innerHTML = currencies.map(currency => {
        const currData = CURRENCY_DATA[currency];
        const name = currData ? currData.name : currency;
        return `<option value="${currency}" ${currency === toValue ? 'selected' : ''} data-flag="${getFlagUrl(currency)}">
            ${currency} - ${name}
        </option>`;
    }).join('');
}

// Convert currency
async function convertCurrency() {
    try {
        const amount = parseFloat(elements.amount.value);
        const from = elements.fromCurrency.value;
        const to = elements.toCurrency.value;

        if (isNaN(amount) || amount < 0) {
            showError('Please enter a valid amount');
            return;
        }

        showLoading(true);
        hideError();
        elements.result.classList.add('hidden');

        // Get rates from cache or API
        let rates = cachedRates;
        if (!rates || cachedBaseCurrency !== from) {
            const response = await fetchWithRetry(`${API_URL}/${API_KEY}/latest/${from}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.result !== 'success') {
                throw new Error(data['error-type'] || 'Conversion failed');
            }

            rates = data.conversion_rates;
            cachedRates = rates;
            cachedBaseCurrency = from;
            cacheTimestamp = Date.now();
        }

        const rate = rates[to];
        if (!rate) {
            throw new Error('Exchange rate not found');
        }

        const result = (amount * rate).toFixed(2);
        
        // Format numbers with commas
        const formattedAmount = amount.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
        const formattedResult = parseFloat(result).toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });

        // Display result
        elements.resultText.innerHTML = `
            <span class="text-gray-600">${formattedAmount}</span> ${from} = 
            <span class="text-emerald-700">${formattedResult}</span> ${to}
        `;
        
        elements.rateInfo.textContent = `Exchange Rate: 1 ${from} = ${rate.toFixed(4)} ${to}`;
        elements.lastUpdate.textContent = `Last updated: ${new Date().toLocaleString()}`;
        
        elements.result.classList.remove('hidden');
        
        // Smooth scroll to result on mobile
        if (window.innerWidth < 768) {
            setTimeout(() => {
                elements.result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
        
    } catch (error) {
        if (error.name === 'AbortError') {
            showError('Request timeout. Please check your connection and try again.');
        } else if (error.message.includes('HTTP error')) {
            showError('Unable to connect to exchange rate service. Please try again later.');
        } else {
            showError('Conversion failed. Please try again.');
        }
        console.error('Conversion error:', error);
    } finally {
        showLoading(false);
    }
}

// Load popular exchange rates
async function loadPopularRates() {
    try {
        elements.popularLoading.classList.remove('hidden');
        elements.popularRates.innerHTML = '';

        const response = await fetchWithRetry(`${API_URL}/${API_KEY}/latest/USD`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.result !== 'success') {
            throw new Error(data['error-type'] || 'Failed to fetch rates');
        }

        const rates = data.conversion_rates;
        
        elements.popularRates.innerHTML = POPULAR_CURRENCIES.map(currency => {
            const rate = rates[currency];
            const currData = CURRENCY_DATA[currency];
            const flagUrl = getFlagUrl(currency);
            const name = currData ? currData.name : currency;
            
            return `
                <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-emerald-300"
                     onclick="selectCurrency('${currency}')">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center space-x-3">
                            <img src="${flagUrl}" alt="${currency} flag" class="w-10 h-7 object-cover rounded shadow-sm" onerror="this.style.display='none'">
                            <div>
                                <p class="font-bold text-lg text-gray-800">${currency}</p>
                                <p class="text-xs text-gray-500">${name}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-xl font-bold text-emerald-600">${rate.toFixed(4)}</p>
                            <p class="text-xs text-gray-500">per USD</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

    } catch (error) {
        const errorMessage = error.name === 'AbortError' 
            ? 'Request timeout. Please refresh the page.' 
            : 'Failed to load popular rates';
        
        elements.popularRates.innerHTML = `
            <div class="col-span-full text-center text-red-600 py-4">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                ${errorMessage}
            </div>
        `;
        console.error('Error loading popular rates:', error);
    } finally {
        elements.popularLoading.classList.add('hidden');
    }
}

// Select currency from popular rates
function selectCurrency(currency) {
    elements.toCurrency.value = currency;
    updateFlagIcon('to'); // Update the flag when currency is selected
    convertCurrency();
    
    // Smooth scroll to converter
    document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
}

// Swap currencies
function swapCurrencies() {
    const fromValue = elements.fromCurrency.value;
    const toValue = elements.toCurrency.value;
    
    elements.fromCurrency.value = toValue;
    elements.toCurrency.value = fromValue;
    
    // Reload currencies with new base and convert
    loadCurrencies(toValue).then(() => {
        convertCurrency();
    });
    
    // Add animation effect
    elements.swapBtn.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        elements.swapBtn.style.transform = 'rotate(0deg)';
    }, 300);
}

// Refresh all data
async function refreshData() {
    // Clear cache
    cachedRates = null;
    cachedBaseCurrency = null;
    cacheTimestamp = null;
    
    // Add spin animation
    elements.refreshBtn.querySelector('i').classList.add('animate-pulse-custom');
    
    try {
        await Promise.all([
            loadCurrencies(elements.fromCurrency.value),
            loadPopularRates(),
            convertCurrency()
        ]);
        
        // Show success feedback
        const originalText = elements.refreshBtn.innerHTML;
        elements.refreshBtn.innerHTML = '<i class="fas fa-check mr-2"></i><span class="hidden sm:inline">Updated!</span>';
        
        setTimeout(() => {
            elements.refreshBtn.innerHTML = originalText;
        }, 2000);
        
    } catch (error) {
        showError('Failed to refresh data');
        console.error('Refresh error:', error);
    } finally {
        setTimeout(() => {
            elements.refreshBtn.querySelector('i').classList.remove('animate-pulse-custom');
        }, 1000);
    }
}

// Show loading state
function showLoading(show) {
    if (show) {
        elements.loading.classList.remove('hidden');
        elements.convertBtn.disabled = true;
        elements.convertBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        elements.loading.classList.add('hidden');
        elements.convertBtn.disabled = false;
        elements.convertBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// Show error message
function showError(message) {
    elements.errorText.textContent = message;
    elements.error.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

// Hide error message
function hideError() {
    elements.error.classList.add('hidden');
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Service Worker for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker registration failed, but app still works
        });
    });
}
