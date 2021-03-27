import "./styles/button.css";

const Button = ({ text, func }) => {
  return (
    <button className={"custom-btn btn-11"} onClick={func}>
      {text}
    </button>
  );
};

export default Button;
