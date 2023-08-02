type Props = {
  boxName: string;
};

export default function Header({ boxName }: Props) {
  return (
    <header className={`flex items-center gap-x-2 bg-gray-200 px-4 py-2`}>
      <div className="flex-grow">
        <div className="flex items-center gap-x-2">
          {/* BOX INFO */}
          <div className="flex-grow">
            <h1 className="line-clamp-1 text-center font-display text-sm font-bold tracking-wider">{boxName}</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
