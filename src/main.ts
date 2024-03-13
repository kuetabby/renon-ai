import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import analyzeCommand from './analyzer';

import { CallbackInfo, ChatStage, textInfo } from './utils';
import { keyboardMarkup } from './utils/keyboardMarkup';

// import type { AnalyzeDtoConversation } from './models/Analyze';

const TelegramBot = require('node-telegram-bot-api');

// const botToken = '6567740479:AAGpS3H2tzHtp_7Ey-9v0PWpAnEaNLoVlgk';
const botToken = '7137418645:AAHNtCVOzKmoGiaYfXdaNwTYSkGiFvZYhec';
export const bot = new TelegramBot(botToken, { polling: true });

let chatStates = {};
let chatStages = {};

let userStates = {};

// let analyzeStates = {} as AnalyzeDtoConversation;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // replace with your allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      // 'Origin,Content-Type,Authorization,Accept,User-Agent,Cache-Control,Pragma,x-api-key',
      'x-api-key',
    credentials: true,
    exposedHeaders: 'Content-Length',
    maxAge: 43200, // 12 hours
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  bot.on('message', async (msg) => {
    const chatId: number = msg.chat.id;
    const messageText = msg.text;

    if (messageText === '/start') {
      chatStates[chatId] = ChatStage.START;

      delete chatStages[chatId];
      delete userStates[chatId];

      if (!userStates[chatId]) {
        userStates[chatId] = {
          analyzeChainId: '',
          analyzeContractAddress: '',
        };
      }

      // Path to the video file
      const videoPath =
        'https://res.cloudinary.com/dwppcshmi/video/upload/f_auto:video,q_auto/v1/rabbit_images/jqrjtgvyazpatojobc2p';

      await bot.sendVideo(chatId, videoPath, {
        parse_mode: 'Markdown',
        caption: textInfo.welcome,
        reply_markup: JSON.stringify({
          inline_keyboard: keyboardMarkup.start,
        }),
      });
    }
  });

  bot.on('callback_query', async (callbackQuery) => {
    const query = callbackQuery;
    const message = query.message;

    const chatId: number = message.chat.id;
    const data = JSON.parse(callbackQuery.data);

    // console.log(data, 'data');
    // console.log(message, 'message');
    // console.log(chatStates, 'chatStates');

    switch (data.command) {
      // case CallbackInfo.ABOUT:
      //   bot.sendMessage(chatId, textInfo.about, {
      //     parse_mode: 'Markdown',
      //   });
      //   break;

      case CallbackInfo.SOCIALS:
        bot.editMessageReplyMarkup(
          {
            inline_keyboard: keyboardMarkup.socials,
          },
          {
            chat_id: chatId,
            message_id: message.message_id,
          },
        );
        break;

      case CallbackInfo.BACK:
        bot.editMessageReplyMarkup(
          {
            inline_keyboard: keyboardMarkup.start,
          },
          {
            chat_id: chatId,
            message_id: message.message_id,
          },
        );
        break;

      case CallbackInfo.EXIT:
        delete chatStates[chatId];
        delete chatStates[chatId];
        delete userStates[chatId];
        if (chatId && message.message_id) {
          bot.deleteMessage(chatId, message.message_id);
        }
        break;

      default:
        return;
    }
  });

  analyzeCommand({
    stages: chatStages,
    states: userStates,
  });

  await app.listen(3007);
}
bootstrap();
