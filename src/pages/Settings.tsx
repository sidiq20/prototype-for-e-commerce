import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Bell, Shield, Globe, Palette, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Settings() {
  const { state } = useApp();
  const [activeSection, setActiveSection] = useState('notifications');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: true,
    orderUpdates: true,
    newsletter: false,
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    currency: 'USD',
    timezone: 'America/New_York',
    theme: 'light',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'private',
    orderHistory: 'private',
    wishlistVisibility: 'friends',
    dataCollection: true,
    analytics: false,
  });

  // Redirect if not authenticated
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const sections = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'privacy', label: 'Privacy', icon: Eye },
  ];

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    // Mock password change
    alert('Password updated successfully!');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Communication Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Email Notifications</label>
              <p className="text-sm text-gray-600">Receive important updates via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full ${notifications.email ? 'bg-blue-600' : 'bg-gray-200'} relative transition-colors`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications.email ? 'translate-x-5' : 'translate-x-0.5'} shadow`}></div>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">SMS Notifications</label>
              <p className="text-sm text-gray-600">Get text messages for urgent updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full ${notifications.sms ? 'bg-blue-600' : 'bg-gray-200'} relative transition-colors`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications.sms ? 'translate-x-5' : 'translate-x-0.5'} shadow`}></div>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Push Notifications</label>
              <p className="text-sm text-gray-600">Browser notifications for real-time updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full ${notifications.push ? 'bg-blue-600' : 'bg-gray-200'} relative transition-colors`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications.push ? 'translate-x-5' : 'translate-x-0.5'} shadow`}></div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Content Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Marketing Communications</label>
              <p className="text-sm text-gray-600">Promotional offers and product updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.marketing}
                onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full ${notifications.marketing ? 'bg-blue-600' : 'bg-gray-200'} relative transition-colors`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications.marketing ? 'translate-x-5' : 'translate-x-0.5'} shadow`}></div>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Order Updates</label>
              <p className="text-sm text-gray-600">Status changes for your orders</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.orderUpdates}
                onChange={(e) => setNotifications({...notifications, orderUpdates: e.target.checked})}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full ${notifications.orderUpdates ? 'bg-blue-600' : 'bg-gray-200'} relative transition-colors`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications.orderUpdates ? 'translate-x-5' : 'translate-x-0.5'} shadow`}></div>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Newsletter</label>
              <p className="text-sm text-gray-600">Weekly digest of new products and features</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.newsletter}
                onChange={(e) => setNotifications({...notifications, newsletter: e.target.checked})}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full ${notifications.newsletter ? 'bg-blue-600' : 'bg-gray-200'} relative transition-colors`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications.newsletter ? 'translate-x-5' : 'translate-x-0.5'} shadow`}></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Localization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences({...preferences, language: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              value={preferences.currency}
              onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CAD">CAD - Canadian Dollar</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={preferences.timezone}
              onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">GMT</option>
              <option value="Europe/Paris">Central European Time</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => setPreferences({...preferences, theme: 'light'})}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              preferences.theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="bg-white border border-gray-200 rounded p-3 mb-2">
              <div className="h-2 bg-gray-100 rounded mb-2"></div>
              <div className="h-1 bg-gray-200 rounded mb-1"></div>
              <div className="h-1 bg-gray-200 rounded w-2/3"></div>
            </div>
            <p className="text-sm font-medium text-gray-900">Light</p>
          </div>

          <div
            onClick={() => setPreferences({...preferences, theme: 'dark'})}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              preferences.theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="bg-gray-800 border border-gray-600 rounded p-3 mb-2">
              <div className="h-2 bg-gray-700 rounded mb-2"></div>
              <div className="h-1 bg-gray-600 rounded mb-1"></div>
              <div className="h-1 bg-gray-600 rounded w-2/3"></div>
            </div>
            <p className="text-sm font-medium text-gray-900">Dark</p>
          </div>

          <div
            onClick={() => setPreferences({...preferences, theme: 'auto'})}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              preferences.theme === 'auto' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="relative">
              <div className="bg-white border border-gray-200 rounded p-3 mb-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-gray-800"></div>
                <div className="relative h-2 bg-gray-100 rounded mb-2"></div>
                <div className="relative h-1 bg-gray-200 rounded mb-1"></div>
                <div className="relative h-1 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-900">Auto</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-1">Must be at least 8 characters long</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handlePasswordChange}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Update Password
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">2FA Status</p>
              <p className="text-sm text-gray-600">Currently disabled</p>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Account Deactivation</h3>
        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-red-800">Deactivate Account</p>
              <p className="text-sm text-red-700 mt-1">
                Once you deactivate your account, all your data will be permanently removed and cannot be recovered.
              </p>
              <button className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium">
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Visibility</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Who can see your profile?</label>
            <select
              value={privacySettings.profileVisibility}
              onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="public">Everyone</option>
              <option value="friends">Friends only</option>
              <option value="private">Only me</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order history visibility</label>
            <select
              value={privacySettings.orderHistory}
              onChange={(e) => setPrivacySettings({...privacySettings, orderHistory: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="public">Public</option>
              <option value="friends">Friends only</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Wishlist visibility</label>
            <select
              value={privacySettings.wishlistVisibility}
              onChange={(e) => setPrivacySettings({...privacySettings, wishlistVisibility: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="public">Public</option>
              <option value="friends">Friends only</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Data Usage</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Data Collection</label>
              <p className="text-sm text-gray-600">Allow us to collect data to improve your experience</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacySettings.dataCollection}
                onChange={(e) => setPrivacySettings({...privacySettings, dataCollection: e.target.checked})}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full ${privacySettings.dataCollection ? 'bg-blue-600' : 'bg-gray-200'} relative transition-colors`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${privacySettings.dataCollection ? 'translate-x-5' : 'translate-x-0.5'} shadow`}></div>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Analytics</label>
              <p className="text-sm text-gray-600">Help us understand how you use our platform</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacySettings.analytics}
                onChange={(e) => setPrivacySettings({...privacySettings, analytics: e.target.checked})}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full ${privacySettings.analytics ? 'bg-blue-600' : 'bg-gray-200'} relative transition-colors`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${privacySettings.analytics ? 'translate-x-5' : 'translate-x-0.5'} shadow`}></div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Data Management</h3>
        <div className="space-y-3">
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <span className="text-sm font-medium text-gray-900">Download your data</span>
            <p className="text-sm text-gray-600">Get a copy of all your data</p>
          </button>
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <span className="text-sm font-medium text-gray-900">Data portability</span>
            <p className="text-sm text-gray-600">Transfer your data to another service</p>
          </button>
          <button className="w-full text-left p-3 border border-red-200 rounded-lg hover:bg-red-50">
            <span className="text-sm font-medium text-red-900">Delete all data</span>
            <p className="text-sm text-red-600">Permanently remove all your data</p>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and security settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {activeSection === 'notifications' && renderNotificationSettings()}
              {activeSection === 'preferences' && renderPreferences()}
              {activeSection === 'appearance' && renderAppearance()}
              {activeSection === 'security' && renderSecurity()}
              {activeSection === 'privacy' && renderPrivacy()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;