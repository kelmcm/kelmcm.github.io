const Home = ({ site }) => {
  return (
    <div>
     <p>Hello, I'm Kelly! I am a data engineer based out of Montréal, Québec. I build data systems that spark insight and help make decisions.</p>
     <p>Currently, I am participating in the coding retreat at the <a href="https://www.recurse.com/" target="_blank" rel="noreferrer">Recurse Center</a>, focusing on streaming data pipelines.</p>
     <p className="social-links">
        <a href={site.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        {" · "}
        <a href={`mailto:${site.email}`}>Email</a>
        {" · "}
        <a href={site.github} target="_blank" rel="noreferrer">
          GitHub
        </a>

      </p>
    </div>
  );
};

export default Home;
