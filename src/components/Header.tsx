import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {

    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <header>
            <div className="max-w-[1420px] mx-auto max-[1520px]:px-10 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="logo" className="w-6 h-6" />
                    <span className="font-bold text-lg">foo-rum</span>
                </div>

                {user ? (
                    <Button
                        variant="noBackground"
                        size="sm"
                        hoverEffect="grey"
                        onClick={signOut}
                        className="flex items-center gap-2"
                    >
                        <span className="font-semibold text-sm">Sign Out</span>
                        <img src="login.svg" alt="logout" className="w-5 h-5 mr-2" />
                    </Button>
                ) : (
                    <Button
                        variant="noBackground"
                        size="sm"
                        hoverEffect="grey"
                        onClick={() => location.pathname === '/' ? navigate('/signin') : navigate('/')}
                        className="flex items-center gap-2"
                    >
                        <span className="font-semibold text-sm">
                            {
                                location.pathname === '/' ? 'Login' : 'Back to home'
                            }
                        </span>
                        {
                            location.pathname === '/' ? (
                                <img src="login.svg" alt="logout" className="w-5 h-5" />
                            ) : null
                        }
                    </Button>
                )}
            </div>
        </header>
    );
};