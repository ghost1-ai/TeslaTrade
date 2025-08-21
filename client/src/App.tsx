import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ChatwayScript } from "@/components/ChatwayScript";
import { FirebaseStatus } from "@/components/FirebaseStatus";
import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-tesla-dark text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-tesla-red rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/">
        {user ? <Dashboard /> : <LandingPage />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <ChatwayScript />
          <FirebaseStatus />
          <AppContent />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
