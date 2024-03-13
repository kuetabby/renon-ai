import { CallbackInfo } from '.';
import { chain_arb_poly, list_chain } from './chains';

const startKeyboardMarkup = [
  [
    {
      text: '🌐 Website',
      url: 'https://www.renon-ai.net',
    },
  ],
  [
    {
      text: '🪙 Token Analyzer',
      callback_data: JSON.stringify({
        command: CallbackInfo.ANALYZE,
      }),
    },
    {
      text: '🛸 Site Analyzer',
      callback_data: JSON.stringify({
        command: CallbackInfo.SITE,
      }),
    },
  ],
  [
    {
      text: '🧬 NFT Analyzer',
      callback_data: JSON.stringify({
        command: CallbackInfo.ANALYZE,
      }),
    },
    {
      text: '🥷 Address Analyzer',
      callback_data: JSON.stringify({
        command: CallbackInfo.SITE,
      }),
    },
  ],
  // [
  //   {
  //     text: 'ℹ️ Guideline',
  //     callback_data: JSON.stringify({
  //       command: CallbackInfo.ABOUT,
  //     }),
  //   },
  //   {
  //     text: '💵 Faucet',
  //     callback_data: JSON.stringify({
  //       command: CallbackInfo.CLAIM_FAUCET,
  //     }),
  //   },
  //   {
  //     text: '🏦 Stake',
  //     callback_data: JSON.stringify({
  //       command: CallbackInfo.STAKING,
  //     }),
  //   },
  // ],
  [
    {
      text: '🔗 Socials',
      callback_data: JSON.stringify({
        command: CallbackInfo.SOCIALS,
      }),
    },
  ],
];

const socialsKeyboardMarkup = [
  [
    {
      text: 'Telegram',
      url: 'https://t.me/RenonAI',
    },
    {
      text: 'X',
      url: 'https://x.com/RenonAiOfficial',
    },
  ],
  [
    {
      text: 'Whitepaper',
      url: 'https://renon-ai-official.gitbook.io/renon-ai',
    },
  ],
  [
    {
      text: '⬅️ Back',
      callback_data: JSON.stringify({
        command: CallbackInfo.BACK,
      }),
    },
  ],
];

const chainsAnalyerKeyboardMarkup = [
  [
    {
      text: 'CHOOSE NETWORK',
      callback_data: JSON.stringify({}),
    },
  ],
  [
    ...list_chain.chain_eth_bsc.map((item) => ({
      text: item.label,
      callback_data: JSON.stringify({
        command: CallbackInfo.CONTRACT_ADDRESS,
        analyzeChainId: item.chainId,
      }),
    })),
  ],
  [
    ...chain_arb_poly.map((item) => ({
      text: item.label,
      callback_data: JSON.stringify({
        command: CallbackInfo.CONTRACT_ADDRESS,
        analyzeChainId: item.chainId,
      }),
    })),
  ],
  // [
  //   ...list_chain.chain_avax_polygon.map((item) => ({
  //     text: item.label,
  //     callback_data: JSON.stringify({
  //       command: CallbackInfo.CONTRACT_ADDRESS,
  //       analyzeChainId: item.chainId,
  //     }),
  //   })),
  // ],
  // [
  //   ...list_chain.chain_ftm_op.map((item) => ({
  //     text: item.label,
  //     callback_data: JSON.stringify({
  //       command: CallbackInfo.CONTRACT_ADDRESS,
  //       analyzeChainId: item.chainId,
  //     }),
  //   })),
  // ],
  [
    {
      text: `❌ Cancel Analyze`,
      callback_data: JSON.stringify({
        command: CallbackInfo.EXIT,
      }),
    },
  ],
];

export const keyboardMarkup = {
  start: startKeyboardMarkup,
  socials: socialsKeyboardMarkup,
  chains: chainsAnalyerKeyboardMarkup,
};
