export default function SelectOption({ children, nameId, ...props }) {
  return (
    <select
      name={nameId}
      id={nameId}
      className="w-full border-gray-300 focus:ring-0 focus:ring-inset focus:ring-indigo-600 rounded-md"
      {...props}
    >
      {children}
    </select>
  );
}
