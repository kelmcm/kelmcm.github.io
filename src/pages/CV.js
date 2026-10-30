const EXPERIENCE = [
  {
    role: "Senior Data Engineer",
    organization: "Etsy",
    dates: "Oct 2024 – Aug 2026"
  },
  {
    role: "Data Engineer",
    organization: "Etsy",
    dates: "Feb 2023 – Sep 2024"
  },
  {
    role: "Data Analyst",
    organization: "Bus.com",
    dates: "Jul 2019 – Aug 2021"
  },
  {
    role: "Operations Manager",
    organization: "District 3 Innovation Centre",
    dates: "Jan 2017 – Jun 2019"
  }
];

const EDUCATION = [
  {
    degree: "Master of Information Systems Management, Business Intelligence and Data Analytics",
    institution: "Carnegie Mellon Univiersity",
    dates: "Sep 2021 – Dec 2022"
  },
  {
    degree: "Bachelor of Commerce, Business Technology Management",
    institution: "Concordia University",
    dates: "Sep 2014 – Jun 2018"
  }
];

const CV = ({ resumeUrl }) => {
  return (
    <div>
      <table className="cv-table">
        <thead>
          <tr>
            <th>Experience</th>
            <th>Company</th>
            <th>Dates</th>
          </tr>
        </thead>
        <tbody>
          {EXPERIENCE.map((item) => (
            <tr key={`${item.organization}-${item.role}`}>
              <td>{item.role}</td>
              <td>{item.organization}</td>
              <td className="cv-dates">{item.dates}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="cv-table">
        <thead>
          <tr>
            <th>Education</th>
            <th>Institution</th>
            <th>Dates</th>
          </tr>
        </thead>
        <tbody>
          {EDUCATION.map((item) => (
            <tr key={`${item.institution}-${item.degree}`}>
              <td>{item.degree}</td>
              <td>{item.institution}</td>
              <td className="cv-dates">{item.dates}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p> Download my <a
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
          download="Kelly_McManus_CV.pdf">
          most recent CV
        </a>.
      </p>
    </div>
  );
};

export default CV;
