import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ToolCard from './ToolCard';
import ComponentCard from './ComponentCard';
import HardwareGridItem from './HardwareGridItem';
import SafetyTip from './SafetyTip';

// Import images
import heroImage from './images/backgrounds/sdl-sanjaya-hero-bg.webp';
import screwdriverImage from './images/tools/screwdriver.jpg';
import thermalPasteImage from './images/tools/paste.webp';
import antiStaticImage from './images/tools/strap.webp';
import zipTiesImage from './images/tools/ties.webp';
import compressedAirImage from './images/tools/air.webp';
import flashlightImage from './images/tools/light.webp';
import sataImage from './images/tools/sata.webp';
import psuImage from './images/tools/psu.webp';
import caseImage from './images/tools/case2.webp';
import caseFansImage from './images/tools/case.webp';
import mountingImage from './images/tools/motherboard-mounts.webp';
import drivesImage from './images/tools/drives.webp';
import coolerImage from './images/tools/cooler.webp';

// Import CSS
import './Styles/tools-styles.css';

const ToolsPage = () => {
  const [adminTools, setAdminTools] = useState([]);
  const [adminComponents, setAdminComponents] = useState([]);
  const [adminHardware, setAdminHardware] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  //ORIGINAL TOOLS
  const tools = [
    {
      image: screwdriverImage,
      title: 'Phillips Head Screwdriver',
      description: 'The most essential tool for PC building. Used for mounting motherboards, drives, and other components.',
      tips: [
        'Use a magnetic tip for easier handling',
        'Size #2 works for most PC screws'
      ]
    },
    {
      image: thermalPasteImage,
      title: 'Thermal Paste',
      description: 'Ensures proper heat dissipation from the CPU or GPU to the cooler.',
      tips: [
        'Apply a pea-sized amount',
        'Spread evenly for best results'
      ]
    },
    {
      image: antiStaticImage,
      title: 'Anti-Static Wrist Strap',
      description: 'Prevents static electricity from damaging sensitive components.',
      tips: [
        'Wear it on your wrist and connect it to a grounded surface',
        'Use it whenever handling components'
      ]
    },
    {
      image: zipTiesImage,
      title: 'Cable Zip Ties',
      description: 'Keeps cables organized and untangled.',
      tips: [
        'Use to secure loose cables',
        'Cut excess length to avoid interference'
      ]
    },
    {
      image: compressedAirImage,
      title: 'Compressed Air Canister',
      description: 'Cleans dust and debris from components and case.',
      tips: [
        'Use short bursts to avoid moisture buildup',
        'Hold can upright to prevent propellant discharge'
      ]
    },
    {
      image: flashlightImage,
      title: 'Flashlight or Headlamp',
      description: 'Illuminates dark areas inside the PC case.',
      tips: [
        'Use a bright, focused beam',
        'LED flashlights are recommended'
      ]
    }
  ];
//ORIGINAL COMPONENTS
  const components = [
    {
      image: sataImage,
      title: 'SATA Connections',
      description: 'Essential for connecting storage drives.',
      tips: [
        'Secure both ends firmly',
        'Route cables neatly',
        'Check motherboard compatibility'
      ]
    },
    {
      image: psuImage,
      title: 'Power Supply Unit (PSU)',
      description: 'Supplies power to all components.',
      tips: [
        'Choose a PSU with enough wattage for your build',
        'Modular PSUs help with cable management'
      ]
    },
    {
      image: caseImage,
      title: 'PC Case',
      description: 'Houses all the components.',
      tips: [
        'Ensure it has good airflow',
        'Check GPU clearance'
      ]
    }
  ];
// HARDWARE ITEMS
  const hardwareItems = [
    {
      image: caseFansImage,
      title: 'Case Fans',
      specs: [
        { label: 'Sizes:', value: '120mm, 140mm' },
        { label: 'Types:', value: 'Airflow, Static Pressure' },
        { label: 'Connectors:', value: '3-pin, 4-pin PWM' }
      ]
    },
    {
      image: mountingImage,
      title: 'Motherboard Mounting',
      specs: [
        { label: 'Standoffs:', value: 'Included with case' },
        { label: 'Screws:', value: 'Use provided screws' }
      ]
    },
    {
      image: drivesImage,
      title: 'Storage Drives',
      specs: [
        { label: 'HDD/SSD:', value: '2.5" or 3.5"' },
        { label: 'NVMe:', value: 'M.2 slot required' }
      ]
    },
    {
      image: coolerImage,
      title: 'CPU Cooler',
      specs: [
        { label: 'Type:', value: 'Air or Liquid' },
        { label: 'Socket Compatibility:', value: 'Check CPU socket type' }
      ]
    }
  ];

  // ORIGINAL SAFETY TIPS 
  const safetyTips = [
    {
      icon: 'fas fa-bolt',
      title: 'Ground Yourself',
      description: 'Always work on a non-conductive surface and ground yourself before handling components.'
    },
    {
      icon: 'fas fa-exclamation-triangle',
      title: 'Be Aware of Capacitors',
      description: 'Some components like power supplies and motherboards can hold a charge. Be cautious when handling.'
    },
    {
      icon: 'fas fa-eye',
      title: 'Check Your Work',
      description: 'Double-check all connections and screws before powering on your PC.'
    }
  ];

  // Helper function to get appropriate image for admin items
  const getAdminItemImage = (item, category) => {
    // If item has a specific image, try to use it
    if (item.image) {
      // Check if it's a full URL or just a filename
      if (item.image.startsWith('http')) {
        return item.image;
      }
      // Try to construct path to image
      try {
        return require(`./images/tools/${item.image}`);
      } catch {
        // Fall back to default images
      }
    }
    
    // Default images based on category
    switch (category) {
      case 'tools':
        return screwdriverImage;
      case 'components':
        return sataImage;
      case 'hardware':
        return caseFansImage;
      default:
        return screwdriverImage;
    }
  };

  // Fetch additional items from admin (categorized)
  const fetchAdminTools = async () => {
    try {
      const response = await fetch('http://localhost/heraldbuilds/apis/tools/get.php');
      const data = await response.json();
      
      if (response.ok && Array.isArray(data)) {
        // Categorize admin items
        const categorizedItems = {
          tools: [],
          components: [],
          hardware: []
        };

        data.forEach(item => {
          const category = item.category || 'tools';
          
          // Check if item already exists in original data
          const existsInOriginal = 
            (category === 'tools' && tools.some(original => 
              original.title.toLowerCase().includes(item.title.toLowerCase()))) ||
            (category === 'components' && components.some(original => 
              original.title.toLowerCase().includes(item.title.toLowerCase()))) ||
            (category === 'hardware' && hardwareItems.some(original => 
              original.title.toLowerCase().includes(item.title.toLowerCase())));

          if (!existsInOriginal) {
            const processedItem = {
              ...item,
              image: getAdminItemImage(item, category),
              tips: Array.isArray(item.tips) ? item.tips : 
                    (item.tips ? item.tips.split('\n').filter(tip => tip.trim()) : []),
              specs: item.specs || []
            };
            
            categorizedItems[category].push(processedItem);
          }
        });

        setAdminTools(categorizedItems.tools);
        setAdminComponents(categorizedItems.components);
        setAdminHardware(categorizedItems.hardware);
        setLastUpdated(new Date().toLocaleTimeString());
        
        const totalNew = categorizedItems.tools.length + categorizedItems.components.length + categorizedItems.hardware.length;
        console.log('✅ Admin items loaded:', {
          tools: categorizedItems.tools.length,
          components: categorizedItems.components.length,
          hardware: categorizedItems.hardware.length,
          total: totalNew
        });
      }
    } catch (err) {
      console.error('Error fetching admin tools:', err);
      // Silently fail - original content still works
    }
  };

  // Initial load
  useEffect(() => {
    fetchAdminTools();
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchAdminTools();
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  return (
    <div className="tools-page">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="tools-hero"
        style={{ 
          background: `linear-gradient(rgba(14, 19, 32, 0.8), rgba(14, 19, 32, 0.9)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container">
          <h1>Essential PC Building Tools</h1>
          <p>Everything you need to build your PC safely and efficiently</p>
          
           {/*Auto-refresh controls*/}
          {(adminTools.length > 0 || adminComponents.length > 0 || adminHardware.length > 0) && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              margin: '1rem 0',
              fontSize: '12px',
              color: '#94a3b8'
            }}>
              <span>✨ {adminTools.length + adminComponents.length + adminHardware.length} additional items from admin</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                />
                Auto-update
              </label>
              {lastUpdated && <span>Updated: {lastUpdated}</span>}
            </div>
          )}
        </div>
      </section>

      {/* ORIGINAL TOOLS GRID*/}
      <section className="tools-grid container">
        {tools.map((tool, index) => (
          <ToolCard key={index} {...tool} />
        ))}
        
        {/* Additional admin tools (if any) */}
        {adminTools.map((tool, index) => (
          <ToolCard 
            key={`admin-tool-${index}`} 
            image={tool.image}
            title={tool.title}
            description={tool.description}
            tips={tool.tips}
          />
        ))}
      </section>

      {/* ORIGINAL COMPONENTS SECTION*/}
      <section className="components-section container">
        <h2>Essential PC Components</h2>
        <p>Common components and accessories for PC building</p>
        <div className="components-grid">
          {components.map((component, index) => (
            <ComponentCard key={index} {...component} />
          ))}
          
          {/* Additional admin components (if any) */}
          {adminComponents.map((component, index) => (
            <ComponentCard 
              key={`admin-component-${index}`} 
              image={component.image}
              title={component.title}
              description={component.description}
              tips={component.tips}
            />
          ))}
        </div>
      </section>

      {/* ORIGINAL HARDWARE GRID*/}
      <section className="hardware-grid container">
        <h2>Hardware Components</h2>
        <p>Essential hardware components for your PC build</p>
        <div className="grid-container">
          {hardwareItems.map((item, index) => (
            <HardwareGridItem key={index} {...item} />
          ))}
          
          {/* Additional admin hardware (if any) */}
          {adminHardware.map((item, index) => (
            <HardwareGridItem 
              key={`admin-hardware-${index}`} 
              image={item.image}
              title={item.title}
              specs={item.specs.length > 0 ? item.specs : 
                item.tips.map((tip, i) => ({ 
                  label: `Tip ${i + 1}:`, 
                  value: tip 
                }))
              }
            />
          ))}
        </div>
      </section>

      {/* ORIGINAL SAFETY SECTION*/}
      <section className="tools-guide container">
        <h2>Safety First!</h2>
        <div className="safety-tips">
          {safetyTips.map((tip, index) => (
            <SafetyTip key={index} {...tip} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ToolsPage;