import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OrderEco from "./pages/OrderEco";
import OrderOriginal from "./pages/OrderOriginal";
import ChunghwaTelecom from "./pages/ChunghwaTelecom";
import TaiwanBank from "./pages/TaiwanBank";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/order/eco" element={<OrderEco />} />
          <Route path="/order/original" element={<OrderOriginal />} />
          <Route path="/chunghwa-telecom" element={<ChunghwaTelecom />} />
          <Route path="/taiwan-bank" element={<TaiwanBank />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
