interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return (
    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-semibold text-gray-600 uppercase">
      {label}
    </span>
  );
}