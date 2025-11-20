

import { removeAuthToken } from '@/api/utils/token';
import { Button } from '@/components/ui/button';
import { BookOpen, Library, BookMarked, BookUp, BookDown, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';


export function NavBar() {
  const pathname = useLocation();
  const router = useNavigate();

  const handleLogout = () => {
    removeAuthToken();
    router('/login', {
      replace: true
    });
  };

  const navItems = [
    { href: '/books', label: 'All Books', icon: BookOpen },
    { href: '/books/my-books', label: 'My Books', icon: Library },
    { href: '/books/borrowed', label: 'Borrowed', icon: BookDown },
    { href: '/books/returned', label: 'Returned', icon: BookUp },
  ];

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/books" className="flex items-center gap-2">
              <BookMarked className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">BookSocial</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.pathname === item.href;
                return (
                  <Link key={item.href} to={item.href}>
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      className="gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

          <Button variant="ghost" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
