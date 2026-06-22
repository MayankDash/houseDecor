import { Spinner } from "@/components/ui/Spinner";
import { APP_NAME } from "@/utils/constants";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-50 gap-4">
      <span className="text-2xl font-display font-semibold tracking-tight text-stone-950">
        {APP_NAME}
      </span>
      <Spinner size="md" className="text-stone-400" />
    </div>
  );
}
