import { People } from "./People";

const peoples: People[] = [
  {
    id: "1",
    name: "John Doe",
    role: "instructor",
    email: "john.doe@example.com",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "student",
    email: "jane.smith@example.com",
  },
  {
    id: "3",
    name: "Alice Johnson",
    role: "student",
    email: "alice.johnson@example.com",
  },
  {
    id: "4",
    name: "Bob Williams",
    role: "moderator",
    email: "bob.williams@example.com",
  },
  {
    id: "5",
    name: "Charlie Brown",
    role: "admin",
    email: "charlie@gmail.com",
  },
];

export function PeoplesTab() {
  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col items-center justify-center  ">
        <div className="space-y-4 w-full">
          {peoples.length > 0 ? (
            [...peoples]
              .sort((a, b) => {
                const roleOrder: Record<string, number> = {
                  instructor: 1,
                  admin: 2,
                  moderator: 3,
                  student: 4,
                };
                return (roleOrder[a.role] ?? 99) - (roleOrder[b.role] ?? 99);
              })
              .map((per) => <People key={per.id} people={per} />)
          ) : (
            <FallBackPeoples />
          )}
        </div>
      </div>
    </div>
  );
}

function FallBackPeoples() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 text-gray-400 dark:text-gray-500">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          No people assigned to this course
        </p>
      </div>
    </div>
  );
}
