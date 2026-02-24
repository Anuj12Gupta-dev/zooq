import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { authservice } from '../main';
import { useAppData } from '../context/AppContext';
import type { Role } from '../types';

const ROLES: { value: Role; label: string; icon: string; description: string }[] = [
  {
    value: 'customer',
    label: 'Customer',
    icon: '🛍️',
    description: 'Browse and order from local stores near you.',
  },
  {
    value: 'rider',
    label: 'Rider',
    icon: '🏍️',
    description: 'Deliver orders and earn on your schedule.',
  },
  {
    value: 'seller',
    label: 'Seller',
    icon: '🏪',
    description: 'List your products and start selling today.',
  },
];

const SelectRole = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAppData();
  const navigate = useNavigate();

  const handleNext = async () => {
    if (!selectedRole) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const { data } = await axios.put(
        `${authservice}/api/auth/add-role`,
        { role: selectedRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      if (data.user) {
        setUser(data.user);
      }

      navigate('/');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to set role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Who are you?</h1>
          <p className="text-white/50 text-sm">Select a role to get started. You can change this later.</p>
        </div>

        {/* Role Cards */}
        <div className="flex flex-col gap-3 mb-8">
          {ROLES.map((role) => {
            const isSelected = selectedRole === role.value;
            return (
              <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                aria-pressed={isSelected}
                className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-200 outline-none cursor-pointer
                  ${isSelected
                    ? 'border-violet-500 bg-violet-500/15 shadow-[0_0_0_3px_rgba(139,92,246,0.25)]'
                    : 'border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]'
                  }`}
              >
                <span className="text-3xl flex-shrink-0">{role.icon}</span>

                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-white font-semibold text-base">{role.label}</span>
                  <span className="text-white/45 text-xs mt-0.5">{role.description}</span>
                </div>

                {isSelected && (
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!selectedRole || loading}
          className={`w-full py-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200
            ${selectedRole && !loading
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-[1.01] cursor-pointer'
              : 'bg-white/[0.06] text-white/25 cursor-not-allowed'
            }`}
        >
          {loading ? 'Setting up...' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default SelectRole;