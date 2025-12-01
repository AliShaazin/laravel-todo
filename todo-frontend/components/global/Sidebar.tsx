import UserCard from "../cards/UserCard";
import { getUsers } from "@/actions/actions";
import GroupCard from "../cards/GroupCard";
import { Plus } from "lucide-react";

const users = await getUsers();

const Sidebar = () => {
  return (
    <aside className="sticky top-0 min-h-screen bg-gray-100 py-20 px-5 z-10 w-64 flex flex-col gap-8">
      <Header title="Users" />
      <Container>
        {users &&
          users.map((user) => <UserCard key={user.id} name={user.name} />)}
      </Container>

      <Header title="Your Groups" addButton={true} />
      <Container>
        <GroupCard />
      </Container>
    </aside>
  );
};

export default Sidebar;

const Header = ({
  title,
  addButton,
}: {
  title: string;
  addButton?: boolean;
}) => {
  return (
    <h2 className="text-gray-700 text-center flex items-center justify-center gap-3">
      {title}
      {addButton && (
        <button className=" text-green-600 hover:text-green-700 cursor-pointer">
          <Plus />
        </button>
      )}
    </h2>
  );
};

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};
