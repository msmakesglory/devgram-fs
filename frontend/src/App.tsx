
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import UserPage from "@/test/dashboard.tsx";
import OAuth from "@/test/OAuth.tsx";
import { UserProvider } from "./contexts/UserContext";
import Github from "@/test/Github.tsx";
import {Demo} from "@/test/Demo.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <UserProvider>
          
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Demo />} />
              <Route path="/google" element={<OAuth />} />
              <Route path="/github" element={<Github />} />
              <Route path="/user" element={<UserPage />} />


              {/*<Route path="/" element={<Index />} />*/}
              {/*<Route path="/auth" element={<Auth />} />*/}
              {/*<Route path="/feed" element={<Feed />} />*/}
              {/*<Route path="/profile/:id" element={<Profile />} />*/}
              {/*<Route path="/chat" element={<Chat />} />*/}
              {/*<Route path="/projects" element={<Projects />} />*/}
              {/*/!* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE *!/*/}
              {/*<Route path="*" element={<NotFound />} />*/}
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
