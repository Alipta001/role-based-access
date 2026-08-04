"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { toast } from "react-toastify";

import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

export default function ChangePasswordForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await AxiosInstance.patch(
        endPoints.common.changePassword,
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
      );

      toast.success(response.data.message);

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      router.refresh();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Password update failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Current Password */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Current Password
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            type={showCurrent ? "text" : "password"}
            placeholder="Enter current password"
            className={inputClass}
            required
          />

          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          >
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* New Password */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          New Password
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            type={showNew ? "text" : "password"}
            placeholder="Enter new password"
            className={inputClass}
            required
          />

          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Confirm Password
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm new password"
            className={inputClass}
            required
          />

          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Password Rules */}

      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
        <p className="mb-3 font-semibold text-indigo-900">
          Password Requirements
        </p>

        <ul className="space-y-2 text-sm text-slate-700">
          <li>• At least 8 characters</li>
          <li>• One uppercase letter</li>
          <li>• One lowercase letter</li>
          <li>• One number</li>
          <li>• One special character</li>
        </ul>
      </div>

      {/* Submit Button */}

      <button
        type="submit"
        disabled={loading}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 font-semibold text-white shadow-lg transition hover:bg-indigo-700 disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Updating...
          </>
        ) : (
          "Update Password"
        )}
      </button>
    </form>
  );
}
