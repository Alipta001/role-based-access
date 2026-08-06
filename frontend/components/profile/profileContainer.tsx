"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

import ProfileHeader from "./profileHeader";
import ProfileInformation from "./profileInformation";
import ProfileSecurity from "./profileSecurity";
import EditProfileModal from "./editProfileModal";

import { UserType } from "@/types/user";

export default function ProfileContainer() {
  const [user, setUser] =
    useState<UserType | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [openModal, setOpenModal] =
    useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await AxiosInstance.get(
        endPoints.common.getUser
      );

      setUser(response.data.data);
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to fetch profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (
    data: any
  ) => {
    try {
      setSaving(true);

      const response =
        await AxiosInstance.patch(
          endPoints.common.updateProfile,
          data
        );

      setUser(response.data.data);

      toast.success(
        response.data.message
      );

      setOpenModal(false);
    } catch (error) {
      console.error(error);

      toast.error(
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
    return null;
  }

  return (
    <>
      <div className="space-y-6">
        <ProfileHeader
          user={user}
          onEdit={() =>
            setOpenModal(true)
          }
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <ProfileInformation
            user={user}
          />

          <ProfileSecurity
            user={user}
          />
        </div>
      </div>

      <EditProfileModal
        open={openModal}
        loading={saving}
        user={user}
        onClose={() =>
          setOpenModal(false)
        }
        onSubmit={updateProfile}
      />
    </>
  );
}