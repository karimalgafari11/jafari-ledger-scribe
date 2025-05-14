
/**
 * Re-export toast functionality from the hooks directory
 * This maintains backwards compatibility while organizing code better
 */
import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };
