import { MemberTypes } from "@/types/Members";

export const membersListFormatter = (members: MemberTypes[]) => {
  members.sort((a, b) => getLastDigit(a.memberId) - getLastDigit(b.memberId));
  return members;
};

function getLastDigit(memberId: string): number {
  const match = memberId.match(/\d+$/);
  return match ? parseInt(match[0], 10) : 0;
}
