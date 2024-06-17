export default function Img({ src, classes = "", ...props }) {
  return <img src={src} className={`img-fluid ${classes}`} {...props} />;
}
