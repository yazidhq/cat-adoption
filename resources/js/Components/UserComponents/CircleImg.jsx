export default function CircleImg({ img, width }) {
  return (
    <img
      src={img}
      className="img-fluid rounded-circle img-thumbnail border-dark"
      width={width}
    />
  );
}
