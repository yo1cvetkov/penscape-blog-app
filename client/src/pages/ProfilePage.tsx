import { useLoaderData } from "react-router-dom";
import CardWrapper from "../components/ui/CardWrapper";
import { User, UserRole } from "../features/auth/types/User";
import AvatarUpload from "../features/profile/components/AvatarUpload";
import BecomeAuthorCard from "../features/profile/components/BecomeAuthorCard";
import ChangeBioForm from "../features/profile/components/ChangeBioForm";
import ChangeEmailForm from "../features/profile/components/ChangeEmailForm";
import ChangePasswordForm from "../features/profile/components/ChangePasswordForm";
import ChangeUsernameForm from "../features/profile/components/ChangeUsernameForm";
import ProfileField from "../features/profile/components/ProfileField";

function ProfilePage() {
  const user = useLoaderData() as User;

  return (
    <section className="pt-10">
      <CardWrapper className="mx-auto">
        <h1 className="text-lg text-center text-gray-800">Profile details</h1>
        <div className="flex flex-col items-center mt-4 gap-y-4">
          <AvatarUpload />
          <span className="text-sm text-gray-900">Avatar image</span>
        </div>
        <ProfileField
          defaultValue={user.username}
          dialogParagraph="Change your username and make sure that your username is unique"
          dialogTitle="Edit username"
          label="Username"
        >
          <ChangeUsernameForm />
        </ProfileField>
        <ProfileField
          dialogTitle="Edit email"
          label="Email address"
          defaultValue={user.email}
          dialogParagraph="Change your email address. Make sure that you entered valid and unique email."
        >
          <ChangeEmailForm />
        </ProfileField>
        <ProfileField
          defaultValue="Change your password"
          dialogParagraph="Enter new and old passwords and make sure that the password is strong."
          dialogTitle="Change your password"
          label="Password"
        >
          <ChangePasswordForm />
        </ProfileField>
        <ProfileField
          label="Bio"
          dialogTitle="Update your bio"
          defaultValue="Edit your bio"
          dialogParagraph="Edit your bio. This will be visible to the users looking for your profile."
        >
          <ChangeBioForm />
        </ProfileField>
      </CardWrapper>
      {user.role === UserRole.USER ? <BecomeAuthorCard /> : null}
    </section>
  );
}

export default ProfilePage;
