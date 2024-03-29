import PropTypes from "prop-types";

function Card({ children, reverse }) {
  // return <div className={`card ${reverse && 'reverse'}`}>{children}</div> // conditional class

  return (
    <div
      className="card"
      style={{
        backgroundColor: reverse ? "rgba(0,0,0,0.4)" : "#fff",
        color: reverse ? "#fff" : "#000",
      }} // conditional styling
      // reversed is good for making a darkmode toggle
    >
      {children}
    </div>
  );
}

Card.defaultProps = {
  reverse: false,
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
};

export default Card;
