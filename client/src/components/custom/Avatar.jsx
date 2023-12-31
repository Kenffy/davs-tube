import noprofile from "../../assets/img/default.png";

export default function Avatar({ src, size, radius }) {
  const styles = {
    height: size ? `${size}px` : "40px",
    width: size ? `${size}px` : "40px",
    borderRadius: "50%" || radius,
    overflow: "hidden",
  };
  return (
    <div className="avatar" style={styles}>
      <img
        src={src ? src : noprofile}
        alt="avatar"
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
      />
    </div>
  );
}
