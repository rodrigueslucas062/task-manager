export const CustomInput = ({ type, name, id, placeholder, value, onChange, icon, secondIcon }) => {
  return (
    <div className="w-full mt-5 relative">
      <span className="absolute inset-y-0 left-3 flex items-center text-white">
        {icon}
      </span>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className="w-full bg-zinc-900 bg-opacity-20 px-10 py-2.5 text-white text-sm tracking-[1px] rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.05)] focus:outline-none"
        value={value}
        onChange={onChange}
      />
      <div>
        {secondIcon}
      </div>
    </div>
  );
}