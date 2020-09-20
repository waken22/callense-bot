# callense-bot
A discord bot made to mute/unmute all members on a voice channel, created to play among us with friends.

## How To Use
Simple, you need to put a ```.env``` file into the root folder and write the discord token inside it (you can obtain the token in discord website, developer section) example of the file :
```
TOKEN=yourtokenhere
```
Then run the bot using ```node index.js``` and you should have access to the following chat commands :

```!switch-voice channel_name``` (It mutes/unmutes all members of a channel)

**Known issue: At the moment only works with channel voices that doesn't have spaces between letters in title.**



### Read Please
This bot is a personal project and a Work in Progress, so don't expect so much about it, was created to solve my personal problem that it was to play  among us and with friends, without the need to mute everyone every round manually.
