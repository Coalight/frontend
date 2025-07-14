import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export const SubmitButton = ({
  isSubmitting = false,
}: {
  isSubmitting?: boolean;
}) => (
  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
    <Button
      type="submit"
      disabled={isSubmitting}
      className="relative"
      aria-label={isSubmitting ? "Creating course..." : "Create course"}
    >
      <AnimatePresence>
        {isSubmitting && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="h-5 w-5 border-2 border-white/50 border-t-white rounded-full"
            />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="dark:text-gray-900 group-disabled:text-gray-900 transition-opacity opacity-100">
        Create Course
      </span>
    </Button>
  </motion.div>
);
