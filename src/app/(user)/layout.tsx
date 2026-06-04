import Footer from "@/components/shared/Footer/footer";
import UserNavbar from "@/components/shared/Navbar/userNavbar";


const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-white">
            <UserNavbar/>
            {children}
            <Footer/>
        </div>
    );
};

export default UserLayout;