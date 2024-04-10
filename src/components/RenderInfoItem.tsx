export const RenderInfoItem: React.FC<{
  title?: string;
  children: React.ReactNode;
}> = ({ children, title }) => {
  if (!title) {
    return null;
  }

  return (
    <div className="flex w-full gap-1">
      <div className="font-semibold">{title}</div>
      <div className="text-gray-600"> {children || 'No info'}</div>
    </div>
  );
};
