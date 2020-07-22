const Telegraf = require('telegraf')
const dotenv = require('dotenv')
dotenv.config({path: './.env'})

const bot = new Telegraf(process.env.BOT_TOKEN)


bot.command([
    'start', 'help'
], ctx => {
    let message = `
    Hi, Protech Community Media Bot
    /start , start the bot
    /help ,  get help
    
    Image Request 
    /ghana - get location of Ghana
    /singapore - get location of singapore
    /newyork - get image of New York 

    Get Cities 
    /cities - get photos of cities 
    /citieslist - get text file for cities 
    `;
    ctx.reply(message);
})


bot.command('newyork', (ctx) => {

    bot.telegram.sendChatAction(ctx.chat.id, 'upload_photo')
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: 'res/newyork.jpg'
    }, {
        reply_to_message_id: ctx.message.message_id
    },)
})

bot.command('dubai', (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, 'upload_video')
    bot.telegram.sendAnimation(ctx.chat.id, 'https://tenor.com/view/free-neon-lights-free-sign-gif-12048232', {
        reply_to_message_id: ctx.message.message_id
    },)
})

bot.command('cities', (ctx) => {
    let cities = [
        'res/dubai.jpg',
        'res/hongkong.jpg',
        'res/london.jpg',
        'res/newyork.jpg',
        'res/singapore.jpg',
    ]
    let result = cities.map((city) => {
        return {
            type: 'photo',
            media: {
                source: city
            }
        }
    })


    bot.telegram.sendMediaGroup(ctx.chat.id, result)
})

bot.command('citieslist', (ctx) => {
    bot.telegram.sendDocument(ctx.chat.id, {
        source: 'res/citieslist.txt'
    }, {
        thumb: {
            source: 'res/dubai.jpg'
        }
    },)
})

bot.command('singapore', (ctx) => {
    bot.telegram.sendLocation(ctx.chat.id, 1.3521, 103.8198)
})

bot.command('ghana', (ctx) => {
    bot.telegram.sendLocation(ctx.chat.id, 7.9465, -1.0232)
})

bot.on('message', async ctx => {
    if (ctx.updateSubTypes[0] === 'document') {
        try {
            let link = await bot.telegram.getFileLink(ctx.message.document.file_id);
            ctx.reply('Your download link : ' + link)
        } catch (err) {
            console.log(err)
            ctx.reply(err.description);
        }
    } else if (ctx.updateSubTypes[0] === 'photo') { // console.log(ctx.message.photo);
        try {
            let link = await bot.telegram.getFileLink(ctx.message.photo[0].file_id);
            ctx.reply('Your download link : ' + link)
        } catch (err) {
            console.log(err)
            ctx.reply(err.description);
        }
    }
})

bot.launch()


// Sending image using URL (just uncomment the line below)
// bot.telegram.sendPhoto(ctx.chat.id, "https://www.google.com/imgres?imgurl=https%3A%2F%2Favatars3.githubusercontent.com%2Fu%2F32119411%3Fs%3D460%26u%3D05936b1345fc29a79fd098577b009846cd8c3565%26v%3D4&imgrefurl=https%3A%2F%2Fgithub.com%2Facquahsamuel&tbnid=OCc-7QIUoRakyM&vet=12ahUKEwjlm-OT7d7qAhWJq6QKHXigAA0QMygAegUIARCRAQ..i&docid=BFEdomCXpabdwM&w=460&h=460&q=acquah%20samuel%20github&ved=2ahUKEwjlm-OT7d7qAhWJq6QKHXigAA0QMygAegUIARCRAQ")

// sending image using path
// bot.telegram.sendPhoto(ctx.chat.id , {source : "res/london.jpg"});
