// layouts/AppLayout.jsx
import Sidebar from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";

const AppLayout = ({ children, isSidebar, setIsSidebar }) => (
  <div className="app">
    <Sidebar isSidebar={isSidebar} />
    <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
      {children}
    </main>
  </div>
);

export default AppLayout;
