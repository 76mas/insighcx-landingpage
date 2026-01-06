export const Container = ({ children, className = "" }) => {
  return (
    <div className={`w-full max-w-[1130px] px-2.5 ${className}`}>
      {children}
    </div>
  );
};
