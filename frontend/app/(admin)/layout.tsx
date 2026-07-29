import DashboardLayout from "@/components/navbar/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <DashboardLayout

      role="admin"

      user={{
        name: "John Doe",
        email: "admin@gmail.com",
      }}

    >
<ToastContainer 
        position="top-right"       
        autoClose={3000}           
        hideProgressBar={false}    
        newestOnTop={true}         
        closeOnClick={true}        
        rtl={false}                
        pauseOnFocusLoss={false}   
        draggable={true}           
        pauseOnHover={true}       
        theme="colored"           
      />
      {children}

    </DashboardLayout>

  );

}