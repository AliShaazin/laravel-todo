"use client";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const GroupCard = () => {
  const pathname = usePathname();

  const paramsGroupId = pathname.split("/").pop();

  return (
    <div className="flex p-4 rounded-lg border border-gray-300 items-center justify-between hover:shadow-sm transition-shadow duration-300">
      <div>
        <h3 className="text-gray-700">Group Name</h3>
        <p className="text-gray-500">Group Description</p>
      </div>
      <Link href={`/groups/1`}>
        <ExternalLink
          size={20}
          className="cursor-pointer text-gray-500 hover:text-green-700 transition-colors duration-300"
        />
      </Link>
    </div>
  );
};

export default GroupCard;
