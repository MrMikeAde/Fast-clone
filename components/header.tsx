'use client';

import { Settings, History } from 'lucide-react';

interface HeaderProps {
  onSettingsClick: () => void;
  onHistoryClick: () => void;
  isTesting: boolean;
}

export function Header({ onSettingsClick, onHistoryClick, isTesting }: HeaderProps) {
  return (
    <header className="glass-effect fixed top-0 left-0 right-0 z-50 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">⚡</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-foreground">SpeedTest</h1>
              <p className="text-xs text-muted-foreground">Internet Speed Test</p>
            </div>
          </div>

          {/* Server Status */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span className="text-muted-foreground">Connected</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onHistoryClick}
              disabled={isTesting}
              className="p-2 hover:bg-secondary rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-muted-foreground hover:text-foreground"
              title="Test History"
            >
              <History size={20} />
            </button>
            <button
              onClick={onSettingsClick}
              disabled={isTesting}
              className="p-2 hover:bg-secondary rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-muted-foreground hover:text-foreground"
              title="Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
