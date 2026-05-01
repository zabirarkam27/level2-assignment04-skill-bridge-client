export const DEFAULT_AVATAR = "/avatar.svg";

export function getAvatarUrl(image?: string | null): string {
  return image || DEFAULT_AVATAR;
}
