import { motion } from "framer-motion";

export const CalendarEvent = ({
  event,
  onClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any;
  onClick: () => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${event.color} text-white text-xs p-1.5 rounded cursor-pointer`}
    >
      <div className="font-medium truncate">{event.title}</div>
      <div className="text-xs opacity-90">
        {event.date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </motion.div>
  );
};
