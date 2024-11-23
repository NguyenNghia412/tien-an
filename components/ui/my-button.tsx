interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const MyButton: React.FC<MyButtonProps> = ({ label, ...props }) => {
  return (
    <button
      {...props}
      className={`px-5 py-2 bg-blue-600 text-white text-sm lg:text-base uppercase rounded-md font-semibold whitespace-nowrap ${props.className}`}
    >
      {label}
    </button>
  );
};

export default MyButton;
