# KS Jewellery Calculator

A comprehensive jewellery price and interest calculator app built with React and TailwindCSS.

## Features

### 🥇 Gold Calculator
- Set today's gold rate
- Calculate jewellery prices with wastage and making cost
- GST calculation
- Print/download bills

### 🥈 Silver Calculator  
- Set today's silver rate
- Calculate silver jewellery prices
- Wastage and making cost calculations
- GST calculation

### 💰 Interest Calculator
- Calculate interest for gold and silver loans
- Date range selection
- Different interest rates based on metal type and amount
- Gold: 2.5% (< ₹5,000) or 2% (≥ ₹5,000) per month
- Silver: 3% per month

## Mobile Features

- 📱 **Responsive Design**: Works on all screen sizes
- 🎯 **Touch-Friendly**: Optimized for mobile devices
- 📱 **PWA Ready**: Can be installed as mobile app
- 🔄 **Navigation**: Easy switching between calculators

## Technical Details

- **Framework**: React 18.2.0
- **Styling**: TailwindCSS 3.1.0
- **Build Tool**: Create React App
- **Mobile**: Capacitor for APK generation
- **Package ID**: com.ksjewellery.calculator

## Installation

```bash
# Clone the repository
git clone https://github.com/Praveen-Kumar-s98s/KS-CALCULATOR.git

# Navigate to project directory
cd KS-CALCULATOR

# Install dependencies
npm install

# Start development server
npm start
```

## Building for Production

```bash
# Build React app
npm run build

# Generate APK (requires Android Studio)
npm run build-apk
```

## APK Generation

The app can be built as an Android APK using Capacitor:

1. **Build the React app**: `npm run build`
2. **Copy to Android**: `npx cap copy`
3. **Open Android Studio**: `npx cap open android`
4. **Build APK**: Use Android Studio's build tools

## Usage

1. **Set Metal Rate**: Enter today's gold/silver rate
2. **Add Item Details**: Weight, wastage, making cost
3. **Calculate**: Get instant price breakdown
4. **Print Bills**: Generate professional invoices
5. **Interest Calculator**: Calculate loan interest with date ranges

## Features Highlights

- ✅ **Input Stability**: No more value changes during typing
- ✅ **Mobile Optimized**: Perfect for phones and tablets
- ✅ **Professional Bills**: Clean print format
- ✅ **Local Storage**: Saves metal rates for convenience
- ✅ **Indian Formatting**: Rupee symbols and number formatting

## Built By

**Praveen Kumar (SPK)**

## License

This project is licensed under the MIT License.
