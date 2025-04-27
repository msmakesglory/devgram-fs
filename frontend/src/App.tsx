
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./contexts/UserContext";
import Developers from "./pages/Developers";


const queryClient = new QueryClient();
const App = () => {


  return <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* <AuthProvider> */}
        <UserProvider>
          <Toaster/>
          <Sonner/>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index/>}/>
              <Route path='/u/:uid' element={<Profile/>}/>
              <Route path="*" element={<NotFound/>}/>
              <Route path="/projects" element={<Projects/>}/>
              <Route path="/auth" element={<Auth/>}/>
              <Route path="/feed" element={<Feed/>}/>
              <Route path="/chat" element={<Chat/>}/>
              <Route path="/developers" element={<Developers/>}/>
            </Routes>
          </BrowserRouter>
        </UserProvider>
      {/* </AuthProvider> */}
    </TooltipProvider>
  </QueryClientProvider>
};

export default App;
