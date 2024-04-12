import EmptyState from "../../components/EmptyState";

interface Props {}

const User: React.FC<Props> = () => {
  return (
    <div className="hidden h-full lg:block lg:pl-80">
      <EmptyState />
    </div>
  );
};

export default User;
