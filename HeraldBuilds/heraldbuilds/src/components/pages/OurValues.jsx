import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBookReader, 
  faHandsHelping, 
  faCheckCircle, 
  faGlobe 
} from '@fortawesome/free-solid-svg-icons';

const OurValues = () => {
  const values = [
    {
      icon: faBookReader,
      title: "Education First",
      description: "We believe in explaining the 'why' behind every step, helping you understand your PC better"
    },
    {
      icon: faHandsHelping,
      title: "Community Support",
      description: "Our community of experts is always ready to help you overcome any PC building challenge"
    },
    {
      icon: faCheckCircle,
      title: "Reliability",
      description: "All our guides and solutions are thoroughly tested and regularly updated"
    },
    {
      icon: faGlobe,
      title: "Global Access",
      description: "Making PC building knowledge accessible to everyone, everywhere"
    }
  ];

  return (
    <section className="values">
      <h2>Our Values</h2>
      <div className="values-grid">
        {values.map((value, index) => (
          <div className="value-card" key={index}>
            <FontAwesomeIcon icon={value.icon} size="2x" />
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurValues;