import React, { useState } from 'react';
import { Menu, X, Bell, User, Briefcase, BellRing } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, role, setRole, notifications, markNotificationsAsRead }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'about', label: 'À Propos' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsOpen(false);
    setShowNotifDropdown(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full glass bg-white/80 border-b border-gray-200/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-start gap-2.5 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <img
              src="/logo.png"
              alt="AGRILOC"
              className="h-9 w-auto object-contain flex-shrink-0 mt-0.5 transition-transform hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-bold font-outfit tracking-tight text-agri-dark">
                AGRI<span className="text-agri-light">LOC</span>
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase mt-1">
                TOGO AGRITECH
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activePage === item.id
                    ? 'text-white bg-agri-green shadow-sm'
                    : 'text-gray-600 hover:text-agri-green hover:bg-gray-100/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Buttons, Notifications & Role Selection */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifDropdown(!showNotifDropdown);
                  if (unreadCount > 0) markNotificationsAsRead();
                }}
                className="p-2.5 text-gray-500 hover:text-agri-green hover:bg-gray-100/60 rounded-xl relative transition-all"
              >
                <Bell className="h-5.5 w-5.5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 block h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifDropdown && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-gray-800 text-sm">Notifications récents</span>
                    <BellRing className="h-4 w-4 text-agri-light" />
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-6 text-center text-xs text-gray-400">
                        Aucune notification pour le moment.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div 
                          key={n.id} 
                          onClick={() => {
                            setActivePage(n.targetPage);
                            setShowNotifDropdown(false);
                          }}
                          className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 cursor-pointer transition-colors"
                        >
                          <p className="text-xs font-semibold text-gray-800">{n.text}</p>
                          <span className="text-[10px] text-gray-400 block mt-1">{n.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Link Dashboards based on role */}
            <button 
              onClick={() => handleNavClick('farmer')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center border transition-all ${
                activePage === 'farmer' 
                  ? 'bg-agri-light text-white border-transparent shadow-sm'
                  : 'bg-white text-agri-green border-agri-green/20 hover:bg-agri-green/5'
              }`}
            >
              <User className="h-4 w-4 mr-2" />
              Espace Agriculteur
            </button>

            <button 
              onClick={() => handleNavClick('supplier')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center border transition-all ${
                activePage === 'supplier'
                  ? 'bg-agri-dark text-white border-transparent shadow-sm'
                  : 'bg-white text-agri-dark border-agri-dark/20 hover:bg-agri-dark/5'
              }`}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Espace Fournisseur
            </button>

            {/* Interactive Selector role (Badge indicator) */}
            <div className="bg-gray-100/80 px-3 py-1.5 rounded-full text-xs font-bold text-gray-600 border border-gray-200">
              Rôle Actuel: <span className="text-agri-green uppercase">{role === 'farmer' ? 'Agriculteur' : 'Fournisseur'}</span>
            </div>
          </div>

          {/* Mobile hamburger icon */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Notification Bell Mobile */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifDropdown(!showNotifDropdown);
                  if (unreadCount > 0) markNotificationsAsRead();
                }}
                className="p-2 text-gray-500 rounded-xl"
              >
                <Bell className="h-5.5 w-5.5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 block h-3.5 w-3.5 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifDropdown && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 font-bold text-gray-800 text-xs">Notifications</div>
                  <div className="max-h-48 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-4 text-center text-xs text-gray-400">Aucun message.</div>
                    ) : (
                      notifications.map((n) => (
                        <div key={n.id} onClick={() => { setActivePage(n.targetPage); setShowNotifDropdown(false); }} className="px-4 py-2 hover:bg-gray-50 text-xs border-b border-gray-50">
                          <p className="font-semibold text-gray-800">{n.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-agri-green hover:bg-gray-100 rounded-xl"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200/40 bg-white/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-3 shadow-inner">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-semibold ${
                  activePage === item.id
                    ? 'text-white bg-agri-green'
                    : 'text-gray-600 hover:text-agri-green hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-3 flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('farmer')}
              className="w-full px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center bg-agri-light text-white"
            >
              <User className="h-4 w-4 mr-2" />
              Espace Agriculteur
            </button>
            <button
              onClick={() => handleNavClick('supplier')}
              className="w-full px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center bg-agri-dark text-white"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Espace Fournisseur
            </button>
            <div className="text-center text-xs font-semibold text-gray-400 pt-2">
              Mode démo : <span className="text-agri-green uppercase">{role === 'farmer' ? 'Agriculteur' : 'Fournisseur'}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
