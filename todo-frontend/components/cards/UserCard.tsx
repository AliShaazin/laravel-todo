import { UserAvatar } from "../UserAvatar";

type UserCardProps = {
  name: string;
};

const UserCard = ({ name }: UserCardProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-xs">
      <section className="flex items-center gap-2">
        <section>
          <UserAvatar name={name} />
        </section>
        <section>
          <h3 className="text-gray-700 ">{name}</h3>
        </section>
      </section>
    </div>
  );
};

export default UserCard;
