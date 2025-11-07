# ExRate - Currency Exchange Rate Converter

A modern, responsive currency exchange rate converter built with HTML, Tailwind CSS, and JavaScript. Features real-time exchange rates, country flags, and a beautiful animated UI.

![ExRate Preview](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Features

- 🌍 **180+ Currencies**: Support for all major and minor world currencies
- 🏳️ **Country Flags**: Visual identification with real flag images
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop
- ⚡ **Real-time Rates**: Live exchange rates from ExchangeRate-API
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- � **Smart Caching**: Reduces API calls with 5-minute cache
- � **Currency Swap**: Quick one-click currency exchange
- 💹 **Popular Rates**: Quick access to frequently used currencies
- ⌨️ **Keyboard Support**: Press Enter to convert instantly
- 🎯 **Auto-conversion**: Real-time conversion as you type

## 🚀 Live Demo

[View Live Demo](https://maksudur20.github.io/exrate/)


## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Vanilla JavaScript**: No frameworks, pure JS
- **Font Awesome**: Icon library
- **ExchangeRate-API**: Real-time exchange rates
- **FlagCDN**: High-quality country flag images

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/20maksudur00/exrate.git
   cd exrate
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server
   npx serve .
   ```

3. **That's it!** No build process or dependencies required.

## 🔧 Configuration

### API Key
The project uses ExchangeRate-API. To use your own API key:

1. Get a free API key from [ExchangeRate-API](https://www.exchangerate-api.com/)
2. Open `script.js`
3. Replace the API key:
   ```javascript
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```

### Customize Popular Currencies
Edit the `POPULAR_CURRENCIES` array in `script.js`:
```javascript
const POPULAR_CURRENCIES = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'MXN'];
```

### Change Color Scheme
Modify Tailwind CSS classes in `index.html`:
- Primary color: `bg-emerald-500` → Change to your preferred color
- Gradient background: Edit CSS in `<style>` section

## 📁 Project Structure

```
exrate/
├── index.html          # Main HTML file
├── script.js          # JavaScript functionality
└── README.md          # Documentation
```

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Key Features Breakdown

### Performance Optimizations
- **API Response Caching**: 5-minute cache reduces unnecessary API calls
- **Debounced Input**: Prevents excessive conversions while typing
- **Lazy Loading**: Efficient currency data loading
- **Minimal DOM Manipulation**: Optimized rendering

### Mobile Optimizations
- Responsive grid layouts (1-3 columns)
- Touch-friendly buttons (44px minimum)
- Auto-scroll to results on mobile
- Optimized font sizes
- Mobile-first design approach

### User Experience
- Real-time conversion as you type
- Visual feedback for all actions
- Loading states and error messages
- Smooth animations and transitions
- Popular currencies quick access
- Flag icons for easy identification

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Maksudur Sium**
- Email: 20maksudur00@gmail.com
- GitHub: [@20maksudur00](https://github.com/20maksudur00)

## 🙏 Acknowledgments

- Exchange rates provided by [ExchangeRate-API](https://www.exchangerate-api.com/)
- Flag images from [FlagCDN](https://flagcdn.com/)
- Icons by [Font Awesome](https://fontawesome.com/)
- Styling by [Tailwind CSS](https://tailwindcss.com/)

## 📊 API Information

This project uses the free tier of ExchangeRate-API which includes:
- 1,500 requests per month
- Daily rate updates
- 180+ currencies
- No credit card required

For higher limits, check [ExchangeRate-API pricing](https://www.exchangerate-api.com/pricing).

## 🐛 Bug Reports

If you discover any bugs, please create an issue on GitHub with:
- Bug description
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)

## 💡 Future Enhancements

- [ ] Historical exchange rate charts
- [ ] Multiple currency conversion
- [ ] Favorite currencies list
- [ ] Dark mode toggle
- [ ] PWA support for offline use
- [ ] Currency conversion history
- [ ] Export conversion results

## 📞 Support

For support, email 20maksudur00@gmail.com or open an issue on GitHub.

---

Made with ❤️ by Maksudur Sium

**⭐ Star this repo if you find it helpful!**
