
import { Badge } from "@/components/ui/badge";
import { JournalStatus } from "@/types/journal";

interface JournalStatusBadgeProps {
  status: JournalStatus;
}

export const JournalStatusBadge: React.FC<JournalStatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: JournalStatus) => {
    switch (status) {
      case 'draft':
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'approved':
        return "bg-green-100 text-green-800 border-green-200";
      case 'canceled':
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: JournalStatus) => {
    switch (status) {
      case 'draft':
        return "مسودة";
      case 'approved':
        return "معتمد";
      case 'canceled':
        return "ملغي";
      default:
        return status;
    }
  };

  return (
    <Badge className={`${getStatusColor(status)} whitespace-nowrap`}>
      {getStatusText(status)}
    </Badge>
  );
};
