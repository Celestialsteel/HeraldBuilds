import avatar1 from '../components/pages/images/avatars/avatar1.jpg';
import avatar2 from '../components/pages/images/avatars/avatar2.jpg';
import avatar3 from '../components/pages/images/avatars/avatar3.jpg';
import avatar4 from '../components/pages/images/avatars/avatar4.jpg';

const OurTeam = () => {
  const teamMembers = [
    {
      imgSrc: avatar1,
      name: "Sheel Chudasama",
      role: "Co-Founder & Technical Lead",
      bio: "Expert in PC hardware optimization and system architecture design"
    },
    {
      imgSrc: avatar2,
      name: "Denley Kipkoech",
      role: "Co-Founder & Content Strategist",
      bio: "Specializes in creating comprehensive PC building guides and tutorials"
    },
    {
      imgSrc: avatar3,
      name: "Griffin Sitati",
      role: "Co-Founder & UX Designer",
      bio: "Focuses on making PC building knowledge accessible through intuitive design"
    },
    {
      imgSrc: avatar4,
      name: "Ian Kabachia",
      role: "Co-Founder & Development Lead",
      bio: "Drives the technical development of our platform and troubleshooting tools"
    }
  ];

  return (
    <section className="team">
      <h2>Meet Our Creators</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <img src={member.imgSrc} alt={member.name} className="team-photo" />
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p className="bio">{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;