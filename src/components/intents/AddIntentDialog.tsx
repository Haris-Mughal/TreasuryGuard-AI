import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAgent } from "@/contexts/AgentContext";

export default function AddIntentDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { addIntent } = useAgent();
  const [condition, setCondition] = useState<string>("price_drop");
  const [action, setAction] = useState<string>("buy_near");
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitting(true);
    try {
      await addIntent({ condition: condition as any, action: action as any, last: undefined });
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Add Intent</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm text-muted-foreground">Condition</label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Select condition" /></SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="price_drop">Price drops 5%</SelectItem>
                <SelectItem value="stake_idle">Stake idle assets</SelectItem>
                <SelectItem value="rebalance">Rebalance to 50% stables</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-muted-foreground">Action</label>
            <Select value={action} onValueChange={setAction}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Select action" /></SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="buy_near">Buy NEAR</SelectItem>
                <SelectItem value="swap_usdt">Swap to USDT</SelectItem>
                <SelectItem value="stake">Stake</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button variant="hero" onClick={submit} disabled={submitting}>{submitting ? "Adding…" : "Add Intent"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
