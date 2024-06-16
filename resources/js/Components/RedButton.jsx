export default function RedButton({ type, className, children }) {
  return (
    <button
      type={type}
      className={`${className} bg-red p-2 text-white rounded-lg flex items-center space-x-1`}
    >
      {children}
    </button>
  );
}
