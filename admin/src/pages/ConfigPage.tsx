import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function ConfigPage() {
  const [config, setConfig] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('api-keys');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const data = await api.get('/admin/config');
      setConfig(data);
    } catch (error) {
      console.error('Failed to fetch config:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApiKey = async (key: string, value: string) => {
    try {
      await api.post('/admin/config/api-key', { key, value });
      alert('API key updated successfully!');
      fetchConfig();
    } catch (error) {
      alert('Failed to update API key');
    }
  };

  const toggleFeature = async (feature: string, enabled: boolean) => {
    try {
      await api.put('/admin/config/feature-toggle', { feature, enabled });
      fetchConfig();
    } catch (error) {
      alert('Failed to toggle feature');
    }
  };

  const updateLimit = async (limit: string, value: number) => {
    try {
      await api.put('/admin/config/app-limit', { limit, value });
      alert('Limit updated successfully!');
      fetchConfig();
    } catch (error) {
      alert('Failed to update limit');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">System Configuration</h1>

      {/* Tabs */}
      <div className="flex space-x-2 bg-gray-800 p-2 rounded-lg mb-6">
        {['api-keys', 'features', 'limits', 'payment'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {tab === 'api-keys' && 'API Keys'}
            {tab === 'features' && 'Features'}
            {tab === 'limits' && 'App Limits'}
            {tab === 'payment' && 'Payment'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'api-keys' && <APIKeysTab config={config} onUpdate={updateApiKey} />}
      {activeTab === 'features' && <FeaturesTab config={config} onToggle={toggleFeature} />}
      {activeTab === 'limits' && <LimitsTab config={config} onUpdate={updateLimit} />}
      {activeTab === 'payment' && <PaymentTab config={config} />}
    </div>
  );
}

function APIKeysTab({ config, onUpdate }: any) {
  const [editing, setEditing] = useState<string | null>(null);
  const [value, setValue] = useState('');

  const apiKeys = [
    { key: 'facetecKey', label: 'FaceTec API Key', required: false },
    { key: 'googleMapsKey', label: 'Google Maps API Key', required: true },
    { key: 'twilioSid', label: 'Twilio Account SID', required: true },
    { key: 'twilioToken', label: 'Twilio Auth Token', required: true },
    { key: 'twilioPhone', label: 'Twilio Phone Number', required: true },
    { key: 'fcmServerKey', label: 'FCM Server Key', required: true },
    { key: 'stripeSecretKey', label: 'Stripe Secret Key', required: false },
    { key: 's3AccessKey', label: 'AWS S3 Access Key', required: false },
    { key: 's3SecretKey', label: 'AWS S3 Secret Key', required: false },
    { key: 's3BucketName', label: 'AWS S3 Bucket Name', required: false },
  ];

  const handleSave = (key: string) => {
    onUpdate(key, value);
    setEditing(null);
    setValue('');
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-4">API Keys & Credentials</h2>
      <p className="text-gray-400 mb-6">All keys are encrypted at rest with AES-256.</p>

      <div className="space-y-4">
        {apiKeys.map(({ key, label, required }) => (
          <div key={key} className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <label className="text-white font-medium">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
            </div>

            {editing === key ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="flex-1 bg-gray-600 text-white px-4 py-2 rounded"
                  placeholder={`Enter ${label}`}
                />
                <button
                  onClick={() => handleSave(key)}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
                >
                  Save
                </button>
                <button
                  onClick={() => { setEditing(null); setValue(''); }}
                  className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded text-white"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="password"
                  value={config[key] || ''}
                  disabled
                  className="flex-1 bg-gray-600 text-gray-400 px-4 py-2 rounded"
                  placeholder={config[key] ? '••••••••••••••••' : 'Not configured'}
                />
                <button
                  onClick={() => setEditing(key)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                >
                  {config[key] ? 'Update' : 'Set'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturesTab({ config, onToggle }: any) {
  const features = [
    {
      key: 'faceVerificationEnabled',
      label: 'Face Verification',
      description: 'Require biometric face scan during registration',
      critical: true,
    },
    {
      key: 'astrologyEnabled',
      label: 'Astrology Engine',
      description: 'Calculate synastry compatibility scores',
    },
    {
      key: 'redRoomEnabled',
      label: 'Red Room (Ephemeral Mode)',
      description: 'Enable self-destructing messages and stealth profiles',
    },
    {
      key: 'paymentEnabled',
      label: 'Payment System',
      description: 'Enable in-app purchases and subscriptions',
    },
    {
      key: 'v2HapticEnabled',
      label: 'V2 Haptic Features',
      description: 'Enable physical feedback layer (requires hardware)',
      beta: true,
    },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Feature Toggles</h2>

      <div className="space-y-4">
        {features.map(({ key, label, description, critical, beta }) => (
          <div key={key} className="bg-gray-700 p-4 rounded-lg flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-medium">{label}</h3>
                {critical && (
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
                )}
                {beta && (
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">BETA</span>
                )}
              </div>
              <p className="text-gray-400 text-sm mt-1">{description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config[key]}
                onChange={(e) => onToggle(key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:bg-green-600 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function LimitsTab({ config, onUpdate }: any) {
  const [editing, setEditing] = useState<string | null>(null);
  const [value, setValue] = useState(0);

  const limits = [
    { key: 'dailyConnectionLimit', label: 'Daily Connection Requests', min: 1, max: 100 },
    { key: 'dailyViewLimit', label: 'Daily Profile Views', min: 5, max: 200 },
    { key: 'timeBankHours', label: 'Time Bank Duration (hours)', min: 12, max: 168 },
    { key: 'redRoomDestructHours', label: 'Red Room Self-Destruct (hours)', min: 1, max: 24 },
    { key: 'starPoolExpiryDays', label: 'Star Pool Expiry (days)', min: 1, max: 30 },
    { key: 'maxDistanceKm', label: 'Maximum Distance (km)', min: 5, max: 500 },
  ];

  const handleSave = (key: string) => {
    onUpdate(key, value);
    setEditing(null);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">App Limits & Defaults</h2>

      <div className="grid grid-cols-2 gap-4">
        {limits.map(({ key, label, min, max }) => (
          <div key={key} className="bg-gray-700 p-4 rounded-lg">
            <label className="text-white font-medium block mb-2">{label}</label>

            {editing === key ? (
              <div className="flex gap-2">
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  min={min}
                  max={max}
                  className="flex-1 bg-gray-600 text-white px-4 py-2 rounded"
                />
                <button
                  onClick={() => handleSave(key)}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="number"
                  value={config[key]}
                  disabled
                  className="flex-1 bg-gray-600 text-gray-400 px-4 py-2 rounded"
                />
                <button
                  onClick={() => { setEditing(key); setValue(config[key]); }}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                >
                  Edit
                </button>
              </div>
            )}

            <p className="text-gray-400 text-xs mt-2">
              Range: {min} - {max}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentTab({ config }: any) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Payment Configuration</h2>

      <div className="bg-blue-900 bg-opacity-30 border border-blue-600 rounded-lg p-6">
        <p className="text-blue-400">
          ℹ️ Payment system is currently <strong>{config.paymentEnabled ? 'ENABLED' : 'DISABLED'}</strong>.
        </p>
        <p className="text-blue-300 mt-2">
          Provider: <strong>{config.paymentProvider}</strong>
        </p>
        <p className="text-blue-300 mt-4">
          Configure payment provider keys in the <strong>API Keys</strong> tab, then enable the payment system in the <strong>Features</strong> tab.
        </p>
      </div>
    </div>
  );
}
