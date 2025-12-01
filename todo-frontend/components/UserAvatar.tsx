import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function UserAvatar({ name }: { name: string }) {
  return (
    <div className="flex flex-row flex-wrap items-center gap-12">
      <Avatar>
        <AvatarFallback className="bg-green-600 text-white">
          {name.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
