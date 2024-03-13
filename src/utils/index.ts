export enum ChatStage {
  START = 1,
  SOCIALS = 2,
  MIX = 3,
  WELCOME_VIDEO = 4,
  EXIT = 5,
}

export enum CallbackInfo {
  ABOUT = 2,
  SOCIALS = 3,
  BACK = 11,
  EXIT = 12,
  ANALYZE = 13,
  CONTRACT_ADDRESS = 14,
  SITE = 15,
  SITE_URL = 16,
}

export const zeroAddress = '0x0000000000000000000000000000000000000000';
export const deadAddress = '0x000000000000000000000000000000000000dead';

export function shortenAddress(address: string, chars = 4): string {
  // const parsed = isAddress(address);
  // if (!parsed) {
  //   throw Error(`Invalid 'address' parameter '${address}'.`);
  // }
  return `${address.substring(0, chars + 2)}...${address.substring(
    42 - chars,
  )}`;
}

export const adminId = 6019985262;

const welcome = `
*🛠 RENON AI | Discover Your AI Needs*

ARTIFICIAL INTELLIGENCE system designed to revolutionize various industries through its capabilities  🎯🎯🎯
`;

const mixing = `*Fill all the details below to start bridging*`;
const analyze = `*Choose from which network you want to analyze the token*`;

const about = `
*Zeal AI powered crypto bridging tools*

Using Telegram to bridge and transfer cryptocurrency while maintaining privacy, security and anonymity.

Zeal AI offers solution that enable transactional privacy and security by breaking on-chain link between sender and recipient address.

*To use the Zeal AI bridge:*
1. First choose the cryptocurrency you want to deposit (from currency) 
2. Select the cryptocurrency to withdraw (to currency) 
3. Enter the amount of the transaction. 
4. Enter the recipient wallet's (receiver wallet) address.
Our system completes transactions in less than 30 minutes.
`;

export const textInfo = {
  welcome,
  mixing,
  analyze,
  about,
};

export const isAdmin = (userId: number) => {
  return adminId === userId;
};
