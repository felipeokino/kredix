import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './index.css';
import { router } from './routes/routes.ts';
import queryClient from './utils/query.ts';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="flex items-center justify-center h-screen"><span className="text-kredix-text">Loading...</span></div>}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>,
)
