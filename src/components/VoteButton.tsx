'use client';

import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VoteButton() {
  return (
    <Button
      variant="default"
      size="lg"
      onClick={() => window.open(process.env.NEXT_PUBLIC_VOTE_URL || 'https://explorer.xprnetwork.org/vote?producers=chaininfra', '_blank')}
      className="bg-cyber-green hover:bg-cyber-green/90 text-white px-8 py-3"
    >
      <Activity className="w-5 h-5 mr-2" />
      Vote Now
    </Button>
  );
}