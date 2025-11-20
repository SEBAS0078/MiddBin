// src/components/ProfileHeader.tsx

type ProfileHeaderProps = {
  user: {
    username?: string;
    email?: string;
    rating?: number | null;
  };
};

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <section className="profile-card">
      <div className="profile-card-top">
        <div>
          <h1 className="profile-name">{user.username}</h1>
          <p className="profile-email">{user.email}</p>
          <p className="profile-rating">
            Rating: {user.rating ?? "No rating yet"}
          </p>
        </div>
      </div>
    </section>
  );
}
