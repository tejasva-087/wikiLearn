import Achievements from "../components/Achievements";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { ChevronDown, Mail, Lock, Trash2 } from "lucide-react";

function Setting() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex h-screen">
      {/* Side Bar */}
      <Sidebar />

      {/* Setting Page main content - moved to left */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg  p-6">
          <h1 className="text-2xl font-bold mb-6">Personal Settings</h1>

          {/* Personal Information Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <ChevronDown className="w-5 h-5 mr-2 text-gray-500" />
                Personal information
              </h2>
            </div>

            <div className="pl-7 space-y-4">
              <div className="grid grid-cols-3 items-center">
                <span className="text-gray-600">Name</span>
                <span className="font-medium">Tejuss</span>
                <button className="text-blue-600 text-sm font-medium justify-self-end">
                  Change
                </button>
              </div>

              <div className="grid grid-cols-3 items-center">
                <span className="text-gray-600">Email</span>
                <span className="font-medium flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  hello@tejuss.io
                </span>
                <button className="text-blue-600 text-sm font-medium justify-self-end">
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* Account Security Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <ChevronDown className="w-5 h-5 mr-2 text-gray-500" />
                Account security
              </h2>
            </div>

            <div className="pl-7 space-y-4">
              <div className="space-y-2">
                <label className="block text-gray-600">Current password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-600">New password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-600">Confirm password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Change password
              </button>
            </div>
          </div>

          {/* Delete Account Section */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold flex items-center text-red-600 mb-4">
              <Trash2 className="w-5 h-5 mr-2" />
              Delete account
            </h2>
            <p className="text-gray-600 mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button className="text-red-600 border border-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-colors">
              Delete account
            </button>
          </div>
        </div>
      </div>

      {/* Achievement Bar */}
      <Achievements />
    </div>
  );
}

export default Setting;
