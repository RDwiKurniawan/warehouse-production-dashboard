# Warehouse & Production Dashboard

A realtime warehouse and production monitoring dashboard built with React.js 19, featuring stock management, production tracking, and real-time updates.

## 🚀 Live Demo

[**View Live Application**](https://warehouse-production-dashboard.vercel.app/)

## ✨ Features

- 📊 **Real-time Stock Monitoring** - Auto-updates every 4 seconds with simulated data changes
- 🏭 **Production Process Tracking** - Complete workflow: Cutting → Sawing → Finishing
- 📈 **Interactive Charts** - Beautiful stock distribution pie chart using Recharts
- 📱 **Fully Responsive** - Optimized for both desktop and mobile devices
- ✅ **Smart Form Validation** - Comprehensive error handling and user feedback
- ⚡ **Modern React 19** - Built with latest React features and hooks
- 🎯 **Production Ready** - Clean code architecture and proper error boundaries

## 🛠 Tech Stack

- **Frontend**: React.js 19.1.1
- **Build Tool**: Vite 7.1.7
- **Charts**: Recharts 3.2.1
- **Styling**: CSS3 with Flexbox/Grid
- **Deployment**: Vercel
- **Package Manager**: npm

## 📸 Application Preview

### Dashboard Overview
![Dashboard](https://via.placeholder.com/800x400/3498db/ffffff?text=Warehouse+Dashboard)
*Real-time stock monitoring with production controls*

### Stock Management
- **Raw Materials**: Fabric A, Thread with live quantity updates
- **Work in Progress (WIP)**: Cutting, Sawing, Finishing stages
- **Finished Goods**: Completed product inventory

### Production Features
- Production form with process type selection
- Real-time production time estimation
- Stock validation and error handling
- Interactive production workflow

## 📦 Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/RDwiKurniawan/warehouse-production-dashboard.git

# Navigate to project directory
cd warehouse-production-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

Open http://localhost:5173 to view the application.

Available Scripts
bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint for code quality
🏗 Project Structure
text
warehouse-production-dashboard/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Card/           # Card container component
│   │   ├── StockSummary/   # Stock overview with real-time updates
│   │   ├── ProductionForm/ # Production input form with validation
│   │   └── StockChart/     # Interactive pie chart visualization
│   ├── services/           # Business logic and data services
│   │   └── productionService.js  # Production estimation & validation
│   ├── hooks/             # Custom React hooks
│   │   └── useAutoStock.js      # Real-time stock management hook
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles and responsive design
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration
└── index.html            # HTML template
🎯 Technical Implementation
React Hooks Usage
useState - Component state management

useEffect - Side effects and real-time updates

useMemo - Optimized chart data calculations

Custom useAutoStock - Real-time stock simulation

Async/Await Implementation
javascript
// Production time estimation
const handleEstimate = async () => {
  const minutes = await estimateProductionTime(processType, quantity);
  setEstimate(minutes);
};
Error Handling
Form input validation

Stock availability checks

Production process validation

Graceful error recovery

Responsive Design
Mobile-first CSS approach

Flexible grid layouts

Adaptive component sizing

Touch-friendly interfaces

🔧 Core Components
StockSummary
Real-time stock monitoring across three categories

Visual indicators for low/out-of-stock items

Responsive grid layout

ProductionForm
Process type selection (Cutting, Sawing, Finishing)

Quantity validation and stock checking

Production time estimation

Form submission with error handling

StockChart
Interactive pie chart using Recharts

Real-time data visualization

Responsive chart container

Color-coded categories

📊 Data Flow
Real-time Updates: Auto-stock hook simulates live data changes

User Input: Production form captures manufacturing requests

Validation: Service layer validates stock availability

Processing: Stock updates propagate through the system

Visualization: Charts and summaries update in real-time

🎨 Features in Detail
Real-time Simulation
Stock quantities change automatically every 4 seconds

WIP items move between production stages

Visual feedback for all stock changes

Production Workflow
Cutting: Convert raw materials to WIP

Sawing: Process cutting stage outputs

Finishing: Convert WIP to finished goods

Error Handling
Form validation with user-friendly messages

Stock availability checks before production

Network error simulation and handling

Graceful fallbacks for missing data

🌐 Deployment
This project is automatically deployed to Vercel on every push to the main branch.

Production URL: https://warehouse-production-dashboard.vercel.app/

Deployment Process
Push code to GitHub main branch

Vercel automatically triggers build

Build process: npm run build

Deployment to global CDN

Instant availability worldwide

🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
Dwi Kurniawan

GitHub: @RDwiKurniawan

Project: Warehouse Production Dashboard

🙏 Acknowledgments
React team for the amazing framework

Vercel for seamless deployment

Recharts for beautiful data visualization

Vite for fast development experience
