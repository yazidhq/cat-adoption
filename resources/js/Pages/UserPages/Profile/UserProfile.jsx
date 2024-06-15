export default function UserProfile({ auth }) {
  return <p>{auth.user.name}</p>;
}
