import React from 'react';

const BackgroundGradient: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-violet-400/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 dark:opacity-20"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 dark:opacity-20"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-tr from-blue-400/20 via-indigo-400/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 dark:opacity-20"></div>
    </div>
  );
};

export default BackgroundGradient;