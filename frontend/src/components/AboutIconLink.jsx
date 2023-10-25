import { FaQuestion } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function AboutIconLink() {
  return (
    <div className="about-link">
      <Link to="/about">
        <FaQuestion size={30} />
      </Link>
      {/* for any internal links use Link not a to avoid page refreshes */}
    </div>
  );
}

export default AboutIconLink;
