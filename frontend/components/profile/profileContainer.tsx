"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ProfileHeader from "./profileHeader";
import ProfileInformation from "./profileInformation";
import ProfileSecurity from "./profileSecurity";
import EditProfileModal from "./editProfileModal";

import { UserType } from "@/types/user";
import { userService } from "@/api/services";

export default function ProfileContainer() {
  const [user, setUser] = useState<UserType | null>(
    null
  );

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [openModal, setOpenModal] =
    useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response =
        await userService.getCurrentUser();

      setUser(response.data.data);
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to fetch profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (
    data: Partial<UserType>
  ) => {
    try {
      setSaving(true);

      const response =
        await userService.updateUserDetails(
          data
        );

      toast.success(
        response.data.message ||
          "Profile updated successfully."
      );

      setUser(response.data.data);

      setOpenModal(false);

      await fetchProfile();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        User not found.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <ProfileHeader
          user={user}
          onEdit={() => setOpenModal(true)}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <ProfileInformation user={user} />

          <ProfileSecurity user={user} />
        </div>
      </div>

      <EditProfileModal
        open={openModal}
        loading={saving}
        user={user}
        onClose={() => setOpenModal(false)}
        onSubmit={updateProfile}
      />
    </>
  );
}