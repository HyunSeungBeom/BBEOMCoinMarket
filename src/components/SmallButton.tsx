export const SmallButton = ({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick: VoidFunction;
  className?: string;
}) => {
  return (
    <div>
      <button
        className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-3 rounded ${className}`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};
