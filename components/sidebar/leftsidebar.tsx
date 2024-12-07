import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Briefcase, BookOpen } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firebaseApp, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface UserData {
  username: string;
  email: string;
  location?: string;
  bio?: string;
  profilepic?: string;

}

export function LeftSidebar() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  const fetchUserData = async () => {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    if (!user) {
      router.push("/login");
      return;
    }
    try {
      const userDoc = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDoc);
    
      if (docSnap.exists()) {
        setUserData(docSnap.data() as UserData);
      } else {
        // Set dummy data if no document found
        setUserData({
          username: "Anonymous User",
          email: user.email || "user@example.com",
          bio: "Embracing failures as stepping stones to success",
          profilepic: "/default-avatar.png", // Adjust path to your default avatar
          location: "Unknown",
        });
      }   
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Set dummy data in case of error
      setUserData({
        username: "Anonymous User",
        email: user?.email || "user@example.com",
        bio: "Embracing failures as stepping stones to success",
        profilepic: "/default-avatar.png",
        location: "Unknown"
      });
    } 
  }
    
  useEffect(() => {
    fetchUserData();   
  }, [])

  const dummyUserData = {
    username: "Anonymous User",
    email: "user@example.com",
    bio: "Embracing failures as stepping stones to success",
    profilepic: "/default-avatar.png"
  };

  const displayData = userData || dummyUserData;

  return (
    <div className="hidden w-80 absolute left-0 top-16 h-screen bg-background border-r border-border p-4 transition-colors md:block">
      <div className="space-y-6">
      <div className="p-4 rounded-lg border border-border bg-card shadow-md text-center">
        <Avatar className="w-16 h-16 mx-auto mb-4">
          <AvatarImage 
            src={displayData.profilepic || "/default-avatar.png"} 
            alt={`${displayData.username}'s avatar`} 
          />
          <AvatarFallback>{displayData.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-lg text-primary">
          {displayData.username}
        </h3>
        <p className="text-sm text-muted-foreground">
          {displayData.bio || "No bio available"}
        </p>
        <Link
            href="/profile"
            className={buttonVariants({
              variant: "outline",
              className: "flex items-center w-full p-3 my-1",
            })}
          >
            <span>Edit Profile
            </span>
          </Link>
      </div>

        <nav className="space-y-2">
          <Link
            href="/network"
            className={buttonVariants({
              variant: "ghost",
              className: "flex items-center w-full p-3",
            })}
          >
            <Users className="h-5 w-5 mr-3" />
            <span>Network</span>
          </Link>
          {/* <Link
            href="/jobs"
            className={buttonVariants({
              variant: "ghost",
              className: "flex items-center w-full p-3",
            })}
          >
            <Briefcase className="h-5 w-5 mr-3" />
            <span>Failed Jobs</span>
          </Link>
          <Link
            href="/learning"
            className={buttonVariants({
              variant: "ghost",
              className: "flex items-center w-full p-3",
            })}
          >
            <BookOpen className="h-5 w-5 mr-3" />
            <span>Learning</span>
          </Link> */}
        </nav>
      </div>
    </div>
  );
}