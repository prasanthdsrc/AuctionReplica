import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Home from "@/pages/Home";
import AuctionListing from "@/pages/AuctionListing";
import AuctionDetail from "@/pages/AuctionDetail";
import ProductListing from "@/pages/ProductListing";
import ProductDetail from "@/pages/ProductDetail";
import CategoryListing from "@/pages/CategoryListing";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Selling from "@/pages/Selling";
import PastSales from "@/pages/PastSales";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auctions" component={AuctionListing} />
      <Route path="/auctions/:id" component={AuctionDetail} />
      <Route path="/products" component={ProductListing} />
      <Route path="/products/:id" component={ProductDetail} />
      <Route path="/categories/:slug" component={CategoryListing} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/selling" component={Selling} />
      <Route path="/past-sales" component={PastSales} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
