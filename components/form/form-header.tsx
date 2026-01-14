"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { VoysusLogo } from "../voysus-logo";
import { Button } from "../ui/button";

interface FormHeaderProps {
  onSave: () => void;
}

export function FormHeader({ onSave }: FormHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Home</span>
        </Link>

        <Link href="/" className="flex items-center gap-2">
          <VoysusLogo size={100} className="text-primary" />
        </Link>

        <Button variant="ghost" size="sm" onClick={onSave} className="gap-2">
          <Save className="h-4 w-4" />
          <span className="hidden sm:inline">Save & Exit</span>
        </Button>
      </div>
    </header>
  );
}
