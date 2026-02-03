import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Stats {
  totalUsers: number;
  activeUsers: number;
  greenRoomUsers: number;
  redRoomUsers: number;
  totalMatches: number;
  validatedMatches: number;
  totalMessages: number;
  averageTrustScore: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await api.get('/admin/stats/overview');
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          color="blue"
          icon="👥"
        />
        <StatCard
          title="Active Users (24h)"
          value={stats?.activeUsers || 0}
          color="green"
          icon="🟢"
        />
        <StatCard
          title="Total Matches"
          value={stats?.totalMatches || 0}
          color="purple"
          icon="💑"
        />
        <StatCard
          title="Avg Trust Score"
          value={stats?.averageTrustScore || 0}
          color="yellow"
          icon="⭐"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Room Distribution</h2>
          <div className="space-y-4">
            <RoomBar
              label="Green Room (Steady)"
              count={stats?.greenRoomUsers || 0}
              total={stats?.totalUsers || 1}
              color="green"
            />
            <RoomBar
              label="Red Room (Ephemeral)"
              count={stats?.redRoomUsers || 0}
              total={stats?.totalUsers || 1}
              color="red"
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Match Statistics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Matches</span>
              <span className="text-white font-bold">{stats?.totalMatches || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Validated Matches</span>
              <span className="text-white font-bold">{stats?.validatedMatches || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Messages</span>
              <span className="text-white font-bold">{stats?.totalMessages || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Validation Rate</span>
              <span className="text-white font-bold">
                {stats?.totalMatches
                  ? Math.round((stats.validatedMatches / stats.totalMatches) * 100)
                  : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-900 bg-opacity-30 border border-blue-600 rounded-lg p-6">
        <h3 className="text-blue-400 font-bold mb-2">🎉 Welcome to Hushpair Admin!</h3>
        <p className="text-blue-300 mb-4">
          The system is fully operational. You have 3 test users ready to explore.
        </p>
        <div className="space-y-2 text-sm text-blue-200">
          <div>• <strong>Ayşe Yılmaz</strong> (Green Room, Trust: 95)</div>
          <div>• <strong>ScorpioMoon_4729</strong> (Red Room Mystery, Trust: 88)</div>
          <div>• <strong>Mehmet Kaya</strong> (Green Room, Trust: 45 - Low)</div>
        </div>
        <p className="text-blue-300 mt-4">
          Next step: Go to <strong>Configuration</strong> to set up your API keys!
        </p>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  color: string;
  icon: string;
}

function StatCard({ title, value, color, icon }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    yellow: 'bg-yellow-600',
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm">{title}</span>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className={`text-3xl font-bold text-white`}>
        {value.toLocaleString()}
      </div>
    </div>
  );
}

interface RoomBarProps {
  label: string;
  count: number;
  total: number;
  color: string;
}

function RoomBar({ label, count, total, color }: RoomBarProps) {
  const percentage = Math.round((count / total) * 100);
  const colorClass = color === 'green' ? 'bg-green-600' : 'bg-red-600';

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white">{count} ({percentage}%)</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={`${colorClass} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
