'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { checkHealth } from '@/lib/api';
import { Wifi, WifiOff } from 'lucide-react';

export default function HealthStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const online = await checkHealth();
        setIsOnline(online);
        setShowStatus(!online);
      } catch (error) {
        setIsOnline(false);
        setShowStatus(true);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {showStatus && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-0 left-0 right-0 z-50 p-3 text-center text-sm font-medium ${
            isOnline 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            {isOnline ? (
              <Wifi className="h-4 w-4" />
            ) : (
              <WifiOff className="h-4 w-4" />
            )}
            <span>
              {isOnline ? 'Back Online' : 'You are offline'}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}