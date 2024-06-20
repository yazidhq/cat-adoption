export default function OrangeButton({
  type = "button",
  children,
  onClick = () => {},
  is_users_adoption,
}) {
  return (
    <button
      type={type}
      className="btn btn-orange"
      onClick={onClick}
      disabled={is_users_adoption === true ? true : false}
    >
      {is_users_adoption === true ? "INI MILIK ANDA" : children}
    </button>
  );
}
