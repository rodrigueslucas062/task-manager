import Navbar from "../Navbar/Navbar";
import { BackgroundAnimated } from "./BackgroundAnimated";

export const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>
        <BackgroundAnimated />
        {children}
      </main>
    </div>
  );
};
