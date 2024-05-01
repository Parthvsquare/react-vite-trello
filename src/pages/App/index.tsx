import { ThemeProvider } from "@/components/theme-provider";
import AppRouter from "@/router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
