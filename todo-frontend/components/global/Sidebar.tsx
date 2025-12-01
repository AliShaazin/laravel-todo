import UserCard from "../cards/UserCard";
import { getUsers } from "@/actions/actions";

const users = await getUsers();

const Sidebar = () => {
  return (
    <aside className="sticky top-0 min-h-screen bg-gray-100 py-20 px-5 z-10 w-64 flex flex-col gap-8">
      <h2 className="text-gray-700 text-center">Users</h2>
      <section className="flex flex-col gap-2">
        {users.map((user) => (
          <UserCard key={user.id} name={user.name} />
        ))}
      </section>
    </aside>
  );
};

export default Sidebar;
