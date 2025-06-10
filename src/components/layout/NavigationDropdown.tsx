
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationDropdownProps {
  title: string;
  items: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | null;
  }>;
  activeView: string;
  onViewChange: (view: string) => void;
  className?: string;
}

const getBadgeVariant = (badge: string | null) => {
  if (!badge) return null;
  
  const badgeConfig = {
    'AI': { className: 'bg-green-100 text-green-800 border-green-200' },
    'NEW': { className: 'bg-blue-100 text-blue-800 border-blue-200' },
    'PRO': { className: 'bg-amber-100 text-amber-800 border-amber-200' }
  }[badge];

  return badgeConfig || { className: 'bg-gray-100 text-gray-800' };
};

export function NavigationDropdown({ title, items, activeView, onViewChange, className }: NavigationDropdownProps) {
  const hasActiveItem = items.some(item => item.id === activeView);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={hasActiveItem ? "default" : "ghost"}
          size="sm"
          className={cn(
            "h-10 px-3 text-sm font-medium",
            hasActiveItem ? 
              "bg-primary text-primary-foreground shadow-sm" : 
              "text-muted-foreground hover:text-foreground hover:bg-accent/50",
            className
          )}
        >
          {title}
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background border shadow-lg" align="start">
        <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold">
          {title}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            const badgeConfig = getBadgeVariant(item.badge);
            
            return (
              <DropdownMenuItem
                key={item.id}
                className={cn(
                  "flex items-center gap-2 px-2 py-2 cursor-pointer",
                  isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                )}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1">{item.label}</span>
                {item.badge && badgeConfig && (
                  <Badge className={cn("text-xs h-5", badgeConfig.className)}>
                    {item.badge}
                  </Badge>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
