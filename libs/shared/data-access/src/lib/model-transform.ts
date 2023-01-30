import { User } from "@conduit/shared/core";
import { apiUser } from "./generated/models";

export function fromApiUser(user: apiUser): User {
  return {
    ...user,
    bio: user.bio || '',
    image: user.image || ''
  };
}
